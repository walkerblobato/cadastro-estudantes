import { createContext, useContext, useState, useCallback } from 'react';


interface IMenuContextData {
    isMenuOpen: boolean;
    menuOptions: IMenuOption[];
    changeMenuOpen: () => void;
    setMenuOption: (newMenuOption: IMenuOption[]) => void;
}

interface IMenuOption {
    to: string,
    icon: string,
    label: string;
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
    const [ menuOptions, setMenuOption ] = useState<IMenuOption[]>([]);

    const changeMenuOpen = useCallback(() => {
        setIsMenuOpen(oldMenuOpen => !oldMenuOpen);
    }, []);

    const handleSetMenuOptions = useCallback((newMenuOptions: IMenuOption[]) => {
        setMenuOption(newMenuOptions);
    }, []);

    return (
        <MenuContext.Provider value={{ isMenuOpen, menuOptions, changeMenuOpen, setMenuOption: handleSetMenuOptions }}>
            {children}                
        </MenuContext.Provider>
    );
};
