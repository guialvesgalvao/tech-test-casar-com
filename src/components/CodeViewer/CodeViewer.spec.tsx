import { render, screen } from "@testing-library/react";
import { CodeViewer } from "./CodeViewer";

describe("<CodeViewer/>", () => {
  const defaultCode = "//console.log('tech-test-casar-com')";
  const messageNoCode = "Arquivo sem código";

  test("Deve renderizar um componente de visualização de código, com um código Genérico", () => {
    render(<CodeViewer code={defaultCode} />);

    const codeViewerElement = screen.getByRole("code");

    expect(codeViewerElement).toBeInTheDocument();
    expect(codeViewerElement).toHaveTextContent("'tech-test-casar-com'");
    expect(codeViewerElement).not.toHaveTextContent(messageNoCode);
});

test("Deve renderizar um componente de CodeViewer apenas com uma mensagem informando que não tem código", () => {
    render(<CodeViewer code={""} />);
    
    const noCodeElement = screen.getByText(messageNoCode);
    
    expect(noCodeElement).toBeInTheDocument();
  });
});
