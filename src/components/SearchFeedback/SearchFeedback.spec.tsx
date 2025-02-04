import React from "react";
import { render, screen } from "@testing-library/react";
import { SearchFeedback } from "./SearchFeedback";
import NotFound from '../../../public/not-found.png'

describe("<SearchFeedback/>", () => {
  const defaultProps = {
    searchText: "React",
    title: "Itens Encontrados",
    subTitle: "Encontramos 10 itens relacionados à sua pesquisa.",
    url: NotFound,
    alt: "Imagem de teste",
  };

  test("Deve renderizar o título e o subtítulo", () => {
    render(<SearchFeedback {...defaultProps} />);

    const h5Element = screen.getByRole("heading", { level: 5 });
    const subTitle = screen.getByText(defaultProps.subTitle);

    expect(h5Element).toHaveTextContent(defaultProps.title);
    expect(subTitle).toBeInTheDocument();
  });

  test('Deve renderizar o texto de pesquisa quando "searchText" for fornecido', () => {
    render(<SearchFeedback {...defaultProps} />);

    const searchTextElement = screen.getByText(`"${defaultProps.searchText}"`)

    expect(searchTextElement).toBeInTheDocument();
  });

  test('Não deve renderizar o texto de pesquisa quando "searchText" estiver vazio', () => {
    render(<SearchFeedback {...{ ...defaultProps, searchText: "" }} />);

    const searchTextElement = screen.queryByText(/".*"/)

    expect(searchTextElement).not.toBeInTheDocument();
  });

  test("Deve renderizar a imagem com o alt correto e com a src definida", () => {
    render(<SearchFeedback {...defaultProps} />);

    const imageElement = screen.getByAltText(defaultProps.alt);

    expect(imageElement).toBeInTheDocument();
  });
});
