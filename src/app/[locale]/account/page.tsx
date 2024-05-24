import { dbConnect } from "@/server";
import Modal, { ModalButtonS } from "./Modal";
import { getCustomerById } from "@/db/queries";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

const ProfileInfo = async () => {
  const session: Session | null | undefined = await auth();

  if (!session) redirect("/en/login");
  await dbConnect();
  const customer = await getCustomerById(session?.user?.email as string);

  return (
    <div className="container items-start gap-6 pt-4 pb-16">
      {/* Personal Profile */}
      <div className="grid  gap-4 mx-auto max-w-xl">
        {/* Personal Profile */}
        <div className="shadow rounded bg-white px-4 pt-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-800 text-lg">
              Personal Profile
            </h3>

            <ModalButtonS />
          </div>
          <div className="space-y-1">
            <h4 className="text-gray-700 font-medium">
              Name: {customer?.name}
            </h4>
            <p className="text-gray-800">Email: {customer?.email}</p>
            <p className="text-gray-800">
              PhoneNumber: {customer?.phoneNumber}
            </p>
            <p className="text-gray-800">Address: {customer?.address}</p>
          </div>
        </div>
        {/* Shipping address */}
      </div>
      {/* ./info */}
      <Modal email={session?.user?.email}/>
    </div>
  );
};

export default ProfileInfo;
