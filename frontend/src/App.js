import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import SearchCompanies from './components/SearchCompanies';
import FetchCompanies from './components/FetchCompanies';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<SearchCompanies />} />
      </Routes>
     
      <Routes>
        <Route path="/companies" element={<FetchCompanies />} />
      </Routes>
    </div>
  );
}

export default App;
