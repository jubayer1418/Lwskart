import Image from "next/image";
import methods from "@/assets/images/methods.png";
import { useTranslations } from "next-intl";

export default function FooterBottom() {
  const t = useTranslations('footerBottom');

  return (
    <div className="bg-gray-800 py-4">
      <div className="container flex items-center justify-between">
        <p className="text-white">{t('rights')}</p>
        <div>
          <Image src={methods} alt="methods" width={240} />
        </div>
      </div>
    </div>
  );
}
