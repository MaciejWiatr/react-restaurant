// Przykładowy produkt który służy do zachowania spójności danych
// nawet jeżeli żaden faktyczny produkt nie jest aktywny
const dummyProduct = {
    id: -1,
    name: "",
    description: "",
    img: "",
    price: 0,
    isAvailable: false,
};

// Domyślny kontekst (stan) aplikacji
const defaultContext = {
    products: [
        {
            id: 1,
            name: "Pizza Neapolitana",
            img: "/img.jpg",
            description:
                "Pizzę o tej nazwie można wyrabiać tylko według ściśle określonej receptury i tylko z oryginalnych składników",
            price: 12.99,
            isAvailable: true,
        },
        {
            id: 2,
            name: "Placek ziemniaczany pizza",
            img: "/img2.jpeg",
            description:
                "Uwielbiam jedno i drugie, a to połączenie jest dla mnie wręcz doskonałe",
            price: 0.99,
            isAvailable: true,
        },
        {
            id: 3,
            name: "Pizza à la Burger",
            img: "/img3.png",
            description:
                "To miks łączący w sobie oryginalną formą i niezapomniany smak.",
            price: 11.99,
            isAvailable: true,
        },
    ],
    cart: [],
    username: "",
};

export { dummyProduct, defaultContext };
