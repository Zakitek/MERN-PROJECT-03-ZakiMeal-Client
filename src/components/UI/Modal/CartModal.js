import classes from "./Modal.module.css";
import Button from "../Button/Button";
import ReactDOM from "react-dom";
import ListContext from "../../../store/listContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const BackDrop = (props) => {
    return <div className={classes.backDrop}></div>;
};
const ModalBox = ({ removeQuantityHandler, addQuantityHandler }) => {
    let { itemsCart, setShowModal, total } = useContext(ListContext);
    return (
        <div className={classes.ModalBox}>
            {itemsCart.map((item) => {
                const { title, price, quantity, id } = item;
                return (
                    <div className={classes.itemsInsideCart} key={id}>
                        <div className={classes.itemInfoModal}>
                            <div className={classes.itemName}>{title}</div>
                            <span className={classes.itemPrice}>{price}</span>
                            <span className={classes.numOfItemAdded}>
                                x{quantity}
                            </span>
                        </div>
                        <div className={classes.addRemoveItems}>
                            <button
                                className={classes.removeItemIcon}
                                name={title}
                                onClick={removeQuantityHandler}
                            >
                                -
                            </button>
                            <button
                                className={classes.addItemIcon}
                                name={title}
                                onClick={addQuantityHandler}
                            >
                                +
                            </button>
                        </div>
                    </div>
                );
            })}
            {itemsCart.length === 0 && (
                <p style={{ textAlign: "center", fontSize: "1.4rem" }}>
                    Your cart is empty
                </p>
            )}
            {itemsCart.length !== 0 && (
                <div className={classes.theSum}>
                    <div>Total Amount </div>
                    <div>{total}$</div>
                </div>
            )}

            <div className={classes.modalBtns}>
                <Button onClick={() => setShowModal(false)}>Close</Button>
                {itemsCart.length !== 0 && (
                    <Link to={"/checkout"}>
                        <button
                            onClick={() => {
                                setShowModal(false);
                            }}
                        >
                            Order
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
};

const CartModal = () => {
    let { cartListHandler, itemsCart } = useContext(ListContext);
    function removeQuantityHandler(e) {
        itemsCart = itemsCart
            .map((item) => {
                if (e.target.name === item.title) {
                    return { ...item, quantity: item.quantity - 1 };
                } else {
                    return item;
                }
            })
            .filter((e) => {
                return e.quantity !== 0;
            });
        cartListHandler(itemsCart);
    }

    function addQuantityHandler(e) {
        itemsCart = itemsCart.map((item) => {
            if (e.target.name === item.title) {
                return { ...item, quantity: item.quantity + 1 };
            } else {
                return item;
            }
        });

        cartListHandler(itemsCart);
    }

    return (
        <div className="Modal">
            {ReactDOM.createPortal(
                <BackDrop />,
                document.getElementById("backdrop-root")
            )}
            {ReactDOM.createPortal(
                <ModalBox
                    removeQuantityHandler={removeQuantityHandler}
                    addQuantityHandler={addQuantityHandler}
                />,
                document.getElementById("overlay-root")
            )}
        </div>
    );
};

export default CartModal;
