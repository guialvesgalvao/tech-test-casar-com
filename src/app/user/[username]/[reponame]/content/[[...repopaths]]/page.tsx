import { FileExplorer } from "@/components/FileExplorer/FileExplorer";
import { IAttach, IAttachType } from "@/interfaces/IRepository";
import { RepoService } from "@/services/repoService";
import { div } from "motion/react-client";
import { notFound } from "next/navigation";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface PageProps {
  params: Promise<{
    username: string;
    reponame: string;
    repopaths: string | string[];
  }>;
}

export default async function RepoContent({ params }: Readonly<PageProps>) {
  const resolvedParams = await params;
  const { username, reponame, repopaths } = resolvedParams;
  const service = new RepoService();

  if (!username || !reponame || !repopaths) notFound();

  const fileType = service.getFileType(Array.isArray(repopaths) ? repopaths : [repopaths]);
  const filePath = service.getStringFilePath(repopaths);

  const content =
    fileType === IAttachType.File
      ? await service.getFileContent(username, reponame, filePath)
      : await service.getRootContent(username, reponame, filePath);

  if (!content) return notFound();

  return (
    <div className="w-full h-full flex  justify-center">
      {fileType === IAttachType.Folder ? (
        <FileExplorer 
        attachs={content as IAttach[]} 
        basePageUrl={`/user/${username}/${reponame}`}
        filePath={filePath}
        
        />
      ) : (
        <div className="h-4/5">
          <SyntaxHighlighter style={docco}>{((content as IAttach)?.content as string) ?? ""}</SyntaxHighlighter>
        </div>
      )}
    </div>
  );
}
