import { RepositoryList } from "@/components/RepositoryList/RepositoryList";

export default function FavoritesPage() {
  return (
    <div className="flex justify-center w-full">
      <div className="mx-auto w-[90%] md:w-[60%]">
        <RepositoryList title="Meus Favoritos" align="center" userName={"guialvesgalvao"} />
      </div>
    </div>
  );
}
