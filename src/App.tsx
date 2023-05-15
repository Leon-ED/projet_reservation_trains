import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar'
import { Index } from './pages/Index'
import { SearchPage } from './pages/Search'
import { MessageComp } from './components/MessageComp'
// import { SearchPage } from './pages/Search'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/search/:dateFrom/:departureStationID/:arrivalStationID/:numberOfPassengers/:isRoundTrip/:returnDate" element={<SearchPage />} />
        <Route path="*" element={<MessageComp titre="Erreur 404" message="La page demandée n'existe pas" type="error" redirectTo="/" redirectText="Retour à l'accueil (sans vous perdre cette fois-ci)" />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
