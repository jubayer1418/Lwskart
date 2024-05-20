"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";

const Quantity = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(
    Number(searchParams.get("quantity")) || 1
  );

  useEffect(() => {
    const currentQuantity = Number(searchParams.get("quantity"));
    if (currentQuantity !== quantity) {
      setQuantity(currentQuantity || 1);
    }
  }, [searchParams, quantity]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const incrementQuantity = useCallback(() => {
    return createQueryString("quantity", (quantity + 1).toString());
  }, [quantity, createQueryString]);

  const decrementQuantity = useCallback(() => {
    return createQueryString("quantity", Math.max(1, quantity - 1).toString());
  }, [quantity, createQueryString]);

  return (
    <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
      <Link href={`${pathname}?${decrementQuantity()}`}>
        <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
          -
        </div>
      </Link>
      <div className="h-8 w-8 text-base flex items-center justify-center">
        {quantity}
      </div>
      <Link href={`${pathname}?${incrementQuantity()}`}>
        <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
          +
        </div>
      </Link>
    </div>
  );
};

export default Quantity;
