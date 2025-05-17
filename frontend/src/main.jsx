import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Tech } from "./Pages/Tech";
import { Other } from "./Pages/Other";
import { M4 } from "./Pages/M4";
import { M5 } from "./Pages/M5";
import { M6 } from "./Pages/M6";
import { Auth } from "./Auth";
import { Test } from "./Test";
import { Test2 } from "./Pages/Test2";

createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/Tech" element={<Tech />}></Route>
      <Route path="/Other" element={<Other />}></Route>
      <Route path="/M4" element={<M4 />}></Route>
      <Route path="/M5" element={<M5 />}></Route>
      <Route path="/M6" element={<M6 />}></Route>
      <Route path="/Auth" element={<Auth />} />
      <Route path="/Test" element={<Test />} />
      <Route path="/Test2" element={<Test2 />} />
    </Routes>
  </Router>
);
