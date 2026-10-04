import { createContext, useContext } from "react";

type Indicators = {
    name: string;
    trait: string;
    description: string;
    image: string;
}

export type DataContextType = {
    indicators: Record<string, Indicators>;
};

export const DataContext = createContext<DataContextType | null>(null);

export function useDataContext() {
    return useContext(DataContext);
}