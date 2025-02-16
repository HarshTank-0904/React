import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Prevent state update if component unmounts

    const fetchCurrencyData = async () => {
      try {
        const response = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch currency data");
        }

        const result = await response.json();

        if (isMounted) {
          setData(result[currency] || {});
          setError(null); // Reset error state on success
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setData({});
        }
      }
    };

    fetchCurrencyData();

    return () => {
      isMounted = false; // Cleanup function to prevent state updates if unmounted
    };
  }, [currency]);

  if (error) {
    console.error("Currency API Error:", error);
  }

  return data;
}

export default useCurrencyInfo;
