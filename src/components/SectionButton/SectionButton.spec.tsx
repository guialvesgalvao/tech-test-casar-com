import React from "react";
import { render, screen } from "@testing-library/react";
import { SectionButton } from "./SectionButton";
import { HeartFilledIcon } from "@/assets/icons/HeartFilled";

describe("<SectionButton/>", () => {
  const defaultButtonIcon = <HeartFilledIcon color="#fff" heigth={15} width={15} />;

  test("deve renderizar o botão com título e estado selecionado", () => {
    render(<SectionButton icon={defaultButtonIcon} title="Botão Selecionado" isSelected={true} href="/teste-mock" />);

    const linkElement = screen.getByRole("link");
    const titleElement = screen.getByText("Botão Selecionado");

    expect(linkElement).toHaveClass("bg-primary");
    expect(linkElement).toHaveAttribute("href", "/teste-mock");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass("text-white");
    expect(titleElement).toHaveClass("text-sm");
    expect(titleElement).toHaveClass("font-medium");


  });

  test("deve renderizar o botão com título e estado não selecionado", () => {
    render(
      <SectionButton icon={defaultButtonIcon} title="Botão Não Selecionado" isSelected={false} href="/teste-mock" />
    );

    const linkElement = screen.getByRole("link");
    const titleElement = screen.getByText("Botão Não Selecionado");

    expect(linkElement).toHaveClass("bg-white");
    expect(linkElement).toHaveClass("cursor-pointer");
    expect(linkElement).toHaveAttribute("href", "/teste-mock");
    expect(titleElement).toBeInTheDocument();
  });

  test("deve renderizar o botão apenas com o ícone quando o título não é fornecido", () => {
    render(<SectionButton icon={defaultButtonIcon} isSelected={false} href="/teste-mock" />);

    const titleElement = screen.queryByText((content, element) => {
      return element?.tagName.toLowerCase() === "span";
    });

    expect(titleElement).toBeNull();
  });
});
