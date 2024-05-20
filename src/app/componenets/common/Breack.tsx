import { faChevronRight, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Breack = ({children}) => {
  return (
    <div className="container py-4 flex items-center gap-3">
      <a href="../index.html" className="text-primary text-base">
      <FontAwesomeIcon icon={faHouse} />
      </a>
      <span className="text-sm text-gray-400">
      <FontAwesomeIcon icon={faChevronRight} />
      </span>
      <p className="text-gray-600 font-medium">{children}</p>
    </div>
  );
};

export default Breack;
