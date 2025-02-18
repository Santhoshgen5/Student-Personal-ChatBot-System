import "./App.css";
import Homepage from "./components/pages/Homepage";
import { Provider } from "react-redux";
import store from "../src/Redux/store";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Studentpage from "./components/studentpages/Studentpage";
import Staffpage from "./components/staffpages/Staffpage";
import StudentsHomepage from "./components/studentpages/StudentsHomepage";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/student-dashboard" element={<StudentsHomepage />} />
            <Route path="/staff-dashboard" element={<Staffpage />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
