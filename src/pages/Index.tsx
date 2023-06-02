/**
 * Projet: @projet_reservation_trains
 * Fichier: src/pages/Index.tsx
 * Auteur(s): Léon EDMEE
 * Date: 01/06/2023
 * Description: Page d'accueil  du site web de réservation de trains 
 * Version : 1.0
 * 
 * License: @license MIT
*/
import { SearchComponent } from "../components/Search"

// Page d'accueil  du site web de réservation de trains
export const Index = () => {
    const MAX = 4
    const MIN = 1
    // On choisit deux images aléatoirement
    const img1 = "/imgs/train" + (Math.floor(Math.random() * (MAX - MIN + 1)) + MIN) + ".jpg"
    do { // On choisit une autre image aléatoirement
        var img2 = "/imgs/train" + (Math.floor(Math.random() * (MAX - MIN + 1)) + MIN) + ".jpg"
    } while (img1 === img2); // Tant que les deux images sont identiques


    // On retourne le JSX
    return (
        <>
            <section>
                <h2>Réservez sereinement votre voyage en Tran</h2>
                <p>
                    Partez de la gare de votre choix et arrivez à destination en un rien de temps grâce à la collaboration entre la SNCF, RATP, Deutsche Bahn et Véolia Transport.<br />
                </p>
            </section>
            <section>
                <h2>Partez en voyage :</h2>
                <SearchComponent />
            </section>
            <section className="flex-row" style={{ margin: "auto" }}>
                <figure>
                    <img src={img1} alt="train" height="300px" />
                    <img src={img2} alt="train" height="300px" />
                    <figcaption className="center">Avec nous, il n'a jamais été aussi facile de voyager en Tran</figcaption>
                </figure>
            </section>
        </>

    )
}