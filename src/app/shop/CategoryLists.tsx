"use client"
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const CategoryLists = ({ category, count }: { category: string, count: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const currentCategories = params.getAll(name);

      if (currentCategories.includes(value)) {
        // Remove the category if it is already selected
        const newCategories = currentCategories.filter(cat => cat !== value);
        params.delete(name);
        newCategories.forEach(cat => params.append(name, cat));
      } else {
        // Add the category if it is not selected
        params.append(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  const handleChange = () => {
    const newQueryString = createQueryString("category", category);
    router.push(`${pathname}?${newQueryString}`);
  };

  const isChecked = searchParams.getAll("category").includes(category);

  return (
    <div className="flex items-center" key={category}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        name={`cat-${category}`}
        id={`cat-${category}`}
        className="text-primary focus:ring-0 rounded-sm cursor-pointer"
      />
      <label htmlFor={`cat-${category}`} className="text-gray-600 ml-3 cursor-pointer">
        {category}
      </label>
      <div className="ml-auto text-gray-600 text-sm">({count})</div>
    </div>
  );
};

export default CategoryLists;
