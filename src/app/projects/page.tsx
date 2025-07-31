'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import styles from './page.module.css';

type Project = {
  id: string;
  name: string;
  status: string;
  geometry: any;
  researcher: { id: string; name: string };
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:3000/projects')
      .then((res) => res.json())
      .then((data) => {
        const values = Object.values(data).filter(
          (item) => typeof item === 'object' && item.id
        );
        setProjects(values);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Remover projeto?')) return;
    await fetch(`http://localhost:3000/projects/${id}`, { method: 'DELETE' });
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <main className={styles.container}>
      <aside className={styles.sidebar}>
        <h2 className={styles.title}>Projetos</h2>
        {loading && <p>Carregando...</p>}
        {error && <p className={styles.error}>{error}</p>}

        <ul className={styles.list}>
          {projects.map((p) => (
            <li key={p.id} className={styles.item}>
              <span>
                <strong>{p.name}</strong> — {p.status}
              </span>
              <div className={styles.actions}>
                <button
                  onClick={() => router.push(`/projects/edit/${p.id}`)}
                  className={styles.iconButton}
                  title="Editar"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className={`${styles.iconButton} ${styles.deleteButton}`}
                  title="Excluir"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <button
          className={styles.createButton}
          onClick={() => router.push('/projects/edit')}
        >
          + Criar novo projeto
        </button>
      </aside>

      <section className={styles.map}>
        <MapContainer
          center={[-14.2, -51.9]}
          zoom={4}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {projects.map((p) => (
            <GeoJSON key={p.id} data={p.geometry} />
          ))}
        </MapContainer>
      </section>
    </main>
  );
}
