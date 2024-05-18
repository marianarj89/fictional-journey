import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Auth from "./pages/auth";
import CriarReceita from "./pages/criar-receita";
import ReceitasSalvas from "./pages/receitas-salvas";
import { Navbar } from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/criar-receita" element={<CriarReceita />} />
          <Route path="/receitas-salvas" element={<ReceitasSalvas />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
