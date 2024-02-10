import Image from "next/image";
import { useEffect, useState, Dispatch, SetStateAction, use, FC } from "react";
import { CatBio } from "../page";

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
    <section className="flex">
      <div className="w-[500px] ">
        <Image src={catData[0]?.url} alt="cat" width={300} height={300} />
        <p>{catBio?.breeds[0]?.description}</p>
      </div>
      <button onClick={handleChangeCat}>Get new cat</button>
    </section>
  );
};

export default RandomCat;
