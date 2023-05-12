export const Navbar = () => {
    return (
        <nav>
            <div className="left">
                <img src="imgs/ratp.png" height="50px" />
                <h2>Régie Autonome du Tran Parisien</h2>
            </div>
            <div className="middle">
                <ul>
                    <li><a href="#">Accueil</a></li>
                    <li><a href="#">A propos</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>
            <div className="right">
                <input id="search" type="text" placeholder="Recherche" />
                <ul>
                    <li><a href="#">Connexion</a></li>
                    <li><a href="#">Inscription</a></li>
                </ul>
            </div>





        </nav>
    )
}

