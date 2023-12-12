import { useState } from 'react';

export const useRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const makeRequest = (request: Promise<T>) => {
    setError(null);
    setIsLoading(true);
    request
      .then((res: T) => {
        return res.json();
      })
      .then((res: T) => {
        if (res.error) throw new Error('error');
        setData(res);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return { isLoading, error, data, makeRequest };
};
