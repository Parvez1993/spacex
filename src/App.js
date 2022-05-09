import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import ErrorPage from "./pages/ErrorPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="*" element={<ErrorPage />}></Route>
          <Route path="/" exact element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
