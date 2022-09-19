import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";

import {
  DiscordLogo,
  GameController,
  MagnifyingGlassPlus,
  X,
} from "phosphor-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../services/api";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Spinner } from "./Spinner";

interface ModalProps {
  id: string;
  title: string;
  adsCount: number;
  bannerUrl: string;
}

interface Game {
  id: string;
  hourEnd: string;
  hoursStart: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

export function ViewGameModal(props: ModalProps) {
  const [dataAds, setDataAds] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get(`/games/${props.id}/ads`)
      .then((response) => {
        setDataAds(response.data);
        setLoading(true);
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "warning",
          text: `Ocorreu um erro no ${err}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }, [api]);

  const [ref] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 1, spacing: 5 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 1.5, spacing: 10 },
      },
    },
    slides: { perView: 1 },
  });

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content
        className="
          fixed  
          bg-[#2A2634] 
          py-8 px-10 
          text-white 
          top-1/2 
          left-1/2 
          -translate-x-1/2 
          -translate-y-1/2 
          rounded-lg 
          max-w-[980px] 
          shadow-lg 
          shadow-black/25
        "
      >
        <Dialog.Title className="text-3xl font-black flex justify-between">
          Visualizar {props.title}
          <Dialog.Close className="cursor-pointer mt-2" asChild>
            <X size={25} color="white" />
          </Dialog.Close>
        </Dialog.Title>

        <div
          className="
            grid 
            grid-cols-1 
            lg:grid-cols-2 
            gap-4 
            mt-10
            overflow-scroll 
            lg:overflow-hidden 
            h-[500px] 
            lg:h-auto
          "
        >
          <img
            src={props.bannerUrl}
            className="rounded-[8px]"
            alt={props.title}
          />

          <div>
            <h1 className="text-2xl text-white font-black block">
              {props.title}
            </h1>
            <span className="text-zinc-400 block mt-4">
              {props.adsCount} {props.adsCount > 1 ? "Anúncios" : "Anúncio"}
            </span>

            <div
              className="
                grid lg:mt-5 
                overflow-scroll 
                lg:overflow-hidden 
                h-[500px] lg:h-auto
                items-center 
                justify-center 
                gap-5
              "
            >
              {loading ? (
                <div ref={ref} className="keen-slider">
                  {loading && dataAds ? (
                    dataAds.map((item: any) => (
                      <div
                        key={item.id}
                        className="relative rounded-lg text-center lg:text-left keen-slider__slide"
                      >
                        <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg mt-8 overflow-hidden">
                          <div className="bg-[#2A2634] px-8 py-6">
                            <div className="mt-2 text-zinc-400 block">
                              <strong>Nick</strong>: <span>{item.name}</span>
                            </div>
                            {/*  */}
                            <div className="mt-2 text-zinc-400 block">
                              <strong>Chat de Voz</strong>:{" "}
                              <span
                                className={
                                  item.useVoiceChannel
                                    ? "text-green-700"
                                    : "text-red-600"
                                }
                              >
                                {item.useVoiceChannel ? "Sim" : "Não"}
                              </span>
                            </div>
                            {/*  */}
                            <div className="mt-2 text-zinc-400 block">
                              <strong>Há quantos anos joga?</strong>:
                              <span>{item.yearsPlaying}</span>
                            </div>
                            {/*  */}
                            <div className="mt-2 text-zinc-400 block">
                              <strong>Dias que joga</strong>
                              <span>{item.weekDays.length}</span>
                            </div>
                            {/*  */}
                            <div className="flex items-center justify-center lg:justify-start">
                              <button className="py-3 px-4 mt-10 bg-violet-500 hover:bg-violet-600 text-white rounded flex gap-3">
                                <DiscordLogo size={24} />
                                Ver Discord
                              </button>
                            </div>
                          </div>
                        </div>
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
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
