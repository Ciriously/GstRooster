import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './shared/Header';
import Table from './components/Table';
import WeeklyRoster from './Pages/WeeklyRooster';
import './App.css';

function App() {
  return (
    <Router>
      <div className="mb-20">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/weekly-roster" element={<WeeklyRoster />} />
      </Routes>
    </Router>
  );
}

export default App;
