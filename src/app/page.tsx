"use client"

import { SectionButton } from "@/components/SectionButton/SectionButton";
import { UserProfile } from "@/components/UserProfile/UserProfile";
import { UserIcon } from "@/assets/icons/User";
import { HeartFilledIcon } from "@/assets/icons/HeartFilled"; 
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {
  const x = false;
  const isSelected = false; 

  return (
    <div className="bg-red-600 w-full">

      <Header />
      <Footer />
      {/* <SectionButton
      icon={<HeartFilledIcon width={20} heigth={20} color={"#32C0C6"}  /> }
      isSelected={false}
      onClick={() => console.log('clicked')} 
      title={'Favoritos'}
      />

      <UserProfile
      name="Mojombo"
      bio="Olá eu sou o mojombo e vou te guiar hoje para seu aprendizado"
      userName="mojombo"
      avatarUrl={'https://avatars.githubusercontent.com/u/1?v=4'}
      /> */}
    </div>
  );
}