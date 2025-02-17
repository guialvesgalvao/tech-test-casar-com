import { IAttach } from "@/interfaces/IRepository";
import { File, Folder } from "lucide-react";
import Link from "next/link";

interface AttachsListProps {
  attachs: IAttach[];
  basePageUrl: string;
}

export function AttachsList(props: Readonly<AttachsListProps>) {
  const { attachs, basePageUrl } = props;

  return (
    <div>
      {attachs?.map((attach: IAttach) => (
        <Link
          replace
          href={`${basePageUrl}/content/${attach.path}`}
          key={attach.id}
          className="text-black border border-custom-border w-full flex items-center gap-5 py-2 px-5 cursor-pointer hover:bg-slate-50 hover:text-black"
        >
          {attach.type === "dir" ? <Folder width={16} height={16} /> : <File width={16} height={16} />}
          <span className="w-4/5">{attach.name}</span>
        </Link>
      ))}
    </div>
  );
}
