import { FC } from "react";
import { IProduct } from "ts/interfaces";

interface IProps {
    cart: IProduct[];
    setCart: (arr: IProduct[]) => void;
}

const CartElement: FC<IProps> = ({ cart, setCart }) => {
    return (
        <div className="absolute w-64 right-4 top-6 shadow text-black rounded-t-lg z-max">
            <ul className="p-3 space-y-2 overflow-y-scroll h-48 bg-white bg-opacity-30 blurred rounded-t-lg">
                {cart.map((p) => (
                    <li
                        key={p.id}
                        className="bg-white rounded-lg flex items-stretch overflow-hidden"
                    >
                        <p className="p-2 text-sm overflow-hidden flex-grow">
                            {p.name.substr(0, 100)}
                        </p>
                        <div className="border-l flex items-center bg-gray-800 text-white">
                            <p className="ml-2 mr-2 font-semibold ">
                                {p.price}zł
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
            <div className=" w-full bg-white flex justify-start space-x-1 items-center p-2 rounded-b-lg">
                <button className="bg-gray-100 text-black rounded p-2 transition-all hover:bg-green-100">
                    Zamów
                </button>
                <button
                    onClick={() => setCart([])}
                    className="bg-gray-100 text-black rounded p-2 transition-all hover:bg-red-100"
                >
                    Wyczyść Koszyk
                </button>
            </div>
        </div>
    );
};

export default CartElement;
