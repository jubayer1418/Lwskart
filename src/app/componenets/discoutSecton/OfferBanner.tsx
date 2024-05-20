
import Image from "next/image";
import offerImg from "@/assets/images/offer.jpg"
import Link from "next/link";
export default function OfferBanner() {
    return (
        <div id="offer" className="container pb-16">
            <Link href="#offer">
                <Image src={offerImg} alt="ads" className="w-full" />
            </Link>
        </div>
    );
}
