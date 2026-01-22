import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Personnages from './pages/Personnages';
import Personnage from './pages/Personnage';
import Affiliations from './pages/Affiliations';
import Affiliation from './pages/Affiliation';
import BreathingStyles from './pages/BreathingStyles';
import BreathingStyle from './pages/BreathingStyle';
import BloodDemonArts from './pages/BloodDemonArts';
import BloodDemonArt from './pages/BloodDemonArt';
import Items from './pages/Items';
import Item from './pages/Item';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personnages" element={<Personnages />} />
        <Route path="/personnages/:id" element={<Personnage />} />
        <Route path="/affiliations" element={<Affiliations />} />
        <Route path="/affiliations/:id" element={<Affiliation />} />
        <Route path="/breathing-styles" element={<BreathingStyles />} />
        <Route path="/breathing-styles/:id" element={<BreathingStyle />} />
        <Route path="/blood-demon-arts" element={<BloodDemonArts />} />
        <Route path="/blood-demon-arts/:id" element={<BloodDemonArt />} />
        <Route path="/items" element={<Items />} />
        <Route path="/items/:id" element={<Item />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
