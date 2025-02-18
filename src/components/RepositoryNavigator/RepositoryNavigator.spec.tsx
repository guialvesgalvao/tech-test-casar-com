import { render, screen } from "@testing-library/react";
import { RepositoryNavigator } from "./RepositoryNavigator";

describe("<RepositoryNavigator/>", () => {
  const defaultProps = {
    repoName: "tech-teste-casar-com",
    userName: "guialvesgalvao",
    avatarUrl: "https://avatars.githubusercontent.com/u/78868778?v=4"
  }

  test("Deve renderizar um componente de navegação com a imagem do usuário, nome e repositório atual", () => {
    render(<RepositoryNavigator repoName={defaultProps.repoName} userName={defaultProps.userName} avatarUrl={defaultProps.avatarUrl}  />);

    const userImageElement = screen.getByAltText(`Avatar de ${defaultProps.userName}`);
    const repositoryLinkElement = screen.getByText(`/${defaultProps.repoName}`);
    const profileLinkElement = screen.getAllByRole("link")[0];


    expect(userImageElement).toBeInTheDocument();
    expect(profileLinkElement).toHaveAttribute("href", `/user/${defaultProps.userName}`);
    expect(profileLinkElement).toHaveTextContent(defaultProps.userName);
    expect(profileLinkElement).toBeInTheDocument();
    expect(repositoryLinkElement).toHaveAttribute("href", `/user/${defaultProps.userName}/${defaultProps.repoName}`);
    expect(repositoryLinkElement).toBeInTheDocument();
  });
});
