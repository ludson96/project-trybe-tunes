import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Music, Search, Heart, User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export const Header: React.FC = () => {
  const { user, loading, fetchUser } = useAuthStore();

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  return (
    <header
      data-testid="header-component"
      className="sticky top-0 z-30 flex items-center justify-between border-b border-zinc-800/80 bg-zinc-950/80 px-6 py-4 backdrop-blur-md"
    >
      {/* Brand Logo */}
      <Link to="/search" className="flex items-center gap-2.5 transition-transform hover:scale-105">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-green to-emerald-400 text-black shadow-lg shadow-brand-green/20">
          <Music className="h-5 w-5 fill-current" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
            TunesApp
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-brand-green">PRO</span>
          </span>
          <span className="text-xs text-zinc-400">Streaming de Música</span>
        </div>
      </Link>

      {/* Navigation Links */}
      <nav className="flex items-center gap-1.5 rounded-full bg-zinc-900/90 p-1.5 border border-zinc-800 shadow-inner">
        <NavLink
          to="/search"
          data-testid="link-to-search"
          className={(isActive) =>
            `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              isActive
                ? 'bg-zinc-800 text-brand-green shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`
          }
        >
          <Search className="h-4 w-4" />
          <span>Pesquisar</span>
        </NavLink>

        <NavLink
          to="/favorites"
          data-testid="link-to-favorites"
          className={(isActive) =>
            `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              isActive
                ? 'bg-zinc-800 text-rose-400 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`
          }
        >
          <Heart className="h-4 w-4" />
          <span>Favoritas</span>
        </NavLink>

        <NavLink
          to="/profile"
          data-testid="link-to-profile"
          className={(isActive) =>
            `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              isActive
                ? 'bg-zinc-800 text-brand-green shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`
          }
        >
          <User className="h-4 w-4" />
          <span>Perfil</span>
        </NavLink>
      </nav>

      {/* User Info Capsule */}
      <div className="flex items-center gap-3">
        {loading ? (
          <div className="flex items-center gap-2 rounded-full bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-400 border border-zinc-800">
            <span className="h-2 w-2 animate-ping rounded-full bg-brand-green" />
            Carregando...
          </div>
        ) : (
          <Link
            to="/profile"
            className="flex items-center gap-2.5 rounded-full bg-zinc-900/90 py-1 pl-1.5 pr-3.5 border border-zinc-800/80 transition-all hover:border-zinc-700 hover:bg-zinc-850"
          >
            {user?.image ? (
              <img
                src={user.image}
                alt={user.name || 'Usuário'}
                className="h-8 w-8 rounded-full object-cover ring-2 ring-brand-green/30"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 font-semibold text-xs ring-1 ring-zinc-700">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : <User className="h-4 w-4" />}
              </div>
            )}
            <div data-testid="header-user-name" className="text-xs font-semibold text-zinc-200">
              {user?.name || 'Visitante'}
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
