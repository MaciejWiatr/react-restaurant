import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { productsContext } from "./_app";
import { Navbar } from "@Components/Navbar";
import HeroSection from "@Components/HeroSection";
import { ProductList } from "@Components/ProductList";
import { ProductModal } from "@Components/ProductModal";
import { IProduct } from "ts/interfaces";
const dummyProduct = {
    id: -1,
    name: "",
    description: "",
    img: "",
    price: 0,
    isAvailable: false,
};

export default function Home() {
    const { products } = useContext(productsContext);
    const [productList, setProductList] = useState<IProduct[]>(products);
    const [changeBg, setChangeBg] = useState<boolean>(false);
    const [scrollVal, setScrollVal] = useState<number>(0);
    const [q, setQ] = useState<string>("");
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [activeProduct, setActiveProduct] = useState<IProduct>(dummyProduct);
    const [cart, setCart] = useState<IProduct[]>(new Array());
    const [showCart, setShowCart] = useState<boolean>(false);

    function openModal(productId: number) {
        setActiveProduct(products.find((p: IProduct) => p.id === productId));
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        setActiveProduct(dummyProduct);
    }

    const addCartItem = (productId: number) => {
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
        <div className="min-h-screen flex flex-col">
            <Head>
                <title>
                    {activeProduct.name !== ""
                        ? `Przeglądasz: ${activeProduct.name}`
                        : "Restauracja Trattoria deWiatr"}
                </title>
            </Head>
            <Navbar
                changeBg={changeBg}
                cart={cart}
                setCart={setCart}
                showCart={showCart}
                setShowCart={setShowCart}
            ></Navbar>
            <HeroSection q={q} setQ={setQ}></HeroSection>
            <ProductList
                openModal={openModal}
                productList={productList}
            ></ProductList>
            <footer className="bg-gray-900 text-white w-full h-14">test</footer>
            <ProductModal
                modalIsOpen={modalIsOpen}
                actveProduct={activeProduct}
                addCartItem={addCartItem}
                closeModal={closeModal}
            ></ProductModal>
        </div>
    );
}
