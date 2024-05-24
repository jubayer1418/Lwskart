"use client";

import { handleToWishlist as originalhandleToWishlist } from "@/db/action";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AddToWishlist = ({
  mode,
  id,
  customerId,
}: {
  mode: string;
  id: string;
  customerId: string | undefined;
}) => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("add_to_wish");

  const router = useRouter();

  useEffect(() => {
    const fun = async () => {
      const res = await originalhandleToWishlist(
        customerId,
        productId as string
      );
      console.log(res);
      if (res?.status == "new") {
        toast.success(res.message);
      }
      if (res?.status == "already") {
        toast.info(res.message);
      }
      router.push("/en/wishlist");
    };
    if (productId && customerId) {
      fun();
    }
  }, [productId]);
  const handleAddToCart = async () => {
    if (!customerId) {
      const returnUrl = encodeURIComponent(
        `${window.location.pathname}?add_to_wish=${id}`
      );
      router.push(`/en/login?returnUrl=${returnUrl}`);
    } else {
      const res = await originalhandleToWishlist(customerId, id);
      if (res?.status == "new") {
        toast.success(res.message);
      }
      if (res?.status == "already") {
        toast.info(res.message);
      }
    }
  };
  return (
    <>
      {mode == "cart" ? (
        <button
          onClick={handleAddToCart}
          className="text-white text-lg w-9 h-8 rounded-full  flex items-center justify-center hover:text-primary transition"
          title="add to wishlist"
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
      ) : (
        <button
          onClick={handleAddToCart}
          className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition"
        >
          <FontAwesomeIcon className="w-5" icon={faHeart} /> Wishlist
        </button>
      )}
    </>
  );
};

export default AddToWishlist;
