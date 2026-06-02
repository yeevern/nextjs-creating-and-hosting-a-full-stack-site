'use client';

import { useState } from 'react';
import { products } from '../product-data';
import Link from 'next/link';

export default function CartPage() {
    const [cartIds] = useState(['123', '345']);

    const cardProducts = cartIds.map(id => products.find(p => p.id === id)!);


    return (
        <>
            <h1>Shopping Cart</h1>
            {cardProducts.map(product => (
                <Link key={product.id} href={'products/' + product.id}>
                    <h2>{product.name}</h2>
                    <p>${product.price.toFixed(2)}</p>
                </Link>
            ))}
        </>
    )
}