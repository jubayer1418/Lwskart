import { Product } from "@/type";
import {
  faBagShopping,
  faHeart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import AddToWishlist from "../card/AddToWishlist";
import ShareButton from "@/app/componenets/share/ShareButton";
import AddToCard from "../card/AddToCard";
import Quantity from "./Quantity";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function ProductDetails({ product }: { product: Product }) {
  const session = await auth();
  
  return (
    <div className="container grid grid-cols-2 gap-6">
      <div>
        <Image
          src={product.img}
          width={500}
          height={500}
          alt="product"
          className="w-full"
        />
        <div className="grid grid-cols-5 gap-4 mt-4">
          {product.thumbnail.map((productImg) => (
            <Image
              key={productImg}
              src={productImg}
              width={200}
              height={200}
              alt="product2"
              className="w-full cursor-pointer border border-primary"
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-medium uppercase mb-2">{product.name}</h2>
        <div className="flex items-center mb-4">
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
          <div className="text-xs text-gray-500 ml-3">(150 Reviews)</div>
        </div>
        <div className="space-y-2">
          <p className="text-gray-800 font-semibold space-x-2">
            <span>Availability: </span>
            <span className="text-green-600">{product.availability}</span>
          </p>
          <p className="space-x-2">
            <span className="text-gray-800 font-semibold">Brand: </span>
            <span className="text-gray-600">{product.brand}</span>
          </p>
          {/* Add more product details here */}
        </div>
        <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
          <p className="text-xl text-primary font-semibold">
            ${product.discountPrice}
          </p>
          <p className="text-base text-gray-400 line-through">
            ${product.price}
          </p>
        </div>
        <p className="mt-4 text-gray-600">{product.description}</p>
        <div className="mt-4">
          <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
          <Quantity />
        </div>
        <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
          <AddToCard mode={""} id={product.id} customerId={session?.user?.id} />
          <AddToWishlist id={product.id} mode={"details"} customerId={session?.user?.id} />
        </div>
        <div className="flex gap-3 mt-4">
          <ShareButton id={product.id} />
          {/* Add more social media icons here */}
        </div>
      </div>
    </div>
  );
}
