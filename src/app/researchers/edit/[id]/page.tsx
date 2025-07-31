'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from '../page.module.css';

export default function EditResearcherPage() {
  const router = useRouter();
  const { id } = useParams() as { id?: string };
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/researchers/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar pesquisador');
        return res.json();
      })
      .then((data) => setName(data.name))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3000/researchers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      alert('Erro ao salvar pesquisador');
      return;
    }

    router.push('/researchers');
  };

  return (
    <main className={styles.container}>
      <h1>Editar Pesquisador</h1>
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
          Atualizar
        </button>

        <button
          type="button"
          className={styles.returnButton}
          onClick={() => router.push('/researchers')}
        >
          Voltar
        </button>
      </form>
    </main>
  );
}
