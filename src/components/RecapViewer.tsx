/**
 * Projet: @projet_reservation_trains
 * Fichier: src/components/RecapViewer.tsx
 * Auteur(s): Denis DELMAS
 * Date: 01/06/2023
 * Description: Affichage du récapitulatif de la réservation
 * Version : 1.0
 * 
 * License: @license MIT
*/

import { useEffect, useState } from "react";
import { getOptions, checkClient, storeToCartDB } from "../utils/functions";

export const RecapViewer = () => {
  // On récupère les informations du train et de la recherche dans le local storage
  const train: any = JSON.parse(localStorage.getItem("train") || "{}");
  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];  // Liste des mois

  // On définit les variables d'état
  const [options, setOptions] = useState([]); // Liste des options
  const [selectedOptions, setSelectedOptions] = useState([]); // Liste des options sélectionnées
  const [passengersInfo, setPassengersInfo] = useState<Record<number, { firstName: string; lastName: string }> | undefined>( // Informations des passagers
    {}
  );

  // On récupère les options
  useEffect(() => {
    getOptions().then((data) => {
      setOptions(data);
    });
  }, []);

  // On calcule le prix total
  const totalPrice =
    train.price * train.selected_seats.length +
    selectedOptions.reduce((total, option) => {
      // @ts-ignore -- TODO: A faire, trouver une solution pour le ts-ignore
      const optionPrice = options.find((o) => o.name === option)?.price || 0;
      return total + optionPrice * train.selected_seats.length;
    }, 0);

  // On gère le changement des informations des passagers
  const handlePassengerInfoChange = (seat: number, firstName: string, lastName: string) => {
    setPassengersInfo((prevPassengersInfo) => ({
      ...prevPassengersInfo,
      [seat]: {
        firstName,
        lastName
      }
    }));
  };

  // On affiche le récapitulatif de la réservation si le train et la recherche sont dans le local storage sinon on redirige vers la page de recherche
  return (
    <section>
      <h3>Voici les informations concernant votre billet que vous allez ajouter au panier :</h3>

      <div>
        <div className="recapViewer__recap__train">
          <h4>{train.train_type} n°{train.train_number}</h4>
          <p>{train.departure_station.name} --&gt; {train.arrival_station.name}</p>
          <p>Départ le {train.date_departure.split("/")[0]} {months[parseInt(train.date_departure.split("/")[1]) - 1]} {train.date_departure.split("/")[2]} à {train.time_departure}</p>
          <p>Arrivée le {train.date_arrival.split("/")[0]} {months[parseInt(train.date_arrival.split("/")[1]) - 1]} {train.date_arrival.split("/")[2]} à {train.time_arrival}</p>
        </div>

        <div className="recapViewer__recap__seats">
          <h4>Places réservées</h4>
          {/* cycle through train.selected_seats list */}
          {train.selected_seats.map((seat: any) => (
            <div key={seat}>
              <p>Place n°{seat}</p>
              <div>
                <label htmlFor={`firstName${seat}`}>Prénom : </label>
                <input
                  type="text"
                  id={`firstName${seat}`}
                  // @ts-ignore -- TODO: A faire, trouver une solution pour le ts-ignore
                  onChange={(e) => handlePassengerInfoChange(seat, e.target.value, passengersInfo[seat]?.lastName || "")}
                  // @ts-ignore -- TODO: A faire, trouver une solution pour le ts-ignore
                  value={passengersInfo[seat]?.firstName || ""}
                />
              </div>
              <div>
                <label htmlFor={`lastName${seat}`}>Nom : </label>
                <input
                  type="text"
                  id={`lastName${seat}`}
                  // @ts-ignore -- TODO: A faire, trouver une solution pour le ts-ignore
                  onChange={(e) => handlePassengerInfoChange(seat, passengersInfo[seat]?.firstName || "", e.target.value)}
                  // @ts-ignore -- TODO: A faire, trouver une solution pour le ts-ignore
                  value={passengersInfo[seat]?.lastName || ""}
                />
              </div>
            </div>
          ))}
        </div>

        {/* On gère les options */}
        <div className="recapViewer__recap__options">
          <h4>Options</h4>
          {/* On boucle sur la liste des options */}
          {options.map((option: any) => (
            <div key={option.name}>
              <label htmlFor={option.name}>
                {option.name}
                {" (" + option.price + " "}€/personne{") "}
                <span className="option-info" title={option.description}>i</span>
              </label>

              <input
                type="checkbox"
                name={option.name}
                id={option.name}
                onChange={(e) => {
                  if (e.target.checked) {
                    // @ts-ignore -- TODO: A faire, trouver une solution pour le ts-ignore
                    setSelectedOptions((prevOptions) => [...prevOptions, option.name]);
                  } else {
                    setSelectedOptions((prevOptions) => prevOptions.filter((item) => item !== option.name));
                  }
                }}
              />

            </div>
          ))}
        </div>

        {/*  On affiche le prix total */}
        <div className="recapViewer__recap__price">
          <h4>Prix total</h4>
          <p>{totalPrice}€ ({totalPrice / train.selected_seats.length}€/personne)</p>
        </div>
      </div>
      {/*  On affiche le bouton de confirmation */}
      <button onClick={() => addToCart(passengersInfo, train.selected_seats, selectedOptions, totalPrice, train._id.$oid)}>Confirmer</button>

    </section>
  );
};

// Ajouter le billet au panier
async function addToCart(passengersInfo: Record<number, { firstName: string; lastName: string }> | undefined, selected_seats: any, selectedOptions: string[], price: number, ooid_train: String) {
  // On vérifie si le client est connecté
  const client = JSON.parse(localStorage.getItem("client") || "{}");
  if (client.length === 0) {
    // Si le client n'est pas connecté, on affiche un message d'erreur
    alert("Veuillez vous connecter pour ajouter un billet au panier");
    return;
  }

  const id_card = client.card;
  // On vérifie si le numéro de carte est valide; si ce n'est pas le cas, on affiche un message d'erreur sinon on continue
  checkClient(id_card).then((data) => {
    if (data === false) {
      // Afficher un message d'erreur si le numéro de carte n'est pas valide
      alert("Veuillez vous connecter pour ajouter un billet au panier");
      return;
    }
  });

  //  On vérifie si les informations des passagers sont bien remplies
  if (passengersInfo === undefined || Object.keys(passengersInfo).length === 0) {
    alert("Veuillez remplir les champs des passagers");
    return;
  }

  // On vérifie si les informations des passagers sont bien remplies
  for (const [key, value] of Object.entries(passengersInfo)) {
    if (value.firstName === "" || value.lastName === "") {
      alert("Veuillez remplir les champs du passager en place " + key);
      return;
    }
  }

  // Si toutes les conditions sont remplies, on ajoute le billet au panier
  var success = await storeToCartDB(id_card, selected_seats, selectedOptions, passengersInfo, price, ooid_train);

  // On affiche un message d'erreur si le billet n'a pas pu être ajouté au panier
  if (success === false) {
    alert("Une erreur est survenue lors de l'ajout du billet au panier");
    return;
  }

  // On supprime les informations du train et de la recherche du local storage
  localStorage.removeItem("train");
  localStorage.removeItem("search");

  // On redirige vers la page du panier
  window.location.href = "/cart";

}
