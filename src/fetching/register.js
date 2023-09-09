
export const createUser = async (name, email, password) => {
    const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    return data;
};
