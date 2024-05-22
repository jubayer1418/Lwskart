import { getAllCategories } from "@/db/queries";
import { dbConnect } from "@/server";
import Image from "next/image";
import Link from "next/link";
import img from "@/assets/images/category/category-1.jpg";
import { useTranslations } from "next-intl";
import Title from "./Title";
interface Category {
  id: string;
  category: string;
  image: string[];
}

export default async function ShopByCategory() {
  await dbConnect();
  const categories = await getAllCategories();



  return (
    <div className="container py-16">
     <Title title="Category"/>
      <div className="grid grid-cols-3 gap-3">
        {categories.map((category: Category) => (
          <div
            key={category.id}
            className="relative rounded-sm overflow-hidden group"
          >
            <Image
              src={category.image[0]}
              alt="category 1"
              className="w-full"
              width={200}
              height={200}
            />
            <Link
              href={`/en/shop?category=${category.category}`}
              className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60  transition"
            >
              {category.category}
            </Link>
          </div>
        ))}
        {/* Add more category items as needed */}
      </div>
    </div>
  );
}
