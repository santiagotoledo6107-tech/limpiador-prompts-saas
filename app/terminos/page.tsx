import Link from 'next/link';

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-300 p-6 md:p-12 max-w-3xl mx-auto">
      <Link href="/" className="text-sm text-blue-400 hover:underline mb-6 inline-block">
        ← Volver al Inicio
      </Link>
      
      <h1 className="text-2xl font-bold text-slate-100 mb-6">Términos y Condiciones de Uso</h1>
      
      <div className="flex flex-col gap-4 text-sm leading-relaxed">
        <p>
          Al acceder y utilizar <strong>PromptCleaner AI</strong>, aceptas cumplir con los siguientes términos y condiciones.
        </p>

        <h2 className="text-lg font-semibold text-slate-200 mt-2">1. Uso del Servicio</h2>
        <p>
          PromptCleaner AI es una herramienta de optimización de texto diseñada para mejorar instrucciones y prompts. El usuario es responsable del uso final que le dé a las respuestas o textos generados.
        </p>

        <h2 className="text-lg font-semibold text-slate-200 mt-2">2. Disponibilidad del Servicio</h2>
        <p>
          Nos esforzamos por mantener la herramienta disponible el 100% del tiempo de forma gratuita, pero no garantizamos la interrupción cero por tareas de mantenimiento o actualizaciones del servidor.
        </p>

        <h2 className="text-lg font-semibold text-slate-200 mt-2">3. Modificaciones</h2>
        <p>
          Nos reservamos el derecho de modificar o actualizar estos términos en cualquier momento para adaptarnos a mejoras del servicio o regulaciones legales.
        </p>
      </div>
    </main>
  );
}