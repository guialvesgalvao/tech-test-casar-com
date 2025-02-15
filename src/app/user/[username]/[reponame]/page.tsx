import { FileExplorer } from "@/components/FileExplorer/FileExplorer";
import { RepoService } from "@/services/repoService";
import { notFound } from "next/navigation";
interface PageProps {
  params: Promise<{
    username: string;
    reponame: string;
  }>;
}

export default async function Repository({ params }: Readonly<PageProps>) {
  const repository = new RepoService();
  const resolvedParams = await params;
  const { username, reponame } = resolvedParams;

  if (!username || !reponame) notFound();

  const sourceFiles = await repository.getRootContent(username, reponame);

  return (
    <div className="w-full h-full flex justify-center mb-10">
      <FileExplorer
      basePageUrl={`/user/${username}/${reponame}`} 
      attachs={sourceFiles}
      isSource={true} />
    </div>
  );
}
