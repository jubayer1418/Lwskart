
import { getAllTrendingProducts } from "@/db/queries";
import Card from "../card/Card";
import { dbConnect } from "@/server";
import { Product } from "@/type";
import Title from "../category/Title";


export default async function TrendingProducts() {
    await dbConnect();
    const products = await getAllTrendingProducts();

    
    return (
        <div className="container pb-16">
            <Title title="Trending"/>
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
