"use client";

import { HeartFilledIcon } from "@/assets/icons/HeartFilled";
import { HeartIcon } from "@/assets/icons/Heart";
import { matchMainTechnologyColor } from "@/helpers/matchMainTechnologyColor";
import { useFavoritesRepos } from "@/stores/useFavoritesRepos";
import { IRepository } from "@/interfaces/IRepository";
import * as motion from "motion/react-client";
import Link from "next/link";

export function RepositoryCard(props: Readonly<IRepository>) {
  const { id, title, description, language, owner, updatedAt } = props;
  const { favorites, addFavorite, removeFavorite } = useFavoritesRepos();

  const isFavorite = !!favorites.find((fav) => fav.id === id);

  function handleFavorite(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    favorites.find((fav) => fav.id === id) ? removeFavorite(props.id) : addFavorite(props);
  }

  return (
    <Link href={`/user/${owner.userName}/${title}`}>
      <motion.div
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
        className="border rounded-lg cursor-pointer p-4 bg-white mb-5"
      >
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-lg font-semibold text-grey-neutral">{title}</h4>
            <p className="font-normal text-placeholder text-base md:text-sm">{description}</p>
          </div>

          <FavoriteButton isFavorite={isFavorite} handleFavorite={handleFavorite} />
        </div>

        <div className="mt-4 flex flex-col gap-x-8 gap-y-2 text-sm text-gray-500 sm:flex-row">
          {language && language.trim() !== "" && <MainTechnology name={language} />}
          <span>{updatedAt}</span>
        </div>
      </motion.div>
    </Link>
  );
}

interface FavoriteButtonProps {
  isFavorite: boolean;
  handleFavorite: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function FavoriteButton({ isFavorite, handleFavorite }: Readonly<FavoriteButtonProps>) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.8 }}
      onClick={(e) => handleFavorite(e)}
      className={`${
        isFavorite ? "border-primary-dark border rounded-full" : "bg-white-bg-matte"
      } rounded-full p-2 cursor-pointer`}
    >
      {isFavorite ? (
        <HeartFilledIcon color="#32C0C6" width={18} heigth={16} />
      ) : (
        <HeartIcon color="#8C8C8C" width={18} heigth={16} />
      )}
    </motion.button>
  );
}

function MainTechnology({ name }: Readonly<{ name: string }>) {
  return (
    <div className="flex flex-row items-center">
      <span
        className="inline-block w-3 h-3 mr-2 rounded-full"
        style={{ backgroundColor: matchMainTechnologyColor(name) }}
      />
      <p className="font-medium">{name}</p>
    </div>
  );
}
