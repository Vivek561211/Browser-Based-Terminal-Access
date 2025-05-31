import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserTerminal from './pages/UserTerminal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} /> {/* This route handles both user and admin */}
        <Route path="/user/:id/terminal" element={<UserTerminal />} />

      </Routes>
    </Router>
  );
}

export default App;
