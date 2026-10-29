'use client';

import { useEffect } from 'react';

interface AdBannerProps {
  slotId?: string;
  format?: 'auto' | 'horizontal' | 'rectangle';
  label?: string;
}

export default function AdBanner({
  slotId = '1234567890',
  format = 'auto',
  label = 'Publicidad',
}: AdBannerProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log('AdSense aún no cargado o bloqueado por AdBlock');
    }
  }, []);

  const clientID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <div className="w-full my-4 flex flex-col items-center">
      <span className="text-[10px] text-slate-600 uppercase tracking-wider mb-1 font-mono">
        {label}
      </span>

      <div className="w-full min-h-[90px] bg-slate-900/60 border border-slate-800/80 rounded-xl flex items-center justify-center overflow-hidden p-2">
        {clientID ? (
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%' }}
            data-ad-client={clientID}
            data-ad-slot={slotId}
            data-ad-format={format}
            data-full-width-responsive="true"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-1 text-slate-600 text-xs py-3">
            <span className="text-base">📢</span>
            <span className="font-medium">Espacio Reservado para Google AdSense</span>
            <span className="text-[10px] text-slate-700">
              (Se activará automáticamente al ingresar tu Client ID)
            </span>
          </div>
        )}
      </div>
    </div>
  );
}