import React from 'react';
import { Link } from 'react-router-dom';
import { Disc3, Home } from 'lucide-react';
import Header from '../components/Header';

export const NotFound: React.FC = () => {
  return (
    <div data-testid="page-not-found" className="min-h-screen bg-zinc-950 pb-32 text-white">
      <Header />
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center px-6 py-24 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-900 border border-zinc-800 text-brand-green shadow-xl mb-6">
          <Disc3 className="h-10 w-10 animate-spin" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white">404</h1>
        <h2 className="mt-2 text-xl font-bold text-zinc-300">Página Não Encontrada</h2>
        <p className="mt-2 text-sm text-zinc-500">
          A rota que você tentou acessar não existe ou foi movida.
        </p>
        <Link
          to="/search"
          className="mt-6 flex items-center gap-2 rounded-xl bg-brand-green px-5 py-3 text-sm font-bold text-black shadow-lg shadow-brand-green/20 transition hover:bg-brand-hover hover:scale-105"
        >
          <Home className="h-4 w-4" />
          <span>Voltar para Início</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
