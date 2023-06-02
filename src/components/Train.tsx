/**
 * Projet: @projet_reservation_trains
 * Fichier: src/components/Train.tsx
 * Auteur(s): léon EDMEE
 * Date: 01/06/2023
 * Description: Affichage d'un train
 * Version : 1.0
 * 
 * License: @license MIT
*/
import { useNavigate } from "react-router-dom"
import { Train } from "../utils/types"
// Composant Train qui affiche un train
export const DisplayTrainInSearch = ({ train }: { train: Train }) => {

    // Fonction qui calcule la durée du trajet
    const duration = (train: Train): string => {
        const timeDeparture = train.time_departure.split(":")
        const timeArrival = train.time_arrival.split(":")
        let hours = parseInt(timeArrival[0]) - parseInt(timeDeparture[0]) // On calcule le nombre d'heures
        let minutes = parseInt(timeArrival[1]) - parseInt(timeDeparture[1]) // On calcule le nombre de minutes


        return `${hours}h${minutes}`     // On retourne la durée du trajet
    }

    // Fonction qui calcule le nombre d'arrêts
    let arrets = ""
    if (train.stopsList.length === 0) { // Si il n'y a pas d'arrêt
        arrets = "Train direct"
    } else {
        arrets = train.stopsList.length + " arrêt(s)" // Sinon on affiche le nombre d'arrêts
    }
    // Fonction qui permet de naviguer vers la page de réservation
    const navigate = useNavigate()

    // On retourne le JSX
    return (
        <div className="train" onClick={handleTrainClick}>
            <div className="train__header">
                <h3>{train.train_type} n° {train.train_number}</h3>
                <p><span className="train__hour">{train.time_departure}</span>{train.departure_station.name}</p>
                <p><span className="train__hour">{train.time_arrival}</span>{train.arrival_station.name}</p>
            </div>
            <div className="train__body">
                <p><strong>Billet à partir de <span className="train__price">{train.price}</span>EUR </strong></p>
            </div>
            <div className="train__footer">
                <p>Durée du trajet : {duration(train)} </p>
                <p><i>{arrets}</i></p>
            </div>
            <p>Opéré par <span className="train__operator">{train.operator}</span></p>
        </div>
    )

    // Fonction qui permet de naviguer vers la page de réservation
    function handleTrainClick() {
        navigate("/reservation/" + train._id)
    }
}
// Composant Train qui affiche un train
export const TrainRecap = ({ train }: { train: Train }) => {


    // On retourne le JSX
    return (
        <section className="trainRecap">
            <h3>Informations du {train.train_type} n°{train.train_number}</h3>
            <div className="trainRecap__body">
                <p><strong>Départ de </strong>{train.departure_station.name} à {train.time_departure}</p>
                <p><strong>Arrivée à </strong>{train.arrival_station.name} à {train.time_arrival}</p>
                <details>
                    <summary> {train.stopsList.length} arrêt(s)</summary>
                    <ul>
                        {train.stopsList.map((station, index) => {
                            return <li key={index}>{station.name}</li>
                        })}
                    </ul>
                </details>
            </div>
        </section>

    )




}