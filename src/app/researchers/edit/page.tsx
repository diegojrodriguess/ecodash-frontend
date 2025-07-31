'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from './page.module.css';

export default function EditResearcherPage() {
  const router = useRouter();
  const { id } = useParams() as { id?: string };
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/researchers/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error('Erro ao buscar pesquisador');
          return res.json();
        })
        .then((data) => setName(data.name))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = id
      ? `http://localhost:3000/researchers/${id}`
      : 'http://localhost:3000/researchers';

    const method = id ? 'PUT' : 'POST';
    const body = JSON.stringify({ name });

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    if (!res.ok) {
      alert('Erro ao salvar pesquisador');
      return;
    }

    router.push('/researchers');
  };

  return (
    <main className={styles.container}>
      <h1>{id ? 'Editar Pesquisador' : 'Criar Pesquisador'}</h1>

      {loading && <p>Carregando...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        <br />
        <button type="submit" className={styles.button}>
          {id ? 'Atualizar' : 'Criar'}
        </button>
      </form>
    </main>
  );
}
