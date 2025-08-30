import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from "./components/Footer.jsx";
import Home from './pages/Home.jsx';
import Releases from './pages/Releases.jsx';
import History from './pages/History.jsx';
import Store from './pages/Store.jsx';
import Contact from './pages/Contact.jsx';
import ArtistDetail from './pages/ArtistDetail.jsx';

function App() {
  return (
    <div className='p-4 flex flex-col min-h-screen'>
      <Navbar />
      <div className="flex-grow">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/releases" element={<Releases />} />
            <Route path="/history" element={<History />} />
            <Route path="/store" element={<Store />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/artist/:id" element={<ArtistDetail />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;