'use client';

import { useEffect } from 'react';
import { initMockData } from '@/lib/complaints';

export default function DataInitializer() {
  useEffect(() => {
    initMockData();
  }, []);

  return null;
}
