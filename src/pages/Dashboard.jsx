import { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

// import useLocalStorage from "../hooks/useLocalStorage";

function Dashboard() {
  // const [tasks, setTasks] = useLocalStorage("taskflow_data", [
  //   {
  //     id: 1,
  //     titre: "Conception de l'ontologie",
  //     description: "Rédiger les axiomes de base du domaine.",
  //     statut: "A faire",
  //   },
  // ]);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Appel réseau au montage du composant pour récupérer les tâches
  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Impossible de récupérer les tâches depuis le serveur.");
        }
        return response.json();
      })
      .then((data) => {
        setTasks(data.tasks);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // 3. Logique d'ajout transmise au formulaire (gérée directement à la soumission côté formulaire désormais)
  const handleTaskAdded = (nouvelleTache) => {
    // Respect de l'immuabilité : ajout de la tâche retournée par la BD
    setTasks([nouvelleTache, ...tasks]);
  };

  if (loading) return <p style={{ textAlign: "center" }}>Chargement des tâches...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>Erreur : {error}</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <h1>Dashboard</h1>

      {/* On passe la fonction de callback pour mettre à jour l'état local */}
      <TaskForm onTaskAdded={handleTaskAdded} />

      <hr />

      {tasks.length === 0 ? (
        <p>Aucune tâche disponible.</p>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))
      )}
    </div>
  );
}

export default Dashboard;