
import { SearchComponent } from "../components/Search"

export const Index = () => {




    return (
        <>
            <section>
                <h2>Réservez sereinement votre voyage en train</h2>
                <p>
                    Partez de la gare de votre choix et arrivez à destination en un rien de temps grâce à la collaboration entre la SNCF, RATP et la Deutsche Bahn.<br />
                </p>
            </section>
            <section>
                <h2>Partez en voyage :</h2>
                <SearchComponent />
            </section>
        </>

    )
}