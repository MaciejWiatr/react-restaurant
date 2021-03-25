import Image from "next/image";
import { FC } from "react";

interface IProps {
    name: string;
    description: string;
    id: number;
    openModal: (id: number) => void;
    img: string;
}

const Card: FC<IProps> = ({ name, description, id, openModal, img }) => {
    return (
        <div className="card">
            <figure className="h-32 overflow-hidden relative">
                <Image
                    src={img}
                    layout="fill"
                    className="object-cover"
                    quality={80}
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
            </figure>
            <div className="p-3">
                <figcaption className="pb-2">
                    <h2 className="text-lg font-medium">{name}</h2>
                    <p className="text-sm">{description.substring(0, 50)}...</p>
                </figcaption>
                <div>
                    <button
                        onClick={() => openModal(id)}
                        className="btn btn--black"
                    >
                        Zamów
                    </button>
                </div>
            </div>
        </div>
    );
};

export { Card };
