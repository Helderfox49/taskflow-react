import { Link } from "react-router-dom";

function TaskCard({ task }) {
  return (
    <Link
      to={`/task/${task.id}`}
      style={{
        textDecoration: "none",
        color: "black",
      }}
    >
      <div
        style={{
          border: "1px solid #ccc",
          padding: "15px",
          marginBottom: "15px",
          borderRadius: "10px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <h3>{task.titre}</h3>

        <p>{task.description}</p>

        <strong>Statut :</strong> {task.statut}
      </div>
    </Link>
  );
}

export default TaskCard;