export const getBooks = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/books`);
        const data = await response.json();
        return data;
    } catch (err) {
        throw new Error(err.message || "Internal Server Error");
    }
};
