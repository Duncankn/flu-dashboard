import { FluData } from '@/types/flu';
import Papa from 'papaparse';

export async function fetchFluData(): Promise<FluData[]> {
  try {
    const response = await fetch('http://www.chp.gov.hk/files/misc/flux_data.csv');
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          const data = results.data as FluData[];
          resolve(data.sort((a, b) => b.Year - a.Year || b.Week - a.Week));
        },
        
        error: (error?: unknown) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching flu data:', error);
    return [];
  }
}

export function calculateRiskLevel(value: number): { level: string; color: string } {
  if (value > 8) return { level: '高', color: 'bg-red-500' };
  if (value > 5) return { level: '中', color: 'bg-yellow-500' };
  return { level: '低', color: 'bg-green-500' };
}