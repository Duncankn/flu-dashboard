import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { FluData } from "@/types/flu";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchFluData(): Promise<FluData[]> {
  try {
    // 1. 使用代理API路由
    const response = await fetch('/api/flu-data');
    if (!response.ok) {
      throw new Error('Failed to fetch flu data');
    }
    const data = await response.text();
    return parseCSV(data);
  } catch (error) {
    console.error('Error fetching flu data:', error);
    throw error;
  }
}

export function parseCSV(csvText: string): FluData[] {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(',');
      const entry= {} as Record<keyof FluData, number | string>;

      headers.forEach((header, index) => {
        const value = values[index];
        entry[header.trim() as keyof FluData] = isNaN(Number(value)) ? value : Number(value);
      });
      
      return entry as FluData;
    });
}
