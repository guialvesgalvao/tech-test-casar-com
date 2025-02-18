import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SearchFeedback } from "./SearchFeedback";
import NotFound from "../../../public/not-found.png";

describe("<SearchFeedback/>", () => {
  const defaultProps = {
    searchText: "casar-com",
    title: "Nenhum usuário encontrado",
    subTitle: "Verifique se a escrita está correta ou tente novamente",
    url: NotFound,
    alt: "Imagem de teste",
  };

  const renderComponent = (props = {}) => {
    return render(<SearchFeedback {...defaultProps} {...props} />);
  };

  it("renderiza o título e o subtítulo", () => {
    renderComponent();

    const titleElement = screen.getByRole("heading", { level: 5 });
    const subTitleElement = screen.getByText(defaultProps.subTitle);
    
    expect(titleElement).toHaveTextContent(defaultProps.title);
    expect(subTitleElement).toBeInTheDocument();
  });

  it('renderiza o texto de pesquisa quando "searchText" for fornecido', () => {
    renderComponent();

    const searchTextElement = screen.getByText(`"${defaultProps.searchText}"`);

    expect(searchTextElement).toBeInTheDocument();
  });

  it('não renderiza o texto de pesquisa quando "searchText" estiver vazio', () => {
    renderComponent({ searchText: "" });

    const searchElement = screen.queryByText(/".*"/);

    expect(searchElement).not.toBeInTheDocument();
  });

  it("renderiza a imagem com o alt correto", () => {
    renderComponent();

    const imageElement = screen.queryByAltText(defaultProps.alt);
    
    expect(imageElement).toBeInTheDocument();
  });

  it("não renderiza a imagem se a url não for fornecida", () => {
    renderComponent({ url: undefined });

    const imageElement = screen.queryByAltText(defaultProps.alt);

    expect(imageElement).not.toBeInTheDocument();
  });
});
