import { Link } from "react-router-dom";

function TaskCard({ task }) {
  return (
    // Remplacement de task.id par task._id
    <Link
      to={`/task/${task._id}`}
      style={{ textDecoration: "none", color: "black" }}
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
        {/* Remplacement des anciennes propriétés françaises par celles de l'API */}
        <h3>{task.title}</h3>
        <p>{task.description || "Aucune description fournie."}</p>
        <strong>Statut :</strong> {task.status}
      </div>
    </Link>
  );
}

export default TaskCard;