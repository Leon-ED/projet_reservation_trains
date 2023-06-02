/**
 * Projet: @projet_reservation_trains
 * Fichier: src/components/PepoleChooser.tsx
 * Auteur(s): Denis DELMAS
 * Date: 01/06/2023
 * Description: Composant qui permet au client de choisir s'il est déjà client ou non
 * Version : 1.0
 * 
 * License: @license MIT
*/

import { useState } from "react"
import { ClientInfoForm } from "./ClientInfoForm"
import { checkClient } from "../utils/functions"

// Composant PeopleChooser qui permet au client de choisir s'il est déjà client ou non
export const PeopleChooser = ({ numberOfPassengers, reservedSeats }: { numberOfPassengers: number, reservedSeats: number[] }) => {
    const [isClient, setIsClient] = useState<boolean | undefined>(undefined) //  Si le client est déjà client ou non
    
    // On récupère le numéro de carte du client dans le local storage
    const client: any = JSON.parse(localStorage.getItem("client") || "{}")
    if (client.card) {
        var clientCard = client.card

    }

// ----- Variables pour éviter les erreurs de compilation -----
    // @ts-ignore
    const dummy = numberOfPassengers
    // @ts-ignore
    const dummy2 = reservedSeats


    // On affiche le formulaire de saisie des informations client si le client n'est pas déjà client sinon on affiche le formulaire de saisie du numéro de carte
    return (
        <section className="peopleChooser">
            {isClient === undefined && (<><h2>Êtes-vous déjà client ?</h2>
                <button onClick={() => {setIsClient(true)}}>Oui</button>
                <button onClick={() => {setIsClient(false)}}>Non</button></>)
            }
            {isClient && (<><input id="card" type="text" placeholder="Entrez votre numéro d'abonné" value={clientCard !== "" ? clientCard : ""}/> <button onClick={checkClientCard}>Valider</button></>)}
            {isClient == false && <ClientInfoForm />}
            
        </section>
    )
}

// Vérifier si le numéro de carte est valide
async function checkClientCard() {
    const cardNumber = (document.getElementById("card") as HTMLInputElement).value; // Récupérer le numéro de carte
    const isClient = await checkClient(cardNumber) // Vérifier si le numéro de carte est valide
    if (isClient) {
        // Ajouter le numéro de carte dans le local storage
        const client: any = JSON.parse(localStorage.getItem("client") || "{}")
        client.card = cardNumber
        localStorage.setItem("client", JSON.stringify(client))

        // Rediriger vers la page de récapitulatif de la réservation
        window.location.href = "/reservation/recap"
    } else {
        // Afficher un message d'erreur si le numéro de carte n'est pas valide
        alert("Le numéro d'abonné n'est pas valide")
    }
    
}