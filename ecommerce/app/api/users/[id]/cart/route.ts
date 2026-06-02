import { NextRequest } from "next/server";
import { products } from "@/app/product-data";
import { connectToDatabase } from "@/app/api/db"; // Import the database connection function

type ShoppingCart = Record<string, string[]>;

const carts : ShoppingCart = {
    "1": ["123", "456"],
    "2": ["345", "456"],
    "3": ["234"]
}
type Params = {
    id: string;
};

// GET is used for loading data, POST is used for creating/modify new data, PUT is used for updating existing data, and DELETE is used for deleting data.
export async function GET(request: NextRequest, { params }: { params: Promise<Params> }) {
    const { db } = await connectToDatabase(); // Connect to the database
    const { id: userId } = await params;
    // const productIds = carts[userId];
    const userCart = await db.collection('carts').findOne({ userId: userId });

    if (!userCart) {
        return new Response(JSON.stringify([]), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    const cartIds = userCart.cartIds;
    const cartProducts = await db.collection('products').find({ id: { $in: cartIds } }).toArray();

    return new Response(JSON.stringify(cartProducts), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}
 
type AddToCartRequest = {
    productId: string;
};

export async function POST(request: NextRequest, { params }: { params: Promise<Params> }) {
    const { db } = await connectToDatabase(); // Connect to the database
    const { id: userId } = await params;
    // get the id of the product to add to the cart
    const body : AddToCartRequest = await request.json();  // convert the request payload to json
    const productId = body.productId;

    // tell mongodb what we are looking for
    const updateCart = await db.collection('carts').findOneAndUpdate(
        { userId: userId },
        { $push: { cartIds: productId } }, // Add the product ID to the cartIds array
        { upsert: true, returnDocument: 'after' } // Create a new document if one doesn't exist and return the updated document
    );

    const cartProducts = await db.collection('products').find({ id: { $in: updateCart.cartIds } }).toArray();

    return new Response(JSON.stringify(cartProducts), {
        status: 201,  // a status code for created
        headers: {
            "Content-Type": "application/json"
        }
    });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<Params> }) {
    const { db } = await connectToDatabase(); // Connect to the database
    const { id: userId } = await params;
    const body : AddToCartRequest = await request.json();
    const productId = body.productId;

    const updateCart = await db.collection('carts').findOneAndUpdate(
        { userId: userId },
        { $pull: { cartIds: productId } }, // Remove the product ID from the cartIds array
        { returnDocument: 'after' } // Return the updated document
    );

    if (!updateCart) {
        return new Response(JSON.stringify([]), {
            status: 202, // a status code for accepted
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    
    const cartProducts = await db.collection('products').find({ id: { $in: updateCart.cartIds } }).toArray();

    return new Response(JSON.stringify(cartProducts), {
        status: 202, // a status code for accepted
        headers: {
            "Content-Type": "application/json"
        }
    });
}