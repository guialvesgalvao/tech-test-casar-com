import { formatUpdateDateToString } from "@/helpers/formatUpdateDateToString";
import { RepositoryCard } from "../RepositoryCard/RepositoryCard";
import { IRepository } from "@/interfaces/IRepository";

interface RepositoryListProps {
  title: string;
  repositories: IRepository[];
}

export function RepositoryList(props: Readonly<RepositoryListProps>) {
  const { title, repositories } = props;

  return (
    <div>
      <h3>{title}</h3>
      <div>
        {repositories.map((repo: IRepository) => (
          <RepositoryCard key={repo.id} {...repo} lastUpdate={formatUpdateDateToString(repo.updatedAt)} />
        ))}
      </div>
    </div>
  );
}
