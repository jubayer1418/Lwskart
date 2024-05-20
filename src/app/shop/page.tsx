import { dbConnect } from "@/server";
import Card from "../componenets/card/Card";
import {
  getAllCategories,
  getAllCategoriesSum,
  searchProducts,
} from "@/db/queries";
import { Product, SearchParams } from "@/type";
import Price from "./Price";
import Link from "next/link";
import Size from "./Size";

import CategoryLists from "./CategoryLists";

const ShopPage = async ({ searchParams }: any) => {
  await dbConnect();
  const products = await searchProducts(searchParams);

  const categories = await getAllCategoriesSum();


  return (
    <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
      <div className="text-center md:hidden">
        <button
          className="text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block md:hidden"
          type="button"
          data-drawer-target="drawer-example"
          data-drawer-show="drawer-example"
          aria-controls="drawer-example"
        >
          {/* <ion-icon name="grid-outline"></ion-icon> */}
        </button>
      </div>
      <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden  md:block">
        <div className="divide-y divide-gray-200 space-y-5">
          <div>
            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map((category: any) => (
                <CategoryLists
                  key={category._id}
                  category={category._id}
                  count={category.count}
                />
              ))}
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
              Price
            </h3>
            <Price />
          </div>

          <div className="pt-4">
            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
              Size
            </h3>
            <div className="flex items-center gap-2">
              {["XS", "S", "M", "L", "XL"].map((s) => (
                <Size key={s} size={s} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
          {products.map((product: Product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
// {
//   searchTerm: 'loki',
//   category: 'sofa',
//   min_price: '100',
//   max_price: '200',
//   size: 'xs'
// }
