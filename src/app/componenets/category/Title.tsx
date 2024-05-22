import { useTranslations } from "next-intl";


const Title = ({title}:{title:string}) => {
    const t = useTranslations('header');
  return (
    <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
      {t(`${title}`)}
      </h2>
  )
}

export default Title