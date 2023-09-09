import prisma from "@/app/lib/prisma";
import Link from "next/link";
import Image from "next/image";

async function getData(id) {
    try {
        const foundData = await prisma.book.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!foundData) {
            throw { name: "ErrorNotFound", message: "Error Not Found" };
        }

        return foundData;
    } catch (err) {
        throw new Error(err.message || "Internal Server Error");
    }
}

export default async function BookDetail({ params }) {
    const { id } = params;
    const data = await getData(id);

    return (
        <div className="min-h-screen bg-gray-800 text-white flex items-center justify-center">
            <div className="w-full max-w-xs p-5 mx-auto mt-5 bg-gray-600 rounded-lg shadow-xl">
                <h1 className="text-3xl font-semibold mb-4">{data.title}</h1>
                <Image
                    src={`${data.image}`}
                    alt="Book Cover"
                    width={300}
                    height={450}
                />
                <p className="text-lg">Author: {data.author}</p>
                <p className="text-lg">Publisher: {data.publisher}</p>
                <p className="text-lg">Year: {data.year}</p>
                <p className="text-lg">Pages: {data.pages}</p>
                <Link
                    href={"/"}
                    className="block text-center bg-black text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
                >
                    BACK TO HOME
                </Link>
            </div>
        </div>
    );
}
