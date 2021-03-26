import { createContext, useState } from "react";
import "../styles/globals.scss";
import Head from "next/head";
import { IContextProps } from "ts/interfaces";
import { defaultContext } from "../src/constants";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";

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
