'use client';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from './page.module.css';

type Researcher = {
  id: string;
  name: string;
};

export default function ResearchersPage() {
  const [researchers, setResearchers] = useState<Researcher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/researchers')
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar pesquisadores');
        return res.json();
      })
      .then((data) => {
        const values = Object.values(data).filter((item) => typeof item === 'object' && item.id);
        setResearchers(values);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (id: string) => {
    window.location.href = `/researchers/edit/${id}`;
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este pesquisador?')) {
      fetch(`http://localhost:3000/researchers/${id}`, { method: 'DELETE' })
        .then(() => setResearchers((prev) => prev.filter((r) => r.id !== id)))
        .catch(() => alert('Erro ao excluir pesquisador.'));
    }
  };

  const handleCreate = () => {
    window.location.href = `/researchers/edit`;
  };

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Pesquisadores</h1>

        {loading && <p>Carregando...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <ul className={styles.list}>
          {researchers.map((r) => (
            <li key={r.id} className={styles.item}>
              <span>{r.name}</span>
              <div className={styles.actions}>
                <button onClick={() => handleEdit(r.id)} className={styles.iconButton} title="Editar">
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(r.id)}
                  className={`${styles.iconButton} ${styles.deleteButton}`}
                  title="Excluir"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <button onClick={handleCreate} className={styles.createButton}>
          + Criar novo pesquisador
        </button>

        <button
          className={styles.returnButton}
          onClick={() => window.location.href = '/'}
        >
          Voltar
        </button>
      </div>
    </main>
  );
}
