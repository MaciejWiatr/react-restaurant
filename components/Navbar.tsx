import { FC } from "react";
import { FiShoppingCart } from "react-icons/fi";
import CartElement from "./CartElement";

interface IProps {
    changeBg: boolean;
    showCart: boolean;
    setShowCart: (val: boolean) => void;
}

const Navbar: FC<IProps> = ({ changeBg, showCart, setShowCart }) => {
    return (
        <nav
            className={`h-12 flex justify-between items-center fixed top-0 z-50 text-white w-full left-0  transition-all ${
                changeBg ? "blurred bg-black bg-opacity-20" : ""
            }`}
        >
            <h1 className="font-medium z-50 ml-4">Trattoria deWiatr</h1>
            <div className="relative flex flex-centers">
                <button
                    className="mr-4 text-xl"
                    onClick={() => setShowCart(!showCart)}
                >
                    <FiShoppingCart />
                </button>
                {showCart ? <CartElement /> : null}
            </div>
        </nav>
    );
};

export { Navbar };
