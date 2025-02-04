import { JSX } from "react";

interface SectionButtonProps {
  icon: JSX.Element;
  title?: string;
  isSelected: boolean;
  onClick: () => void;
}

export function SectionButton(props: Readonly<SectionButtonProps>) {
  const { icon, title, isSelected, onClick } = props;

  return (
    <button
      className={`${
        isSelected ? "bg-primary cursor-auto" : "bg-white cursor-pointer"
      } flex items-center gap-2 py-3 px-4`}
      onClick={onClick}
    >
      {icon}
      {title ? <span className={`${isSelected ? "text-white" : 'text-primary'} text-sm font-medium`}>{title}</span> : null}
    </button>
  );
}
