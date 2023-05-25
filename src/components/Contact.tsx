import { useState } from "react";

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoyer le formulaire ou effectuer d'autres actions en fonction de vos besoins
    console.log("Formulaire soumis !");
    console.log("Nom :", name);
    console.log("Email :", email);
    console.log("Message :", message);
    // Réinitialiser les champs du formulaire
    setName("");
    setEmail("");
    setMessage("");
  };

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
