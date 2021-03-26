import { appContext } from "pages/_app";
import { FC, FormEvent, useContext, useRef } from "react";

export const UsernameModal: FC = () => {
    const { setContext } = useContext(appContext); // Wyciągam funkcje setContext z globalnego kontekstu aplikacji
    const inputRef = useRef(null); // Tworzę referencję do obiektu input
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Blokuje przeładowanie strony po wysłaniu formularza
        setContext((c) => {
            // Za pomocą destrukturyzacji obiektu nadpisuje username znajdujący się w stanie globalnym aplikacji
            return { ...c, username: inputRef.current.value };
        });
        // Zapisuje imie użytkownika do localstorage
        localStorage.setItem("name", inputRef.current.value);
    };

    return (
        <div className="fixed top-0 left-0 w-screen h-screen z-max overflow-hidden bg-black bg-opacity-95 text-white flex flex-center flex-col">
            <div>
                <h1 className="text-4xl font-bold text-shadow-lg mb-2">
                    Cześć, jak masz na imie?
                </h1>
                <form
                    className="flex flex-col relative"
                    onSubmit={handleSubmit}
                >
                    <label className="">Twoje imie</label>
                    <input
                        ref={inputRef}
                        id="username"
                        type="text"
                        className=" bg-white bg-opacity-0  rounded border border-white focus:outline-none focus:ring-2 p-3 mt-1"
                    />
                </form>
            </div>
        </div>
    );
};
