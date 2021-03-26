import { appContext } from "pages/_app";
import { FC, useContext } from "react";
import { FiShoppingCart } from "react-icons/fi";
import CartElement from "./CartElement";

interface IProps {
    changeBg: boolean;
    showCart: boolean;
    setShowCart: (val: boolean) => void;
}

const Navbar: FC<IProps> = ({ changeBg, showCart, setShowCart }) => {
    const { cart } = useContext(appContext);

    return (
        <nav
            className={`h-14 flex justify-between items-center fixed top-0 z-50 text-white w-full left-0  transition-all ${
                changeBg ? "blurred bg-black bg-opacity-20" : ""
            }`}
        >
            <h1 className="font-medium z-50 ml-6">Trattoria deWiatr</h1>
            <div className="relative flex flex-centers">
                <button
                    className="mr-6 text-2xl focus:outline-none"
                    onClick={() => setShowCart(!showCart)}
                >
                    <FiShoppingCart />
                </button>
                {cart.length > 0 ? (
                    <div className="h-5 w-5 absolute right-3 -top-2 bg-red-500 text white rounded-full text-xs flex flex-center animate__bounceIn">
                        {" "}
                        <p className="">{cart.length}</p>
                    </div>
                ) : null}

                {showCart ? <CartElement /> : null}
            </div>
        </nav>
    );
};

export { Navbar };
