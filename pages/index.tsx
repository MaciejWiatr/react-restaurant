import Head from "next/head";
import { ReactNode, useContext, useEffect, useState } from "react";
import { appContext } from "./_app";
import { Navbar } from "@Components/Navbar";
import HeroSection from "@Components/HeroSection";
import { ProductList } from "@Components/ProductList";
import { ProductModal } from "@Components/ProductModal";
import { IProduct, ICart } from "ts/interfaces";
import { UsernameModal } from "@Components/UsernameModal";
import { dummyProduct } from "src/constants";
import { ToastContainer, toast } from "react-toastify";

export default function Home(): ReactNode {
    const { products, username, cart, setContext } = useContext(appContext); // Wyciągam zmienne z globalnego kontekstu aplikacji
    const [productList, setProductList] = useState<IProduct[]>(products); // Tworzę lokalną liste produktów którą mogę modyfikować podczas np. wyszukiwania
    const [query, setQuery] = useState<string>(""); // Aktualne query czyli wartość pola wyszukiwarki
    const [modalIsOpen, setIsOpen] = useState<boolean>(false); // Zmienna przechowująca czy modal jest otwarty
    const [activeProduct, setActiveProduct] = useState<IProduct>(dummyProduct); // Zmienna przechowująca aktywnie przeglądany produkt
    const [showUserModal, setUserModal] = useState<boolean>(true); // Zmienna przechowująca wartość boolowską która określa czy modal użytkownika powinien się pokazywać

    const openModal = (productId: number) => {
        // Funkcja otwiera modal i ustawia aktywnie przeglądany produkt na ten który został kliknięty
        setActiveProduct(products.find((p: IProduct) => p.id === productId));
        setIsOpen(true);
    };

    const closeModal = () => {
        // Funkcja zamyka modal i ustawia aktywny produkt na tymczasowy
        setIsOpen(false);
        setActiveProduct(dummyProduct);
    };

    const addCartItem = (productId: number) => {
        setContext((c: ICart) => {
            // Za pomocą deskturkturyzacji dodaje produkt do koszyka w globalnym kontekście aplikacji
            return {
                ...c,
                cart: [...cart, products.find((p) => p.id === productId)],
            };
        });
        // Wyświetlam powiadomienie o dodanym produkcie
        toast(`Dodano ${activeProduct.name} do koszyka!`, {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    useEffect(() => {
        setProductList(
            products.filter((p) =>
                p.name.toLowerCase().includes(query.toLowerCase())
            )
        );
    }, [query, setProductList]);

    useEffect(() => {
        // Jeżeli użytkownik podał wcześniej imie to wyłączam UsernameModal
        if (username !== "") {
            setUserModal(false);
        }
        if (localStorage.getItem("name")) {
            setContext((c) => {
                return { ...c, username: localStorage.getItem("name") };
            });
            setUserModal(false);
        }
    }, [username]);

    return (
        <div className="min-h-screen flex flex-col">
            <Head>
                <title>
                    {/* Jeżeli aktywny produkt istnieje i nie jest przykładowym produktem
                        ustawiam title na "Przeglądasz: <nazwa_produktu>"
                    */}
                    {activeProduct.name && activeProduct.id !== -1
                        ? `Przeglądasz: ${activeProduct.name}`
                        : "Restauracja Trattoria deWiatr"}
                </title>
            </Head>
            <Navbar />
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
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}
