import { createContext, useReducer, useState, useEffect } from "react";

const ACTIONS = {
    ADD_TO_CART: "add_to_cart",
    REFRESH_CART: "refresh_cart",
    EMPTY_CART: "empty_cart",
};

function reducer(itemsArray, action) {
    switch (action.type) {
        case ACTIONS.ADD_TO_CART:
            return filterList2(action.item, itemsArray);
        case ACTIONS.REFRESH_CART:
            return action.items;
        case ACTIONS.EMPTY_CART:
            return [];
        default:
            return itemsArray;
    }
}

function filterList2(newCartItems, oldCartItems) {
    let list = [...oldCartItems];

    const indexOfduplicates = oldCartItems.findIndex((item) => {
        return item.id === newCartItems.id;
    });
    let updateditem = oldCartItems[indexOfduplicates];
    if (updateditem) {
        list[indexOfduplicates] = {
            ...updateditem,
            quantity: updateditem.quantity + newCartItems.quantity,
        };
    } else {
        list = [...oldCartItems, newCartItems];
    }
    return list;
}

const ListContext = createContext({
    itemsCart: [],
    total: 0,
    showModal: false,
    accorLogin_ShowBody: false,
    SetAccorLogin_ShowBody: () => {},
    accorDeliveryInfo_ShowBody: false,
    SetAccorDeliveryInfo_ShowBody: () => {},
    clearCart: () => {},
});

export const CartContextProvider = ({ children }) => {
    const [itemsArray, dispatch] = useReducer(reducer, []);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [mealId, setMealId] = useState("");

    const [orders, setOrders] = useState([]);

    /////////////// LOCAL-STORAGE ////////////////
    useEffect(() => {
        const items = localStorage.getItem("items");
        if (items !== null) {
            cartListHandler(JSON.parse(items));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(itemsArray));
    }, [itemsArray]);

    ///////////////////////////////////////////// Managing State

    function cartListHandler(newList) {
        dispatch({ type: ACTIONS.REFRESH_CART, items: newList });
    }

    function addToCart(item) {
        dispatch({ type: ACTIONS.ADD_TO_CART, item });
    }

    function clearCart() {
        dispatch({ type: ACTIONS.EMPTY_CART });
    }

    // totals (total amount + total quanitity)******************************* //

    const totalQuantity = itemsArray.reduce((acc, curr) => {
        return acc + curr.quantity;
    }, 0);

    const totalAmount = itemsArray
        .reduce((acc, curr) => {
            return acc + curr.quantity * parseFloat(curr.price);
        }, 0)
        .toFixed(2);

    const values = {
        itemsCart: itemsArray,
        setShowModal,
        showModal,
        total: totalAmount,
        totalQuantity,
        cartListHandler,
        addToCart,
        setOrders,
        clearCart,
        orders,
        setShowConfirmationModal,
        showConfirmationModal,
        setMealId,
        mealId,
    };
    return (
        <ListContext.Provider value={values}>{children}</ListContext.Provider>
    );
};

export default ListContext;
