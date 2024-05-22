"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const Size = ({ size }: { size: string }) => {
  const route = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string, remove: boolean = false) => {
      const params = new URLSearchParams(searchParams.toString());
      if (remove) {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleClick = () => {
    const currentSize = searchParams.get("size");
    const newQueryString = createQueryString("size", size, currentSize === size);
    route.push(`${pathname}?${newQueryString}`);
  };

  return (
    <div className="size-selector">
      <input type="radio" name="size" id={`size-${size}`} className="hidden" />
      <a
        onClick={handleClick}
        className={`text-xs border ${
          searchParams.get("size") === size ? "text-primary" : ""
        } border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600`}
      >
        {size}
      </a>
    </div>
  );
};

export default Size;
