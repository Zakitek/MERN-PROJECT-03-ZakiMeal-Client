import { useContext, useEffect, useState } from "react";
import authContext from "../../store/authContext";
import { OrdersTable } from "../../components/tables/OrdersTable";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import classes from "./Orders.module.css";
const Orders = () => {
    const { token } = useContext(authContext);

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    let url = "https://zakimeal.onrender.com/orders/me";

    useEffect(() => {
        setIsloading(true);
        async function loadOrders() {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);


            const ordersInfo = data.map((e) => {
                return {
                    id:e._id,
                    date: new Date(e.date),
                    total: e.total,
                    status: "pending",
                    meals: e.orders
                };
            });
            console.log("ordersInfo",ordersInfo);
            setIsloading(false);
            setOrders(ordersInfo.reverse());
        }
        loadOrders();
    }, [token, url]);
    if (isLoading) {
        return (
            <div className={`${classes.content} centered`}>
                <LoadingSpinner size="large" />
            </div>
        );
    }

    return (
        <div className={classes.content}>
            <OrdersTable orders={orders} />
        </div>
    );
};

export default Orders;
