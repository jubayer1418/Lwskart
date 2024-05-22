

import banner from "@/assets/images/banner-bg.jpg";
import { useTranslations } from "next-intl";
import Link from "next/link";
export default function Banner() {
    const t = useTranslations('banner');
    return (
        <div className="bg-cover bg-no-repeat bg-center py-36" style={{ backgroundImage: `url(${banner.src})` }}>
            <div className="container">
                <h1 className="text-6xl text-gray-800 font-medium mb-4 capitalize">
                    {t('title')}
                </h1>
                <p>
                    {t('description')}
                </p>
                <div className="mt-12">
                    <Link href="/en/shop" className="bg-primary border border-primary text-white px-8 py-3 font-medium rounded-md hover:bg-transparent hover:text-primary">
                        {t('shopNow')}
                    </Link>
                </div>
            </div>
        </div>
    );
}
