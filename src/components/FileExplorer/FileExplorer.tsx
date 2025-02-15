import { IAttach } from "@/interfaces/IRepository";
import { File, Folder, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface FileExplorerProps {
  attachs: IAttach[];
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
    <div className="border border-primary w-4/5 rounded-xl h-4/5 overflow-y-auto">
      <div className=" px-5 py-2  flex items-center rounded-t-xl bg-primary h-[32px]">
        {!isSource && (
          <Link href={previousPageISSource}>
            <ArrowLeft color="#fff" />
          </Link>
        )}
      </div>
      {attachs?.map((attach: IAttach) => (
        <Link
          replace
          href={`${basePageUrl}/content/${attach.path}`}
          key={attach.id}
          className="text-black border border-custom-border w-full flex items-center gap-5 py-2 px-5 cursor-pointer hover:bg-slate-50 hover:text-black"
        >
          {attach.type === "dir" ? <Folder /> : <File />}
          <span>{attach.name}</span>
        </Link>
      ))}
    </div>
  );
}
