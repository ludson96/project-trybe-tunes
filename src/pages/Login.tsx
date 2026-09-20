import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ArrowRight, Sparkles, Disc3 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

interface LoginProps {
  login?: string;
  inputChangeLogin?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Login: React.FC<LoginProps> = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { login: storeLogin } = useAuthStore();

  const handleCreateUser = async (userName: string) => {
    setLoading(true);
    await storeLogin(userName);
    setLoading(false);
    history.push('/search');
  };

  const isButtonDisabled = name.trim().length < 3;

  return (
    <div
      data-testid="page-login"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4 py-12"
    >
      {/* Background Decorative Gradients */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-brand-green/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-emerald-600/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-zinc-900/50 blur-[120px]" />

      {/* Login Card */}
      <div className="relative w-full max-w-md rounded-3xl border border-zinc-800/80 bg-zinc-900/70 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-green to-emerald-400 text-black shadow-lg shadow-brand-green/30">
            <Disc3 className="h-9 w-9 animate-[spin_8s_linear_infinite]" />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/30" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl flex items-center gap-2">
            TunesApp
            <Sparkles className="h-5 w-5 text-brand-green" />
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Entre com seu nome para explorar álbuns, músicas e montar sua playlist favorita.
          </p>
        </div>

        {loading ? (
          <div className="mt-10 flex flex-col items-center justify-center gap-3 py-6">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-green border-t-transparent" />
            <span className="text-sm font-medium text-zinc-300">Carregando...</span>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!isButtonDisabled) handleCreateUser(name);
            }}
            className="mt-8 space-y-5"
          >
            <div>
              <label
                htmlFor="login"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400"
              >
                Nome do Usuário:
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="login"
                  data-testid="login-name-input"
                  name="login"
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                  placeholder="Ex: Ana Silva"
                  className="w-full rounded-xl border border-zinc-700/80 bg-zinc-950/80 px-4 py-3.5 text-sm text-white placeholder-zinc-500 transition-all focus:border-brand-green focus:bg-black focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                />
              </div>
              <p className="mt-1.5 text-xs text-zinc-500">
                Mínimo de 3 caracteres para habilitar a entrada.
              </p>
            </div>

            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={isButtonDisabled}
              className={`group flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all duration-200 ${
                isButtonDisabled
                  ? 'cursor-not-allowed bg-zinc-800 text-zinc-500'
                  : 'bg-brand-green text-black shadow-lg shadow-brand-green/25 hover:bg-brand-hover hover:scale-[1.01] active:scale-[0.99]'
              }`}
            >
              <span>Entrar</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
