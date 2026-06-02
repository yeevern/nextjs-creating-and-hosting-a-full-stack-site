export default async function FetchTest() {
    const response = await fetch('https://wgbk62qn-3000.aue.devtunnels.ms/api/hello');
    const data = await response.json();
    
    return <h1>{data.message}</h1>;
}