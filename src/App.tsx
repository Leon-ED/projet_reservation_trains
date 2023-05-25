import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar'
import { Index } from './pages/Index'
import { SearchPage } from './pages/Search'
import { MessageComp } from './components/MessageComp'
import { ReservationPage } from './pages/Reservation'
import { CartPage } from './pages/Cart'
import { Reservations } from './pages/Reservations'
import { CartPaiement } from './components/CartPaiement'
import { Cgv } from './components/Cgv'
import { Contact } from './components/Contact'
// import { PeopleChooser } from './components/PeopleChooser'
import { Login } from './components/login'
// import { SearchPage } from './pages/Search'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/search/:dateFrom/:departureStationID/:arrivalStationID/:numberOfPassengers/:isRoundTrip/:returnDate" element={<SearchPage />} />
        <Route path="/reservation/:idTrain" element={<ReservationPage /> } />
        <Route path="/reservation/clients" element={<ReservationPage />}/>
        
        <Route path="/cart" element={<CartPage />} />
        <Route path="/cart/pay" element={<CartPaiement />} />

        <Route path="/cgv" element={<Cgv/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        <Route path="/reservations" element={<Reservations />} />


        <Route path="*" element={<MessageComp titre="Erreur 404" message="La page demandée n'existe pas" type="error" redirectTo="/" redirectText="Retour à l'accueil (sans vous perdre cette fois-ci)" />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
