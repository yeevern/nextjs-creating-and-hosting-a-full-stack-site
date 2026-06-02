import ShoppingCartList from './ShoppingCartList';

export default async function CartPage() {
    const response = await fetch('https://wgbk62qn-3000.aue.devtunnels.ms/api/users/2/cart', {
        cache: 'no-cache',
    });
    const cartProducts = await response.json();

    return (
        <div>
            <ShoppingCartList initialCardProducts={cartProducts} />
        </div>
    )
}