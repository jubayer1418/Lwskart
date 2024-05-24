"use client";

import { handleToCart } from "@/db/action";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
interface AddToCartProps {
  id: string;
  mode: string;
  customerId?: string;
}
const AddToCart = ({ id, mode, customerId }: AddToCartProps) => {
  const searchParams = useSearchParams();

  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const qty = Number(searchParams.get("quantity")) || 1;
    const productId = searchParams.get("add_to_cart");

    setQuantity(qty);
    const fun = async () => {
      const res = await handleToCart(customerId, productId as string, quantity);

      if (res?.status == "new") {
        toast.success(res.message);
      } else if (res?.status == "already") {
        toast.error(res.message);
      } else if (res?.status == "error") {
        toast.error(res.message);
      }
      router.push("/en/checkout");
    };
    if (qty && productId && customerId) {
      fun();
    }
  }, [customerId, quantity, router, searchParams]);

  const handleAddToCart = async () => {
    if (!customerId) {
      const returnUrl = encodeURIComponent(
        `${window.location.pathname}?add_to_cart=${id}&quantity=${quantity}`
      );
      router.push(`/en/login?returnUrl=${returnUrl}`);
    } else {
      const res = await handleToCart(customerId, id, quantity);

      if (res?.status == "new") {
        toast.success(res.message);
      } else if (res?.status == "already") {
        toast.error(res.message);
      } else if (res?.status == "error") {
        toast.error(res.message);
      }
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`${
        mode === "wish" ? "px-6 py-2 text-sm" : "block w-full py-1"
      } text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium`}
    >
      <FontAwesomeIcon className="pr-3" icon={faBagShopping} />
      Add to cart
    </button>
  );
};

export default AddToCart;
