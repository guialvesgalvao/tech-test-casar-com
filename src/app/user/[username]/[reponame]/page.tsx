interface PageProps {
  params: {
    username: string;
    reponame: string;
  };
}

export default async function Repository({ params }: Readonly<PageProps>) {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="border border-custom-border w-4/5 py-3 rounded-xl h-full bg-black">
        <button className="text-white border border-custom-border w-full flex items-center gap-5 py-2 px-5 cursor-pointer hover:bg-slate-50 hover:text-black">
          <span>F</span>
          <span>filename</span>
        </button>
      </div>
    </div>
  );
}
