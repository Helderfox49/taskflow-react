import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [statut, setStatut] = useState("A faire");

  const handleSubmit = (event) => {
    event.preventDefault();

    const nouvelleTache = {
      id: Date.now(),
      titre,
      description,
      statut,
    };

    onAddTask(nouvelleTache);

    // Réinitialisation du formulaire
    setTitre("");
    setDescription("");
    setStatut("A faire");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Titre"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
          }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
          }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <select
          value={statut}
          onChange={(e) => setStatut(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
          }}
        >
          <option value="A faire">A faire</option>
          <option value="En cours">En cours</option>
          <option value="Termine">Termine</option>
        </select>
      </div>

      <button
        type="submit"
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Ajouter
      </button>
    </form>
  );
}

export default TaskForm;