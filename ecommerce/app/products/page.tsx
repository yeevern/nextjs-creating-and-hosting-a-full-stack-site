import ProductsList from '../ProductList';
// import { products } from '../product-data';

export default async function ProductsPage() {
    const response = await fetch('https://wgbk62qn-3000.aue.devtunnels.ms/api/products');
    const products = await response.json();

    // load the shopping cart from this product page
    const response2 = await fetch('https://wgbk62qn-3000.aue.devtunnels.ms/api/users/2/cart');
    const cartProducts = await response2.json();

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">Products</h1>
            <ProductsList products={products} initialCartProducts={cartProducts} />
        </div>
    )
}