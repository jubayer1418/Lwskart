
import { getAllTrendingProducts } from "@/db/queries";
import Card from "../card/Card";
import { dbConnect } from "@/server";
import { Product } from "@/type";


export default async function TrendingProducts() {
    await dbConnect();
    const products = await getAllTrendingProducts();

    
    return (
        <div className="container pb-16">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">TRENDING PRODUCTS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {
                    products.map((product:Product) => (
                        <Card key={product.id} product={product} />
                    ))
                   
                }
                {/* Add more product items here */}
            </div>
        </div>
    );
}
