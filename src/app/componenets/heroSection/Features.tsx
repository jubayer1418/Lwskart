import Image from "next/image";
import deliver_van from "@/assets/images/icons/delivery-van.svg";
import service_hours from "@/assets/images/icons/service-hours.svg";
import money_back from "@/assets/images/icons/money-back.svg";
import { useTranslations } from 'next-intl';

export default function Features() {
  const t = useTranslations('features');

  return (
    <div className="container py-16">
      <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">
        <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
          <Image
            src={deliver_van}
            alt="Delivery"
            className="w-12 h-12 object-contain"
          />
          <div>
            <h4 className="font-medium capitalize text-lg">{t('freeShipping')}</h4>
            <p className="text-gray-500 text-sm">{t('orderOver')}</p>
          </div>
        </div>
        <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
          <Image
            src={money_back}
            alt="Money Back"
            className="w-12 h-12 object-contain"
          />
          <div>
            <h4 className="font-medium capitalize text-lg">{t('moneyReturns')}</h4>
            <p className="text-gray-500 text-sm">{t('moneyReturnsDescription')}</p>
          </div>
        </div>
        <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
          <Image
            src={service_hours}
            alt="Service Hours"
            className="w-12 h-12 object-contain"
          />
          <div>
            <h4 className="font-medium capitalize text-lg">{t('support')}</h4>
            <p className="text-gray-500 text-sm">{t('supportDescription')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
