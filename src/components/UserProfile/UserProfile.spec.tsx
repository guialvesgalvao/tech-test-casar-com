import React from "react";
import { render, screen } from "@testing-library/react";
import { UserProfile } from "./UserProfile";

describe("UserProfile", () => {
  const defaultUser = {
    id: 459,
    userName: "guialvesgalvao",
    name: "Guilherme Galvão",
    bio: "Desenvolvedor Front-end",
    avatarUrl: "https://avatars.githubusercontent.com/u/8445?v=4",
    company: "Casar.com",
  };

  it("deve renderizar a imagem com os atributos corretos", () => {
    render(<UserProfile {...defaultUser} />);

    const image = screen.getByAltText(`Avatar de ${defaultUser.name}`);

    expect(image).toBeInTheDocument();
  });

  it("deve renderizar o nome, username e descrição corretamente", () => {
    render(<UserProfile {...defaultUser} />);

    const nameElement = screen.getByText(defaultUser.name);
    const userNameElement = screen.getByText(`@${defaultUser.userName}`);
    const bioElement = screen.getByText(defaultUser.bio);

    expect(nameElement).toBeInTheDocument();
    expect(userNameElement).toBeInTheDocument();
    expect(bioElement).toBeInTheDocument();
  });
});
