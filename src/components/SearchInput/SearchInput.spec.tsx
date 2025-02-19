import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchInput from "./SearchInput";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn()
}));

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn()
}));

describe("<SearchInput/>", () => {
  const mockPush = jest.fn();
  const refetchMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useQuery as jest.Mock).mockReturnValue({
      data: [],
      refetch: refetchMock
    });
  });

  function renderComponent() {
    const queryClient = new QueryClient();
    return render(
      <QueryClientProvider client={queryClient}>
        <SearchInput />
      </QueryClientProvider>
    );
  }

  it("renderiza o input com o placeholder", () => {
    renderComponent();
    
    const placeholderElement = screen.getByPlaceholderText("Buscar usuários...")

    expect(placeholderElement).toBeInTheDocument();
  });

  it("chama refetch ao digitar", async () => {
    renderComponent();
    const input = screen.getByPlaceholderText("Buscar usuários...");

    fireEvent.change(input, { target: { value: "casar-com" } });

    await waitFor(() => expect(refetchMock).toHaveBeenCalled());
  });

  it("chama push ao clicar no botão de busca com valor preenchido", () => {
    renderComponent();

    const input = screen.getByPlaceholderText("Buscar usuários...");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "casar-com" } });
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith("/user/casar-com");
  });

  it("não chama push ao clicar no botão de busca com valor vazio", () => {
    renderComponent();

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(mockPush).not.toHaveBeenCalled();
  });

  it("chama push ao pressionar Enter no input com valor preenchido", () => {
    renderComponent();

    const input = screen.getByPlaceholderText("Buscar usuários...");

    fireEvent.change(input, { target: { value: "casar-com" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockPush).toHaveBeenCalledWith("/user/casar-com");
  });




});
