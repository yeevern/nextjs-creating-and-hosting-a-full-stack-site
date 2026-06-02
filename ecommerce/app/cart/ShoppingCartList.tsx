'use client';

import { useState } from 'react';
// import { products } from '../product-data';
import { Product } from '../product-data';
import Link from 'next/link';

export default function ShoppingCartList({ initialCardProducts }: { initialCardProducts: Product[] }) {
    const [cartProducts] = useState(initialCardProducts);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
            <ul className="space-y-4"> {/* List for cart items */}
                {cartProducts.map(product => (
                    <li key={product.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
                        <Link key={product.id} href={'products/' + product.id}>
                            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-600">${product.price.toFixed(2)}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}