import { createContext, ReactNode, useState } from "react";
import "../styles/globals.scss";
import Head from "next/head";
import { IContextProps } from "ts/interfaces";
import { defaultContext } from "../src/constants";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";
import type { AppProps } from "next/app";

// Tworzę kontekst
const appContext = createContext<Partial<IContextProps>>(defaultContext);

function MyApp({ Component, pageProps }: AppProps): ReactNode {
    // Tworzę hooka stanu którego następnie podpinam do kontekstu
    const [context, setContext] = useState(defaultContext);
    return (
        <>
            <Head>
                <title>Restauracja Trattoria deWiatr</title>
            </Head>
            {/* Dostarczam kontekst do mojej aplikacji */}
            <appContext.Provider value={{ ...context, setContext }}>
                <Component {...pageProps} />
            </appContext.Provider>
        </>
    );
}

export default MyApp;
export { appContext };
