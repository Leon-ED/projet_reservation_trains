/**
 * Projet: @projet_reservation_trains
 * Fichier: src/components/login.tsx
 * Auteur(s): Denis DELMAS
 * Date: 01/06/2023
 * Description: Affichage du formulaire de connexion avec le numéro de carte
 * Version : 1.0
 * 
 * License: @license MIT
*/


import { checkClient } from "../utils/functions";

// Composant Login qui affiche le formulaire de connexion avec le numéro de carte
export const Login = () => {
    return (
        <section>
            <h2>Connexion</h2>
            <form action="/login" onSubmit={login}>
                <label htmlFor="card">Numéro de carte : </label>
                <input type="text" name="card" id="card" />
                <button type="submit">Connexion</button>
            </form>
        </section>
    );
};

// Gérer la connexion, vérifier si le numéro de carte est valide, puis rediriger vers la page du panier
const login = async (e: any) => {
    e.preventDefault();
    const card = e.target.card.value;
    const client = await checkClient(card);
    if (client) {
        localStorage.setItem("client", JSON.stringify({ card: card }));
        window.location.href = "/cart";
    } else {
        alert("Le numéro de carte n'est pas valide");
    }
}

