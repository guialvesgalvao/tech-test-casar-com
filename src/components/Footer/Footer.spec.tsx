import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Footer } from "./Footer";
import { usePathname } from "next/navigation";
import { PATHS } from "@/consts/paths";
import { SectionButtonProps } from "../SectionButton/SectionButton";
import { IconProps } from "@/assets/icons/types";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("../SectionButton/SectionButton", () => ({
  __esModule: true,
  SectionButton: ({ customClasses, icon, isSelected, href }: SectionButtonProps) => (
    <div
      data-testid="section-button"
      data-selected={isSelected}
      data-href={href}
      className={customClasses}
    >
      {icon}
    </div>
  ),
}));

jest.mock("@/assets/icons/User", () => ({
  __esModule: true,
  UserIcon: ({ color }: { color: string }) => (
    <svg data-testid="user-icon" data-color={color}>
      <title>UserIcon</title>
    </svg>
  ),
}));

jest.mock("@/assets/icons/HeartFilled", () => ({
  __esModule: true,
  HeartFilledIcon: (props: IconProps) => (
    <svg data-testid="heartfilled-icon" {...props}>
      <title>HeartFilledIcon</title>
    </svg>
  ),
}));

describe("<Footer />", () => {
  const mockUsePathname = usePathname as jest.Mock;
  
  it("renderiza duas SectionButtons e aplica a lógica correta quando pathname não é PATHS.FAVORITES", () => {
    mockUsePathname.mockReturnValue(PATHS.HOME);
    render(<Footer />);
    
    const heartIcon = screen.getByTestId("heartfilled-icon");
    const userIcon = screen.getByTestId("user-icon");
    const buttons = screen.getAllByTestId("section-button");

    const userButton = buttons[0];
    const heartButton = buttons[1];
    
    expect(buttons).toHaveLength(2);

    expect(userButton).toHaveAttribute("data-href", PATHS.HOME);
    expect(userButton).toHaveAttribute("data-selected", "true");

    expect(heartButton).toHaveAttribute("data-href", PATHS.FAVORITES);
    expect(heartButton).toHaveAttribute("data-selected", "false");

    expect(userIcon).toHaveAttribute("data-color", "#fff");
    expect(heartIcon).toHaveAttribute("color", "#32C0C6");
  });

  it("renderiza duas SectionButtons e aplica a lógica correta quando pathname é PATHS.FAVORITES", () => {
    mockUsePathname.mockReturnValue(PATHS.FAVORITES);
    render(<Footer />);

    const userIcon = screen.getByTestId("user-icon");
    const heartIcon = screen.getByTestId("heartfilled-icon");
    const buttons = screen.getAllByTestId("section-button");
    const userButton = buttons[0];
    const heartButton = buttons[1];

    expect(buttons).toHaveLength(2);

    expect(userButton).toHaveAttribute("data-href", PATHS.HOME);
    expect(userButton).toHaveAttribute("data-selected", "false");

    expect(heartButton).toHaveAttribute("data-href", PATHS.FAVORITES);
    expect(heartButton).toHaveAttribute("data-selected", "true");

    expect(userIcon).toHaveAttribute("data-color", "#32C0C6");
    expect(heartIcon).toHaveAttribute("color", "#fff");
  });
});
