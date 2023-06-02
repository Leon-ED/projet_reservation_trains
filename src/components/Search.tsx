/**
 * Projet: @projet_reservation_trains
 * Fichier: src/components/Search.tsx
 * Auteur(s): Léon EDMEE
 * Date: 01/06/2023
 * Description: Ce composant affiche le formulaire de recherche de trains
 * Version : 1.0
 * 
 * License: @license MIT
*/


import { useEffect, useState } from "react";
import { SearchType, Station } from "../utils/types";
import { getStations, buildSearchURL } from "../utils/functions";
import { AutoCompleteStation } from "./Station";
import { useNavigate } from "react-router-dom";

// Composant SearchComponent qui affiche le formulaire de recherche de trains
export const SearchComponent = () => {
    const [stations, setStations] = useState<Station[]>([]); // Liste des gares
    const todaysDate = new Date().toISOString().slice(0, 10); // Date du jour
    const sevenDaysLater = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10); // Date du jour + 7 jours
    const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false); // Aller-retour 

    const [numberOfPassengers, setNumberOfPassengers] = useState<number>(1); // Nombre de passagers
    const [dateDeparture, setDateDeparture] = useState<string>(todaysDate); // Date de départ
    const [dateReturn, setDateReturn] = useState<string>(sevenDaysLater); // Date de retour
    const navigate = useNavigate() // Hook de navigation

    // Gérer le clic sur le bouton de recherche
    function searchAction() {
        let departureStationElem = document.getElementById("gareDepart") as HTMLInputElement // Gare de départ
        let arrivalStationElem = document.getElementById("gareArrivee") as HTMLInputElement // Gare d'arrivée

        const departureStationValue = departureStationElem.value // Valeur de la gare de départ
        const arrivalStationValue = arrivalStationElem.value // Valeur de la gare d'arrivée

        const departureStation = findStation(departureStationValue, stations) // Gare de départ
        const arrivalStation = findStation(arrivalStationValue, stations) // Gare d'arrivée

        // Vérifier que les gares de départ et d'arrivée sont bien renseignées
        if (!departureStation || !arrivalStation) {
            return
        }


        // Vérifier que la date de départ est bien renseignée
        const search: SearchType = {
            departure_station: departureStation!,
            arrival_station: arrivalStation!,
            date_departure: dateDeparture,
            isRoundTrip: isRoundTrip,
            number_of_passengers: numberOfPassengers,
            date_return: dateReturn
        }
        const url = buildSearchURL(search)

        navigate(url)
    }
    useEffect(() => {
        getStations().then((data) => {
            return setStations(data)
        })

    }, [])

    // Créer la liste des gares
    const stationsList = stations.map((station) => {
        return <AutoCompleteStation key={station._id} {...station} />
    })



    // Afficher le formulaire de recherche de trains
    return (
        <section>
            <div className="search-options flex-row">
                <h4>Options : </h4>
                <div className="flex-row">
                    <div className="label_input">
                        <label htmlFor="aller_retour">Aller-retour</label>
                        <input type="checkbox" name="aller_retour" id="aller_retour" onChange={(e) => setIsRoundTrip(e.target.checked)} />
                    </div>
                    <div className="label_input">
                        <label htmlFor="nombre_personnes" >Nombre de personnes</label>
                        <input type="number" name="nombre_personnes" id="nombre_personnes" defaultValue="1" max="10" min="1" onChange={(e) =>
                            isNaN(parseInt(e.target.value)) ? setNumberOfPassengers(1) : setNumberOfPassengers(parseInt(e.target.value))} />
                    </div>
                </div>
            </div>
            <div className="search-field-container flex-row">

                <h3>Départ</h3>

                <div className="flex-row">
                    <label htmlFor="date_time_local"> <h3> le </h3> </label>
                    <input type="date" name="date" id="date_depart" defaultValue={todaysDate} onChange={
                        (e) => {
                            setDateDeparture(e.target.value)
                            setDateReturn(new Date(new Date(e.target.value).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10))
                        }
                    } />
                </div>
                <div className="flex-row">
                    <label htmlFor="time"> <h3> depuis</h3> </label>
                    <input type="text" list="stationsList" id="gareDepart" name="gare" placeholder="Gare de départ" />

                </div>
                <div className="flex-row">
                    <label htmlFor="time"> <h3>vers </h3> </label>
                    <input type="text" list="stationsList" name="gare" id="gareArrivee" placeholder="Gare d'arrivée" />
                </div>
                <div className='search-field-container flex-row'>
                    <h3>Retour</h3>
                    <div className="flex-row">
                        <label htmlFor="date_time_local"> <h3> le </h3> </label>
                        <input type="date" name="date" id="date_retour" onChange={
                            (e) => {
                                setDateReturn(e.target.value)
                            }

                        } />
                    </div>
                </div>

                <datalist id="stationsList">
                    {stationsList}
                </datalist>
            </div>
            <button className="search_btn" type="submit" onClick={searchAction}>Rechercher</button>
        </section>
    )


}
// Trouver une gare dans la liste des gares
const findStation = (stationName: string, list: Station[]) => {
    const stationNameCleaned = stationName.toLowerCase().trim().replaceAll(" ", "")
    let foundStation: Station | undefined = undefined
    list.forEach((station) => {
        const fullName = station.name + " (" + station.city + ", " + station.region + ")"
        const fullNameCleaned = fullName.toLowerCase().trim().replaceAll(" ", "")

        if (fullNameCleaned === stationNameCleaned) {
            foundStation = station
            return station
        }


    });
    return foundStation
}
