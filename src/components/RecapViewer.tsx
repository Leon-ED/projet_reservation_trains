
export const RecapViewer = () => {
    // retrieve the train object from the local storage
    const train: any = JSON.parse(localStorage.getItem("train") || "{}")

    // show the recap of the reservation
    return (
        
        <section>
            <h3>Voici les informations concernant votre billet que vous allez ajouter au panier :</h3>

            <div>
                <div className="recapViewer__recap__train">
                    <h4>{train.train_type} n°{train.train_number}</h4>
                    <p>{train.departure_station.name} --&gt; {train.arrival_station.name}</p>
                    <p>Le 12/12/2021 à 12h12</p>
                </div>

                <div className="recapViewer__recap__seats">
                    <h4>Places réservées</h4>
                    <p>Voiture n°1</p>
                    <p>Place n°1</p>
                    <p>Place n°2</p>
                    <p>Place n°3</p>
                    <p>Place n°4</p>
                </div>

                <div className="recapViewer__recap__price">
                    <h4>Prix total</h4>
                    <p>120€</p>
                </div>
            </div>

            <button>Confirmer</button>


          
        </section>


    )

}