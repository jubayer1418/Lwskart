import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHeart,
  faMagnifyingGlass,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { Product } from "@/type";
import Link from "next/link";
import AddToCard from "./AddToCard";
import AddToWishlist from "./AddToWishlist";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
library.add(faStar);
const Card = async ({ product }: { product: Product }) => {
  const session = await auth();

  return (
    <div
      key={product?.id}
      className="bg-white shadow rounded overflow-hidden group"
    >
      <div className="relative">
        <Image
          width={200}
          height={200}
          src={product?.img}
          alt="product 1"
          className="w-full h-56"
        />
        <div
          className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
        >
          <Link
            href={`/en/product/${product?.id}`}
            className="text-white text-lg w-9 h-8 rounded-full flex items-center justify-center hover:text-primary transition"
            title="view product"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Link>
          <AddToWishlist
            id={product?.id}
            mode={"cart"}
            customerId={session?.user?.id}
          />
        </div>
      </div>
      <div className="pt-4 pb-3 px-4">
        <Link href={`/en/product/${product?.id}`}>
          <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
            {product?.name}
          </h4>
        </Link>
        <div className="flex items-baseline mb-1 space-x-2">
          <p className="text-xl text-primary font-semibold">
            ${product?.discountPrice}
          </p>
          <p className="text-sm text-gray-400 line-through">
            ${product?.price}
          </p>
        </div>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} className="flex gap-1 text-sm ">
              {star <= product?.rating ? (
                <span className="w-5 text-yellow-400">
                  <FontAwesomeIcon icon={faStar} />
                </span>
              ) : (
                <span className="w-5 text-gray-300">
                  <FontAwesomeIcon icon={faStar} />
                </span>
              )}
            </div>
          ))}

          <div className="text-xs text-gray-500 ml-3">(150)</div>
        </div>
      </div>
      <AddToCard mode={""} id={product?.id} customerId={session?.user?.id} />
    </div>
  );
};

export default Card;
