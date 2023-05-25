//  ask the login page to redirect to the cart page after a successful login

import { checkClient } from "../utils/functions";

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

