import Link from "next/link";
import { JSX } from "react";

interface SectionButtonProps {
  icon: JSX.Element;
  title?: string;
  isSelected?: boolean;
  href: string;
  customClasses?: string;
}

export function SectionButton(props: Readonly<SectionButtonProps>) {
  const { icon, title, isSelected = true, href, customClasses = "" } = props;

  return (
    <Link
      className={`${
        isSelected ? "bg-primary cursor-auto" : "bg-white cursor-pointer"
      }  cursor-pointer h-full ${customClasses} flex flex-row gap-x-2 items-center py-5 px-4`}
      href={href}
    >
      {icon}
      {title ? (
        <span className={`${isSelected ? "text-white" : "text-primary"} text-sm font-medium`}>
          {title}
        </span>
      ) : null}
    </Link>
  );
}
