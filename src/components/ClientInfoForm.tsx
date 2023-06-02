/**
 * Projet: @projet_reservation_trains
 * Fichier: src/components/ClientInfoForm.tsx
 * Auteur(s): Denis DELMAS
 * Date: 01/06/2023
 * Description: Affichage du formulaire de saisie des informations client
 * Version : 1.0
 * 
 * License: @license MIT
*/


import { useState } from "react"
const API_URL = import.meta.env.VITE_API_URL

// Composant ClientInfoForm qui affiche le formulaire de saisie des informations client
export const ClientInfoForm = () => {
    // Générer un numéro de carte aléatoire
    const cardNumber = Math.random().toString(36).substr(2, 6).toUpperCase()
    const [allFieldsFilled, setAllFieldsFilled] = useState<boolean | undefined>(undefined)
    const [incorrectEmail, setIncorrectEmail] = useState<boolean | undefined>(undefined)
    const [incorrectPhone, setIncorrectPhone] = useState<boolean | undefined>(undefined)
    const [incorrectBirthDate, setIncorrectBirthDate] = useState<boolean | undefined>(undefined)
    const [errorAddingClient, setErrorAddingClient] = useState<boolean | undefined>(undefined)

    // Gérer le clic sur le bouton de validation du formulaire
    async function HandleClick(): Promise<import("react").MouseEventHandler<HTMLButtonElement> | undefined> {
        // Récupérer les valeurs des champs du formulaire
        const name = document.getElementById("name") as HTMLInputElement
        const surname = document.getElementById("surname") as HTMLInputElement
        const birthDate = document.getElementById("birthDate") as HTMLInputElement
        const email = document.getElementById("email") as HTMLInputElement
        const phone = document.getElementById("phone") as HTMLInputElement
        const address = document.getElementById("address") as HTMLInputElement
        const card = cardNumber

        // Vérifier que tous les champs sont remplis
        if (name.value == "" || surname.value == "" || birthDate.value == "" || email.value == "" || phone.value == "" || address.value == "") {
            setAllFieldsFilled(false)
            return
        }
        else {
            setAllFieldsFilled(true)
        }

        // Vérifier que l'adresse email est valide sinon afficher un message d'erreur
        if (!email.value.includes("@")) {
            setIncorrectEmail(true)
            return
        }
        else {
            setIncorrectEmail(false)
        }

        // Vérifier que le numéro de téléphone est valide sinon afficher un message d'erreur
        if (phone.value.length != 10) {
            setIncorrectPhone(true)
            return
        }
        else {
            setIncorrectPhone(false)
        }

        // Vérifier que la date de naissance est valide sinon afficher un message d'erreur
        const today = new Date()
        const birth = new Date(birthDate.value)
        // Vériier que la date de naissance est antérieure à la date du jour
        if (birth > today) {
            setIncorrectBirthDate(true)
            return
        }
        else {
            setIncorrectBirthDate(false)

        }

        // Si tous les champs sont remplis, ajouter le client à la base de données
        var success = await storeToDB(name.value, surname.value, birthDate.value, email.value, phone.value, address.value, card)
        if (success == false) {
            setErrorAddingClient(true)
            return
        }
        else {
            setErrorAddingClient(false)
        }

        // Si le client a été ajouté à la base de données, enregistrer le numéro de carte dans le local storage
        localStorage.setItem("client", JSON.stringify({ card: card }))

        // Rediriger vers la page de récapitulatif de la réservation
        window.location.href = "/reservation/recap"

    }

    return (
        // Afficher le formulaire de saisie des informations client
        <section>
            {allFieldsFilled == false && <p>Veuillez remplir tous les champs</p>}
            {incorrectEmail && <p>Veuillez entrer une adresse email valide</p>}
            {incorrectPhone && <p>Veuillez entrer un numéro de téléphone valide</p>}
            {incorrectBirthDate && <p>Veuillez entrer une date de naissance valide</p>}
            {errorAddingClient && <p>Une erreur est survenue lors de l'ajout du client</p>}
            <div>
                <label htmlFor="name">Nom</label>
                <input type="text" name="name" id="name" required />
            </div>
            <div>
                <label htmlFor="surname">Prénom</label>
                <input type="text" name="surname" id="surname" required />
            </div>
            <div>
                <label htmlFor="birthDate">Date de naissance</label>
                <input type="date" name="birthDate" id="birthDate" required />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required />
            </div>
            <div>
                <label htmlFor="phone">Téléphone</label>
                <input type="tel" name="phone" id="phone" required />
            </div>
            <div>
                <label htmlFor="address">Adresse</label>
                <input type="text" name="address" id="address" required />
            </div>
            <div>
                <label htmlFor="card">Numéro de carte</label>
                <input type="text" name="card" id="card" value={cardNumber} disabled />
            </div>

            <div>
                <button id="submit" type="submit" onClick={HandleClick}>Valider</button>
            </div>
        </section>


    )

}

// Fonction qui ajoute le client à la base de données en méthode GET
async function storeToDB(name: string, surname: string, birthDate: string, email: string, phone: string, address: string, card: string) {
    const url = `${API_URL}/client.php?action=add&name=${name}&surname=${surname}&birthDate=${birthDate}&email=${email}&phone=${phone}&address=${address}&card=${card}`;
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

