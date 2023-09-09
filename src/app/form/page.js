"use client";
import { useState } from "react";
import { createBook } from "@/fetching/create";
import { useRouter } from "next/navigation";

function BookForm() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const [year, setYear] = useState(0); 
    const [pages, setPages] = useState(0); 
    const [image, setImage] = useState(null); 
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("author", author);
            formData.append("publisher", publisher);
            formData.append("year", parseInt(year)); 
            formData.append("pages", parseInt(pages)); 
            formData.append("image", image); 

            const response = await createBook(formData);
            setMessage("Buku berhasil ditambahkan.");
            router.push("/");
        } catch (error) {
            setMessage("Gagal menambahkan buku.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
            <div className="w-full max-w-xs p-5 mx-auto mt-5 bg-gray-600 rounded-lg shadow-xl">
                <h1 className="text-center text-3xl font-semibold text-gray-200 mb-5">
                    Tambah Buku
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <label htmlFor="title" className="block text-gray-300">
                            Judul Buku
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="block w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-cyan-400 focus:border-cyan-400 bg-gray-700 text-gray-200"
                        />
                        <label htmlFor="author" className="block text-gray-300">
                            Penulis
                        </label>
                        <input
                            type="text"
                            name="author"
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="block w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-cyan-400 focus:border-cyan-400 bg-gray-700 text-gray-200"
                        />
                        <label
                            htmlFor="publisher"
                            className="block text-gray-300"
                        >
                            Penerbit
                        </label>
                        <input
                            type="text"
                            name="publisher"
                            id="publisher"
                            value={publisher}
                            onChange={(e) => setPublisher(e.target.value)}
                            className="block w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-cyan-400 focus:border-cyan-400 bg-gray-700 text-gray-200"
                        />
                        <label htmlFor="year" className="block text-gray-300">
                            Tahun Terbit
                        </label>
                        <input
                            type="number" 
                            name="year"
                            id="year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="block w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-cyan-400 focus:border-cyan-400 bg-gray-700 text-gray-200"
                        />
                        <label htmlFor="pages" className="block text-gray-300">
                            Jumlah Halaman
                        </label>
                        <input
                            type="number" 
                            name="pages"
                            id="pages"
                            value={pages}
                            onChange={(e) => setPages(e.target.value)}
                            className="block w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-cyan-400 focus:border-cyan-400 bg-gray-700 text-gray-200"
                        />
                        <label htmlFor="image" className="block text-gray-300">
                            Gambar Buku
                        </label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="block w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-cyan-400 focus:border-cyan-400 bg-gray-700 text-gray-200"
                        />
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full hover:from-cyan-500 hover:to-cyan-700 focus:ring-cyan-400 focus:ring-2 focus:outline-none focus:border-cyan-400"
                        >
                            Tambahkan Buku
                        </button>
                    </div>
                </form>
                {message && <p className="mt-2 text-green-500">{message}</p>}
            </div>
        </div>
    );
}

export default BookForm;
