'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { markup } from '../lib/markup';
import { initSite } from '../lib/site';

export default function Home() {
  useEffect(() => {
    initSite(gsap);
  }, []);

  return <div id="morrow" dangerouslySetInnerHTML={{ __html: markup }} />;
}
