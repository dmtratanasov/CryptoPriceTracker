import { useState, useEffect, useCallback } from 'react';
import { fetchCryptocurrencies, CryptoData } from '../utils/api';



const useCryptoData = (searchQuery: string | undefined) => {
  const [cryptocurrencies, setCryptocurrencies] = useState<CryptoData[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchCryptocurrencies(searchQuery);
      setCryptocurrencies(data);
    } catch (error) {
      setCryptocurrencies([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { cryptocurrencies, fetchData };
};

export default useCryptoData;
