import { Card } from "../components/Card";

export function ProductList(props) {
    return (
        <div className="w-full flex flex-grow justify-center relative -top-24 mb-auto">
            <div className="w-full p-4 md:w-3/4 flex items-start flex-wrap justify-around max-w-4xl ">
                {props.productList.map((p) => (
                    <Card
                        key={p.id}
                        name={p.name}
                        description={p.description}
                        id={p.id}
                        img={p.img}
                        openModal={props.openModal}
                    ></Card>
                ))}
            </div>
        </div>
    );
}
