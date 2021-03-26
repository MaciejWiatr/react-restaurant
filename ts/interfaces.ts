// W tym pliku definiuje globalne interfejsy

interface IProduct {
    id: number;
    name: string;
    img: string;
    description: string;
    price: number;
    isAvailable: boolean;
}

interface IContextProps {
    products: IProduct[];
    cart: IProduct[];
    username: string;
    setContext?: (obj: any) => void;
}

interface ICart {
    products: IProduct[];
    cart: IProduct[];
    username: string;
}

export type { IProduct, IContextProps, ICart };
