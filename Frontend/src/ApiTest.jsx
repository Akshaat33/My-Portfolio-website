import { useEffect, useState } from 'react';
import api from './services/api';

function ApiTest() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/projects');

                setProjects(response.data.data);
            } catch (err) {
                console.error("Failed to fetch projects:", err);
                setError(
                    err.response?.data?.message ||
                    "Could not connect to the backend."
                );
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();

    }, []);

    if (loading) {
        return <p>Loading projects…</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>


            Projects from MongoDB

            {
                projects.length === 0 ? (
                    <p>No projects found in the database.</p>
                ) : (
                    projects.map((project) => (
                        <article key={project._id}>
                            <h2>{project.title}</h2>
                            <p>{project.description}</p>
                            <p>
                                Technologies: {project.techStack.join(", ")}
                            </p>
                        </article>
                    ))
                )
            }
        </div >

    );
}

export default ApiTest;