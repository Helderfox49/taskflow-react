import { useParams } from "react-router-dom";

function TaskDetail() {
  const { id } = useParams();

  const tasks = JSON.parse(localStorage.getItem("taskflow_data")) || [];

  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    return <h2>Tâche introuvable</h2>;
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "20px auto",
      }}
    >
      <h1>{task.titre}</h1>

      <p>
        <strong>Description :</strong>
      </p>

      <p>{task.description}</p>

      <p>
        <strong>Statut :</strong> {task.statut}
      </p>

      <p>
        <strong>ID :</strong> {task.id}
      </p>
    </div>
  );
}

export default TaskDetail;