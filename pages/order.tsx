import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { appContext } from "./_app";
import { FiChevronLeft } from "react-icons/fi";
import { BsCheckCircle, BsX } from "react-icons/bs";
import { useRouter } from "next/router";
import Image from "next/image";
import Confetti from "react-confetti";

const OrderPage = () => {
    const { cart } = useContext(appContext);
    const router = useRouter();
    const [prepared, setPrepared] = useState(false);
    const [sent, setSent] = useState(false);
    const [barWidth, setBarWidth] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (cart.length < 1) {
            router.push("/");
        }

        const preparedTimeout = setTimeout(() => {
            setPrepared(true);
            setBarWidth(50);
        }, 2000);
        const sentTimeout = setTimeout(() => {
            setSent(true);
            setBarWidth(100);
            setShowConfetti(true);
        }, 4000);

        return () => {
            clearTimeout(preparedTimeout);
            clearTimeout(sentTimeout);
            setPrepared(false);
            setSent(false);
            setBarWidth(0);
        };
    }, []);

    useEffect(() => {
        let confettiTimeout;
        if (showConfetti) {
            confettiTimeout = setTimeout(() => {
                setShowConfetti(false);
            }, 10000);
        }
        return () => {
            clearTimeout(confettiTimeout);
        };
    }, [showConfetti]);

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
                {showConfetti ? (
                    <Confetti width={1920} height={1080}></Confetti>
                ) : null}

                <div className="flex-grow flex flex-center">
                    <div
                        className={`animate__animated w-full md:w-card max-w-lg shadow-lg rounded overflow-hidden z-max bg-white blurred bg-opacity-75 m-2 ${
                            sent ? "animate__tada" : ""
                        }`}
                    >
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
                                          className="w-1/2 h-16 p-1 "
                                      >
                                          <div className="bg-white w-full h-full rounded flex flex-center shadow-md">
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
                        alt="order background"
                    ></Image>
                </div>
            </div>
        </>
    );
};

export default OrderPage;
