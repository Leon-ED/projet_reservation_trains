/**
 * Projet: @projet_reservation_trains
 * Fichier: src/components/Contact.tsx
 * Auteur(s): Denis DELMAS
 * Date: 01/06/2023
 * Description: Affichage du formulaire de contact
 * Version : 1.0
 * 
 * License: @license MIT
*/

import { useState } from "react";

// Formulaire de contact
export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Envoyer le formulaire ou effectuer d'autres actions en fonction de vos besoins

    // Réinitialiser les champs du formulaire
    setName("");
    setEmail("");
    setMessage("");
  };

  // Afficher le formulaire de contact
  return (
    <>
      <section>
        <h2>Contactez-nous</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nom :</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="message">Message :</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button type="submit">Envoyer</button>
        </form>
      </section>
    </>
  );
};
