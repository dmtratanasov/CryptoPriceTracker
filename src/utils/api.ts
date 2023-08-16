import axios from 'axios';

const COINCAP_API_BASE_URL = 'https://api.coincap.io/v2';

export interface CryptoData {
    id: string;
    rank: number;
    symbol: string;
    name: string;
    priceUsd: number;
    changePercent24Hr: number;
    selected: boolean;
  }

  
  export async function fetchCryptocurrencies(query: string | undefined): Promise<CryptoData[]> {
    try {
      const response = await axios.get(`${COINCAP_API_BASE_URL}/assets`, {
        params: {
          limit: 20,
          search: query,
        },
      });
  
      return response.data.data.map((crypto: any) => ({
        id: crypto.id,
        rank: parseInt(crypto.rank),
        symbol: crypto.symbol,
        name: crypto.name,
        priceUsd: parseFloat(crypto.priceUsd),
        changePercent24Hr: parseFloat(crypto.changePercent24Hr),
        selected: false
      }));
    } catch (error) {
      console.error('Error fetching cryptocurrency data:', error);
      throw error;
    }
  }

  export async function fetchSelectedCryptocurrencies(ids: string[] | undefined): Promise<CryptoData[]> {
    console.log(ids,"IDS!!!!!!!!");
    if(ids && ids.length > 0){
      try {
        const response = await axios.get(`${COINCAP_API_BASE_URL}/assets`, {
          params: {
            limit: 20,
            ids: ids?.join(',')
          },
        });
    
        return response.data.data.map((crypto: any) => ({
          id: crypto.id,
          rank: parseInt(crypto.rank),
          symbol: crypto.symbol,
          name: crypto.name,
          priceUsd: parseFloat(crypto.priceUsd),
          changePercent24Hr: parseFloat(crypto.changePercent24Hr),
          selected: false
        }));
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
        throw error;
      }
    }else{
      console.log("NO IDS!!!!!!!!");
      return [];
    }
  }
