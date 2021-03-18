import { FiShoppingCart } from "react-icons/fi";
import CartElement from "../components/CartElement";

export function Navbar(props) {
    return (
        <nav
            className={`h-12 flex justify-between items-center fixed top-0 z-50 text-white w-full left-0  transition-all ${
                props.changeBg ? "blurred bg-black bg-opacity-20" : ""
            }`}
        >
            <h1 className="font-medium z-50 ml-4">Trattoria deBarwi</h1>
            <div className="relative flex flex-centers">
                <button
                    className="mr-4 text-xl"
                    onClick={() => props.setShowCart(!props.showCart)}
                >
                    <FiShoppingCart />
                </button>
                {props.showCart ? (
                    <CartElement
                        cart={props.cart}
                        setCart={props.setCart}
                    ></CartElement>
                ) : null}
            </div>
        </nav>
    );
}
