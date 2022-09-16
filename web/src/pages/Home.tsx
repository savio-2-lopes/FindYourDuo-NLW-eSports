import logoImg from "../assets/logo.svg";
import { useCallback, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import Carousel from "react-multi-carousel";
import api from "../services/api";

import "react-multi-carousel/lib/styles.css";
// import Modal from "../components/Modal";
import { GameBanner } from "../components/GameBanner";
import { CreatedAdBanner } from "../components/CreatedAdBanner";
import { Spinner } from "../components/Spinner";
import { GameController } from "phosphor-react";
import { Input } from "../components/Form/Input";

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
  // const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formValue, setformValue] = useState({
    game: "",
    name: "",
    yearsPlaying: "",
    discord: "",
    hoursStart: "",
    hourEnd: "",
  });

  const handleSubmit = async () => {
    const loginFormData = new FormData();
    loginFormData.append("game", formValue.game);
    loginFormData.append("name", formValue.name);
    loginFormData.append("yearsPlaying", formValue.yearsPlaying);
    loginFormData.append("discord", formValue.discord);
    loginFormData.append("hoursStart", formValue.hoursStart);
    loginFormData.append("hourEnd", formValue.hourEnd);

    try {
      const response = await api({
        method: "post",
        url: "/api/login",
        data: loginFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: any) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

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
  }, [api, dataGames]);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="Logo" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-clip-text bg-nlw-gradient">
          duo
        </span>{" "}
        está aqui
      </h1>

      <div className="grid mt-16 items-center justify-center gap-[24px]">
        {loading ? (
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true}
            infinite={true}
            keyBoardControl={true}
            transitionDuration={500}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType="desktop"
          >
            {dataGames ? (
              dataGames.map((item: any) => {
                return (
                  <div className="relative rounded-lg overflow-hidden">
                    <GameBanner
                      key={item.id}
                      bannerUrl={item.bannerUrl}
                      title={item.title}
                      adsCount={item._count.ads}
                    />
                  </div>
                );
              })
            ) : (
              <h1>Sem dados</h1>
            )}
          </Carousel>
        ) : (
          <div className="mt-10 mb-10 text-white grid justify-center">
            <Spinner />
          </div>
        )}
      </div>

      <Dialog.Root>
        <CreatedAdBanner />

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[8px]">
            <Dialog.Title className="text-3xl font-black">
              Publique um anúncio
            </Dialog.Title>

            <form
              className="mt-[32px] flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-2">
                <Input
                  label="Qual o game?"
                  type="text"
                  name="game"
                  id="game"
                  placeholder="Selecione o game que deseja jogar"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Input
                  label="Seu nome (ou nickname)"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Como te chama dentro do game?"
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Input
                    label="Joga há quantos anos"
                    type="number"
                    name="yearsPlaying"
                    id="yearsPlaying"
                    placeholder="Tudo bem ser ZERO"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Input
                    label="Qual seu Discord?"
                    type="number"
                    name="discord"
                    id="discord"
                    placeholder="Usuario#000"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="weekDays">Quando costuma jogar?</label>

                  <div className="grid grid-cols-5 gap-2 mt-[8px]">
                    <button
                      className="w-8 h-8 rounded bg-zinc-900 hover:bg-[#8B5CF6]"
                      title="Segunda"
                    >
                      S
                    </button>

                    <button
                      className="w-8 h-8 rounded bg-zinc-900 hover:bg-[#8B5CF6]"
                      title="Terça"
                    >
                      T
                    </button>

                    <button
                      className="w-8 h-8 rounded bg-zinc-900 hover:bg-[#8B5CF6]"
                      title="Quarta"
                    >
                      Q
                    </button>

                    <button
                      className="w-8 h-8 rounded bg-zinc-900 hover:bg-[#8B5CF6]"
                      title="Quinta"
                    >
                      Q
                    </button>

                    <button
                      className="w-8 h-8 rounded bg-zinc-900 hover:bg-[#8B5CF6]"
                      title="Sexta"
                    >
                      S
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="time"
                      name="hoursStart"
                      id="hoursStart"
                      placeholder="De"
                      onChange={handleChange}
                    />
                    <Input
                      type="time"
                      name="hourEnd"
                      id="hourEnd"
                      placeholder="Até"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-2 flex gap-2 text-sm">
                <input
                  type="checkbox"
                  className="mr-[8px]"
                  onChange={handleChange}
                />
                Costuma me conectar ao chat de voz
              </div>

              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close
                type="button"
                className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
                  Cancelar
                </Dialog.Close>

                <button
                  type="submit"
                  className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                >
                  <GameController className="w-6 h-6" />
                  Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
