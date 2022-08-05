import useSWR from 'swr';

import { fetcher } from '../lib/fetcher';

export function useFetchWithSWR<T = any>(key: string) {
  const { data, error } = useSWR<T, any>(key, fetcher);

  return {
    data: data || [],
    isLoading: !data && !error,
    isError: error,
  };
}
