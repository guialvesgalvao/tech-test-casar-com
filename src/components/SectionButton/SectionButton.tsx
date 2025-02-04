import Link from "next/link";
import { JSX } from "react";

interface SectionButtonProps {
  icon: JSX.Element;
  title?: string;
  isSelected?: boolean;
  onClick?: () => void;
  href?: string;
}

export function SectionButton(props: Readonly<SectionButtonProps>) {
  const { icon, title, isSelected = true, onClick, href } = props;

  const pureButton = (
    <button
      className={`${
        isSelected ? "bg-primary cursor-auto" : "bg-white cursor-pointer"
      } flex items-center gap-2 py-3 px-4 cursor-pointer h-full`}
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
    <Link href={href}>
      {pureButton}
    </Link>
  );
}
