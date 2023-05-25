import { useEffect, useState } from "react";
import { getOptions, checkClient } from "../utils/functions";

export const RecapViewer = () => {
  // retrieve the train object from the local storage
  const train: any = JSON.parse(localStorage.getItem("train") || "{}");
  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

  // Define options state
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  // Fetch options on component mount
  useEffect(() => {
    getOptions().then((data) => {
      setOptions(data);
    });
  }, []);

  // Calculate total price
  const totalPrice =
    train.price * train.selected_seats.length +
    Object.keys(selectedOptions).reduce((total, option) => {
        const optionPrice = options.find((o) => o.name === option)?.price || 0;
        return total + optionPrice * selectedOptions[option] * train.selected_seats.length;
    }, 0);


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
          {/* cycle throught train.selected_seats list */}
          {train.selected_seats.map((seat: any) => (
            <p>Place n°{seat}</p>
          ))}
        </div>

        {/* add options */}
        <div className="recapViewer__recap__options">
          <h4>Options</h4>
          {/* cycle throught options list and ask the user if he want some*/}
          {options.map((option: any) => (
            <div>
              <label htmlFor={option.name}>
                {option.name}
                {" ("+option.price+" "}€/personne{") "}
                <span className="option-info" title={option.description}>i</span>
              </label>
              
              <input
                type="checkbox"
                name={option.name}
                id={option.name}
                onChange={(e) =>
                  setSelectedOptions((prevOptions) => ({
                    ...prevOptions,
                    [option.name]: e.target.checked ? 1 : 0,
                  }))
                }
              />
            </div>
          ))}
        </div>

        <div className="recapViewer__recap__price">
          <h4>Prix total</h4>
          <p>{totalPrice}€ ({train.price}€/personne)</p>
        </div>
      </div>
      <button onClick={addToCart}>Confirmer</button>
    </section>
  );
};

function addToCart() {
    console.log("add to cart")
    // check if the client is logged in
    const client = JSON.parse(localStorage.getItem("client") || "{}")
    if (client.length === 0) {
        // show a message to the user
        alert("Veuillez vous connecter pour ajouter un billet au panier")
        return
    }
    
    const id_card = client.card
    console.log(id_card)
    // ask client api if the client is in the database
    
    checkClient(id_card).then((data) => {
        console.log(data)
    })
    

    // get the cart from the current page
}
