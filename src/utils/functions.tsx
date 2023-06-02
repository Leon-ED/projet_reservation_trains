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

export const getOptions = async () => {

    const response = await fetch(API_URL + "options.php")
    const options = await response.json()

    return options
}

export const checkClient = async (id_card : String) => {

    const response = await fetch(API_URL + "client.php?action=get&id_card="+id_card)
    const client = await response.json()
    if (client != "{}" && client != null && client.card === id_card){
        return true
    }
    else {
        return false
    }
}

export const storeToCartDB = async (id_card: string, selected_seats: any, selectedOptions: any, passengersInfo: any, price: number, ooid_train: String) => {
    // convert the passengersInfo and selected_seats and selectedOptions object to a string
    passengersInfo = JSON.stringify(passengersInfo)
    selected_seats = JSON.stringify(selected_seats)
    selectedOptions = JSON.stringify(selectedOptions)

    const response = await fetch(API_URL + "cart.php?action=add&id_card=" + id_card + "&selected_seats=" + selected_seats + "&selectedOptions=" + selectedOptions + "&passengersInfo=" + passengersInfo + "&price=" + price + "&ooid_train=" + ooid_train)
    const cart = await response.json()
    if (cart != "{}" && cart != null){
        return true
    }
    return cart
}

export const getCartDB = async (id_card: string) => {
    const response = await fetch(API_URL + "cart.php?action=get&id_card=" + id_card)
    const cart = await response.json()

    if (cart.length != 0) {
        for (let i = 0; i < cart.length; i++) {
            const response2 = await fetch(API_URL + "train.php?id=" + cart[i].ooid_train)
            const train = await response2.json()
            cart[i].train = train
        }
        return cart
    }
}

export const deleteCartDB = async (ooid_cart: string) => {
    const response = await fetch(API_URL + "cart.php?action=delete&ooid_cart=" + ooid_cart)
    const cart = await response.json()

    return cart
}

export const checkCode = async (code: string) => {
    const response = await fetch(API_URL + "promo.php?code=" + code)
    const codeCheck = await response.json()

    return codeCheck
}

export const addReservation = async (cart:any, reduction:number, isPercentage:boolean) => {
    var success: boolean
    for (let i = 0; i < cart.length; i++) {
        // convert the passengersInfo and selected_seats and selectedOptions object to a string
        const id_card = cart[i].id_card
        const ooid_train = cart[i].ooid_train
        const selected_seats = JSON.stringify(cart[i].selected_seats)
        const selectedOptions = JSON.stringify(cart[i].selectedOptions)
        const passengersInfo = JSON.stringify(cart[i].passengersInfo)
        if (isPercentage === true){
            var price = cart[i].price - (cart[i].price * reduction / 100)
        }
        else {
            var price = cart[i].price - reduction
        }
        const response = await fetch(API_URL + "reservation.php?action=add&id_card=" + id_card + "&selected_seats=" + selected_seats + "&selectedOptions=" + selectedOptions + "&passengersInfo=" + passengersInfo + "&price=" + price + "&ooid_train=" + ooid_train)
        const req = await response.json()
        success = req
        if (success === false) {
            return false
        }

    }
    return true

}

export const removeCart = async (carts: any) => {
    for (let i = 0; i < carts.length; i++) {
        deleteCartDB(carts[i]._id.$oid)
    }
}

export const getReservations = async (id_card: string) => {
    const response = await fetch(API_URL + "reservation.php?action=get&id_card=" + id_card)
    const reservations = await response.json()

    if (reservations.length != 0) {
        for (let i = 0; i < reservations.length; i++) {
            const response2 = await fetch(API_URL + "train.php?id=" + reservations[i].ooid_train)
            const train = await response2.json()
            reservations[i].train = train
        }
        return reservations
    }
}

