import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from "./components/Footer.jsx";
import Home from './pages/Home.jsx';
import Releases from './pages/Releases.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Shop from './pages/Shop.jsx';
import ArtistDetail from './pages/ArtistDetail.jsx';


function App() {
  return (
    <div className='p-4 flex flex-col min-h-screen overflow-x-hidden'>
      <Navbar />
      <div className="flex-grow overflow-x-hidden">
        {/* <Router> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/releases" element={<Releases />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/artist/:id" element={<ArtistDetail />} />
          </Routes>
        {/* </Router> */}
      </div>
      <Footer />
    </div>
  );
}

export default App;