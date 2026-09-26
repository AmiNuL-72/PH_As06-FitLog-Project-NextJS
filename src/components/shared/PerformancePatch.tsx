'use client';

import { useEffect } from 'react';


export default function PerformancePatch() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      const originalMeasure = performance.measure.bind(performance);
      (performance as any).measure = function (name: string, start?: any, end?: any) {
        try {
          return originalMeasure(name, start, end);
        } catch (err: any) {
          
          if (err instanceof TypeError && err.message?.includes('negative time stamp')) {
            return {} as PerformanceMeasure;
          }
          throw err;
        }
      };

      return () => {
        performance.measure = originalMeasure;
      };
    }
  }, []);

  return null;
}
