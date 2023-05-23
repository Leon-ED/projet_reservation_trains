import { useState } from "react"
import { ClientInfoForm } from "./ClientInfoForm"

export const PeopleChooser = ({ numberOfPassengers, reservedSeats }: { numberOfPassengers: number, reservedSeats: Function }) => {
    const [isClient, setIsClient] = useState<boolean | undefined>(undefined)


    const dummy = numberOfPassengers
    const dummy2 = reservedSeats


    return (
        <section className="peopleChooser">
            {isClient === undefined && (<><h2>Êtes-vous déjà client ?</h2>
                <button onClick={() => {setIsClient(true)}}>Oui</button>
                <button onClick={() => {setIsClient(false)}}>Non</button></>)
            }
            {isClient && <input type="text" placeholder="Entrez votre numéro d'abonné"/>}
            



        </section>
    )


}