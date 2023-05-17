import { useParams } from "react-router-dom"
import { getStationFromId, getStationsFromList, getTrainsFromResult } from "../utils/functions"
import { useEffect, useState } from "react"
import { SearchType, Station, Train } from "../utils/types"
import { SearchRecap } from "../components/SearchRecap"
import { SearchComponent } from "../components/Search"
import { DisplayTrainInSearch } from "../components/Train"
import { MessageComp } from "../components/MessageComp"

export const SearchPage = () => {

    const { dateFrom, departureStationID, arrivalStationID, numberOfPassengers, isRoundTrip, returnDate } = useParams()
    const isRoundTripBool = isRoundTrip == "true" ? true : false

    useEffect(() => {
        if (!departureStationID || !arrivalStationID)
            return
        const main = async () => {
            const [departureStation, arrivalStation] = await getStationsFromList([departureStationID, arrivalStationID])
            setDepartureStation(departureStation)
            setArrivalStation(arrivalStation)

            if (!numberOfPassengers || !dateFrom || !departureStation || !arrivalStation || !returnDate)
                return

            const search: SearchType = { date_departure: dateFrom, departure_station: departureStation, arrival_station: arrivalStation, number_of_passengers: parseInt(numberOfPassengers), isRoundTrip: isRoundTripBool, date_return: returnDate }
            setTrainList(await getTrainsFromResult(search))
            localStorage.setItem("search", JSON.stringify(search))


        }
        main()

    }, [])


    const [trainList, setTrainList] = useState<Train[]>();


    const [departureStation, setDepartureStation] = useState<Station>()
    const [arrivalStation, setArrivalStation] = useState<Station>()
    if (!departureStation || !arrivalStation || !dateFrom || !numberOfPassengers || !returnDate) {
        return <div>Erreur</div>
    }
    if (departureStationID === arrivalStationID) {
        return <MessageComp titre="Une erreur est survenue" message="Il n'est pas possible d'avoir la gare de départ et d'arrivée identiques" type="error" redirectTo="/" redirectText="Retour à l'accueil" />
    }

    const trainsComponent = trainList?.map((train) => {
        return <DisplayTrainInSearch train={train} />
    })


    return (
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

