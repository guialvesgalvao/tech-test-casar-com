"use client"

import { SectionButton } from "@/components/SectionButton/SectionButton";
import { UserProfile } from "@/components/UserProfile/UserProfile";
import { UserIcon } from "@/assets/icons/User";
import { HeartFilledIcon } from "@/assets/icons/HeartFilled"; 

export default function Home() {
  const x = false;
  const isSelected = false; 

  return (
    <div className="bg-red-600">
      <SectionButton
      icon={<HeartFilledIcon width={20} heigth={20} color={"#32C0C6"}  /> }
      isSelected={false}
      onClick={() => console.log('clicked')} 
      title={'Favoritos'}
      />

      <UserProfile
      name="Mojombo"
      description="Olá eu sou o mojombo e vou te guiar hoje para seu aprendizado"
      username="mojombo"
      avatarUrl={'https://avatars.githubusercontent.com/u/1?v=4'}
      />
    </div>
  );
}