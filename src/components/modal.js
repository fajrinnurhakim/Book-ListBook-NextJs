import { useState } from "react";
import { updateBook } from "@/fetching/edit";

export default function UpdateBookModal({ book, onUpdate }) {
    const [bookData, setBookData] = useState(book);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUpdate = async () => {
        try {
            const updatedBook = await updateBook(book.id, bookData);
            onUpdate(updatedBook);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating book:", error);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600"
            >
                Update
            </button>

            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-2">
                            Update Book
                        </h2>
                        <div className="mb-4">
                            <label
                                htmlFor="title"
                                className="block font-medium"
                            >
                                Title:
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={bookData.title}
                                onChange={(e) =>
                                    setBookData({
                                        ...bookData,
                                        title: e.target.value,
                                    })
                                }
                                className="border rounded-md w-full py-2 px-3"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="author"
                                className="block font-medium"
                            >
                                Author:
                            </label>
                            <input
                                type="text"
                                id="author"
                                value={bookData.author}
                                onChange={(e) =>
                                    setBookData({
                                        ...bookData,
                                        author: e.target.value,
                                    })
                                }
                                className="border rounded-md w-full py-2 px-3"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="publisher"
                                className="block font-medium"
                            >
                                Publisher:
                            </label>
                            <input
                                type="text"
                                id="publisher"
                                value={bookData.publisher}
                                onChange={(e) =>
                                    setBookData({
                                        ...bookData,
                                        publisher: e.target.value,
                                    })
                                }
                                className="border rounded-md w-full py-2 px-3"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="year" className="block font-medium">
                                Year:
                            </label>
                            <input
                                type="number"
                                id="year"
                                value={bookData.year}
                                onChange={(e) =>
                                    setBookData({
                                        ...bookData,
                                        year: parseInt(e.target.value),
                                    })
                                }
                                className="border rounded-md w-full py-2 px-3"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="pages"
                                className="block font-medium"
                            >
                                Pages:
                            </label>
                            <input
                                type="number"
                                id="pages"
                                value={bookData.pages}
                                onChange={(e) =>
                                    setBookData({
                                        ...bookData,
                                        pages: parseInt(e.target.value),
                                    })
                                }
                                className="border rounded-md w-full py-2 px-3"
                            />
                        </div>
                        <button
                            onClick={handleUpdate}
                            className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 ml-2"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
