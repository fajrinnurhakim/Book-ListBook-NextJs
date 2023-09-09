"use client";
import { useState, useEffect } from "react";
import { getBooks } from "@/fetching/book";
import { deleteBook } from "@/fetching/delete";
import Link from "next/link";
import UpdateBookModal from "@/components/modal";

export default function Home() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookData = await getBooks();
                setBooks(bookData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [books]);

    const handleDelete = async (id) => {
        if (window.confirm("ingin menghapus list buku?")) {
            try {
                const res = await deleteBook(id);
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-800 text-white">
            <div className="p-4">
                <h1 className="text-3xl font-semibold mb-4">Book Collection</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">Error: {error}</p>
                ) : (
                    <table className="w-full border-collapse border rounded-lg">
                        <thead className="bg-gray-200 text-black">
                            <tr>
                                <th className="py-2 px-4 text-left">Title</th>
                                <th className="py-2 px-4 text-left">Author</th>
                                <th className="py-2 px-4 text-left">
                                    Publisher
                                </th>
                                <th className="py-2 px-4 text-left">Year</th>
                                <th className="py-2 px-4 text-left">Pages</th>
                                <th className="py-2 px-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr
                                    key={book.id}
                                    className=" hover:bg-gray-100 hover:text-black"
                                >
                                    <td className="py-2 px-4">{book.title}</td>
                                    <td className="py-2 px-4">{book.author}</td>
                                    <td className="py-2 px-4">
                                        {book.publisher}
                                    </td>
                                    <td className="py-2 px-4">{book.year}</td>
                                    <td className="py-2 px-4">{book.pages}</td>
                                    <td className="py-2 px-4 ">
                                        <Link href={`/books/${book.id}`}>
                                            Detail
                                        </Link>
                                        <UpdateBookModal
                                            book={book}
                                            onUpdate={(updatedBook) => {
                                                const updatedBooks = books.map(
                                                    (b) =>
                                                        b.id === updatedBook.id
                                                            ? updatedBook
                                                            : b
                                                );
                                                setBooks(updatedBooks);
                                            }}
                                        />
                                        <button
                                            onClick={() =>
                                                handleDelete(book.id)
                                            }
                                            className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
