import { FC } from "react";

// Definiuje propy jakie przyjmie komponent
interface IProps {
    q: string;
    setQ: (q: string) => void;
    username: string;
}

const HeroSection: FC<IProps> = ({ q, setQ, username }) => {
    return (
        <div
            className="pt-24 pb-24 md:pt-40 md:pb-40
             flex flex-center  bg-hero-img bg-center bg-cover text-white relative"
        >
            <div className="h-2/4 w-full md:w-3/5 p-2 z-30 max-w-4xl">
                <h1 className="text-5xl font-bold text-left ml-4 md:ml-0 mt-2 mb-2  text-shadow-xl">
                    {username !== ""
                        ? `Cześć ${username}!`
                        : "Trattoria deWiatr"}
                </h1>
                <form className="flex flex-col">
                    <label className="text-md mt-3 mb-2 ml-4 md:ml-0">
                        Wyszukaj
                    </label>
                    <input
                        className="h-12 p-3 focus:outline-none focus:ring-2 rounded text-black ml-4 mr-4 md:ml-0 md:mr-0"
                        placeholder="Nazwa jedzonka"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                    />
                </form>
            </div>
            <div className="absolute w-full h-full top-0 left-0 bg-black opacity-20"></div>
        </div>
    );
};

export default HeroSection;
