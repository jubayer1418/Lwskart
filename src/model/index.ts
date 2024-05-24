import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";
import { string } from "zod";

const customerSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    address: { type: String },
    googleId: { type: String },
    facebookId: { type: String },
    image: { type: String },
    phoneNumber: { type: String },
  },
  {
    timestamps: true,
  }
);

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true },
    img: String,
    thumbnail: [String],
    brand: String,
    sku: String,
    reviews: String,
    rating: { type: Number, min: 0, max: 5 },
    description: String,
    availability: String,
    discountPrice: { type: Number, required: true, min: 0 },
    size: { type: String, required: true },
    color: { type: String, required: true },
    category: { type: String, required: true },
    categoryImage: { type: String, required: true },
    releaseDate: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const categorySchema = new Schema({
  category: { type: String, required: true },
  image: String,
});

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    categories: { type: Array, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

// const orderItemSchema = new Schema({
//   orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },

//   price: { type: Number, required: true, min: 0 },
// });

// const paymentSchema = new Schema({
//   orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
//   amount: { type: Number, required: true, min: 0 },
//   method: {
//     type: String,
//     enum: ["Credit Card", "Debit Card", "PayPal", "Cash"],
//     required: true,
//   },
// });

// const shipmentSchema = new Schema({
//   orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
//   address: { type: String, required: true },
//   trackingNumber: String,
// });

const cartSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const wishlistSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
});
customerSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const hashedPassword = await bcrypt.hash(user.password!, 10);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error as any);
  }
});

// Method to compare password
customerSchema.methods.comparePassword = async function (
  givenPassword: string
) {
  try {
    return await bcrypt.compare(givenPassword, this.password);
  } catch (error) {
    throw error;
  }
};
const CheckoutSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    company: { type: String },
    region: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    agreement:{
      type: String,
     
    }
  },
  { timestamps: true }
);

const CheckoutModel =
  mongoose.models.Checkout || mongoose.model("Checkout", CheckoutSchema);
const Customer =
  mongoose.models.Customer || mongoose.model("Customer", customerSchema);
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
// const OrderItem =
//   mongoose.models.OrderItem || mongoose.model("OrderItem", orderItemSchema);
// const Payment =
//   mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
// const Shipment =
//   mongoose.models.Shipment || mongoose.model("Shipment", shipmentSchema);
const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
const Wishlist =
  mongoose.models.Wishlist || mongoose.model("Wishlist", wishlistSchema);

export { Customer, Product, Category, Order, Cart, Wishlist, CheckoutModel };
