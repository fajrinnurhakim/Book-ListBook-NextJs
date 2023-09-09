export const updateBook = async (id, bookData) => {
    try {
        const res = await fetch(`http://localhost:3000/api/books/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookData),
        });

        if (!res.ok) {
            throw new Error(`Update request failed with status ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error updating book:", error);
        throw error;
    }
};
