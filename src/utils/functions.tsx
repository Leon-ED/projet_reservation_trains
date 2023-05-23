import { SearchType, Station, Train, TrainConfig } from "./types"
const API_URL = import.meta.env.VITE_API_URL

const noisyStation: Station = {
    _id: "93160",
    name: "Noisy-le-Grand - Mont d'Est",
    city: "Noisy-le-Grand",
    region: "Ile de France",
    type: "passing"
}


export const getStations = async (): Promise<Station[]> => {



    const response = await fetch(API_URL + "/stations.php")
    const stations = await response.json()

    return stations
}


export const getTrainsFromResult = async (search: SearchType): Promise<Train[]> => {
    const { departure_station, arrival_station, date_departure } = search
    const response = await fetch(API_URL + "/trainsList.php?departure_station=" + departure_station._id + "&arrival_station=" + arrival_station._id + "&date_departure=" + date_departure)
    const trains = await response.json()

    return trains
    // TODO : Appel API
    return [
        {
            "_id": "1",
            "train_number": "1234",
            "departure_station": departure_station,
            "arrival_station": arrival_station,
            "stopsList": [departure_station, arrival_station],
            "date_departure": date_departure,
            "date_arrival": date_departure,
            "time_departure": "12:00",
            "time_arrival": "13:05",
            "operator": "SNCF",
            "price": 10,
            "train_type": "TER"
        },
        {
            "_id": "2",
            "train_number": "1234",
            "departure_station": departure_station,
            "arrival_station": arrival_station,
            "stopsList": [departure_station, arrival_station, noisyStation],
            "date_departure": date_departure,
            "date_arrival": date_departure,
            "time_departure": "12:00",
            "time_arrival": "13:00",
            "operator": "Véolia Transport",
            "price": 10,
            "train_type": "TER"
        },
        {
            "_id": "3",
            "train_number": "1234",
            "departure_station": departure_station,
            "arrival_station": arrival_station,
            "stopsList": [departure_station, arrival_station],
            "date_departure": date_departure,
            "date_arrival": date_departure,
            "time_departure": "12:00",
            "time_arrival": "13:00",
            "operator": "SNCF",
            "price": 10,
            "train_type": "TER"
        }]
}







export const buildSearchURL = (search: SearchType) => {
    //   /search/:dateFrom/:dateTo/:departureStation/:arrivalStation/:numberOfPassengers/:isRoundTrip/:returnDate
    return "/search/" + search.date_departure + "/" + search.departure_station._id + "/" + search.arrival_station._id + "/" + search.number_of_passengers + "/" + search.isRoundTrip + "/" + search.date_return

}


export const stationFullName = (station: Station) => {
    return station.name + " (" + station.city + ", " + station.region + ")"
}


export const getStationFromId = async (id: string): Promise<Station> => {
    const stations = await getStations()
    return stations.find((station) => station._id === id)!

}

export const getStationsFromList = async (idList: string[]): Promise<Station[]> => {
    const stations = await getStations()
    // create list of same size with null values
    const stationList = new Array<Station>(idList.length).fill({} as Station)
    // for each id in idList, find the corresponding station and add it to the list
    idList.forEach((id, index) => {
        stationList[index] = stations.find((station) => station._id === id)!
    }
    )
    console.log(stationList)

    return stationList


}

export const getTrainFromId = async (id: string): Promise<Train> => {
    const response = await fetch(API_URL + "train.php?id=" + id)
    const train = await response.json()
    return train

    return {
        "_id": "3",
        "train_number": "1234",
        "departure_station": noisyStation,
        "arrival_station": noisyStation,
        "stopsList": [noisyStation, noisyStation, noisyStation, noisyStation],
        "date_departure": "2021-05-01",
        "date_arrival": "2021-05-01",
        "time_departure": "12:00",
        "time_arrival": "13:00",
        "operator": "SNCF",
        "price": 10,
        "train_type": "TER"
    }


    // return train
}

export const getTrainConfigFromId = async (id: string): Promise<TrainConfig> => {
    // const response = await fetch(API_URL + "/trains.php?type=config&id=" + id)
    // const train = await response.json()
    return {
        _id: "3",
        train_number: "1234",

        number_of_cars: 3,
        seats_per_car: 48,


        total_seats: 330,
        taken_seats: [1, 13, 40, 44, 32, 36, 48, 5, 21, 12]

    }
  

    // return train;
}