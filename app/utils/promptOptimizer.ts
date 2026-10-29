export function optimizePromptText(rawInput: string): string {
  const text = rawInput.trim();
  if (!text) return '';

  const lower = text.toLowerCase();

  // Detección dinámica del rol
  let role = 'Actúa como un asistente experto y estratega profesional.';
  
  if (lower.includes('correo') || lower.includes('email') || lower.includes('ventas') || lower.includes('vender')) {
    role = 'Actúa como un experto en Copywriting y Marketing Digital enfocado en conversiones.';
  } else if (lower.includes('código') || lower.includes('programar') || lower.includes('script') || lower.includes('función') || lower.includes('bug')) {
    role = 'Actúa como un Ingeniero de Software Senior experto en arquitectura de código limpio.';
  } else if (lower.includes('resumen') || lower.includes('resumir') || lower.includes('articulo') || lower.includes('texto')) {
    role = 'Actúa como un Editor y Sintetizador Profesional de Contenido.';
  } else if (lower.includes('idea') || lower.includes('crear') || lower.includes('negocio') || lower.includes('plan')) {
    role = 'Actúa como un Consultor Estratégico de Negocios y Emprendimiento.';
  }

  // Estructura final del prompt
  return `${role}

**CONTEXTO Y OBJETIVO PRINCIPAL:**
${text}

**INSTRUCCIONES CLAVE:**
1. Analiza la solicitud y responde de forma directa, estructurada y profesional.
2. Si faltan detalles críticos, asume el escenario más probable y menciónalo explícitamente.
3. Utiliza encabezados claros, listas con viñetas o tablas según corresponda.

**RESTRICCIONES:**
- Evita introducciones genéricas o explicaciones innecesarias al inicio.
- Mantén un tono conciso, profesional y directo al grano.

**FORMATO DE SALIDA:**
Proporciona la respuesta formateada en Markdown listo para copiar a ChatGPT o Claude.`;
}