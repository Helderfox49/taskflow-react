import { useState } from "react";

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("A faire");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const corpsRequete = {
      title,
      description,
      status
    };

    // Exécution de la requête POST vers le Back-End
    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(corpsRequete),
    })
      .then((response) => {
        // Validation stricte du statut de succès 201
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error("Le serveur a refusé la création de la tâche.");
        }
      })
      .then((nouvelleTacheCreee) => {
        // N'ajoute à l'état React que si le serveur a validé l'insertion
        onTaskAdded(nouvelleTacheCreee);

        // Réinitialisation du formulaire
        setTitle("");
        setDescription("");
        setStatus("A faire");
      })
      .catch((err) => {
        alert(`Erreur lors de l'ajout : ${err.message}`);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Titre de la tâche"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%", padding: "10px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", padding: "10px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ width: "100%", padding: "10px" }}
        >
          <option value="A faire">A faire</option>
          <option value="En cours">En cours</option>
          <option value="Termine">Termine</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          padding: "10px 20px",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          backgroundColor: isSubmitting ? "#ccc" : "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
      >
        {isSubmitting ? "Envoi..." : "Ajouter la tâche"}
      </button>
    </form>
  );
}

export default TaskForm;