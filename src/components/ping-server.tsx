"use client";
import { useEffect } from "react";

const PollingComponent = () => {
  const fetchData = async () => {
    try {
      const response = await fetch("/api/ping");
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default PollingComponent;
