import { appContext } from "pages/_app";
import { FC, useContext, useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import CartElement from "./CartElement";

const Navbar: FC = () => {
    const { cart } = useContext(appContext); // Korzystam z wartości cart znajdującej się w kontekście
    const [changeBg, setChangeBg] = useState<boolean>(false); // Tworze zmienną służącą do sprawdzania czy navbar powinien być zablurowany
    const [scrollVal, setScrollVal] = useState<number>(0); // Zmienna która będzie przechowywała wartość scrolla użytkownika
    const [showCart, setShowCart] = useState<boolean>(false); // Zmienna przechowująca wartość boolowską która określa czy koszyk powinien się pokazywać

    const updateScrollVal = () => {
        // Uaktualnia wartość scrollVal aby była równa wartości scrolla użytkownika
        setScrollVal(window.pageYOffset);
    };

    useEffect(() => {
        // Dodaje event listener do scrolla
        window.addEventListener("scroll", updateScrollVal);
        return () => {
            // Po usunięciu komponentu pozbywam się event listenera
            window.removeEventListener("scroll", updateScrollVal);
        };
    }, []);

    useEffect(() => {
        // Jeżeli wartość scrolla jest większa niż 20 to zmieniam tło navbara
        if (scrollVal > 20) {
            setChangeBg(true);
        } else {
            setChangeBg(false);
        }
    }, [scrollVal]);

    return (
        <nav
            className={`h-14 flex justify-between items-center fixed top-0 z-50 text-white w-full left-0  transition-all ${
                changeBg ? "blurred bg-black bg-opacity-20" : ""
            }`}
        >
            <h1 className="font-medium z-50 ml-6">Trattoria deWiatr</h1>
            <div className="relative flex flex-centers">
                <button
                    name="cart__button"
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
