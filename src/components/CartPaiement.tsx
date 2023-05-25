import { useState } from "react";
import { checkCode, addReservation, removeCart } from "../utils/functions";

export const CartPaiement = () => {
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [discountBrut, setDiscountBrut] = useState(0);
    const [isPercentage, setIsPercentage] = useState(false); // true = pourcentage, false = montant fixe

    const applyPromoCode = () => {
        
        // Vérifier si le code promo est valide
        checkCode(promoCode)
            .then((codeData) => {
                if (codeData === null) {
                    return false;
                }
                else {
                    // Le code promo est valide
                    setDiscountBrut(codeData.reduction);
                    setIsPercentage(codeData.pourcentage);

                    if (codeData.pourcentage) {
                        // Calculer la réduction en pourcentage
                        setDiscount(totalPrice * (codeData.reduction / 100));
                    } else {
                        // Calculer la réduction en montant fixe
                        setDiscount(codeData.reduction);
                    }
                }})
        setPromoCode("");
    };

    // get the total price of the cart from the carts array in the local storage
    const carts = JSON.parse(localStorage.getItem("carts") || "[]");

    const totalPrice = carts?.reduce((total: number, cart: any) => total + parseInt(cart.price, 10), 0); // Montant total de la commande
    const finalPrice = totalPrice - discount; // Montant total après réduction

    const handlePayButton = (montant: string | number) => {
        //  check if the user has accepted the terms and conditions
        const cgv = document.getElementById("cgv") as HTMLInputElement;
        if (!cgv.checked) {
            alert("Veuillez accepter les conditions générales de vente");
            return;
        }

        // check if the card number and the card name and the card expiration date and the card cvc are not empty
        const cardNumber = document.getElementById("cardNumber") as HTMLInputElement;
        const cardName = document.getElementById("cardName") as HTMLInputElement;
        const cardExpiration = document.getElementById("cardExpiration") as HTMLInputElement;
        const cardCVC = document.getElementById("cardCVC") as HTMLInputElement;
        if (cardNumber.value === "" || cardName.value === "" || cardExpiration.value === "" || cardCVC.value === "") {
            alert("Veuillez remplir tous les champs de la carte bancaire");
            return;
        }

        const confirmed = window.confirm("Confirmez-vous le paiement de " + montant + "€?");
        if (confirmed) {
            addReservation(carts, discountBrut, isPercentage)
            // Vider le panier
            removeCart(carts);
            alert("Paiement effectué avec succès !");

            // Rediriger vers la page de réservation
            window.location.href = "/reservations";

            
        }
    };

    return (
        <section>
            <h2>Page de paiement</h2>

            <div className="flex-row">
                <div className="recap_paiement">
                    <h3>Récapitulatif de votre commande</h3>

                    <div className="form-group">
                        <label htmlFor="promoCode">Code promo :</label>
                        <input type="text" name="promoCode" id="promoCode" placeholder="Entrez votre code promo" value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <button onClick={applyPromoCode}>Appliquer</button>
                    </div>
                    <div className="paiementPrice">
                        <a className="left">Montant total : </a><a className="right">{totalPrice}€</a>
                        <br />
                        {discount >0 && <a className="">Code promo : {discount}€</a>}
                        <br />
                        <a className="left">Montant à payer : </a><a className="right">{finalPrice}€</a>
                    </div>


                </div>

                <div className="paiement flex-row">
                    <div className="paiement__card">
                        <h3>Carte bancaire</h3>
                        <div className="form-group">
                            <label htmlFor="cardNumber">Numéro de carte</label>
                            <input type="text" name="cardNumber" id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cardName">Nom du titulaire</label>
                            <input type="text" name="cardName" id="cardName" placeholder="John Doe" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cardExpiration">Date d'expiration</label>
                            <input type="text" name="cardExpiration" id="cardExpiration" placeholder="MM/AA" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cardCVC">Cryptogramme visuel</label>
                            <input type="text" name="cardCVC" id="cardCVC" placeholder="123" />
                        </div>
                        <input type="checkbox" name="cgv" id="cgv" />
                        <label >J'accepte les <a href="/cgv">conditions générales de vente</a></label>
                        <div className="form-group">
                            <button onClick={() => handlePayButton(finalPrice)} type="submit">Payer</button>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
