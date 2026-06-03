import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import TaskDetail from "./pages/TaskDetail";
import Navbar from "./layouts/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Route principale affichant la liste des tâches issues de MongoDB */}
        <Route path="/" element={<Dashboard />} />
        
        {/* Route dynamique pour le détail d'une tâche */}
        {/* Le paramètre reste accessible via useParams() dans TaskDetail */}
        <Route path="/task/:id" element={<TaskDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;