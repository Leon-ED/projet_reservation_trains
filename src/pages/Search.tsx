/**
 * Projet: @projet_reservation_trains
 * Fichier: src/pages/Search.tsx
 * Auteur(s): Léon EDMEE
 * Date: 01/06/2023
 * Description: Page de recherche de trains
 * Version : 1.0
 * 
 * License: @license MIT
*/
import { useParams } from "react-router-dom"
import { getStationFromId, getStationsFromList, getTrainsFromResult } from "../utils/functions"
import { useEffect, useState } from "react"
import { SearchType, Station, Train } from "../utils/types"
import { SearchRecap } from "../components/SearchRecap"
import { SearchComponent } from "../components/Search"
import { DisplayTrainInSearch } from "../components/Train"
import { MessageComp } from "../components/MessageComp"

export const SearchPage = () => { // Page de recherche de trains

    const { dateFrom, departureStationID, arrivalStationID, numberOfPassengers, isRoundTrip, returnDate } = useParams() // Récupérer les paramètres de l'url
    const isRoundTripBool = isRoundTrip == "true" ? true : false // true = aller-retour, false = aller simple
    useEffect(() => { // Récupérer les gares de départ et d'arrivée
        if (!departureStationID || !arrivalStationID)
            return
        const main = async () => { // Fonction principale
            const [departureStation, arrivalStation] = await getStationsFromList([departureStationID, arrivalStationID]) // Récupérer les gares de départ et d'arrivée
            setDepartureStation(departureStation) // Mettre à jour la gare de départ
            setArrivalStation(arrivalStation) // Mettre à jour la gare d'arrivée

            if (!numberOfPassengers || !dateFrom || !departureStation || !arrivalStation || !returnDate) // Vérifier que les paramètres de l'url sont bien renseignés
                return

            const search: SearchType = { date_departure: dateFrom, departure_station: departureStation, arrival_station: arrivalStation, number_of_passengers: parseInt(numberOfPassengers), isRoundTrip: isRoundTripBool, date_return: returnDate }
            setTrainList(await getTrainsFromResult(search)) // Mettre à jour la liste des trains
            localStorage.setItem("search", JSON.stringify(search))


        }
        main()

    }, [])


    const [trainList, setTrainList] = useState<Train[]>(); // Liste des trains


    const [departureStation, setDepartureStation] = useState<Station>() // Gare de départ
    const [arrivalStation, setArrivalStation] = useState<Station>()  // Gare d'arrivée
    if (!departureStation || !arrivalStation || !dateFrom || !numberOfPassengers || !returnDate) { // Vérifier que les paramètres de l'url sont bien renseignés 
        return <div>Erreur</div>
    }
    if (departureStationID === arrivalStationID) { // Vérifier que la gare de départ et la gare d'arrivée sont différentes
        return <MessageComp titre="Une erreur est survenue" message="Il n'est pas possible d'avoir la gare de départ et d'arrivée identiques" type="error" redirectTo="/" redirectText="Retour à l'accueil" />
    }

    const trainsComponent = trainList?.map((train) => { // Liste des trains
        return <DisplayTrainInSearch train={train} />
    })


    return ( // Afficher la page de recherche de trains
        <>
            <SearchComponent />
            <SearchRecap departure_station={departureStation} arrival_station={arrivalStation} date_departure={dateFrom} date_return={returnDate} number_of_passengers={parseInt(numberOfPassengers)} isRoundTrip={isRoundTripBool} />
            <section>
                <h2>Liste des trains</h2>
                <div className="train_list">
                    {trainsComponent}

                </div>
            </section>
        </>


    )

}

