import { Scroll } from "lucide-react";
import { Link } from "react-router";


const Logo = ({
  to = "/",
  iconSize = "size-8",
  textSize = "text-3xl",
  gap = "gap-2",
  className = "",
}) => {
  return (
    <Link
      to={to}
      className={`flex items-center ${gap} hover:opacity-80 transition-opacity ${className}`}
    >
      <Scroll className={`${iconSize} text-primary`} />
      <h1 className={`${textSize} font-bold text-primary font-medieval`}>
        Notes Mage
      </h1>
    </Link>
  );
};

export default Logo;

