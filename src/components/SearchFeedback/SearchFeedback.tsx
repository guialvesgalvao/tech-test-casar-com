import Image, { StaticImageData } from "next/image";

interface SearchFeedbackProps {
  searchText?: string;
  title: string;
  subTitle: string;
  url: StaticImageData;
  alt: string;
}

export function SearchFeedback(props: Readonly<SearchFeedbackProps>) {
  const { searchText, title, subTitle, url, alt } = props;
  console.log('teste')
  return (
    <div className="flex items-center flex-col gap-1">
      {searchText && <p className="text-primary font-semibold text-[21px]">"{searchText}"</p>}
      <h5 className="text-grey-neutral font-semibold text-[21px]">{title}</h5>
      <p className="text-grey-neutral mb-8">{subTitle}</p>
      <Image src={url} alt={alt} />
    </div>
  );
}
