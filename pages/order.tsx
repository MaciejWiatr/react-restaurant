import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { appContext } from "./_app";
import { FiChevronLeft } from "react-icons/fi";
import { BsCheckCircle, BsX } from "react-icons/bs";
import Image from "next/image";

const OrderPage = () => {
    const { cart } = useContext(appContext);
    const [prepared, setPrepared] = useState(false);
    const [sent, setSent] = useState(false);
    const [barWidth, setBarWidth] = useState(0);

    useEffect(() => {
        const preparedTimeout = setTimeout(() => {
            setPrepared(true);
            setBarWidth(50);
        }, 2000);
        const sentTimeout = setTimeout(() => {
            setSent(true);
            setBarWidth(100);
        }, 4000);

        return () => {
            clearTimeout(preparedTimeout);
            clearTimeout(sentTimeout);
            setPrepared(false);
            setSent(false);
            setBarWidth(0);
        };
    }, []);

    return (
        <>
            <nav className="w-full h-12 bg-black flex justify-start items-center sticky top-0 bg-opacity-90 blurred text-white pl-2 z-nav">
                <Link href="/" passHref>
                    <a href="/" className="flex">
                        <span className="text-2xl mr-1">
                            <FiChevronLeft />
                        </span>
                        Wróć
                    </a>
                </Link>
            </nav>
            <div className="w-full min-h-screen flex overflow-hidden relative">
                <div className="flex-grow flex flex-center">
                    <div className="w-full md:w-card max-w-lg shadow-lg rounded overflow-hidden z-max bg-white blurred bg-opacity-75 m-2">
                        <div className="w-full h-16 bg-black text-white flex flex-center text-xl font-semibold">
                            <h1>Twoje zamówienie</h1>
                        </div>
                        <div className="p-3 pb-0 ">
                            <div className="rounded-lg overflow-hidden shadow">
                                <iframe
                                    className="w-full"
                                    height="300"
                                    id="gmap_canvas"
                                    src="https://maps.google.com/maps?q=Krak%C3%B3w,%20ul.%20Kamie%C5%84skiego%2049&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                    frameBorder="0"
                                    scrolling="no"
                                ></iframe>
                            </div>
                        </div>
                        <ul className="w-full flex flex-grow flex-wrap p-2">
                            {cart.length > 0
                                ? cart.map((p, index) => (
                                      <li
                                          key={index}
                                          className="w-1/2 h-24 p-1 "
                                      >
                                          <div className="bg-white w-full h-full rounded flex flex-center shadow-lg">
                                              <p>{p.name}</p>
                                          </div>
                                      </li>
                                  ))
                                : null}
                        </ul>
                        <div className="w-full h-1 bg-gray-300 blurred bg-opacity-50">
                            <div
                                className="h-full bg-green-500 transition-all duration-300"
                                style={{ width: `${barWidth}%` }}
                            ></div>
                        </div>
                        <div className="flex w-full bg-white text-black border-t">
                            <div className="w-1/2 h-12 flex text-center flex-center">
                                <p className="text-sm flex items-center">
                                    {prepared ? (
                                        <BsCheckCircle className="mr-1" />
                                    ) : (
                                        <BsX className="mr-1" />
                                    )}
                                    Przygotowano
                                </p>
                            </div>
                            <div className="w-1/2 h-12 flex text-center flex-center border-l">
                                <p className="text-sm flex items-center">
                                    {sent ? (
                                        <BsCheckCircle className="mr-1" />
                                    ) : (
                                        <BsX className="mr-1" />
                                    )}
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
