import Breack from "@/app/componenets/common/Breack";
import ProductDescription from "@/app/componenets/productDetails/ProductDescription";
import ProductDetails from "@/app/componenets/productDetails/ProductDetails";
import RelatedProducts from "@/app/componenets/productDetails/RelatedProducts";
import { findProductById, findRelatedProducts } from "@/db/queries";
import { dbConnect } from "@/server";
import { Product } from "@/type";
export async function generateMetadata({ params }:{ params: { id: string } }) {
  // read route params
  const id = params.id;
  await dbConnect();
  const product = await findProductById(id);

  return {
    title: `${product.name} product`,
    description: product.description,
  };
}

const DetailPage = async ({ params: { id } }: { params: { id: string } }) => {
  await dbConnect();
  const product = await findProductById(id);
  const relatedProducts: Product[] = await findRelatedProducts(
    product.category
  );
 

  return (
    <>
      <Breack>Product</Breack>
      <ProductDetails product={product} />
      <ProductDescription description={product.description} />
      <RelatedProducts relatedProducts={relatedProducts} />
    </>
  );
};

export default DetailPage;
