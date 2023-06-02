/**
 * Projet: @projet_reservation_trains
 * Fichier: src/components/SearchRecap.tsx
 * Auteur(s): Léon EDMEE
 * Date: 01/06/2023
 * Description: Le but de ce composant est d'afficher le récapitulatif de la recherche de l'utilisateur
 * Version : 1.0
 * 
 * License: @license MIT
*/

import { SearchType } from "../utils/types";

// Composant SearchRecap qui affiche le récapitulatif de la recherche de l'utilisateur
export const SearchRecap = (props: SearchType) => {
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
