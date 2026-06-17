import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Account from './pages/Account';
import User from './pages/User';
import PetRegister from './pages/PetRegister';
import PetEdit from './pages/PetEdit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/profile" element={<User />} />
        <Route path="/pet/register" element={<PetRegister />} />
        <Route path="/pet/edit/:id" element={<PetEdit />} />
      </Routes>
    </Router>
  );
}

export default App;  