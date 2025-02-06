import Image, { StaticImageData } from "next/image";

interface SearchFeedbackProps {
  searchText?: string;
  title: string;
  subTitle: string;
  url?: StaticImageData;
  alt: string;
}

export function SearchFeedback(props: Readonly<SearchFeedbackProps>) {
  const { searchText, title, subTitle, url, alt } = props;

  return (
    <div className="flex items-center flex-col gap-1">
      {searchText && <p className="text-primary font-semibold text-[21px]">&quot;{searchText}&quot;</p>}
      <h5 className="text-grey-neutral font-semibold text-xl md:text-lg">{title}</h5>
      <p className="text-grey-neutral mb-8">{subTitle}</p>
      {url && <Image src={url} alt={alt} />}
    </div>
  );
}
