import { formatUpdateDateToString } from "@/helpers/formatUpdateDateToString";
import { RepositoryCard } from "../RepositoryCard/RepositoryCard";

interface RepositoryListProps {
  title: string;
  repositories: any[];
}

export function RepositoryList(props: Readonly<RepositoryListProps>) {
  const { title, repositories } = props;

  return (
    <div>
      <h3>{title}</h3>
      <div>
        {repositories.map((repo: any) => (
          <RepositoryCard {...repo} lastUpdate={formatUpdateDateToString(repo.lastUpdate)} />
        ))}
      </div>
    </div>
  );
}
