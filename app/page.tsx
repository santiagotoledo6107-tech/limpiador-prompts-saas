'use client';

import { useState, useEffect } from 'react';
import AdBanner from '@/app/components/AdBanner';
import { optimizePromptText } from '@/app/utils/promptOptimizer';
import { supabase } from '@/app/utils/supabaseClient';

interface SavedPrompt {
  id: string;
  original_text: string;
  optimized_text: string;
  created_at: string;
}

export default function Home() {
  const [inputPrompt, setInputPrompt] = useState('');
  const [optimizedPrompt, setOptimizedPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  
  // Estado real de usuario de Supabase
  const [user, setUser] = useState<any>(null);
  const [history, setHistory] = useState<SavedPrompt[]>([]);

  useEffect(() => {
    // Cargar borrador guardado localmente (Paso 3.2)
    const savedTempInput = localStorage.getItem('temp_input_prompt');
    const savedTempOutput = localStorage.getItem('temp_optimized_prompt');
    if (savedTempInput) setInputPrompt(savedTempInput);
    if (savedTempOutput) setOptimizedPrompt(savedTempOutput);

    // Comprobar sesión actual en Supabase
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();

    // Suscribirse a cambios en la autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: typeof window !== 'undefined' ? window.location.origin : '',
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setHistory([]);
  };

  const handleOptimize = () => {
    if (!inputPrompt.trim()) return;

    setIsLoading(true);
    setCopied(false);

    setTimeout(() => {
      const result = optimizePromptText(inputPrompt);
      setOptimizedPrompt(result);
      setIsLoading(false);

      if (!user) {
        localStorage.setItem('temp_input_prompt', inputPrompt);
        localStorage.setItem('temp_optimized_prompt', result);
      }
    }, 300);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory(history.filter((item) => item.id !== id));
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-4 md:p-8 relative overflow-x-hidden">
      
      {/* HEADER / BARRA SUPERIOR */}
      <header className="w-full max-w-4xl flex justify-between items-center py-4 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            PromptCleaner AI
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsHistoryOpen(true)}
            className="bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm font-medium px-3 py-2 rounded-lg border border-slate-800 transition flex items-center gap-2"
          >
            📂 Historial
          </button>

          {user ? (
            <button
              onClick={handleLogout}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium px-4 py-2 rounded-lg border border-slate-700 transition"
            >
              Cerrar Sesión
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </header>

      {/* BLOQUE DE ANUNCIO 1: SUPERIOR */}
      <div className="w-full max-w-4xl">
        <AdBanner format="horizontal" label="Publicidad" />
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
        
        {/* COLUMNA IZQUIERDA: ENTRADA */}
        <div className="flex flex-col gap-4 bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <label className="text-sm font-semibold text-slate-300">
            Pega tu idea o borrador de prompt:
          </label>
          <textarea
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ejemplo: Escribe un correo para vender un curso de cocina a emprendedores..."
            className="w-full h-60 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition resize-none"
          />
          <button
            onClick={handleOptimize}
            disabled={isLoading || !inputPrompt.trim()}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-medium py-3 rounded-lg transition text-sm flex items-center justify-center gap-2"
          >
            {isLoading ? 'Optimizando...' : '✨ Optimizar Prompt'}
          </button>
        </div>

        {/* COLUMNA DERECHA: RESULTADO */}
        <div className="flex flex-col gap-4 bg-slate-900 border border-slate-800 p-6 rounded-xl relative">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-slate-300">
              Prompt Estructurado:
            </label>
            {optimizedPrompt && (
              <button
                onClick={() => handleCopy(optimizedPrompt)}
                className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-md border border-slate-700 text-slate-300 transition"
              >
                {copied ? '✅ ¡Copiado!' : '📋 Copiar'}
              </button>
            )}
          </div>

          <div className="w-full h-60 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-300 overflow-y-auto whitespace-pre-wrap font-mono">
            {optimizedPrompt || (
              <span className="text-slate-600 font-sans italic">
                El prompt estructurado y profesional aparecerá aquí listo para usar en ChatGPT o Claude.
              </span>
            )}
          </div>

          {!user && (
            <div className="bg-blue-950/40 border border-blue-900/50 rounded-lg p-3 text-xs text-blue-300 flex justify-between items-center">
              <span>💾 ¡Inicia sesión gratis para guardar tu historial!</span>
              <button 
                onClick={handleLogin}
                className="font-semibold underline cursor-pointer hover:text-white"
              >
                Registrarme
              </button>
            </div>
          )}
        </div>

      </div>

      {/* BLOQUE DE ANUNCIO 2: INFERIOR */}
      <div className="w-full max-w-4xl">
        <AdBanner format="auto" label="Publicidad" />
      </div>

      {/* PANEL LATERAL DE HISTORIAL */}
      {isHistoryOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 h-full p-6 border-l border-slate-800 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-800 mb-6">
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  📂 Mi Historial de Prompts
                </h2>
                <button
                  onClick={() => setIsHistoryOpen(false)}
                  className="text-slate-400 hover:text-white text-lg font-bold p-1"
                >
                  ✕
                </button>
              </div>

              {!user ? (
                <div className="text-center py-12 px-4 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-4xl block mb-3">🔒</span>
                  <h3 className="text-md font-semibold text-slate-200 mb-2">
                    Historial Desactivado
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Estás navegando como invitado. Inicia sesión para guardar automáticamente todos tus prompts optimizados.
                  </p>
                  <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-2.5 rounded-lg transition"
                  >
                    Iniciar Sesión Gratis
                  </button>
                </div>
              ) : history.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-8">
                  Aún no tienes prompts guardados.
                </p>
              ) : (
                <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-1">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-slate-950 border border-slate-800 rounded-lg hover:border-slate-700 transition flex flex-col gap-2"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-medium text-slate-300 line-clamp-1">
                          {item.original_text}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {item.created_at}
                        </span>
                      </div>
                      <div className="flex gap-2 justify-end mt-1">
                        <button
                          onClick={() => handleCopy(item.optimized_text)}
                          className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded transition"
                        >
                          📋 Copiar
                        </button>
                        <button
                          onClick={() => handleDeleteHistoryItem(item.id)}
                          className="text-[11px] bg-red-950/40 hover:bg-red-900/60 text-red-400 px-2 py-1 rounded transition"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="my-2">
              <AdBanner format="rectangle" label="Patrocinado" />
            </div>

            <div className="pt-2 border-t border-slate-800 text-center text-[11px] text-slate-500">
              PromptCleaner AI • Tus datos están protegidos
            </div>
          </div>
        </div>
      )}
      {/* FOOTER CON ENLACES LEGALES */}
      <footer className="w-full max-w-4xl py-6 border-t border-slate-800/80 mt-12 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <span>© 2026 PromptCleaner AI. Todos los derechos reservados.</span>
        <div className="flex gap-4">
          <a href="/privacidad" className="hover:text-slate-300 transition underline">
            Política de Privacidad
          </a>
          <a href="/terminos" className="hover:text-slate-300 transition underline">
            Términos y Condiciones
          </a>
        </div>
      </footer>

    </main>
  );
}