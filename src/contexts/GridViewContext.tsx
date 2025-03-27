import React, { createContext, useContext, useState } from "react";

interface GridViewContextType {
    gridView: number;
    setGridView: (value: number) => void;
}

const GridViewContext = createContext<GridViewContextType | undefined>(undefined);

export const GridViewProvider = ({ children }: { children: React.ReactNode }) => {
    const [gridView, setGridView] = useState<number>(1);

    return (
        <GridViewContext.Provider value={{ gridView, setGridView }}>
            {children}
        </GridViewContext.Provider>
    );
};

export const useGridView = () => {
    const context = useContext(GridViewContext);
    if (!context) {
        throw new Error("useGridView must be used within a GridViewProvider");
    }
    return context;
};
