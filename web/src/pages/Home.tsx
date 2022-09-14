import logoImg from "../assets/logo.svg";
import { useEffect, useState } from "react";
import { MagnifyingGlassPlus } from "phosphor-react";

import Carousel from "react-multi-carousel";
import api from "../services/api";

import "react-multi-carousel/lib/styles.css";
import Modal from "../components/Modal";

export default function Home() {
  const [dataGames, setDataGames] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
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
      .then((response) => setDataGames(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  });

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
          {dataGames &&
            dataGames.map((item: any) => {
              return (
                <div
                  key={item.id}
                  className="relative rounded-lg overflow-hidden"
                >
                  <a
                    href="#"
                    onClick={() => {
                      setSelectedId(item.id);
                      setShowModal(true);
                    }}
                    className="relative overflow-hidden"
                  >
                    <img src={item.bannerUrl} alt={item.title} />
                    <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
                      <strong className="font-bold text-white block">
                        {item.title}
                      </strong>
                      <span className="text-zinc-300 text-sm block">
                        4 anúncios
                      </span>
                    </div>
                  </a>
                </div>
              );
            })}
        </Carousel>
      </div>

      <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg mt-8 overflow-hidden">
        <div className="bg-[#2A2634] px-8 py-6 flex justify-between">
          <div>
            <strong className="text-2xl text-white font-black block">
              Não encontrou seu duo?
            </strong>
            <span className="text-zinc-400 block">
              Publique um anúncio para encontrar novos players!
            </span>
          </div>

          {showModal && (
            <Modal id={Number(selectedId)} closeModal={() => setShowModal(false)} />
          )}

          <button
            onClick={() => setShowModal(true)}
            className="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3"
          >
            <MagnifyingGlassPlus size={24} />
            Publicar Anúncio
          </button>
        </div>
      </div>
    </div>
  );
}
