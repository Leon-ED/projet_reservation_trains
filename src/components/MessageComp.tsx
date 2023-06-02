/**
 * Projet: @projet_reservation_trains
 * Fichier: src/components/MessageComp.tsx
 * Auteur(s): Léon EDMEE
 * Date: 01/06/2023
 * Description: Affichage d'un message, par exemple pour indiquer que la commande a été validée avec une potentielle redirection vers un lien donné
 * Version : 1.0
 * 
 * License: @license MIT
*/
import { Link } from "react-router-dom"
import { MessageProps } from "../utils/types"

// Composant MessageComp qui affiche un message, par exemple pour indiquer que la commande a été validée avec une potentielle redirection vers un lien donné
export const MessageComp = (props: MessageProps) => {
    const { titre, message, type, redirectTo, redirectText } = props // Titre du message, message, type de message, redirection vers un lien donné, texte du lien
    const cssClass = "msg_component " + "msg_" + type //Type de messages: msg_success, msg_error, msg_info, msg_warning
    return (
        <article className={cssClass}>
            <h2>{titre}</h2>
            <p>{message}</p>
            <Link to={redirectTo}>{redirectText}</Link>
        </article>
    )


}