import { SearchFeedback } from "@/components/SearchFeedback/SearchFeedback";
import SearchUser from '../../public/search-user.png'
export default function Home() {
  return (
    <div className="h-full flex items-center justify-center">
      <SearchFeedback
        title="Procure pelo Nome ou Nome de Usuário"
        subTitle="Encontre os repositórios de algum usuário digitando no campo acima"
        url={SearchUser}
        alt="User not found"
      />
    </div>
  );
}
