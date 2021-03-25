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
    setContext?: (obj: object) => void;
}

export type { IProduct, IContextProps };
