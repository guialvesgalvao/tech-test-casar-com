import Link from "next/link";
import { JSX } from "react";

interface SectionButtonProps {
  icon: JSX.Element;
  title?: string;
  isSelected?: boolean;
  onClick?: () => void;
  href?: string;
  customClasses?: string;
}

export function SectionButton(props: Readonly<SectionButtonProps>) {
  const { icon, title, isSelected = true, onClick, href, customClasses } = props;

  const pureButton = (
    <button
      onClick={onClick}
    >
      {icon}
      {title ? (
        <span className={`${isSelected ? "text-white" : "text-primary"} text-sm font-medium`}>{title}</span>
      ) : null}
    </button>
  );

  if (!href || href.trim() === '') return pureButton;

  return (
    <Link className={`${
        isSelected ? "bg-primary cursor-auto" : "bg-white cursor-pointer"
      } flex items-center gap-2 py-3 px-4 cursor-pointer h-full ${customClasses}`} href={href}>
      {pureButton}
    </Link>
  );
}
