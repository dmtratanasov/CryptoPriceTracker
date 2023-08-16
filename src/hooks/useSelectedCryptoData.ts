import { useState, useEffect, useCallback } from "react";
import { CryptoData, fetchSelectedCryptocurrencies } from "../utils/api";

const useSelectedCryptoData = (ids: string[]) => {
  const [selectedCryptocurrencies, setSelectedCryptocurrencies] = useState<
    CryptoData[]
  >([]);

  const fetchSelectedData = useCallback(async () => {
    if (ids) {
      try {
        const data = await fetchSelectedCryptocurrencies(ids);
        setSelectedCryptocurrencies(data);
      } catch (error) {
        setSelectedCryptocurrencies([]);
      }
    }
  }, [ids]);

  useEffect(() => {
    fetchSelectedData();
  }, [fetchSelectedData]);

  return { selectedCryptocurrencies, fetchSelectedData };
};

export default useSelectedCryptoData;
