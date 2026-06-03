'use client';

import { useState } from 'react';
// import { products } from '../product-data';
import { Product } from '../product-data';
import Link from 'next/link';

export default function ShoppingCartList({ initialCardProducts }: { initialCardProducts: Product[] }) {
    const [cartProducts, setCartProducts] = useState(initialCardProducts);

    async function removeFromCart(productId: string) {
        const response = await fetch('https://wgbk62qn-3000.aue.devtunnels.ms/api/users/2/cart', {
            method: 'DELETE',
            body: JSON.stringify({ productId }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const updatedCartProducts = await response.json();
        setCartProducts(updatedCartProducts);
    }

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
            <ul className="space-y-4"> {/* List for cart items */}
                {cartProducts.map(product => (
                    <li key={product.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
                        <Link key={product.id} href={'products/' + product.id}>
                            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-600">${product.price.toFixed(2)}</p>
                            <div className="flex justify-end">
                                <button onClick={(e) => {
                                    e.preventDefault(); // Prevent the default link behavior
                                    removeFromCart(product.id)
                                } } className="bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600">
                                    Remove from Cart
                                </button>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}