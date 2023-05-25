import { useEffect, useState } from "react";
import { getOptions, checkClient, storeToCartDB } from "../utils/functions";

export const RecapViewer = () => {
  // retrieve the train object from the local storage
  const train: any = JSON.parse(localStorage.getItem("train") || "{}");
  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

  // Define options state
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [passengersInfo, setPassengersInfo] = useState<Record<number, { firstName: string; lastName: string }> | undefined>(
    {}
  );

  // Fetch options on component mount
  useEffect(() => {
    getOptions().then((data) => {
      setOptions(data);
    });
  }, []);

  // Calculate total price
  const totalPrice =
  train.price * train.selected_seats.length +
  selectedOptions.reduce((total, option) => {
    const optionPrice = options.find((o) => o.name === option)?.price || 0;
    return total + optionPrice * train.selected_seats.length;
  }, 0);


  const handlePassengerInfoChange = (seat: number, firstName: string, lastName: string) => {
    setPassengersInfo((prevPassengersInfo) => ({
      ...prevPassengersInfo,
      [seat]: {
        firstName,
        lastName
      }
    }));
  };

  // show the recap of the reservation
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
                  onChange={(e) => handlePassengerInfoChange(seat, e.target.value, passengersInfo[seat]?.lastName || "")}
                  value={passengersInfo[seat]?.firstName || ""}
                />
              </div>
              <div>
                <label htmlFor={`lastName${seat}`}>Nom : </label>
                <input
                  type="text"
                  id={`lastName${seat}`}
                  onChange={(e) => handlePassengerInfoChange(seat, passengersInfo[seat]?.firstName || "", e.target.value)}
                  value={passengersInfo[seat]?.lastName || ""}
                />
              </div>
            </div>
          ))}
        </div>

        {/* add options */}
        <div className="recapViewer__recap__options">
          <h4>Options</h4>
          {/* cycle through options list and ask the user if he wants some */}
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
                    setSelectedOptions((prevOptions) => [...prevOptions, option.name]);
                  } else {
                    setSelectedOptions((prevOptions) => prevOptions.filter((item) => item !== option.name));
                  }
                }}
              />

            </div>
          ))}
        </div>

        <div className="recapViewer__recap__price">
          <h4>Prix total</h4>
          <p>{totalPrice}€ ({totalPrice / train.selected_seats.length}€/personne)</p>
        </div>
      </div>
      <button onClick={() => addToCart(passengersInfo, train.selected_seats,selectedOptions, totalPrice, train._id.$oid)}>Confirmer</button>

    </section>
  );
};

async function addToCart(passengersInfo: Record<number, { firstName: string; lastName: string }> | undefined, selected_seats: any, selectedOptions: string[], price: number, ooid_train: String) {
  // check if the client is logged in
  const client = JSON.parse(localStorage.getItem("client") || "{}");
  if (client.length === 0) {
    // show a message to the user
    alert("Veuillez vous connecter pour ajouter un billet au panier");
    return;
  }

  const id_card = client.card;
  // ask client api if the client is in the database

  checkClient(id_card).then((data) => {
    if (data === false) {
      // show a message to the user
      alert("Veuillez vous connecter pour ajouter un billet au panier");
      return;
    }
  });

  //  check if passengersInfo is not undefined or empty
  if (passengersInfo === undefined || Object.keys(passengersInfo).length === 0) {
    alert("Veuillez remplir les champs des passagers");
    return;
  }

  // check if all the fields are filled throught looping in the passengersInfo dictionary
  for (const [key, value] of Object.entries(passengersInfo)) {
    if (value.firstName === "" || value.lastName === "") {
      alert("Veuillez remplir les champs du passager en place " + key);
      return;
    }
  }

  // if all fields are filled, we can store all these informations to the Cart collection in the database
  var success = await storeToCartDB(id_card, selected_seats, selectedOptions, passengersInfo, price, ooid_train);

  if (success === false) {
    alert("Une erreur est survenue lors de l'ajout du billet au panier");
    return;
  }

  // remove the train and search object from the local storage
  localStorage.removeItem("train");
  localStorage.removeItem("search");

  // redirect to the cart page
  window.location.href = "/cart";

}
