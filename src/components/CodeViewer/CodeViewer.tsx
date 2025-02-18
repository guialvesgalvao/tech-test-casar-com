import { Light } from "react-syntax-highlighter";

interface CodeViewerProps {
  code: string;
}

export function CodeViewer(props: Readonly<CodeViewerProps>) {
  const { code } = props;
  const hasCode = code.trim() !== "";

  return (
    <div className="w-full h-full" >
      {hasCode ? (
        <Light  className="w-full h-full no-scrollbar">
          {code}
        </Light>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <h1 className="text-[21px] text-black font-semibold">Arquivo sem código</h1>
        </div>
      )}
    </div>
  );
}
