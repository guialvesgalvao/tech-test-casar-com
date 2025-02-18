import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RepositoryCard } from "./RepositoryCard";
import { useFavoritesRepos } from "@/stores/useFavoritesRepos";
import { IconProps } from "@/assets/icons/types";

jest.mock("@/stores/useFavoritesRepos", () => ({
  __esModule: true,
  useFavoritesRepos: jest.fn(),
}));

jest.mock("@/assets/icons/HeartFilled", () => ({
  __esModule: true,
  HeartFilledIcon: (props: IconProps) => (
    <svg data-testid="heart-filled-icon" {...props}>
      <title>HeartFilledIcon</title>
    </svg>
  ),
}));

jest.mock("@/assets/icons/Heart", () => ({
  __esModule: true,
  HeartIcon: (props: IconProps) => (
    <svg data-testid="heart-icon" {...props}>
      <title>HeartIcon</title>
    </svg>
  ),
}));

describe("<RepositoryCard/>", () => {
  const defaultProps = {
    owner: {
      id: 12321,
      userName: 'guialvesgalvao',
      avatarUrl: 'https://avatars.githubusercontent.com/u/78868778?v=4'
    },
    id: 1,
    title: "Test Repository",
    description: "This is a test repository.",
    language: "JavaScript",
    updatedAt: "2025-01-01",
    private: false,
    isFavorite: false,
    fork: false,
    url: "https://github.com/example/test-repository",
    createdAt: new Date("2025-01-01"),
    watchers: 10,
    defaultBranch: "main",
  };


  function mockFavorites(favoritesData: { id: number }[] = []) {
    (useFavoritesRepos as unknown as jest.Mock).mockReturnValue({
      favorites: favoritesData,
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
    });
  }

  it("renderiza corretamente título, descrição, linguagem e data de atualização", () => {
    mockFavorites();

    render(<RepositoryCard {...defaultProps} />);

    const getTitleElement = screen.getByRole("heading", { level: 4 });
    const getDescriptionElement = screen.getByText(defaultProps.description);
    const getLanguageElement = screen.getByText(defaultProps.language);
    const getModifiedElement = screen.getByText(defaultProps.updatedAt);

    expect(getTitleElement).toHaveTextContent(defaultProps.title);
    expect(getDescriptionElement).toBeInTheDocument();
    expect(getLanguageElement).toBeInTheDocument();
    expect(getModifiedElement).toBeInTheDocument();
  });

  it("renderiza HeartIcon quando o repositório não está nos favoritos", () => {
    mockFavorites();
    render(<RepositoryCard {...defaultProps} />);

    const getIcon = screen.queryByTestId("heart-icon");
    const getIconFilled = screen.queryByTestId("heart-filled-icon");

    expect(getIcon).toBeInTheDocument();
    expect(getIconFilled).not.toBeInTheDocument();
  });

  it("renderiza HeartFilledIcon quando o repositório está nos favoritos", () => {
    mockFavorites([{ id: 1 }]);
    render(<RepositoryCard {...defaultProps} isFavorite={true} />);

    const getIcon = screen.queryByTestId("heart-icon");
    const getIconFilled = screen.queryByTestId("heart-filled-icon");

    expect(getIconFilled).toBeInTheDocument();
    expect(getIcon).not.toBeInTheDocument();
  });

  it("chama addFavorite ao clicar no botão de favorito se não estiver favoritado", () => {
    mockFavorites();
    render(<RepositoryCard {...defaultProps} />);
    const { addFavorite } = useFavoritesRepos();

    fireEvent.click(screen.getByRole("button"));

    expect(addFavorite).toHaveBeenCalledWith(expect.objectContaining({ id: defaultProps.id }));
  });

  it("chama removeFavorite ao clicar no botão de favorito se já estiver favoritado", () => {
    mockFavorites([{ id: 1}]);
    render(<RepositoryCard {...defaultProps} />);
    const { removeFavorite } = useFavoritesRepos();

    fireEvent.click(screen.getByRole("button"));

    expect(removeFavorite).toHaveBeenCalledWith(defaultProps.id);
  });
});
