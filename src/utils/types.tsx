export interface Station{
    _id: string;
    name: string;
    city: string;
    region: string;
    type: string;
    
}

export interface Train{
    _id:string
    train_number:string
    train_type:string

    departure_station:Station
    arrival_station:Station
    stopsList : Station[]

    date_departure:string
    date_arrival:string

    time_departure:string
    time_arrival:string

    operator:string
    price:number
}

export interface TrainConfig{
    _id:string
    train_number:string
    seats_per_car:number
    number_of_cars:number
    seats_configuration:string

    total_seats:number
    taken_seats:number[]

}



export interface SearchType{
    departure_station:Station
    arrival_station:Station

    date_departure:string

    isRoundTrip:boolean
    number_of_passengers:number

    date_return:string

}

export interface MessageProps{
    titre:string
    message:string
    type:string
    redirectTo:string
    redirectText:string

}