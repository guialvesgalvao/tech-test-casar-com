import Image from 'next/image'

interface UserProfileProps {
  username: string;
  name: string;
  description: string;
  avatarUrl: string;
}

export function UserProfile(props: Readonly<UserProfileProps>) {
  const { name, username, description, avatarUrl } = props;

  return (
    <div className='flex p-2 items-center flex-col border'>
      <div >
        <Image
        className='rounded-full'
          src={avatarUrl}
          alt={`Avatar de ${name}`}
          width={200}
          height={200}
        />
        <div className='flex items-center flex-col gap-1 mt-3 mb-5'>
          <span className='font-semibold text-[21px] text-grey-neutral'>{name}</span>
          <span className='text-grey-dark text-sm'>@{username}</span>
        </div>
      </div>
      <p className='text-grey-dark text-sm'>{description}</p>
    </div>
  );
}
