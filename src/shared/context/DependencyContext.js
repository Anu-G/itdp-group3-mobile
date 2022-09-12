import { createContext, useContext } from "react";

export const DependencyContext = createContext({});

export function DependencyProvider({ children, services }) {
    return (
        <DependencyContext.Provider value={services}>
            {children}
        </DependencyContext.Provider>
    )
}

export const useDep = _ => useContext(DependencyContext);