import { IProduct } from "ts/interfaces";
import { Card } from "./Card";

interface IProps {
    productList: IProduct[];
    openModal: any;
}

export function ProductList({ productList, openModal }) {
    return (
        <div className="w-full flex flex-grow justify-center relative -top-24 mb-auto">
            <div className="w-full p-4 md:w-3/4 flex items-start flex-wrap justify-around max-w-4xl ">
                {productList.map((p: IProduct) => (
                    <Card
                        key={p.id}
                        name={p.name}
                        description={p.description}
                        id={p.id}
                        img={p.img}
                        openModal={openModal}
                    ></Card>
                ))}
            </div>
        </div>
    );
}
