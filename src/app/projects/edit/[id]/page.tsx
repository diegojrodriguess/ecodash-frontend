'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Select from 'react-select';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import styles from '../page.module.css';

type ResearcherOption = { value: string; label: string };

type Project = {
  name: string;
  status: string;
  geometry: any;
  researcherId: string;
};

const defaultPosition: [number, number] = [-14.2, -51.9];

function GeometryMarker({ position, setPosition }: any) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? <Marker position={position} icon={new Icon({ iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', iconSize: [25, 41] })} /> : null;
}

export default function EditProjectPage() {
  const router = useRouter();
  const { id } = useParams() as { id?: string };
  const [formData, setFormData] = useState<Project>({
    name: '',
    status: 'active',
    geometry: null,
    researcherId: '',
  });

  const [position, setPosition] = useState<[number, number] | null>(null);
  const [researchers, setResearchers] = useState<ResearcherOption[]>([]);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/researchers')
      .then((res) => res.json())
      .then((data) => {
        const values = Object.values(data).filter((item: any) => typeof item === 'object' && item.id);
        setResearchers(values.map((r: any) => ({ value: r.id, label: r.name })));
      });
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/projects/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            name: data.name,
            status: data.status,
            geometry: data.geometry,
            researcherId: data.researcher.id,
          });
          const coords = data.geometry?.coordinates;
          if (coords) setPosition([coords[1], coords[0]]);
        })
        .catch(() => setError('Erro ao carregar projeto'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const geo = position
      ? { type: 'Point', coordinates: [position[1], position[0]] }
      : formData.geometry;

    const payload = { ...formData, geometry: geo };

    const url = id
      ? `http://localhost:3000/projects/${id}`
      : 'http://localhost:3000/projects';

    const method = id ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return alert('Erro ao salvar projeto');

    router.push('/projects');
  };

  return (
    <main className={styles.container}>
      <h1>{id ? 'Editar Projeto' : 'Criar Projeto'}</h1>

      {loading && <p>Carregando...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Nome:
          <input
            className={styles.input}
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </label>

        <label>
          Status:
          <select
            className={styles.input}
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="active">Ativo</option>
            <option value="finalized">Finalizado</option>
          </select>
        </label>

        <label>
          Pesquisador:
          <Select
            options={researchers}
            className={styles.select}
            value={researchers.find((r) => r.value === formData.researcherId) || null}
            onChange={(selected) => setFormData({ ...formData, researcherId: selected?.value || '' })}
            placeholder="Selecione..."
            isClearable
          />
        </label>

        <div className={styles.mapWrapper}>
          <label>Localização:</label>
          <MapContainer center={defaultPosition} zoom={4} style={{ height: 300 }}>
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeometryMarker position={position} setPosition={setPosition} />
          </MapContainer>
        </div>

        <button type="submit" className={styles.button}>
          {id ? 'Atualizar' : 'Criar'}
        </button>

        <button
          type="button"
          className={styles.returnButton}
          onClick={() => router.push('/projects')}
        >
          Voltar
        </button>
      </form>
    </main>
  );
}
