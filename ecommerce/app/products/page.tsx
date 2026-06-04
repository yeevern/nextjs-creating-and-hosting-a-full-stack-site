import ProductsList from '../ProductList';
// import { products } from '../product-data';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
    const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/products');
    const products = await response.json();

    // load the shopping cart from this product page
    const response2 = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/users/2/cart', {
        cache: 'no-cache', // Ensure we get the latest cart data on each request
    });
    const cartProducts = await response2.json();

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">Products</h1>
            <ProductsList products={products} initialCartProducts={cartProducts} />
        </div>
    )
}