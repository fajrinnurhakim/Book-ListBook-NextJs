export const deleteBook = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/books/${id}`, {
            method: "DELETE",
        });
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error.message || "Internal Server Error");
    }
};
