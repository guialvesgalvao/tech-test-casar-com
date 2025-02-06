"use client";

import { useState, useRef, KeyboardEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "@/assets/icons/Search";
import { UserService } from "@/services/userService";
import { debounce } from "lodash";

export default function SearchInput() {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const repository = new UserService();

  const fetchUsers = async (query: string) => {
    if (!query) return [];
    const data = await repository.getUsersByText(query, 5, 1);
    return data.users ?? [];
  };

  const { data: suggestions = [], refetch } = useQuery({
    queryKey: ["users", inputValue],
    queryFn: () => fetchUsers(inputValue),
    enabled: false,
    staleTime: 1000 * 60 * 5
  });

  const debouncedRefetch = debounce(() => {
    refetch();
    setIsOpen(true);
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    debouncedRefetch();
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      router.push(`/user/${inputValue.trim()}`);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSelectSuggestion = (login: string) => {
    router.push(`/user/${login}`);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-full md:max-w-md my-2">
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
          onClick={handleSearch}
          className="absolute cursor-pointer inset-y-0 right-0 flex items-center pr-3 text-gray-400"
        >
          <SearchIcon />
        </button>
      </div>

      {isOpen && suggestions.length > 0 && (
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
