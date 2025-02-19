import { FileExplorer } from "@/components/FileExplorer/FileExplorer";
import { RepositoryNavigator } from "@/components/RepositoryNavigator/RepositoryNavigator";
import { RepoService } from "@/services/repoService";
import { UserService } from "@/services/userService";
import { notFound } from "next/navigation";
interface PageProps {
  params: Promise<{
    username: string;
    reponame: string;
  }>;
}

export default async function Repository({ params }: Readonly<PageProps>) {
  const repoRepository = new RepoService();
  const userRepository = new UserService();
  const resolvedParams = await params;
  const { username, reponame } = resolvedParams;

  if (!username || !reponame) notFound();

  const sourceFiles = await repoRepository.getRootContent(username, reponame);
  const getUserData = await userRepository.getUser(username);

  if (!sourceFiles) return notFound();

  return (
    <div className="w-full h-full flex flex-col items-center no-scrollbar">
      <div className="w-4/5 h-full flex flex-col items-start gap-2 no-scrollbar">
        <RepositoryNavigator avatarUrl={getUserData?.avatarUrl} userName={username} repoName={reponame} />
        <FileExplorer basePageUrl={`/user/${username}/${reponame}`} attachs={sourceFiles} isSource={true} />
      </div>
    </div>
  );
}
