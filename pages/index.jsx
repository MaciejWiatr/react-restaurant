import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { productsContext } from "./_app";
import { FiShoppingCart } from "react-icons/fi";
import Modal from "react-modal";

const customStyles = {
    overlay: {
        zIndex: "98",
    },
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: "0px",
    },
};

const Card = ({ name, description, id, openModal, img }) => {
    return (
        <div className="w-full md:w-64 rounded shadow-lg overflow-hidden m-2 transform transition-all hover:scale-105 cursor-pointer">
            <figure className="h-32 overflow-hidden relative">
                <Image src={img} layout="fill" className="object-cover" />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
            </figure>
            <div className="p-3">
                <figcaption className="pb-2">
                    <h2 className="text-lg font-medium">{name}</h2>
                    <p className="text-sm">{description.substring(0, 50)}...</p>
                </figcaption>
                <div>
                    <button
                        onClick={() => openModal(id)}
                        className="bg-black hover:bg-gray-800 text-white rounded p-1 pl-2 pr-2 text-md"
                    >
                        Zamów
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function Home() {
    const { products } = useContext(productsContext);
    const [productList, setProductList] = useState(products);
    const [changeBg, setChangeBg] = useState(false);
    const [scrollVal, setScrollVal] = useState(0);
    const [q, setQ] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [actveProduct, setActiveProduct] = useState({
        name: "",
        description: "",
    });
    const [cart, setCart] = useState(new Array());
    const [showCart, setShowCart] = useState(false);

    function openModal(productId) {
        setActiveProduct(products.find((p) => p.id === productId));
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const addCartItem = (productId) => {
        setCart([...cart, products.find((p) => p.id === productId)]);
    };

    useEffect(() => {
        window.addEventListener("scroll", (e) => {
            setScrollVal(window.pageYOffset);
        });
    }, []);

    useEffect(() => {
        if (scrollVal > 20) {
            setChangeBg(true);
        } else {
            setChangeBg(false);
        }
    }, [scrollVal]);

    useEffect(() => {
        setProductList(
            products.filter((p) =>
                p.name.toLowerCase().includes(q.toLowerCase())
            )
        );
    }, [q, setProductList]);

    return (
        <div className="min-h-screen">
            <nav
                className={`h-12 flex justify-between items-center fixed top-0 z-50 text-white w-full left-0  transition-all ${
                    changeBg ? "blurred bg-black bg-opacity-20" : ""
                }`}
            >
                <h1 className="font-medium z-50 ml-4">Trattoria deBarwi</h1>
                <div className="relative flex flex-centers">
                    <button className="mr-4 text-xl">
                        <FiShoppingCart />
                    </button>
                    <div className="absolute w-48 h-32 bg-white right-4 top-6 rounded-lg shadow"></div>
                </div>
            </nav>
            <div
                className="pt-20 pb-20 md:pt-40 md:pb-40
             flex flex-center  bg-hero-img bg-center bg-cover text-white relative"
            >
                <div className="h-2/4 w-full md:w-3/5 p-2 z-30 max-w-4xl">
                    <h1 className="text-5xl font-bold text-center md:text-left mt-2 mb-2">
                        Trattoria deBarwi
                    </h1>
                    <form className="flex flex-col">
                        <label className="text-md mt-3 mb-2">Wyszukaj</label>
                        <input
                            className="h-12 p-3 focus:outline-none focus:ring-2 rounded text-black"
                            placeholder="Nazwa jedzonka"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />
                    </form>
                </div>
                <div className="absolute w-full h-full top-0 left-0 bg-black opacity-20"></div>
            </div>
            <div className="w-full flex justify-center relative -top-24">
                <div className="w-full p-4 md:w-3/4 flex items-start flex-wrap justify-around max-w-4xl ">
                    {productList.map((p) => (
                        <Card
                            key={p.id}
                            name={p.name}
                            description={p.description}
                            id={p.id}
                            img={p.img}
                            openModal={openModal}
                        ></Card>
                    ))}
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                appElement={
                    typeof window === "undefined"
                        ? null
                        : document.getElementById("__next")
                }
            >
                <div className="w-card bg-white flex overflow-hidden z-max">
                    <div className="w-1/2 h-full overflow-hidden">
                        <img src="/img.jpg" className="h-full object-cover" />
                    </div>
                    <div
                        className="w-1/2 h-full p-3 flex flex-col
                     items-start"
                    >
                        <h2 className="font-semibold text-2xl">
                            {actveProduct.name}
                        </h2>
                        <p className="text-sm text-gray-500">Składniki:</p>
                        <ul className="list-decimal pl-4">
                            <li>Ciasto na pizze</li>
                            <li>Sos do pizzy</li>
                            <li>Ser do pizzy</li>
                        </ul>
                        <p className="text-sm text-gray-500">Opis:</p>
                        <p className="flex-grow">{actveProduct.description}</p>
                        <p className="text-sm text-gray-500">Cena:</p>
                        <p className="text-lg font-medium mb-2"> 12.99zł</p>
                        <button
                            onClick={() => addCartItem(actveProduct.id)}
                            className="bg-black text-white rounded p-1 pl-2 pr-2 transform hover:scale-105 hover:bg-gray-700 transition-all"
                        >
                            Dodaj do koszyka
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
