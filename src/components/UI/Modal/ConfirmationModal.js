import classes from "./ConfirmationModal.module.css";
import ReactDOM from "react-dom";
import ListContext from "../../../store/listContext";
import { useContext } from "react";

const BackDrop = () => {
    return <div className={classes.backDrop}></div>;
};
const ModalBox = ({ sendRequest, onReRender }) => {
    const { setShowConfirmationModal, mealId } = useContext(ListContext);

    return (
        <div className={classes.ModalBox}>
            <h3 className="centered">are you sure you want to delete this?</h3>
            <div className={classes.modalBtns}>
                <button
                    onClick={async () => {
                        setShowConfirmationModal(false);
                        await sendRequest(mealId);
                        onReRender();
                    }}
                >
                    Yes, Delete Please
                </button>
                <button onClick={() => setShowConfirmationModal(false)}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

const ConfirmationModal = ({ id, sendRequest, onReRender }) => {
    return (
        <div className="Modal">
            {ReactDOM.createPortal(
                <BackDrop />,
                document.getElementById("backdrop-root")
            )}
            {ReactDOM.createPortal(
                <ModalBox
                    id={id}
                    sendRequest={sendRequest}
                    onReRender={onReRender}
                />,
                document.getElementById("overlay-root")
            )}
        </div>
    );
};

export default ConfirmationModal;
