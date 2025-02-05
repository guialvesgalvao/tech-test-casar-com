"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SearchIcon } from "@/assets/icons/Search";
import { IUser } from "@/interfaces/IUsers";
import { UserService } from "@/services/userService";

export default function SearchInput() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<IUser[]>([]);
  const repository = new UserService();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  let debounceTimer: ReturnType<typeof setTimeout>;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchUsers = async (query: string) => {
    try {
      const data = await repository.getUsersByText(query, 5, 1);
      setSuggestions(data.users ?? []);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setSuggestions([]);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    clearTimeout(debounceTimer);

    if (!value) {
      setSuggestions([]);
      return;
    }

    debounceTimer = setTimeout(() => {
      fetchUsers(value);
    }, 2000);
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      router.push(`/user/${inputValue.trim()}`);
      setSuggestions([]); 
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(`/user/${inputValue}`);
    }
  };

  const handleSelectSuggestion = (login: string) => {
    router.push(`/user/${login}`);
    setSuggestions([]);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md my-2">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar usuários..."
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full pr-9 pl-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
        onClick={() => {
          console.log('clicado', inputValue)
          handleSearch()
        }}
        className="absolute cursor-pointer inset-y-0 right-0 flex items-center pr-3 text-gray-400">
          <SearchIcon />
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border rounded mt-1 z-10 shadow-lg">
          {suggestions.map((user) => (
            <button
              key={user.id}
              className="p-2 w-full flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectSuggestion(user.userName)}
            >
              <Image src={user.avatarUrl} alt={user.userName} width={24} height={24} className="rounded-full" />
              <span>{user.userName}</span>
            </button>
          ))}
        </ul>
      )}
    </div>
  );
}
