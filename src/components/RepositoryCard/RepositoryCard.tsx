import { HeartFilledIcon } from "@/assets/icons/HeartFilled";
import { HeartIcon } from "@/assets/icons/Heart";

interface RepositoryCardProps {
  title: string;
  description: string;
  mainTechnology: string;
  isFavorite: boolean;
  lastUpdate: string;
}

export function RepositoryCard(props: Readonly<RepositoryCardProps>) {
  const { title, description, mainTechnology, isFavorite, lastUpdate } = props;

  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-lg font-semibold text-grey-neutral">{title}</h4>
          <p className="font-normal text-placeholder text-base md:text-sm">{description}</p>
        </div>

        <FavoriteButton isFavorite={isFavorite} />
      </div>

      <div className="mt-4 flex flex-col gap-x-8 gap-y-2 text-sm text-gray-500 sm:flex-row">
        <MainTechnology name={mainTechnology} />
        <span>{lastUpdate}</span>
      </div>
    </div>
  );
}

function FavoriteButton({ isFavorite }: Readonly<{ isFavorite: boolean }>) {
  return (
    <button className={`${isFavorite ? "border-primary-dark border rounded-full" : ""} p-2 cursor-pointer`}>
      {isFavorite ? <HeartFilledIcon color="red" width={18} heigth={16} /> : <HeartIcon color="red"  width={18} heigth={16} />}
    </button>
  );
}

function MainTechnology({ name }: Readonly<{ name: string }>) {
  return <span className="font-medium">{name}</span>;
}
