'use client';

import Image from "next/image";
import Link from "next/link";
import { Product } from "./product-data";
import { useState } from "react";

export default function ProductsList({products, initialCartProducts}: {products: Product[], initialCartProducts: Product[]}) {
    const [cartProducts, setCartProducts] = useState(initialCartProducts);

    async function addToCart(productId: string) {
        const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/users/2/cart', {
            method: 'POST',
            body: JSON.stringify({ productId }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const updatedCartProducts = await response.json();
        setCartProducts(updatedCartProducts);
    }

    async function removeFromCart(productId: string) {
        const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/users/2/cart', {
            method: 'DELETE',
            body: JSON.stringify({ productId }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const updatedCartProducts = await response.json();
        setCartProducts(updatedCartProducts);
    }

    // helper funciton to check if a product is in the cart
    function isInCart(productId: string) {
        return cartProducts.some(product => product.id === productId);
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map(product => (
                <Link key={product.id} href={'products/' + product.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
                    <div className="flex justify-center mb-4 h-48 relative"> {/* Added height and relative positioning */}
                        <Image src={'/' + product.imageUrl} alt={product.name} fill className="object-cover rounded-md" /> {/* Use fill to make the image cover the container */}
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                    {isInCart(product.id) ? (
                        <button onClick={(e) => {
                            e.preventDefault(); // Prevent the default link behavior
                            removeFromCart(product.id)
                        }} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Remove from Cart
                        </button>
                    ) : (
                        <button onClick={(e) => {
                            e.preventDefault(); // Prevent the default link behavior
                            addToCart(product.id)
                        }} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Add to Cart
                        </button>
                    )}
                </Link>
            ))}
        </div>
    )
}