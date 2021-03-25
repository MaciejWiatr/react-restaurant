import { Navbar } from "@Components/Navbar";
import { useContext } from "react";
import Link from "next/link";
import { appContext } from "./_app";
import { FiChevronLeft } from "react-icons/fi";
import { BsCheckCircle, BsX } from "react-icons/bs";
import Image from "next/image";

const OrderPage = () => {
    const { cart } = useContext(appContext);
    return (
        <>
            <nav className="w-full h-12 bg-black flex justify-start items-center sticky top-0 bg-opacity-90 blurred text-white pl-2 z-max">
                <Link href="/" passHref>
                    <a href="/" className="flex">
                        <span className="text-2xl mr-1">
                            <FiChevronLeft />
                        </span>
                        Wróć
                    </a>
                </Link>
            </nav>
            <div className="w-full h-screen flex overflow-hidden relative">
                <div className="flex-grow flex flex-center">
                    <div className="w-full md:w-card max-w-lg shadow-lg rounded overflow-hidden z-max bg-white blurred bg-opacity-75  ml-2 mr-2">
                        <div className="w-full h-16 bg-black text-white flex flex-center text-xl font-semibold">
                            <h1>Twoje zamówienie</h1>
                        </div>
                        <ul className="w-full flex flex-grow flex-wrap p-2">
                            {cart.length > 0
                                ? cart.map((p, index) => (
                                      <li
                                          key={index}
                                          className="w-1/2 h-24 p-1 "
                                      >
                                          <div className="bg-white w-full h-full rounded flex flex-center">
                                              <p>{p.name}</p>
                                          </div>
                                      </li>
                                  ))
                                : null}
                        </ul>
                        <div className="flex w-full bg-white text-black border-t">
                            <div className="w-1/2 h-12 flex text-center flex-center">
                                <p className="text-sm flex items-center">
                                    <BsCheckCircle className="mr-1" />
                                    Przygotowano
                                </p>
                            </div>
                            <div className="w-1/2 h-12 flex text-center flex-center border-l">
                                <p className="text-sm flex items-center">
                                    <BsX className="mr-1" />
                                    Wysłano
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overflow-hidden w-full h-full absolute z-10 pointer-events-none">
                    <Image
                        src="/order-bg.jpg"
                        objectFit="cover"
                        layout="fill"
                    ></Image>
                </div>
            </div>
        </>
    );
};

export default OrderPage;
