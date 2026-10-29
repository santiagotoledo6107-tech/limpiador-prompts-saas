import Link from 'next/link';

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-300 p-6 md:p-12 max-w-3xl mx-auto">
      <Link href="/" className="text-sm text-blue-400 hover:underline mb-6 inline-block">
        ← Volver al Inicio
      </Link>
      
      <h1 className="text-2xl font-bold text-slate-100 mb-6">Política de Privacidad</h1>
      
      <div className="flex flex-col gap-4 text-sm leading-relaxed">
        <p>
          En <strong>PromptCleaner AI</strong>, la privacidad de nuestros usuarios es de máxima importancia. Esta política explica qué información recopilamos y cómo la utilizamos.
        </p>

        <h2 className="text-lg font-semibold text-slate-200 mt-2">1. Uso de Datos en Modo Invitado</h2>
        <p>
          Si utilizas la herramienta sin iniciar sesión, los textos ingresados y procesados se almacenan únicamente en el almacenamiento local de tu navegador (localStorage) y no se guardan en nuestros servidores.
        </p>

        <h2 className="text-lg font-semibold text-slate-200 mt-2">2. Usuarios Registrados</h2>
        <p>
          Al iniciar sesión mediante nuestros proveedores de autenticación, únicamente almacenamos tu identificador de usuario y el historial de prompts que decidas guardar de forma explícita para proporcionarte la función de biblioteca personal.
        </p>

        <h2 className="text-lg font-semibold text-slate-200 mt-2">3. Cookies y Publicidad de Terceros (Google AdSense)</h2>
        <p>
          Utilizamos proveedores de terceros, incluido Google, para mostrar anuncios cuando visitas nuestro sitio web. Google utiliza cookies para publicar anuncios basados en las visitas anteriores de los usuarios a este u otros sitios web.
        </p>
        <p>
          Los usuarios pueden inhabilitar la publicidad personalizada dirigiéndose a la Configuración de anuncios de Google.
        </p>

        <h2 className="text-lg font-semibold text-slate-200 mt-2">4. Contacto</h2>
        <p>
          Si tienes dudas sobre nuestra política de privacidad, puedes contactarnos a través de nuestra plataforma.
        </p>
      </div>
    </main>
  );
}