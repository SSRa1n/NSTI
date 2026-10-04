import { useEffect, useState } from "react";
import { DataContext, type DataContextType } from "./datacontext";

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [indicatorDetails, setIndicators] = useState<DataContextType['indicators'] | null>(null);

  const dataContextValue: DataContextType = {
    indicators: indicatorDetails || {},
  };

  useEffect(() => {
    fetch("./data/json/indicator_details.json")
    .then((response) => response.json())
    .then(setIndicators)
  }, []);

  return (
    <DataContext.Provider value={dataContextValue}>
      {children}
    </DataContext.Provider>
  );
}