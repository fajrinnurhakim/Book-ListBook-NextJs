export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`http://localhost:3000/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        return data;
    } catch (err) {
        throw new Error(err.message || "Internal Server Error");
    }
};
