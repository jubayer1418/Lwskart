import Breack from '@/app/componenets/common/Breack';
import { auth } from '@/auth';
import { getAllCartEntries } from '@/db/queries';
import { dbConnect } from '@/server';
import { redirect } from 'next/navigation';
import CheckoutForm from './CheckoutForm';


const Checkout = async () => {
  const session = await auth();
  if (!session) redirect('/en/login');

  await dbConnect();
  const categories = await getAllCartEntries(session.user?.id as string);

  const totalPrice = categories.reduce((total: number, order: any) => {
    return total + order.productId.discountPrice * order.quantity;
  }, 0);

  return (
    <>
      <Breack>Checkout</Breack>
      <CheckoutForm categories={categories} totalPrice={totalPrice} userId={session.user?.id} />
    </>
  );
};

export default Checkout;
