/**
 * Projet: @projet_reservation_trains
 * Fichier: src/pages/Cart.tsx
 * Auteur(s): Denis DELMAS
 * Date: 01/06/2023
 * Description: Page du panier
 * Version : 1.0
 * 
 * License: @license MIT
*/

import { useEffect, useState } from "react";
import { getCartDB, deleteCartDB } from "../utils/functions";

// Page du panier
export const CartPage = () => {
  const [carts, setCart] = useState<any | null>(null); // Liste des billets du panier
  const totalPrice: number = carts?.reduce((total: number, cart: any) => total + parseInt(cart.price, 10), 0); // Prix total du panier

  // On récupère les informations du client dans le local storage
  useEffect(() => {
    // On récupère le numéro de carte du client dans le local storage
    const client = JSON.parse(localStorage.getItem("client") || "{}");
    const id_card = client.card;

    if (id_card === undefined) { // Vérifier si le client est connecté
      alert("Veuillez vous connecter pour accéder au panier"); // Afficher un message d'erreur
      // Rediriger vers la page de connexion
      window.location.href = "/login";
    } else { // Le client est connecté
      // On récupère les billets du panier
      getCartDB(id_card)
        .then((cartData) => { // On met à jour la liste des billets du panier
          setCart(cartData);
        })
        .catch((error) => {
          console.error("Error fetching cart data:", error); // Afficher un message d'erreur
        });
    }
  }, []);

  if (carts === null) {
    // Si le panier n'est pas chargé on affiche un message de chargement
    return <p>Chargement du panier...</p>;
  }

  if (carts === "[]" || carts === undefined) {
    // Si le panier est vide on affiche un message
    return <section><h2>Votre panier est vide</h2></section>;
  }

  return (
    // Afficher le panier
    <section>
      <h2>Mon panier</h2>
      <table>
        <thead>
          <tr>
            <th>Train</th>
            <th>Provenance</th>
            <th>Destination</th>
            <th>Arrêts</th>
            <th>Prix</th>
            <th>Nombre de passagers</th>
            <th>Options</th>
            <th>Total</th>
            <th>Supprimer</th> {/* Nouvelle colonne */}
          </tr>
        </thead>
        <tbody>
          {carts.map((cart: any) => (
            totalPrice + cart.price,
            //  convert cart.selected_seats to an array

            <tr>
              <td>{cart.train.train_type + " n°" + cart.train.train_number}</td>
              <td>{cart.train.departure_station.name}</td>
              <td>{cart.train.arrival_station.name}</td>
              <td>
                <ul>
                  {/* @ts-ignore */}
                  {cart.train.stopsList.map((stop) => (
                    <li key={stop._id}>{stop.name}</li>
                  ))}
                </ul>
              </td>
              <td>{cart.train.price} €</td>
              <td>{JSON.parse(cart.selected_seats.toString()).length}</td>
              <td>{JSON.parse(cart.selectedOptions.toString()).map((option: any) => (
                <li key={option}>{option}</li>
              ))}</td>
              <td>{cart.price} €</td>
              <td>
                <button onClick={() => handleDeleteCart(cart)}>Supprimer</button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
      {/* pour calculer le prix total, il faut faire la somme de tous les prix de tous les carts */}
      <h3>Prix total : {totalPrice}€</h3>
      {/* boutton pour payer */}
      <button onClick={() => { redirectPay(carts) }}>Payer</button>

    </section>
  );
};
// Fonction qui permet de supprimer un billet du panier
async function handleDeleteCart(cart: any) {
  // Supprimer le billet du panier
  var success = await deleteCartDB(cart._id.$oid);
  // Vérifier si la suppression a réussi
  if (success === false) {
    alert("Une erreur est survenue lors de la suppression du billet du panier");
    return;
  }
  // Actualiser la page
  window.location.reload();
}

// Fonction qui permet de rediriger vers la page de paiement
function redirectPay(carts: any) {
  // Mettre à jour les billets du panier dans le local storage
  localStorage.setItem("carts", JSON.stringify(carts));
  window.location.href = "/cart/pay";
}

