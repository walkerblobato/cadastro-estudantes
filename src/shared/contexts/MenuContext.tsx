import { createContext, useContext, useState, useCallback } from 'react';


interface IMenuContextData {
    isMenuOpen: boolean;
    changeMenuOpen: () => void;
}

const MenuContext = createContext({} as IMenuContextData);

export const useMenuContext = () => {
    return useContext(MenuContext);
};

interface IAppMenuProvider {
    children: React.ReactNode;
}

export const MenuProvider: React.FC<IAppMenuProvider> = ({ children }) => {
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);

    const changeMenuOpen = useCallback(() => {
        setIsMenuOpen(oldMenuOpen => !oldMenuOpen);
    }, [isMenuOpen]);

    return (
        <MenuContext.Provider value={{ isMenuOpen, changeMenuOpen }}>
            {children}                
        </MenuContext.Provider>
    );
};
