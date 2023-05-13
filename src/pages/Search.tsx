import { useParams } from "react-router-dom"
import { getStationFromId, getTrainFromResult } from "../utils/functions"
import { useEffect, useState } from "react"
import { SearchType, Station, Train } from "../utils/types"
import { SearchRecap } from "../components/SearchRecap"
import { SearchComponent } from "../components/Search"
import { DisplayTrainInSearch } from "../components/Train"

export const SearchPage = () => {

    const { dateFrom, departureStationID, arrivalStationID, numberOfPassengers, isRoundTrip, returnDate } = useParams()
    const isRoundTripBool = isRoundTrip == "true" ? true : false


    useEffect(() => {

        if (!departureStationID || !arrivalStationID)
            return
        const getStations = async () => {
            const departureStation = await getStationFromId(departureStationID)
            const arrivalStation = await getStationFromId(arrivalStationID)
            setDepartureStation(departureStation)
            setArrivalStation(arrivalStation)
        }
        getStations()
    }, [])

    useEffect(() => {

        const getTrains = async () => {
            if (!numberOfPassengers || !dateFrom || !departureStation || !arrivalStation || !returnDate)
                return
            const search: SearchType = { date_departure: dateFrom, departure_station: departureStation, arrival_station: arrivalStation, number_of_passengers: parseInt(numberOfPassengers), isRoundTrip: isRoundTripBool, date_return: returnDate }
            setTrainList(await getTrainFromResult(search))
        }
        getTrains()
    
    }, [])

    const [trainList, setTrainList] = useState<Train[]>();


    const [departureStation, setDepartureStation] = useState<Station>()
    const [arrivalStation, setArrivalStation] = useState<Station>()
    if (!departureStation || !arrivalStation || !dateFrom || !numberOfPassengers || !returnDate) {
        return <div>Erreur</div>
    }

    const trainsComponent = trainList?.map((train) => {
        return <DisplayTrainInSearch train={train} />
    })


        







    return (
        <>
            <SearchComponent />
            <SearchRecap departure_station={departureStation} arrival_station={arrivalStation} date_departure={dateFrom} date_return={returnDate} number_of_passengers={parseInt(numberOfPassengers)} isRoundTrip={isRoundTripBool} />
            <div>
                {trainsComponent}
            </div>

        </>


    )

}
