import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar'
import { Index } from './pages/Index'
// import { SearchPage } from './pages/Search'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        {/* <Route path="/search/:dateFrom/:dateTo/:departureStation/:arrivalStation/:numberOfPassengers/:isRoundTrip/:returnDate" element={<SearchPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
