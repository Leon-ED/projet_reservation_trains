import { useState } from "react"
const API_URL = import.meta.env.VITE_API_URL

export const ClientInfoForm = () => {
    // Generate a random card number (composed by 6 characters letter and digits)
    const cardNumber = Math.random().toString(36).substr(2, 6).toUpperCase()
    const [allFieldsFilled, setAllFieldsFilled] = useState<boolean | undefined>(undefined)
    const [incorrectEmail, setIncorrectEmail] = useState<boolean | undefined>(undefined)
    const [incorrectPhone, setIncorrectPhone] = useState<boolean | undefined>(undefined)
    const [incorrectBirthDate, setIncorrectBirthDate] = useState<boolean | undefined>(undefined)
    const [errorAddingClient, setErrorAddingClient] = useState<boolean | undefined>(undefined)
    
    async function HandleClick(): Promise<import("react").MouseEventHandler<HTMLButtonElement> | undefined> {
        // retrieve all infos from the form
        const name = document.getElementById("name") as HTMLInputElement
        const surname = document.getElementById("surname") as HTMLInputElement
        const birthDate = document.getElementById("birthDate") as HTMLInputElement
        const email = document.getElementById("email") as HTMLInputElement
        const phone = document.getElementById("phone") as HTMLInputElement
        const address = document.getElementById("address") as HTMLInputElement
        const card = cardNumber

        // check if all fields are filled
        if (name.value == "" || surname.value == "" || birthDate.value == "" || email.value == "" || phone.value == "" || address.value == "") {
            setAllFieldsFilled(false)
            return
        }
        else {
            setAllFieldsFilled(true)
        }

        // check if the email is valid
        if (!email.value.includes("@")) {
            setIncorrectEmail(true)
            return
        }
        else {
            setIncorrectEmail(false)
        }

        // check if the phone number is valid
        if (phone.value.length != 10) {
            setIncorrectPhone(true)
            return
        }
        else {
            setIncorrectPhone(false)
        }

        // check if the birth date is valid
        const today = new Date()
        const birth = new Date(birthDate.value)
        if (birth > today) {
            setIncorrectBirthDate(true)
            return
        }
        else {
            setIncorrectBirthDate(false)

        }

        // if all fields are filled, we can store the client infos in the mongoDB database client collection
        var success = await storeToDB(name.value, surname.value, birthDate.value, email.value, phone.value, address.value, card)
        console.log(success)
        if (success == false) {
            setErrorAddingClient(true)
            return
        }
        else {
            setErrorAddingClient(false)
        }
        
        // store the client infos in the local storage
        localStorage.setItem("client", JSON.stringify({card: card}))

        // redirect to the recap page
        window.location.href = "/reservation/recap"

    }

    return (
        
        <section>
            {allFieldsFilled == false && <p>Veuillez remplir tous les champs</p>}
            {incorrectEmail && <p>Veuillez entrer une adresse email valide</p>}
            {incorrectPhone && <p>Veuillez entrer un numéro de téléphone valide</p>}
            {incorrectBirthDate && <p>Veuillez entrer une date de naissance valide</p>}
            {errorAddingClient && <p>Une erreur est survenue lors de l'ajout du client</p>}
            <div>
                <label htmlFor="name">Nom</label>
                <input type="text" name="name" id="name" required/>
            </div>
            <div>
                <label htmlFor="surname">Prénom</label>
                <input type="text" name="surname" id="surname" required/>
            </div>
            <div>
                <label htmlFor="birthDate">Date de naissance</label>
                <input type="date" name="birthDate" id="birthDate" required/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required/>
            </div>
            <div>
                <label htmlFor="phone">Téléphone</label>
                <input type="tel" name="phone" id="phone" required/>
            </div>
            <div>
                <label htmlFor="address">Adresse</label>
                <input type="text" name="address" id="address" required/>
            </div>
            <div>
                <label htmlFor="card">Numéro de carte</label>
                <input type="text" name="card" id="card" value={cardNumber} disabled/>
            </div>    

            <div>
                <button id="submit" type="submit" onClick={HandleClick}>Valider</button>
            </div>
        </section>


    )

}

async function storeToDB(name: string, surname: string, birthDate: string, email: string, phone: string, address: string, card: string) {
    const url = `${API_URL}/client.php?add=insert&name=${name}&surname=${surname}&birthDate=${birthDate}&email=${email}&phone=${phone}&address=${address}&card=${card}`;
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data === "{}") {
                return true;
            }
        })
        .catch(error => {
            console.error(error);
            return false;
        });
}

