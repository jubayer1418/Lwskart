"use client";

import { handleToWishlist } from "@/db/action";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddToWishlist = ({
  mode,
  id,
  customerId,
}: {
  mode: string;
  id: string;
  customerId: string | undefined;
}) => {
  return (
    <>
      {mode == "cart" ? (
        <button
          onClick={() => handleToWishlist(customerId, id)}
          className="text-white text-lg w-9 h-8 rounded-full  flex items-center justify-center hover:text-primary transition"
          title="add to wishlist"
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
      ) : (
        <button
          onClick={() => handleToWishlist(customerId, id)}
          className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition"
        >
          <FontAwesomeIcon className="w-5" icon={faHeart} /> Wishlist
        </button>
      )}
    </>
  );
};

export default AddToWishlist;
