import { useEffect, useState } from "react";
import { SearchType, Station } from "../utils/types";
import { getStations, buildSearchURL } from "../utils/functions";
import { AutoCompleteStation } from "./Station";
import { useNavigate } from "react-router-dom";

export const SearchComponent = () => {
    const [stations, setStations] = useState<Station[]>([]);
    const todaysDate = new Date().toISOString().slice(0, 10);
    const sevenDaysLater = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);

    const [numberOfPassengers, setNumberOfPassengers] = useState<number>(1);
    const [dateDeparture, setDateDeparture] = useState<string>(todaysDate);
    const [dateReturn, setDateReturn] = useState<string>(sevenDaysLater);
    const navigate = useNavigate()

    function searchAction() {
        let departureStationElem = document.getElementById("gareDepart") as HTMLInputElement
        let arrivalStationElem = document.getElementById("gareArrivee") as HTMLInputElement

        const departureStationValue = departureStationElem.value
        const arrivalStationValue = arrivalStationElem.value

        const departureStation = findStation(departureStationValue, stations)
        const arrivalStation = findStation(arrivalStationValue, stations)

        if (!departureStation || !arrivalStation) {
            return
        }



        const search: SearchType = {
            departure_station: departureStation!,
            arrival_station: arrivalStation!,
            date_departure: dateDeparture,
            isRoundTrip: isRoundTrip,
            number_of_passengers: numberOfPassengers,
            date_return: dateReturn
        }
        const url = buildSearchURL(search)
   
        navigate(url)
    }
    useEffect(() => {
        getStations().then((data) => {
            console.log(data)
            return setStations(data)
        })

    }, [])

    const stationsList = stations.map((station) => {
        return <AutoCompleteStation key={station.id} {...station} />
    })




    return (
        <section>
            <div className="search-options flex-row">
                <h4>Options : </h4>
                <div className="flex-row">
                    <div className="label_input">
                        <label htmlFor="aller_retour">Aller-retour</label>
                        <input type="checkbox" name="aller_retour" id="aller_retour" onChange={(e) => setIsRoundTrip(e.target.checked)} />
                    </div>
                    <div className="label_input">
                        <label htmlFor="nombre_personnes" >Nombre de personnes</label>
                        <input type="number" name="nombre_personnes" id="nombre_personnes" defaultValue="1" max="10" min="1" onChange={(e) =>
                            isNaN(parseInt(e.target.value)) ? setNumberOfPassengers(1) : setNumberOfPassengers(parseInt(e.target.value))} />
                    </div>
                </div>
            </div>
            <div className="search-field-container flex-row">

                <h3>Départ</h3>

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
                    <input type="text" list="stationsList" id="gareDepart" name="gare" placeholder="Gare de départ" />

                </div>
                <div className="flex-row">
                    <label htmlFor="time"> <h3>vers </h3> </label>
                    <input type="text" list="stationsList" name="gare" id="gareArrivee" placeholder="Gare d'arrivée" />
                </div>
                <div className="search-field-container flex-row" style={{ visibility: isRoundTrip ? "visible" : "hidden" }}>
                    <h3>Retour</h3>
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
        </section>
    )


}




const findStation = (stationName: string, list: Station[]) => {
    const stationNameCleaned = stationName.toLowerCase().trim().replaceAll(" ", "")
    let foundStation: Station | undefined = undefined
    list.forEach((station) => {
        const fullName = station.name + " (" + station.city + ", " + station.region + ")"
        const fullNameCleaned = fullName.toLowerCase().trim().replaceAll(" ", "")

        if (fullNameCleaned === stationNameCleaned) {
            foundStation = station
            return station
        }


    });
    return foundStation
}
