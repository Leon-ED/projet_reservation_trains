import { SearchType } from "../utils/types";

export const SearchRecap = (props: SearchType) => {
    console.warn(props.isRoundTrip)
    return (
        
        <section>
            <h2>Récapitulatif de votre recherche</h2>
            <p>
                Départ : {props.departure_station.name}<br />
                Arrivée : {props.arrival_station.name}<br />
                Date de départ : {props.date_departure}<br />
                Date de retour : {props.date_return}<br />
                Nombre de passagers : {props.number_of_passengers}<br />
                {props.isRoundTrip ? "Aller-retour" : "Aller simple"}
            </p>
        </section>
    )
}
