import { NextRequest } from "next/server";
// import { products } from "@/app/product-data";
import { connectToDatabase } from "../../db";

type Params = {
    id: string;
};

export async function GET(request: NextRequest, { params }: { params: Promise<Params> }) {
    const { db } = await connectToDatabase();
    const { id: productId } = await params;

    // const product = products.find(p => p.id === productId);
    const product = await db.collection("products").findOne({ id: productId });

    if (!product) {
        return new Response("Product not found!", {
            status: 404,
        });
    }

    return new Response(JSON.stringify(product), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}

// mongodb+srv://yeevernchang_db_user:3pknCSSaXs9bXAJS@cluster0.z5kiolv.mongodb.net/?appName=Cluster0