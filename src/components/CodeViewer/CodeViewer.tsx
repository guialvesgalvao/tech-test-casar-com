import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeViewerProps {
  code: string;
}

export function CodeViewer(props: Readonly<CodeViewerProps>) {
  const { code } = props;
  const hasCode = code.trim() !== "";

  return (
    <div className="w-full h-full">
      {hasCode ? (
        <SyntaxHighlighter className="w-full h-full no-scrollbar" style={docco}>
          {code}
        </SyntaxHighlighter>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <h1 className="text-[21px] text-black font-semibold">Arquivo sem código</h1>
        </div>
      )}
    </div>
  );
}
