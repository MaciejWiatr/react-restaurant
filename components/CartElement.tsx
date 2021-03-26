import { appContext } from "pages/_app";
import { FC, useContext } from "react";
import Link from "next/link";

const CartElement: FC = () => {
    const { cart, setContext } = useContext(appContext);

    const clearCart = () => {
        setContext((c) => {
            return { ...c, cart: [] };
        });
    };

    return (
        <div className="absolute w-72 right-4 top-6 shadow text-black rounded-t-lg z-max">
            <ul className="p-3 space-y-2 overflow-y-scroll h-48 bg-white bg-opacity-30 blurred rounded-t-lg">
                {cart.map((p, index) => (
                    <li
                        key={index}
                        className="bg-white rounded-lg flex items-stretch overflow-hidden shadow-sm"
                    >
                        <p className="p-2 text-sm overflow-hidden flex-grow">
                            {p.name.substr(0, 100)}
                        </p>
                        <div className="border-l flex items-center bg-gray-800 text-white w-16">
                            <p className="ml-2 mr-2 font-semibold ">
                                {p.price}zł
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
            <div className=" w-full bg-white flex justify-start space-x-1 items-center p-2 rounded-b-lg">
                <Link href="/order" passHref>
                    <a className="bg-gray-100 text-black rounded p-2 ripple-bg-gray-50 focus:outline-none focus:ring-2 cursor-pointer">
                        Zamów
                    </a>
                </Link>
                <button
                    onClick={() => clearCart()}
                    className="bg-gray-100 text-black rounded p-2 ripple-bg-gray-50 focus:outline-none focus:ring-2"
                >
                    Wyczyść Koszyk
                </button>
            </div>
        </div>
    );
};

export default CartElement;
