import React from "react";
import { columns } from "./columns";
import MaterialTable from "material-table";
import classes from "./OrdersTable.module.css";
import { createTheme, MuiThemeProvider } from "@material-ui/core";
export const OrdersTable = ({ orders }) => {
    const ordersData = orders.map((e) => {
        return { ...e, meals: e.meals.map((e) => <h4>- {e.meal}</h4>) };
    });

    const subtable = orders.map((e, index) => {
        return {
            id: e.id,
            content: (
                <table key={index} className={classes.orderTable}>
                    <thead>
                        <tr>
                            <th>Meal</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {e.meals.map((meal, index) => {
                            return (
                                <tr key={index}>
                                    <td>{meal.meal}</td>
                                    <td>{meal.price}</td>
                                    <td>{meal.quantity}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ),
        };
    });

    const theme = createTheme({
        palette: { mode: "dark" },
    });

    return (
        <>
            <MuiThemeProvider theme={theme}>
                <MaterialTable
                    columns={columns}
                    data={ordersData}
                    title=""
                    options={{
                        search: false,
                        filtering: false,
                        headerStyle: {
                            backgroundColor: "brown",
                            color: "white",
                            fontSize: "1.2rem",
                        },
                        rowStyle: {
                            backgroundColor: "#8A3324",
                            color: "white",
                            fontSize: "1.2rem",
                        },
                    }}
                    detailPanel={[
                        {
                            tooltip: "More Details",
                            render: (rowData) => {
                                const tableHtml = subtable.find(
                                    (e) => e.id === rowData.id
                                );
                                return <>{tableHtml.content}</>;
                            },
                        },
                    ]}
                />
            </MuiThemeProvider>
        </>
    );
};
