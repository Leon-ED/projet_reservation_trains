
export const ClientInfoForm = () => {

    return (
        <section>
            <div>
                <label htmlFor="name">Nom</label>
                <input type="text" name="name" id="name" />
            </div>
            <div>
                <label htmlFor="surname">Prénom</label>
                <input type="text" name="surname" id="surname" />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
            </div>
            <div>
                <label htmlFor="phone">Téléphone</label>
                <input type="tel" name="phone" id="phone" />
            </div>
            <div>
                <label htmlFor="address">Adresse</label>
                <input type="text" name="address" id="address" />
            </div>
            <div>
                <label htmlFor="city">Ville</label>
                <input type="text" name="city" id="city" />
            </div>
            <div>
                <label htmlFor="zip">Code postal</label> 
                <input type="text" name="zip" id="zip" />
            </div>
            <div>
                <label htmlFor="country">Pays</label>
                <input type="text" name="country" id="country" />
            </div>
            <div>
                <label htmlFor="card">Numéro de carte</label>
                <input type="text" name="card" id="card" />
            </div>    
        </section>


    )

}