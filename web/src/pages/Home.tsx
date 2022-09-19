import logoImg from "../assets/logo.svg";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import api from "../services/api";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { GameBanner } from "../components/GameBanner";
import { CreatedAdBanner } from "../components/CreatedAdBanner";
import { Spinner } from "../components/Spinner";
import { CreatedAdModal } from "../components/CreatedAdModal";
import { ViewGameModal } from "../components/ViewGameModal";

interface Game {
  id: string;
  bannerUrl: string;
  title: string;
  _count: {
    ads: number;
  };
}

export default function Home() {
  const [dataGames, setDataGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get("/games")
      .then((response) => {
        setDataGames(response.data);
        setLoading(true);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, [api]);

  const [ref] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 1 },
      },
      "(min-width: 500px)": {
        slides: { perView: 1 },
      },
      "(min-width: 600px)": {
        slides: { perView: 2.5 },
      },
      "(min-width: 700px)": {
        slides: { perView: 2, spacing: 5 },
      },
      "(min-width: 800px)": {
        slides: { perView: 2.5, spacing: 5 },
      },
      "(min-width: 900px)": {
        slides: { perView: 3.5, spacing: 5 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 5.5, spacing: 10 },
      },
    },
    slides: { perView: 1 },
  });

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="Logo" />
      <h1 className="text-6xl text-white font-black mt-20 text-center lg:text-left">
        Seu{" "}
        <span className="text-transparent bg-clip-text bg-nlw-gradient">
          duo
        </span>{" "}
        está aqui
      </h1>

      <div className="grid mt-16 items-center justify-center gap-2">
        {loading ? (
          <div ref={ref} className="keen-slider">
            {loading && dataGames ? (
              dataGames.map((item: any) => (
                <div
                  key={item.id}
                  className="flex justify-center relative rounded-lg text-center lg:text-left keen-slider__slide"
                >
                  <Dialog.Root>
                    <GameBanner
                      bannerUrl={item.bannerUrl}
                      title={item.title}
                      adsCount={item._count.ads}
                    />
                    <ViewGameModal
                      id={item.id}
                      bannerUrl={item.bannerUrl}
                      adsCount={item._count.ads}
                      title={item.title}
                    />
                  </Dialog.Root>
                </div>
              ))
            ) : (
              <h1 className="text-white">Sem dados</h1>
            )}
          </div>
        ) : (
          <div className="mt-10 mb-10 text-white grid justify-center">
            <Spinner />
          </div>
        )}
      </div>

      <Dialog.Root>
        <CreatedAdBanner />
        <CreatedAdModal />
      </Dialog.Root>
    </div>
  );
}
