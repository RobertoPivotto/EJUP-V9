import React from "react";
import { LOGO_SRC } from "@/lib/brand";

type LogoProps = {
  className?: string;
  alt?: string;
};

const Logo: React.FC<LogoProps> = ({ className, alt = "EJUP Logo" }) => {
  return <img src={LOGO_SRC} alt={alt} className={className} />;
};

export default Logo;