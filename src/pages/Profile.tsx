import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { User as UserIcon, Mail, FileText, Edit3, ShieldCheck, LogOut } from 'lucide-react';
import Header from '../components/Header';
import { useAuthStore } from '../store/useAuthStore';

export const Profile: React.FC = () => {
  const history = useHistory();
  const { user, loading, fetchUser, logout } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div data-testid="page-profile" className="min-h-screen bg-zinc-950 pb-32 text-white">
      <Header />

      <main className="mx-auto max-w-4xl px-6 pt-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-3 border-brand-green border-t-transparent" />
            <span className="mt-4 text-sm font-medium text-zinc-400">Carregando perfil...</span>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/60 shadow-2xl backdrop-blur-xl">
            {/* Profile Cover Banner */}
            <div className="h-44 bg-gradient-to-r from-emerald-800/50 via-zinc-800 to-zinc-900 relative">
              <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-emerald-400 backdrop-blur-md border border-emerald-500/20">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Conta Verificada</span>
              </div>
            </div>

            {/* Profile Content Details */}
            <div className="relative px-8 pb-10 pt-0">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-8">
                <div className="relative h-28 w-28 sm:h-36 sm:w-36 overflow-hidden rounded-3xl bg-zinc-800 ring-4 ring-zinc-950 shadow-2xl">
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt={`Foto de ${user.name || 'usuário'}`}
                      data-testid="profile-image"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-tr from-zinc-800 to-zinc-700 text-3xl font-bold text-zinc-300">
                      {user?.name ? user.name.slice(0, 2).toUpperCase() : <UserIcon className="h-12 w-12 text-zinc-500" />}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 w-fit">
                  <Link
                    to="/profile/edit"
                    className="flex items-center gap-2 rounded-xl bg-brand-green px-5 py-2.5 text-sm font-bold text-black shadow-lg shadow-brand-green/20 transition-all hover:bg-brand-hover hover:scale-105 active:scale-95"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Editar perfil</span>
                  </Link>

                  <button
                    type="button"
                    onClick={async () => {
                      await logout();
                      history.push('/');
                    }}
                    className="flex items-center gap-2 rounded-xl bg-zinc-800 px-4 py-2.5 text-sm font-bold text-rose-400 border border-zinc-700/60 transition-all hover:bg-rose-500/10 hover:border-rose-500/30 active:scale-95"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sair da conta</span>
                  </button>
                </div>
              </div>

              {/* User Fields Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-2xl bg-zinc-950/60 p-5 border border-zinc-850">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    <UserIcon className="h-4 w-4 text-brand-green" />
                    <span>Nome:</span>
                  </div>
                  <p className="mt-2 text-lg font-bold text-white">
                    {user?.name || 'Não informado'}
                  </p>
                </div>

                <div className="rounded-2xl bg-zinc-950/60 p-5 border border-zinc-850">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    <Mail className="h-4 w-4 text-brand-green" />
                    <span>Email:</span>
                  </div>
                  <p className="mt-2 text-base font-medium text-zinc-200 truncate">
                    {user?.email || 'Nenhum e-mail cadastrado'}
                  </p>
                </div>

                <div className="md:col-span-2 rounded-2xl bg-zinc-950/60 p-5 border border-zinc-850">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    <FileText className="h-4 w-4 text-brand-green" />
                    <span>Descrição:</span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                    {user?.description || 'Nenhuma biografia adicionada ainda.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
