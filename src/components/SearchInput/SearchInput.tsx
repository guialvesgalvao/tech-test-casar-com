"use client"
import { JSX, useState } from 'react';
import { SearchIcon }  from '../../assets/icons/Search';
import debounce from 'lodash/debounce';
import dynamic from 'next/dynamic';
import Image from 'next/image';

type User = {
  id: number;
  login: string;
  avatar_url: string;
};

type OptionType = {
  value: number;
  label: JSX.Element;
};

const AsyncSelect2 = dynamic(() => import('react-select/async'), {
  ssr: false,
  loading: () => <div>Carregando...</div>
});

export default function Home() {
  const [defaultUsers, setDefaultUsers] = useState<any[]>([{
    login: "mojombo",
    id: 1,
    node_id: "MDQ6VXNlcjE=",
    avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/mojombo",
    html_url: "https://github.com/mojombo",
    followers_url: "https://api.github.com/users/mojombo/followers",
    following_url: "https://api.github.com/users/mojombo/following{/other_user}",
    gists_url: "https://api.github.com/users/mojombo/gists{/gist_id}",
    starred_url: "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/mojombo/subscriptions",
    organizations_url: "https://api.github.com/users/mojombo/orgs",
    repos_url: "https://api.github.com/users/mojombo/repos",
    events_url: "https://api.github.com/users/mojombo/events{/privacy}",
    received_events_url: "https://api.github.com/users/mojombo/received_events",
    type: "User",
    user_view_type: "public",
    site_admin: false
  }]);

  const loadOptionsDebounced = debounce(
    async (inputValue: string) => {
      if (!inputValue) return defaultUsers;
      
      const response = await fetch(`https://api.github.com/search/users?q=${inputValue}`);
      const data = await response.json();
      const users = data.items as User[];
      
      return users.map((user) => ({
        value: user.id,
        label: (
          <div className="flex items-center gap-2">
            <Image 
              src={user.avatar_url} 
              alt={user.login}
              width={24}
              height={24}
              className="w-6 h-6 rounded-full"
            />
            <span>{user.login}</span>
          </div>
        )
      }));
    }, 
    500
  );

  return (
    <AsyncSelect2
      defaultOptions={defaultUsers}
      loadOptions={loadOptionsDebounced}
      components={{
        DropdownIndicator: ({ innerProps }) => (
          <div {...innerProps} className="pr-3 cursor-pointer">
            <SearchIcon />
            {/* <SearchIcon className="w-5 h-5 text-gray-400" /> */}
          </div>
        )
      }}
      styles={{
        control: (base) => ({ 
          ...base, 
          padding: "8px",
          minHeight: '48px'
        }),
        menuList: (base) => ({ 
          ...base, 
          maxHeight: "240px",
          overflowY: 'auto' 
        }),
        dropdownIndicator: (base) => ({
          ...base,
          display: 'none'
        })
      }}
      classNamePrefix="react-select"
      instanceId="user-search"
      placeholder="Buscar usuários..."
      noOptionsMessage={() => "Nenhum usuário encontrado"}
      loadingMessage={() => "Carregando..."}
      cacheOptions
    />
  );
}