import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import prisma from "@/app/lib/prisma";
import path from "path";



export const GET = async (req, { params }) => {
    try {
        const result = await prisma.book.findMany();
        return NextResponse.json(result, { status: 200 });
    } catch (err) {
        console.log("err", err);
        return NextResponse.json(
            {
                message: "something when wrong",
            },
            { status: 400 }
        );
    }
};

export const POST = async (req, { params }) => {
    const data = await req.formData();
    const file = data.get("image");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location
    const fileName = Date.now() + file.name;
    const pathFile = `/images/` + fileName;
    const finalPath = path.join(process.cwd(), `/public`, pathFile);
    await writeFile(finalPath, buffer);
    // const { title, author, publisher, year, pages } = req.body;
    try {
        const book = await prisma.book.create({
            data: {
                title: data.get("title"),
                author: data.get("author"),
                publisher: data.get("publisher"),
                year: parseInt(data.get("year")),
                pages: parseInt(data.get("pages")),
                image: pathFile, // add the path to the uploaded image to the book data
            },
        });
        return NextResponse.json({ book });
    } catch (err) {
        console.log("err", err);
        return NextResponse.json(
            { message: "Book already exists" },
            { status: 400 }
        );
    }
};

