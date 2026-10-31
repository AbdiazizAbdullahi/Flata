"use client";

import { useEffect } from 'react';

export function StandaloneSite({ destination, brand = 'Gather & Grain' }: { destination: string; brand?: string }) {
  useEffect(() => { window.location.replace(destination); }, [destination]);
  return <main className="section-wrap" style={{paddingTop:100,paddingBottom:100}}><h1>{brand}</h1><p style={{marginTop:24}}>The website has a home of its own.</p><a className="text-link" href={destination}>Open {brand} ↗</a></main>;
}
