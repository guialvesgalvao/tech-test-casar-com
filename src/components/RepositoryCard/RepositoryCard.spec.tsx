import React from "react";
import { render, screen } from "@testing-library/react";
import { RepositoryCard } from "./RepositoryCard";

jest.mock("@/assets/icons/HeartFilled", () => ({
  __esModule: true,
  HeartFilledIcon: (props: any) => (
    <svg data-testid="heart-filled-icon" {...props}>
      <title>HeartFilledIcon</title>
    </svg>
  ),
}));

jest.mock("@/assets/icons/Heart", () => ({
  __esModule: true,
  HeartIcon: (props: any) => (
    <svg data-testid="heart-icon" {...props}>
      <title>HeartIcon</title>
    </svg>
  ),
}));

describe("<RepositoryCard/>", () => {
  const defaultProps = {
    title: "Test Repository",
    language: "python",
    description: "This is a test repository description.",
    isFavorite: false,
    lastUpdate: "Updated on 2025-01-01",
  };

  test("deve renderizar o título, a descrição, a tecnologia principal e a data da última atualização", () => {
    render(<RepositoryCard {...defaultProps} />);

    const titleElement = screen.getByRole("heading", { level: 4 });    

    expect(titleElement).toHaveTextContent(defaultProps.title);
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.language)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.lastUpdate)).toBeInTheDocument();
  });

  test('deve renderizar o botão de favorito com "HeartIcon" quando "isFavorite" for false', () => {
    render(<RepositoryCard {...defaultProps} />);

    const favoriteButton = screen.getByRole("button");

    expect(favoriteButton).toBeInTheDocument();
    expect(screen.getByTestId("heart-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("heart-filled-icon")).not.toBeInTheDocument();
  });

  test('deve renderizar o botão de favorito com "HeartFilledIcon" quando "isFavorite" for true', () => {
    render(<RepositoryCard {...{ ...defaultProps, isFavorite: true }} />);

    const favoriteButton = screen.getByRole("button");

    expect(favoriteButton).toBeInTheDocument();
    expect(screen.getByTestId("heart-filled-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("heart-icon")).not.toBeInTheDocument();
  });
});
