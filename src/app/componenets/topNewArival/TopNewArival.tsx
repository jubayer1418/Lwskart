import { getAllNewArrivalProducts } from "@/db/queries";
import { dbConnect } from "@/server";

import { Cart } from "@/model";
import { Product } from "@/type";
import Card from "../card/Card";

export default async function TopNewArrival() {
  await dbConnect();
  const products = await getAllNewArrivalProducts();

  return (
    <div className="container pb-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        top new arrival
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
