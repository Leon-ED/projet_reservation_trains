import { SearchType, Station, Train } from "./types"

export const HOST = "http://localhost:5173"



export const getStations = async () : Promise<Station[]> => {
    // TODO : Appel API
    return [
        {
            "id": 1,
            "name": "Paris-Est",
            "city": "Paris",
            "region": "Ile de France",
            "type": "terminus"
        },
        {
            "id": 2,
            "name": "Paris Gare du Nord",
            "city": "Paris",
            "region": "Ile de France",
            "type": "terminus"
        },
        {
            "id": 3,
            "name": "Versailles-Chantiers",
            "city": "Versailles",
            "region": "Ile de France",
            "type": "passing",

        }]}


export const getTrainFromResult = async (search: SearchType) : Promise<Train[]> => {
    const { departure_station, arrival_station, date_departure, date_return, isRoundTrip, number_of_passengers } = search

    // TODO : Appel API
    return [
        {
            "id": 1,
            "train_number": "1234",
            "departure_station": departure_station,
            "arrival_station": arrival_station,
            "stopsList": [departure_station, arrival_station],
            "date_time_departure": date_departure,
            "date_time_arrival": date_departure,
            "operator": "SNCF",
            "price": 10
        },
        {
            "id": 2,
            "train_number": "1234",
            "departure_station": departure_station,
            "arrival_station": arrival_station,
            "stopsList": [departure_station, arrival_station],
            "date_time_departure": date_departure,
            "date_time_arrival": date_departure,
            "operator": "RATP",
            "price": 10
        },
        {
            "id": 3,
            "train_number": "1234",
            "departure_station": departure_station,
            "arrival_station": arrival_station,
            "stopsList": [departure_station, arrival_station],
            "date_time_departure": date_departure,
            "date_time_arrival": date_departure,
            "operator": "Véolia Transport",
            "price": 10
        }]



    
}


export const  buildSearchURL = (search: SearchType) => {
    //   /search/:dateFrom/:dateTo/:departureStation/:arrivalStation/:numberOfPassengers/:isRoundTrip/:returnDate
    return "/search/" + search.date_departure + "/" + search.departure_station.id + "/" + search.arrival_station.id + "/" + search.number_of_passengers + "/" + search.isRoundTrip + "/" + search.date_return

}


export const getStationFromId = async (id: string) : Promise<Station> => {
    const idStation = parseInt(id)

    const stations = await getStations()
    return stations.find((station) => station.id === idStation)!
    
}
