import { useState } from "react"
import { ClientInfoForm } from "./ClientInfoForm"
import { checkClient } from "../utils/functions"

export const PeopleChooser = ({ numberOfPassengers, reservedSeats }: { numberOfPassengers: number, reservedSeats: number[] }) => {
    const [isClient, setIsClient] = useState<boolean | undefined>(undefined)
    
    // check if there is a client card in the local storage
    const client: any = JSON.parse(localStorage.getItem("client") || "{}")
    if (client.card) {
        var clientCard = client.card

    }

    const dummy = numberOfPassengers
    const dummy2 = reservedSeats


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

async function checkClientCard() {
    const cardNumber = (document.getElementById("card") as HTMLInputElement).value;
    const isClient = await checkClient(cardNumber)
    if (isClient) {
        // add the card number to the client object in local storage
        const client: any = JSON.parse(localStorage.getItem("client") || "{}")
        client.card = cardNumber
        localStorage.setItem("client", JSON.stringify(client))

        // redirect to the recap page
        window.location.href = "/reservation/recap"
    } else {
        alert("Le numéro d'abonné n'est pas valide")
    }
    
}