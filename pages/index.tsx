import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { appContext } from "./_app";
import { Navbar } from "@Components/Navbar";
import HeroSection from "@Components/HeroSection";
import { ProductList } from "@Components/ProductList";
import { ProductModal } from "@Components/ProductModal";
import { IProduct } from "ts/interfaces";
import { UsernameModal } from "@Components/UsernameModal";
import { dummyProduct } from "src/constants";

export default function Home() {
    const { products, username, cart, setContext } = useContext(appContext);
    const [productList, setProductList] = useState<IProduct[]>(products);
    const [changeBg, setChangeBg] = useState<boolean>(false);
    const [scrollVal, setScrollVal] = useState<number>(0);
    const [query, setQuery] = useState<string>("");
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [activeProduct, setActiveProduct] = useState<IProduct>(dummyProduct);
    const [showCart, setShowCart] = useState<boolean>(false);
    const [showUserModal, setUserModal] = useState<boolean>(true);

    function openModal(productId: number) {
        setActiveProduct(products.find((p: IProduct) => p.id === productId));
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        setActiveProduct(dummyProduct);
    }

    const updateScrollVal = () => {
        setScrollVal(window.pageYOffset);
    };

    const addCartItem = (productId: number) => {
        setContext((c) => {
            return {
                ...c,
                cart: [...cart, products.find((p) => p.id === productId)],
            };
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", updateScrollVal);
        return () => {
            window.removeEventListener("scroll", updateScrollVal);
        };
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
                p.name.toLowerCase().includes(query.toLowerCase())
            )
        );
    }, [query, setProductList]);

    useEffect(() => {
        if (username !== "") {
            setUserModal(false);
        }
    }, [username]);

    return (
        <div className="min-h-screen flex flex-col">
            <Head>
                <title>
                    {activeProduct.name && activeProduct.id !== -1
                        ? `Przeglądasz: ${activeProduct.name}`
                        : "Restauracja Trattoria deWiatr"}
                </title>
            </Head>
            <Navbar
                changeBg={changeBg}
                showCart={showCart}
                setShowCart={setShowCart}
            ></Navbar>
            {showUserModal ? <UsernameModal /> : null}
            <HeroSection
                q={query}
                setQ={setQuery}
                username={username}
            ></HeroSection>
            <ProductList
                openModal={openModal}
                productList={productList}
            ></ProductList>
            <footer className="bg-black text-white w-full h-14 flex flex-center">
                <p>Trattoria deWiatr </p>
            </footer>
            <ProductModal
                modalIsOpen={modalIsOpen}
                activeProduct={activeProduct}
                closeModal={closeModal}
                addCartItem={addCartItem}
            ></ProductModal>
        </div>
    );
}
