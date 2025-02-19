import { IAttach } from "@/interfaces/IRepository";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AttachsList } from "../AttachList/AttachList";
import { CodeViewer } from "../CodeViewer/CodeViewer";

interface FileExplorerProps {
  attachs: IAttach[] | IAttach;
  basePageUrl: string;
  filePath?: string;
  isSource?: boolean;
}

export function FileExplorer(props: Readonly<FileExplorerProps>) {
  const { attachs, basePageUrl, filePath, isSource = false } = props;

  const previousItemPath = filePath?.replace(/\/[^/]*$/, "/") ?? "";
  const previousPageUrl = `${basePageUrl}/content/${previousItemPath}`;
  const previousPageISSource = previousItemPath.split("/").length > 1 ? previousPageUrl : basePageUrl;

  return (
    <div className="border border-primary w-full rounded-xl h-4/5 overflow-y-auto overflow-x-hidden no-scrollbar">
      <div className=" px-5 py-2 flex items-center rounded-t-xl bg-primary h-[32px]">
        {!isSource && (
          <Link href={previousPageISSource}>
            <ArrowLeft color="#fff" />
          </Link>
        )}
      </div>

      {Array.isArray(attachs) ? <AttachsList attachs={attachs} basePageUrl={basePageUrl} /> : <CodeViewer code={attachs.content ?? ''} />}
    </div>
  );
}
