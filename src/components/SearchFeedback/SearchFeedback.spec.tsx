import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SearchFeedback } from "./SearchFeedback";
import NotFound from "../../../public/not-found.png";

describe("<SearchFeedback/>", () => {
  const defaultProps = {
    searchText: "React",
    title: "Itens Encontrados",
    subTitle: "Encontramos 10 itens relacionados à sua pesquisa.",
    url: NotFound,
    alt: "Imagem de teste",
  };

  const renderComponent = (props = {}) => {
    return render(<SearchFeedback {...defaultProps} {...props} />);
  };

  it("renderiza o título e o subtítulo", () => {
    renderComponent();
    expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent(defaultProps.title);
    expect(screen.getByText(defaultProps.subTitle)).toBeInTheDocument();
  });

  it('renderiza o texto de pesquisa quando "searchText" for fornecido', () => {
    renderComponent();
    expect(screen.getByText(`"${defaultProps.searchText}"`)).toBeInTheDocument();
  });

  it('não renderiza o texto de pesquisa quando "searchText" estiver vazio', () => {
    renderComponent({ searchText: "" });
    expect(screen.queryByText(/".*"/)).not.toBeInTheDocument();
  });

  it("renderiza a imagem com o alt correto", () => {
    renderComponent();
    expect(screen.getByAltText(defaultProps.alt)).toBeInTheDocument();
  });

  it("não renderiza a imagem se a url não for fornecida", () => {
    renderComponent({ url: undefined });
    expect(screen.queryByAltText(defaultProps.alt)).not.toBeInTheDocument();
  });
});
