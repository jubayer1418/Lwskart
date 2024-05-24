import { Cart, Category, Customer, Order, Product, Wishlist } from "@/model";
import { SearchParams } from "@/type";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils";
import pick from "@/utils/pick";
import { startSession } from "mongoose";
import { revalidatePath, revalidateTag } from "next/cache";

async function getAllCategories() {
  try {
    // const categories = await Category.find().lean();

    const results = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          image: { $push: "$categoryImage" },
        },
      },
      {
        $project: {
          category: "$_id",
          image: "$image",
        },
      },
    ]);
    console.log(results);
    return replaceMongoIdInArray(results);
  } catch (error) {
    console.error("Error retrieving categories:", error);
    throw error;
  }
}
async function getAllCategoriesSum() {
  try {
    const categories = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    return categories;
  } catch (error) {
    console.error("Error retrieving categories:", error);
    throw error;
  }
}
async function getAllProducts() {
  try {
    const products = await Product.find().lean();
    return replaceMongoIdInArray(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    throw error;
  }
}
async function getCustomerById(customerId: string) {
  try {
    const products = await Customer.findOne({ email: customerId }).lean();
    console.log(products);
    return replaceMongoIdInObject(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    throw error;
  }
}
async function findProductById(productId: string) {
  try {
    const product = await Product.findById(productId).lean();
    return replaceMongoIdInObject(product);
  } catch (error) {
    console.error("Error finding product:", error);
    throw error;
  }
}
async function getAllNewArrivalProducts() {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const formattedDate = thirtyDaysAgo.toISOString().split("T")[0];
    console.log(formattedDate);

    const newProducts = await Product.find({
      releaseDate: { $gte: formattedDate },
    }).lean();

    return replaceMongoIdInArray(newProducts);
  } catch (error) {
    console.error("Error retrieving new arrival products:", error);
    throw error;
  }
}
async function findRelatedProducts(category: string) {
  try {
    const relatedProducts = await Product.find().lean();

    const RelatedProducts = replaceMongoIdInArray(relatedProducts);

    return RelatedProducts.filter((p: any) => p.category == category);
  } catch (error) {
    console.error("Error finding related products:", error);
    throw error;
  }
}
async function getAllTrendingProducts() {
  try {
    const trendingProducts = await Product.find({ rating: { $gte: 4.5 } })
      .sort({ rating: -1 })
      .lean();

    return replaceMongoIdInArray(trendingProducts);
  } catch (error) {
    console.error("Error retrieving trending products:", error);
    throw error;
  }
}

//wishlist query
async function getAllWishlistEntries(id: string) {
  try {
    const wishlistEntries = await Wishlist.find({ customerId: id })
      .populate("productId")

      .lean();

    return replaceMongoIdInArray(wishlistEntries);
  } catch (error) {
    console.error("Error retrieving wishlist entries:", error);
    throw error;
  }
}

async function addWishlistEntry(customerId: string, productId: string) {
  try {
    if (productId && customerId) {
      const wishlistEntry = await Wishlist.findOne({ customerId, productId });
      if (wishlistEntry) {
        return {
          status: "already",
          message: "already added",
        };
      } else {
        const newWishlistEntry = new Wishlist({ customerId, productId });
        await newWishlistEntry.save();

        return {
          status: "new",
          message: "adding wishlist entry",
        };
      }
    }
  } catch (error) {
    console.error("Error adding wishlist entry:", error);
    throw error;
  }
}

// const searchProducts = async (searchParams) => {
//   const { searchTerm, category } = searchParams;
//   console.log(searchParams);

//   // Define an empty query object
//   let query = {};

//   let orConditions;
//   // If searchTerm is provided, construct OR conditions for name, description, and brand
//   if (searchTerm) {
//     orConditions = ["name", "description", "brand", "color", "category"].map(
//       (field) => ({
//         [field]: { $regex: searchTerm, $options: "i" }, // Case-insensitive search
//       })
//     );
//     query.$or = orConditions;
//   }

//   if (searchParams.min_price && searchParams.max_price) {
//     query.price = {
//       $gte: parseFloat(searchParams.min_price),
//       $lte: parseFloat(searchParams.max_price),
//     };
//   } else if (searchParams.min_price) {
//     query.price = { $gte: parseFloat(searchParams.min_price) };
//   } else if (searchParams.max_price) {
//     query.price = { $lte: parseFloat(searchParams.max_price) };
//   }

//   // Filter by size if provided
//   if (searchParams.size) {
//     query.size = { $regex: searchParams.size, $options: "i" };
//   }
//   if (searchParams.category) {
//     query.category = { $regex: searchParams.category, $options: "i" };
//   }
//   // Execute the query
//   console.log(query);
//   const result = await Product.find(query).lean();
//   console.log(result);
//   return replaceMongoIdInArray(result);
// };
const searchProducts = async (searchParams: SearchParams) => {
  const { searchTerm, category, min_price, max_price, size } = searchParams;
  console.log(searchParams);

  // Define an empty query object
  let query: { [key: string]: any } = {};

  // Construct OR conditions for name, description, brand, color, and category if searchTerm is provided
  if (searchTerm) {
    const orConditions = [
      "name",
      "description",
      "brand",
      "color",
      "category",
    ].map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" }, // Case-insensitive search
    }));
    query.$or = orConditions;
  }

  // Filter by price range
  if (min_price && max_price) {
    query.price = {
      $gte: parseFloat(min_price),
      $lte: parseFloat(max_price),
    };
  } else if (min_price) {
    query.price = { $gte: parseFloat(min_price) };
  } else if (max_price) {
    query.price = { $lte: parseFloat(max_price) };
  }

  // Filter by size if provided
  if (size) {
    query.size = { $regex: size, $options: "i" };
  }

  // Filter by category if provided
  if (category) {
    // Handle multiple categories by constructing an $in array
    const categories = Array.isArray(category) ? category : [category];
    console.log(categories);
    query.category = { $in: categories.map((cat) => new RegExp(cat, "i")) };
  }

  // Log the constructed query
  console.log(query);

  // Execute the query
  const result = await Product.find(query).lean();
  console.log(result);

  // Replace MongoDB _id with id in the result array
  return replaceMongoIdInArray(result);
};

//carts query
async function getAllCartEntries(id: string) {
  try {
    const cartEntries = await Cart.find({ customerId: id })

      .populate("productId")
      .lean();
    return replaceMongoIdInArray(cartEntries);
  } catch (error) {
    console.error("Error retrieving cart entries:", error);
    throw error;
  }
}
// async function addCartEntry(
//   customerId: string,
//   productId: string,
//   quantity: number
// ) {
//   try {
//     const newCartEntry = new Cart({ customerId, productId, quantity });
//     const savedEntry = await newCartEntry.save();
//     return savedEntry;
//   } catch (error) {
//     console.error("Error adding cart entry:", error);
//     throw error;
//   }
// }
async function addCartEntry(
  customerId: string,
  productId: string,
  quantity: number
) {
  const session = await startSession();
  session.startTransaction();

  try {
    // Find the product and check if enough quantity is available
    const product = await Product.findById(productId).session(session);
    if (!product) {
      return {
        status: "error",
        message: "Product not found",
      };
    }

    if (product.quantity === 0) {
      return {
        status: "error",
        message: "Product out of stock",
      };
    } else if (product.quantity < quantity) {
      return {
        status: "error",
        message: "Product quantity is insufficient",
      };
    }

    // Create the cart entry
    const newCartEntry = new Cart({ customerId, productId, quantity });
    const savedEntry = await newCartEntry.save({ session });
    if (product.quantity - quantity === 0) {
      console.log("ldkfj");
      product.availability = "Out of Stock";
      await product.save({ session });
    }
    product.quantity -= quantity;

    await product.save({ session });
    // Reserve the product quantity
  

    await session.commitTransaction();
    session.endSession();

    // Set a timeout to revert the quantity if order is not placed within 30 minutes
    setTimeout(async () => {
      await revertProductQuantityIfOrderNotPlaced(savedEntry._id);
    }, 60 * 1000); // 30 minutes in milliseconds

    return {
      status: "new",
      message: "adding cart entry",
    };
  } catch (error) {
    // Rollback the transaction
    await session.abortTransaction();
    session.endSession();

    console.error("Error adding cart entry:", error);
    throw error;
  }
}
async function revertProductQuantityIfOrderNotPlaced(cartEntryId: string) {
  console.log(cartEntryId);

  const session = await startSession();
  session.startTransaction();

  try {
    // Find the cart entry
    const cartEntry = await Cart.findById(cartEntryId).session(session);
    if (!cartEntry) {
      throw new Error("Cart entry not found");
    }

    // If no order is placed, revert the product quantity
    const product = await Product.findById(cartEntry.productId).session(
      session
    );
    product.quantity += cartEntry.quantity;
    product.availability = "In Stock";

    await product.save({ session });

    // Optionally, you can remove the cart entry
    await Cart.findByIdAndDelete(cartEntryId).session(session);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    // Rollback the transaction
    await session.abortTransaction();
    session.endSession();
  }
}

export {
  getAllCategories,
  getAllProducts,
  getAllTrendingProducts,
  getAllNewArrivalProducts,
  findProductById,
  findRelatedProducts,
  getAllWishlistEntries,
  addWishlistEntry,
  getAllCartEntries,
  addCartEntry,
  searchProducts,
  getAllCategoriesSum,
  getCustomerById,
};
