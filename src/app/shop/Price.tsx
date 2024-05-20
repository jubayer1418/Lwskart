"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const Price = () => {
  const route = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="mt-4 flex items-center">
      <input
        onChange={(e) =>
          route.push(
            pathname + "?" + createQueryString("min_price", e.target.value)
          )
        }
        value={searchParams.get("min_price") || ""}
        
        type="text"
        name="min"
        id="min"
        className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
        placeholder="min"
      />
      <span className="mx-3 text-gray-500">-</span>
      <input
        onChange={(e) =>
          route.push(
            pathname + "?" + createQueryString("max_price", e.target.value)
          )
        }
        value={searchParams.get("max_price") || ""}
        type="text"
        name="max"
        id="max"
        className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
        placeholder="max"
      />
    </div>
  );
};

export default Price;
