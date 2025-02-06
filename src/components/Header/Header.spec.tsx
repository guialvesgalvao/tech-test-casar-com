import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "./Header";
import { PATHS } from "@/consts/paths";

jest.mock("../SearchInput/SearchInput", () => ({
  __esModule: true,
  default: () => <div data-testid="search-input-mock" />,
}));

jest.mock("../SectionButton/SectionButton", () => ({
  __esModule: true,
  SectionButton: ({ title, href, customClasses }: any) => (
    <a data-testid="section-button-mock" href={href} className={customClasses}>
      {title}
    </a>
  ),
}));

describe("<Header />", () => {
  it("renderiza o componente SearchInput", () => {
    render(<Header />);
    expect(screen.getByTestId("search-input-mock")).toBeInTheDocument();
  });

  it("renderiza o SectionButton com o título 'Favoritos' e href correto", () => {
    render(<Header />);
    const button = screen.getByTestId("section-button-mock");
    expect(button).toHaveTextContent("Favoritos");
    expect(button).toHaveAttribute("href", PATHS.FAVORITES);
  });

  it("usa as classes personalizadas definidas em SectionButton", () => {
    render(<Header />);
    const button = screen.getByTestId("section-button-mock");
    expect(button).toHaveClass("flex h-full");
  });
});
