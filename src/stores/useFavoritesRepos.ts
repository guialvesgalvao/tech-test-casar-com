import { IRepository } from "@/interfaces/IRepository";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUseFavoritesRepos {
  favorites: IRepository[];

  addFavorite: (repo: IRepository) => void;
  removeFavorite: (id: number) => void;
}

export const useFavoritesRepos = create(
  persist<IUseFavoritesRepos>(
    (set) => ({
      favorites: [],

      addFavorite: (repo: IRepository) => {
        set((state) => ({
          favorites: [...state.favorites, repo],
        }));
      },

      removeFavorite: (id: number) => {
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== id),
        }));
      },
    }),
    {
      name: "favorites-storage"
    }
  )
);