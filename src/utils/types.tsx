export interface Station{
    _id: number;
    name: string;
    city: string;
    region: string;
    type: string;
    
}

export interface Train{
    id:number
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

export interface SearchType{
    departure_station:Station
    arrival_station:Station

    date_departure:string

    isRoundTrip:boolean
    number_of_passengers:number

    date_return:string

}

