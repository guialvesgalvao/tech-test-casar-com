import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SectionButton } from "./SectionButton";
import { HeartFilledIcon } from "@/assets/icons/HeartFilled";

describe("SectionButton Component", () => {
    const defaultButtonIcon = <HeartFilledIcon color="#fff" heigth={15}  width={15}/>

  test("deve renderizar o botão com título e estado selecionado", () => {
    const onClickMock = jest.fn();
    render(
      <SectionButton
        icon={defaultButtonIcon}
        title="Botão Selecionado"
        isSelected={true}
        onClick={onClickMock}
      />
    );

    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-primary");
    expect(button).toHaveClass("cursor-auto");
    expect(button).toHaveClass("flex");
    expect(button).toHaveClass("items-center");
    expect(button).toHaveClass("gap-2");
    expect(button).toHaveClass("py-3");
    expect(button).toHaveClass("px-4");

    const titleElement = screen.getByText("Botão Selecionado");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass("text-white");
    expect(titleElement).toHaveClass("text-sm");
    expect(titleElement).toHaveClass("font-medium");

    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test("deve renderizar o botão com título e estado não selecionado", () => {
    const onClickMock = jest.fn();
    render(
      <SectionButton
        icon={defaultButtonIcon}
        title="Botão Não Selecionado"
        isSelected={false}
        onClick={onClickMock}
      />
    );

    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-white");
    expect(button).toHaveClass("cursor-pointer");

    const titleElement = screen.getByText("Botão Não Selecionado");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass("text-primary");
    expect(titleElement).toHaveClass("text-sm");
    expect(titleElement).toHaveClass("font-medium");

    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test("deve renderizar o botão apenas com o ícone quando o título não é fornecido", () => {
    const onClickMock = jest.fn();
    render(
      <SectionButton
        icon={defaultButtonIcon}
        isSelected={false}
        onClick={onClickMock}
      />
    );

    const button = screen.getByRole("button");

    const titleElement = screen.queryByText((content, element) => {
      return element?.tagName.toLowerCase() === "span";
    });
    expect(titleElement).toBeNull();

    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
