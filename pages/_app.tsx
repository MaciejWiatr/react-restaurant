import { createContext, useState } from "react";
import "../styles/globals.scss";
import Head from "next/head";
import { IContextProps } from "ts/interfaces";

const defaultContext = {
    products: [
        {
            id: 1,
            name: "Pizza Neapolitana",
            img: "/img.jpg",
            description:
                "Pizzę o tej nazwie można wyrabiać tylko według ściśle określonej receptury i tylko z oryginalnych składników",
            price: 12.99,
            isAvailable: true,
        },
        {
            id: 2,
            name: "Placek ziemniaczany pizza",
            img: "/img2.jpeg",
            description:
                "Uwielbiam jedno i drugie, a to połączenie jest dla mnie wręcz doskonałe",
            price: 0.99,
            isAvailable: true,
        },
        {
            id: 3,
            name: "Pizza à la Burger",
            img: "/img3.png",
            description:
                "To miks łączący w sobie oryginalną formą i niezapomniany smak.",
            price: 11.99,
            isAvailable: true,
        },
    ],
    cart: [],
    username: "",
};

const appContext = createContext<Partial<IContextProps>>(defaultContext);

function MyApp({ Component, pageProps }) {
    const [context, setContext] = useState(defaultContext);
    return (
        <>
            <Head>
                <title>Restauracja Trattoria deWiatr</title>
            </Head>
            <appContext.Provider value={{ ...context, setContext }}>
                <Component {...pageProps} />
            </appContext.Provider>
        </>
    );
}

export default MyApp;
export { appContext };
