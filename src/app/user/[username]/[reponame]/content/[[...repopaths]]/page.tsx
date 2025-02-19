import { FileExplorer } from "@/components/FileExplorer/FileExplorer";
import { RepositoryNavigator } from "@/components/RepositoryNavigator/RepositoryNavigator";
import { IAttachType } from "@/interfaces/IRepository";
import { RepoService } from "@/services/repoService";
import { UserService } from "@/services/userService";
import { notFound } from "next/navigation";

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
  const userRepository = new UserService();

  if (!username || !reponame || !repopaths) notFound();

  const fileType = service.getFileType(Array.isArray(repopaths) ? repopaths : [repopaths]);
  const filePath = service.getStringFilePath(repopaths);

  const getUserData = await userRepository.getUser(username);
  const content =
    fileType === IAttachType.File
      ? await service.getFileContent(username, reponame, filePath)
      : await service.getRootContent(username, reponame, filePath);

  if (!content) return notFound();

  return (
    <div className="w-full h-full flex flex-col items-center no-scrollbar">
      <div className="w-4/5 h-full flex flex-col items-start gap-2 no-scrollbar">
        <RepositoryNavigator avatarUrl={getUserData?.avatarUrl} userName={username} repoName={reponame} />
        <FileExplorer attachs={content} basePageUrl={`/user/${username}/${reponame}`} filePath={filePath} />
      </div>
    </div>
  );
}
