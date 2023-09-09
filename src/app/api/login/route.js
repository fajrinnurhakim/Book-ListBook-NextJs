import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (req, { params }) => {
    try {
        const { email, password } = await req.json();
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 400 }
            );
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 400 }
            );
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        return NextResponse.json({ token });
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { message: "Invalid credentials" },
            { status: 400 }
        );
    }
};
