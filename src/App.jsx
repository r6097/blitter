import { Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReviewPage from "./pages/ReviewPage";
import SplitPage from "./pages/SplitPage";
import SharePage from "./pages/SharePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={HomePage} />
        <Route path="/review" element={ReviewPage} />
        <Route path="/split" element={SplitPage} />
        <Route path="/share" element={SharePage} />
      </Routes>
    </div>
  );
}

export default App;
