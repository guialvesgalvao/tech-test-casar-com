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
  const {
    icon,
    title,
    isSelected = true,
    onClick,
    href,
    customClasses = "",
  } = props;

  const pureButton = (
    <button
      className="flex flex-row gap-x-2 items-center py-5 px-4"
      onClick={onClick}
    >
      {icon}
      {title ? (
        <span
          className={`${isSelected ? "text-white" : "text-primary"} text-sm font-medium`}
        >
          {title}
        </span>
      ) : null}
    </button>
  );

  if (!href || href.trim() === "") return pureButton;

  return (
    <Link
      className={`${
        isSelected ? "bg-primary cursor-auto" : "bg-white cursor-pointer"
      }  cursor-pointer h-full ${customClasses}`}
      href={href}
    >
      {pureButton}
    </Link>
  );
}
