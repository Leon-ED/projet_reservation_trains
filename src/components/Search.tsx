import { useEffect, useState } from "react";
import { SearchType, Station } from "../utils/types";
import { getStations, buildSearchURL } from "../utils/functions";
import { AutoCompleteStation } from "./Station";

export const SearchComponent = () => {
    const [stations, setStations] = useState<Station[]>([]);
    const todaysDate = new Date().toISOString().slice(0, 10);
    const sevenDaysLater = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);

    const [numberOfPassengers, setNumberOfPassengers] = useState<number>(1);
    const [departureStation, setDepartureStation] = useState<Station>();
    const [arrivalStation, setArrivalStation] = useState<Station>();
    const [dateDeparture, setDateDeparture] = useState<string>(todaysDate);
    const [dateReturn, setDateReturn] = useState<string>(sevenDaysLater);


    function searchAction(){
        const search : SearchType = {
            departure_station : departureStation!,
            arrival_station : arrivalStation!,
            date_departure : dateDeparture,
            date_arrival : dateReturn,
            isRoundTrip : isRoundTrip,
            number_of_passengers : numberOfPassengers,
            date_return : dateReturn
        }
        console.log(search)
        console.log(buildSearchURL(search))
    }


    useEffect(() => {
        getStations().then((data) => {
            console.log(data)
            return setStations(data)
        })

    }, [])

    const stationsList = stations.map((station) => {
        return <AutoCompleteStation  key={station.id} {...station} />
    })



    return (
        <div className="search-form">
            <div className="search-options flex-row">
                <h4>Options : </h4>
                <div className="flex-row">
                    <div className="label_input">
                        <label htmlFor="aller_retour">Aller-retour</label>
                        <input type="checkbox" name="aller_retour" id="aller_retour" onChange={(e) => setIsRoundTrip(e.target.checked)} />
                    </div>
                    <div className="label_input">
                        <label htmlFor="aller_retour">Nombre de personnes</label>
                        <input type="number" name="nombre_personnes" id="nombre_personnes" defaultValue="1" max="10" min="1" onChange={(e) => 
                            isNaN(parseInt(e.target.value)) ? setNumberOfPassengers(1) : setNumberOfPassengers(parseInt(e.target.value))} />
                    </div>
                </div>
            </div>
            <div className="search-field-container flex-row">

                <h3>Je pars</h3>

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
                    <input type="text" list="stationsList" name="gare" placeholder="Gare de départ" onChange={
                        (e) => {
                            const element = e.target as HTMLInputElement
                            setDepartureStation(findStation(element.value, stations))
                            console.log(departureStation)
                        }

                    } />

                </div>
                <div className="flex-row">
                    <label htmlFor="time"> <h3>vers </h3> </label>
                    <input type="text" list="stationsList" name="gare" placeholder="Gare d'arrivée" onChange={
                        (e) => {
                            const element = e.target as HTMLInputElement

                            setArrivalStation(findStation(element.value, stations))
                        }

                    } />
                </div>
                <div className="search-field-container flex-row" style={{visibility:isRoundTrip ? "visible" : "hidden"}}>
                    <h3>Je reviens</h3>
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
        </div>
    )


}




const findStation = (stationName: string, list: Station[]) => 
{
    list.forEach((station) => {
        const fullName = station.name + " (" + station.city + ", " + station.region + ")".toLowerCase().trim()

        if (fullName === stationName.toLowerCase().trim()) {
            return station
        }


    });
    return undefined
}
