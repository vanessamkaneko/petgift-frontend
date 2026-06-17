import { useEffect, useState } from 'react';
import api from '../services/api';

export function useFetch(endpoint) {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(endpoint).then((res) => setData(res.data));
  }, [endpoint]);

  return { data };
}
