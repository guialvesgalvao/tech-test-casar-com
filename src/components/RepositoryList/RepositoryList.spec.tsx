import React from "react";
import { render, screen } from "@testing-library/react";
import { RepositoryList } from "./RepositoryList";

describe("<RepositoryList/>", () => {
  const repositories = [
    {
      id: 1,
      title: "Repositório Um",
      private: false,
      isFavorite: true,
      description: "Este é o primeiro repositório de exemplo.",
      fork: false,
      url: "https://github.com/usuario/repositorio-um",
      createdAt: new Date("2023-01-01T12:00:00Z"),
      updatedAt: "2023-01-02T12:00:00Z",
      language: "TypeScript",
      watchers: 42,
      defaultBranch: "main",
      owner: {
        id: 2,
        userName: 'guialvesgalvao',
        avatarUrl: 'random-avatar'
      }
    },
    {
      id: 2,
      title: "Repositório Dois",
      private: true,
      isFavorite: false,
      description: "Este é o segundo repositório, que é um fork.",
      fork: true,
      url: "https://github.com/usuario/repositorio-dois",
      createdAt: new Date("2023-03-01T12:00:00Z"),
      updatedAt: "2023-03-02T12:00:00Z",
      language: "JavaScript",
      watchers: 15,
      defaultBranch: "develop",
      owner: {
        id: 1,
        userName: 'guialvesgalvao',
        avatarUrl: 'random-avatar'
      }
    },
  ];

  test("deve renderizar o título principal e os RepositoryCards com datas formatadas", () => {
    render(
      <RepositoryList title="Meus Repositórios" repositories={repositories} align={"center"} getMoreRepositories={() => {}} hasMore={false} page={0} />,
    );

    const h3Element = screen.getByRole("heading", { level: 3 });
    const repoHeadings = screen.getAllByRole("heading", { level: 4 });

    expect(h3Element).toHaveTextContent("Meus Repositórios");

    repositories.forEach((repo) => {
      const repoTitle = screen.getByRole("heading", {
        level: 4,
        name: repo.title,
      });

      const lastUpdateDateElement = screen.getByText(repo.updatedAt);

      expect(repoTitle).toBeInTheDocument();
      expect(lastUpdateDateElement).toBeInTheDocument();
    });

    expect(repoHeadings).toHaveLength(repositories.length);
  });
});
