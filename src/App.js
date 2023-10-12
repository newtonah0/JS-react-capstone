import { Route, Routes } from 'react-router-dom';
import FruitCategories from './components/fruitCategories/FruitCategories';
import FruitDetails from './components/fruitDetails/FruitDetails';
import Header from './components/header/Header';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<FruitCategories />} />
          <Route path="/details/:family" element={<FruitDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
