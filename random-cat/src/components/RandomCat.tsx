import Image from "next/image";
import { useEffect, useState, Dispatch, SetStateAction, FC } from "react";
import { CatBio } from "../app/page";

export type CatData = {
  id: string;
  url: string;
};
export const fetcher = async (
  url: string,
  setter: Dispatch<SetStateAction<CatData[]>>
) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: CatData[] = await response.json();
    setter(data);
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    setter([]);
  }
};
const ENDPOINT = `https://api.thecatapi.com/v1/images/search?has_breeds=1`;

const RandomCat: FC<{ catBio: CatBio }> = ({ catBio }) => {
  const [catData, setCatData] = useState<CatData[]>([]);
  useEffect(() => {
    fetcher(ENDPOINT, setCatData);
  }, []);

  const handleChangeCat = () => {
    fetcher(ENDPOINT, setCatData);
  };

  return (
    <section className="w-full md:w-9/12 flex flex-col border-4 border-white  md:p-5 mb-24">
      <div className="flex flex-col justify-center items-center gap-10 md:flex-row p-3">
        <Image
          src={catData[0]?.url || `https://fakeimg.pl/300x200`}
          alt="cat"
          width={300}
          height={200}
          className="w-[400px] h-[300px] bg-center object-fill bg-cover rounded-lg hover:scale-110 transition-all mb-3"
        />
        <button
          onClick={handleChangeCat}
          className="bg-gray-500 px-5 py-3 rounded-lg text-white shadow-lg shadow-black active:shadow-none"
        >
          Get new cat
        </button>
      </div>
      <p className="font-mooli text-2xl text-green-900 leading-7 p-3">
        {catBio?.breeds[0].description}
      </p>
    </section>
  );
};

export default RandomCat;
