export const columns = [
    {
        title: "Date",
        field: "date",
        type: "date",
        dateSetting: {
            format: "dd/MM/yyyy",
        },
        cellStyle: {
            color: "#FFF",
            fontSize: "0.9rem",
            fontWeight: "500",
        },
    },
    {
        title: "Meals",
        field: "meals",
        cellStyle: {
            color: "#FFF",
            fontSize: "0.9rem",
            fontWeight: "500",
        },
    },
    {
        title: "Status",
        field: "status",
        cellStyle: {
            color: "#FFF",
            fontSize: "0.9rem",
            fontWeight: "500",
        },
    },

    {
        title: "Total",
        field: "total",
        type: "currency",
        currencySetting: { minimumFractionDigits: 0 },
        cellStyle: {
            color: "#FFF",
            fontSize: "1.2rem",
            fontWeight: "500",
        },
    },
];
