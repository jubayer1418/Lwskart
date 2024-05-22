import Image from "next/image";
import { useTranslations } from "next-intl";
import logo from "@/assets/images/logo.svg";

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-white pt-16 pb-12 border-t border-gray-100">
      <div className="container grid grid-cols-1">
        <div className="col-span-1 space-y-4">
          <Image src={logo} alt="logo" className="w-30" />
          <div className="mr-2">
            <p className="text-gray-500">
              {t('description')}
            </p>
          </div>
          <div className="flex space-x-5">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <i className="fa-brands fa-facebook-square"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <i className="fa-brands fa-instagram-square"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <i className="fa-brands fa-twitter-square"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <i className="fa-brands fa-github-square"></i>
            </a>
          </div>
        </div>

        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                {t('solutions')}
              </h3>
              <div className="mt-4 space-y-4">
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {t('marketing')}
                </a>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {t('analytics')}
                </a>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {t('commerce')}
                </a>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {t('insights')}
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                {t('support')}
              </h3>
              <div className="mt-4 space-y-4">
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {t('pricing')}
                </a>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {t('guides')}
                </a>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {t('apiStatus')}
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                {t('solutions')}
              </h3>
              <div className="mt-4 space-y-4">
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {t('marketing')}
                </a>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {t('analytics')}
                </a>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {t('commerce')}
                </a>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {t('insights')}
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                {t('support')}
              </h3>
              <div className="mt-4 space-y-4">
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {t('pricing')}
                </a>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {t('guides')}
                </a>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {t('apiStatus')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
