import { PATHS } from "@/consts/paths";
import Image from "next/image";
import Link from "next/link";
import NotFoundImage from "../../public/not-found.png";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col text-center items-center justify-center">
      <Image
        width={200}
        height={200}
        alt="Página não encontrada"
        src={NotFoundImage}
      />
      <h1 className="text-4xl font-bold">Página não encontrada</h1>
      <p className="text-lg text-gray-500">
        Oops! Parece que essa página não existe.
      </p>
      <Link href={PATHS.HOME} className="mt-4 text-primary underline">
        Voltar para a página inicial
      </Link>
    </div>
  );
}
