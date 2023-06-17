import React from "react";
import Link from "next/link";

type Props = {
  title: string | JSX.Element;
  subtitle?: string;
  description?: string;
  href?: string;
  onClick?: () => void;
};

const ButtonComponent: React.FC<Props> = ({ title, subtitle, description, href, onClick }) => {
  if (href) {
    return (
      <div>
        <div className="button-subtitle">{description}</div>
        <Link href={href} className="button">{title}</Link>
        {
          subtitle ?
          <div>
            <div></div>
            <Link href={href} className="button-secondary">{subtitle}</Link>
          </div>
          :
          <div></div>
        }
      </div>
    );
  } else {
    return <button onClick={onClick}>{title}</button>;
  }
};

export default ButtonComponent;
