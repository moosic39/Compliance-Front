import { useState } from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App h-full">
      <div></div>
      <h1 className="text-3xl font-bold underline">Compliance</h1>
      <Routes>
        <Route path={"/"} element={<SignUp />} />
        <Route path={"/user/:id"} element={<Home />} />
      </Routes>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">Mickael CC</p>
    </div>
  );
}

export default App;
