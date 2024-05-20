"use client";

import { handleToCart, handleToWishlist } from "@/db/action";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { redirect, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const AddToCard = ({
  id,
  mode,
  customerId,
}: {
  id: string;
  mode: string;
  customerId: string | undefined;
}) => {
  const searchParams = useSearchParams();
  const quantity = Number(searchParams.get("quantity")) || 1;
 

  return (
    <>
      {mode == "wish" ? (
        <button
          onClick={() => handleToCart(customerId, id, quantity)}
          className="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
        >
          <FontAwesomeIcon className="pr-3 " icon={faBagShopping} />
          add to cart
        </button>
      ) : (
        <button
          onClick={() => handleToCart(customerId, id, quantity)}
          className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
        >
          <FontAwesomeIcon className="pr-3 " icon={faBagShopping} />
          Add to cart
        </button>
      )}
    </>
  );
};

export default AddToCard;
