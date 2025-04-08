import { useState, useEffect } from "react";

const useFetch = (url, defaultData = []) => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch(url);
        // const result = await response.json();
        
        setData(defaultData); // Use mock data for now
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // Re-fetch only when URL changes

  return { data, loading, error };
};

export default useFetch;