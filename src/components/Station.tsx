/**
 * Projet: @projet_reservation_trains
 * Fichier: src/components/Stations.tsx
 * Auteur(s): Léon EDMEE
 * Date: 01/06/2023
 * Description: Affichage des stations
 * Version : 1.0
 * 
 * License: @license MIT
*/
import { Station } from "../utils/types";

// Composant Stations qui affiche les stations
export const AutoCompleteStation = (props: Station) => {
    const value: string = props.name + " (" + props.city + ", " + props.region + ")";
    return (
        <option value={value} />
    )



}
