export const createBook = async (formData) => {
    try {
        const res = await fetch("http://localhost:3000/api/books", {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error.message || "Internal Server Error");
    }
};