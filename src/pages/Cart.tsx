import { useEffect, useState } from "react";
import { getCartDB, deleteCartDB } from "../utils/functions";

export const CartPage = () => {
    const [carts, setCart] = useState<any | null>(null);
    const totalPrice:number = carts?.reduce((total: number, cart: any) => total + parseInt(cart.price, 10), 0);

  useEffect(() => {
    // get the client informations from the local storage
    const client = JSON.parse(localStorage.getItem("client") || "{}");
    const id_card = client.card;

    if (id_card === undefined) {
      alert("Veuillez vous connecter pour accéder au panier");
      // redirect to the login page
      window.location.href = "/login";
    } else {
      // fetch the cart information from the database
      getCartDB(id_card)
        .then((cartData) => {
          setCart(cartData);
        })
        .catch((error) => {
          console.error("Error fetching cart data:", error);
        });
    }
  }, []);

  if (carts === null) {
    // L'affichage peut être personnalisé selon vos besoins
    return <p>Chargement du panier...</p>;
  }

  if (carts === "[]" || carts === undefined) {
    // L'affichage peut être personnalisé selon vos besoins
    return <section><h2>Votre panier est vide</h2></section>;
  }

  return (
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
                <td>{cart.train.train_type +" n°" + cart.train.train_number}</td>
                <td>{cart.train.departure_station.name}</td>
                <td>{cart.train.arrival_station.name}</td>
                <td>
                  <ul>
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
        <button onClick={() =>{redirectPay(carts)}}>Payer</button>
        
    </section>
  );
};

async function handleDeleteCart(cart: any) {
    // delete the cart from the database
    var success = await deleteCartDB(cart._id.$oid);
    console.log(success);
    if (success === false) {
        alert("Une erreur est survenue lors de la suppression du billet du panier");
        return;
    }
    // refresh the page
    window.location.reload();
}

function redirectPay(carts: any) {
    // redirect to the payment page
    localStorage.setItem("carts", JSON.stringify(carts));
    window.location.href = "/cart/pay";
}

