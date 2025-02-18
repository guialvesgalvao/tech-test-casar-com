import Image from "next/image";
import Link from "next/link";

interface NavigatorProps {
  avatarUrl?: string;
  userName: string;
  repoName: string;
}

export function RepositoryNavigator(props: Readonly<NavigatorProps>) {
  const { userName, avatarUrl, repoName } = props;

  return (
    <div className="flex flex-row items-start justify-center">
      <Link href={`/user/${userName}/`} className="flex flex-row gap-2">
        {avatarUrl && (
          <Image
            src={avatarUrl}
            alt={`Avatar de ${userName}`}
            className="rounded-full object-cover"
            width={30}
            height={30}
          />
        )}
        <span className="hover:underline">{userName}</span>
      </Link>
      <Link href={`/user/${userName}/${repoName}/`} className="hover:underline">
        {`/${repoName}`}
      </Link>
    </div>
  );
}
