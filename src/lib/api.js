const SERVER_DOMAIN = "https://zakimeal.onrender.com";

export async function getAllMeals() {
    const response = await fetch(`${SERVER_DOMAIN}/meals`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Could not fetch meals.");
    }
    return data;
}

export async function deleteMeal(id) {
    const response = await fetch(`${SERVER_DOMAIN}/${id}`, {
        method: "DELETE",
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Could not fetch meals.");
    }
    return data;
}

export async function editMeal(obj) {
    console.log(obj.content);
    const response = await fetch(`${SERVER_DOMAIN}/${obj.id}`, {
        method: "PATCH",
        body: JSON.stringify(obj.content),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
        throw new Error(data.message || "Could not fetch meals.");
    }
    return data;
}

export async function addMeal(content) {
    const response = await fetch(`${SERVER_DOMAIN}/add-meal`, {
        method: "POST",
        body: JSON.stringify(content),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Could not add the meal.");
    }
    return data;
}
