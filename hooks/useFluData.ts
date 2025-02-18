import useSWR from 'swr';
import { FluData } from '@/types/flu';
import { parseCSV } from '@/lib/utils';

export function useFluData() {
  const fetchFluData = async () => {
    const response = await fetch('/api/flu-data');
    if (!response.ok) {
      throw new Error('Failed to fetch flu data');
    }
    const data = await response.text();
    return parseCSV(data);
  };

  const { data, error, isLoading } = useSWR<FluData[]>('/api/flu-data', fetchFluData, {
    refreshInterval: 3600000, // Refresh every hour
    revalidateOnFocus: false
  });

  return {
    data,
    isLoading,
    error
  };
}
