import Image from "next/image";
import assets from "@/assets";
import methods from "@/assets/images/methods.png"
export default function FooterBottom() {
  return (
    <div className="bg-gray-800 py-4">
      <div className="container flex items-center justify-between">
        <p className="text-white">&copy; TailCommerce - All Right Reserved</p>
        <div>
          <Image src={methods} alt="methods" width={240}/>
        </div>
      </div>
    </div>
  );
}
