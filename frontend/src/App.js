import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Personnages from './pages/Personnages';
import NotFound from './pages/NotFound';
import Personnage from './pages/Personnage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personnages" element={<Personnages />} />
        <Route path="/personnages/:id" element={<Personnage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
