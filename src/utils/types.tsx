export interface Station{
    id: number;
    name: string;
    city: string;
    region: string;
    type: string;
    
}

export interface Train{
    id:number
    train_number:string

    departure_station:Station
    arrival_station:Station
    stopsList : Station[]

    date_time_departure:string
    date_time_arrival:string

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

