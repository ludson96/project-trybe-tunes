import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { User as UserIcon, Mail, FileText, Image as ImageIcon, Save, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import { useAuthStore } from '../store/useAuthStore';
import { User } from '../types';

export const ProfileEdit: React.FC = () => {
  const history = useHistory();
  const { user, loading: storeLoading, fetchUser, updateProfile } = useAuthStore();

  const [formData, setFormData] = useState<User>({
    name: '',
    email: '',
    description: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      fetchUser();
    } else {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        description: user.description || '',
        image: user.image || '',
      });
    }
  }, [user, fetchUser]);

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid =
    Boolean(formData.name && formData.name.trim().length > 0) &&
    Boolean(formData.email && formData.email.trim().length > 0) &&
    Boolean(formData.description && formData.description.trim().length > 0) &&
    Boolean(formData.image && formData.image.trim().length > 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setLoading(true);
    await updateProfile(formData);
    setLoading(false);
    history.push('/profile');
  };

  return (
    <div data-testid="page-profile-edit" className="min-h-screen bg-zinc-950 pb-32 text-white">
      <Header />

      <main className="mx-auto max-w-2xl px-6 pt-10">
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => history.push('/profile')}
            className="flex items-center gap-2 text-xs font-semibold text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar ao perfil</span>
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
            Configurações
          </span>
        </div>

        {loading || storeLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-3 border-brand-green border-t-transparent" />
            <span className="mt-4 text-sm font-medium text-zinc-400">Carregando...</span>
          </div>
        ) : (
          <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/70 p-8 shadow-2xl backdrop-blur-xl">
            <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
              Editar Perfil
            </h1>
            <p className="text-xs text-zinc-400 mb-8">
              Personalize suas informações públicas de exibição.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Preview Avatar */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-950/60 border border-zinc-850">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-zinc-800 ring-2 ring-zinc-700">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Prévia"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs font-bold text-zinc-400">
                      Prévia
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white truncate">
                    {formData.name || 'Seu Nome'}
                  </p>
                  <p className="text-xs text-zinc-400 truncate">
                    {formData.email || 'seuemail@exemplo.com'}
                  </p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-300"
                >
                  <UserIcon className="h-4 w-4 text-brand-green" />
                  Nome:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  data-testid="edit-input-name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nome completo"
                  className="w-full rounded-xl border border-zinc-750 bg-zinc-950/80 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-300"
                >
                  <Mail className="h-4 w-4 text-brand-green" />
                  E-mail:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  data-testid="edit-input-email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu.email@provedor.com"
                  className="w-full rounded-xl border border-zinc-750 bg-zinc-950/80 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-300"
                >
                  <FileText className="h-4 w-4 text-brand-green" />
                  Descrição:
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  data-testid="edit-input-description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Conte um pouco sobre suas preferências musicais..."
                  className="w-full rounded-xl border border-zinc-750 bg-zinc-950/80 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                />
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-300"
                >
                  <ImageIcon className="h-4 w-4 text-brand-green" />
                  URL da Imagem de Perfil:
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  data-testid="edit-input-image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full rounded-xl border border-zinc-750 bg-zinc-950/80 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                />
              </div>

              <button
                type="submit"
                data-testid="edit-button-save"
                disabled={!isFormValid}
                className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all ${
                  !isFormValid
                    ? 'cursor-not-allowed bg-zinc-800 text-zinc-500'
                    : 'bg-brand-green text-black shadow-lg shadow-brand-green/25 hover:bg-brand-hover hover:scale-[1.01] active:scale-[0.99]'
                }`}
              >
                <Save className="h-4 w-4" />
                <span>Salvar Alterações</span>
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfileEdit;
