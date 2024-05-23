import axios from "axios";
import React from "react";

const API_BASE_URL = "";

const useFetch = <T>(path: string, params: any = null) => {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);

  const loadData = async () => {
    setLoading(true); // Set loading to true when starting to fetch data
    try {
      console.log({ path });
      const response = await axios.get(`http://api/${path}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      });

      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error after logging it
    } finally {
      setLoading(false); // Set loading to false when data fetching is done
    }
  };

  React.useEffect(() => {
    loadData();
  }, [path]); // Add path and params as dependencies

  return { data, loading };
};

export default useFetch;
