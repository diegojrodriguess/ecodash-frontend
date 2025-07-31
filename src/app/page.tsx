import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3rem' }}>
      <h1>Ecodash</h1>
      <Link href="/projects">
        <button style={{ margin: '1rem', padding: '1rem 2rem' }}>📁 Ver Projetos</button>
      </Link>
      <Link href="/researchers">
        <button style={{ margin: '1rem', padding: '1rem 2rem' }}>👩‍🔬 Ver Pesquisadores</button>
      </Link>
    </main>
  );
}
