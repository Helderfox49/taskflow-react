import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

import useLocalStorage from "../hooks/useLocalStorage";

function Dashboard() {
  const [tasks, setTasks] = useLocalStorage("taskflow_data", [
    {
      id: 1,
      titre: "Conception de l'ontologie",
      description: "Rédiger les axiomes de base du domaine.",
      statut: "A faire",
    },
  ]);

  const addTask = (nouvelleTache) => {
    // Respect de l'immuabilité
    setTasks([...tasks, nouvelleTache]);
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "20px auto",
      }}
    >
      <h1>Dashboard</h1>

      <TaskForm onAddTask={addTask} />

      <hr />

      {tasks.length === 0 ? (
        <p>Aucune tâche disponible.</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))
      )}
    </div>
  );
}

export default Dashboard;