// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import { useRouter } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import SearchInput from "./SearchInput";

// jest.mock("next/navigation", () => ({
//   useRouter: jest.fn()
// }));

// jest.mock("@tanstack/react-query", () => ({
//   ...jest.requireActual("@tanstack/react-query"),
//   useQuery: jest.fn()
// }));

// describe("SearchInput", () => {
//   const mockPush = jest.fn();
//   const refetchMock = jest.fn();

//   beforeEach(() => {
//     jest.clearAllMocks();
//     (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
//     (useQuery as jest.Mock).mockReturnValue({
//       data: [],
//       refetch: refetchMock
//     });
//   });

//   function renderComponent() {
//     const queryClient = new QueryClient();
//     return render(
//       <QueryClientProvider client={queryClient}>
//         <SearchInput />
//       </QueryClientProvider>
//     );
//   }

//   it("renderiza o input", () => {
//     renderComponent();
//     expect(screen.getByPlaceholderText("Buscar usuários...")).toBeInTheDocument();
//   });

//   it("chama refetch ao digitar", async () => {
//     renderComponent();
//     const input = screen.getByPlaceholderText("Buscar usuários...");
//     fireEvent.change(input, { target: { value: "john" } });
//     await waitFor(() => expect(refetchMock).toHaveBeenCalled());
//   });

//   it("chama push ao clicar no botão de busca com valor preenchido", () => {
//     renderComponent();
//     const input = screen.getByPlaceholderText("Buscar usuários...");
//     fireEvent.change(input, { target: { value: "john" } });
//     const button = screen.getByRole("button");
//     fireEvent.click(button);
//     expect(mockPush).toHaveBeenCalledWith("/user/john");
//   });

//   it("não chama push ao clicar no botão de busca com valor vazio", () => {
//     renderComponent();
//     const button = screen.getByRole("button");
//     fireEvent.click(button);
//     expect(mockPush).not.toHaveBeenCalled();
//   });

//   it("chama push ao pressionar Enter no input com valor preenchido", () => {
//     renderComponent();
//     const input = screen.getByPlaceholderText("Buscar usuários...");
//     fireEvent.change(input, { target: { value: "john" } });
//     fireEvent.keyDown(input, { key: "Enter" });
//     expect(mockPush).toHaveBeenCalledWith("/user/john");
//   });

//   it("mostra e seleciona sugestões", async () => {
//     (useQuery as jest.Mock).mockReturnValue({
//       data: [
//         { id: 1, userName: "john", avatarUrl: "john.jpg" },
//         { id: 2, userName: "doe", avatarUrl: "doe.jpg" }
//       ],
//       refetch: refetchMock
//     });
//     renderComponent();
//     const input = screen.getByPlaceholderText("Buscar usuários...");
//     fireEvent.change(input, { target: { value: "jo" } });
//     await waitFor(() => expect(screen.getByText("john")).toBeInTheDocument());
//     fireEvent.click(screen.getByText("john"));
//     expect(mockPush).toHaveBeenCalledWith("/user/john");
//   });

//   it("fecha a lista de sugestões ao clicar fora", async () => {
//     (useQuery as jest.Mock).mockReturnValue({
//       data: [
//         { id: 1, userName: "john", avatarUrl: "john.jpg" }
//       ],
//       refetch: refetchMock
//     });
//     const { container } = renderComponent();
//     const input = screen.getByPlaceholderText("Buscar usuários...");
//     fireEvent.change(input, { target: { value: "jo" } });
//     await waitFor(() => expect(screen.getByText("john")).toBeInTheDocument());
//     fireEvent.mouseDown(container);
//     expect(screen.queryByText("john")).not.toBeInTheDocument();
//   });
// });
