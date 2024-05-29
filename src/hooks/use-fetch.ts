import axios from "axios";
import React from "react";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";
const useFetch = <T>(path: string, params: any = null) => {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  //
  const loadData = async () => {
    setLoading(true);
    try {
      console.log({ path });
      const response = await axios.get(`${API_BASE_URL}/${path}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      });

      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      console.log({ API_BASE_URL });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadData();
  }, [path]);

  return { data, loading };
};

export default useFetch;
