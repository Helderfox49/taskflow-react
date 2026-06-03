import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function TaskDetail() {

    const { id } = useParams();

    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchTask = async () => {

            try {

                const response = await fetch(
                    `http://localhost:5000/tasks/${id}`
                );

                if (response.status === 404) {
                    throw new Error(
                        "Tâche introuvable sur le serveur."
                    );
                }

                if (!response.ok) {
                    throw new Error(
                        "Erreur lors de la récupération."
                    );
                }

                const data = await response.json();

                setTask(data.task);

            } catch (err) {

                setError(err.message);

            } finally {

                setLoading(false);
            }
        };

        fetchTask();

    }, [id]);

    if (loading) {
        return (
            <p style={{ textAlign: "center" }}>
                Chargement des détails...
            </p>
        );
    }

    if (error) {
        return (
            <h2
                style={{
                    color: "red",
                    textAlign: "center"
                }}
            >
                {error}
            </h2>
        );
    }

    if (!task) {
        return (
            <h2 style={{ textAlign: "center" }}>
                Tâche introuvable
            </h2>
        );
    }

    return (
        <div
            style={{
                maxWidth: "800px",
                margin: "20px auto",
                padding: "0 20px"
            }}
        >
            <h1>{task.title}</h1>

            <p>
                <strong>Description :</strong>
            </p>

            <p>
                {task.description ||
                    "Aucune description fournie."}
            </p>

            <p>
                <strong>Statut :</strong>{" "}
                {task.status}
            </p>

            <p>
                <strong>ID :</strong>{" "}
                <code>
                    {task._id}
                </code>
            </p>

            <p>
                <strong>Créée le :</strong>{" "}
                {new Date(
                    task.createdAt
                ).toLocaleString()}
            </p>
        </div>
    );
}

export default TaskDetail;