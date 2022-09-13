import "./styles/main.css";
import logoImg from "./assets/logo.svg";
import { MagnifyingGlassPlus } from "phosphor-react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function App() {
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

      <div className="grid mt-16 items-center justify-center">
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
        <a href="#" className="relative rounded-lg overflow-hidden">
          <img src="/image-1.png" alt="" />
          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white block">
              League of Legends
            </strong>
            <span className="text-zinc-300 text-sm block">4 anúncios</span>
          </div>
        </a>
          <a href="#" className="relative rounded-lg overflow-hidden">
            <img src="/image-1.png" alt="" />
            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
              <strong className="font-bold text-white block">
                League of Legends
              </strong>
              <span className="text-zinc-300 text-sm block">4 anúncios</span>
            </div>
          </a>

          <a href="#" className="relative rounded-lg overflow-hidden">
            <img src="/image-2.png" alt="" />
            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
              <strong className="font-bold text-white block">Dota 2</strong>
              <span className="text-zinc-300 text-sm block">4 anúncios</span>
            </div>
          </a>
          <a href="#" className="relative rounded-lg overflow-hidden">
            <img src="/image-2.png" alt="" />
            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
              <strong className="font-bold text-white block">Dota 2</strong>
              <span className="text-zinc-300 text-sm block">4 anúncios</span>
            </div>
          </a>

          <a href="#" className="relative rounded-lg overflow-hidden">
            <img src="/image-3.png" alt="" />
            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
              <strong className="font-bold text-white block">
                Counter Strike
              </strong>
              <span className="text-zinc-300 text-sm block">4 anúncios</span>
            </div>
          </a>
          <a href="#" className="relative rounded-lg overflow-hidden">
            <img src="/image-3.png" alt="" />
            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
              <strong className="font-bold text-white block">
                Counter Strike
              </strong>
              <span className="text-zinc-300 text-sm block">4 anúncios</span>
            </div>
          </a>

          <a href="#" className="relative rounded-lg overflow-hidden">
            <img src="/image-4.png" alt="" />
            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
              <strong className="font-bold text-white block">Apex</strong>
              <span className="text-zinc-300 text-sm block">4 anúncios</span>
            </div>
          </a>
          <a href="#" className="relative rounded-lg overflow-hidden">
            <img src="/image-4.png" alt="" />
            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
              <strong className="font-bold text-white block">Apex</strong>
              <span className="text-zinc-300 text-sm block">4 anúncios</span>
            </div>
          </a>

          <a href="#" className="relative rounded-lg overflow-hidden">
            <img src="/image-5.png" alt="" />
            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
              <strong className="font-bold text-white block">Fortnite</strong>
              <span className="text-zinc-300 text-sm block">4 anúncios</span>
            </div>
          </a>
          <a href="#" className="relative rounded-lg overflow-hidden">
            <img src="/image-5.png" alt="" />
            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
              <strong className="font-bold text-white block">Fortnite</strong>
              <span className="text-zinc-300 text-sm block">4 anúncios</span>
            </div>
          </a>
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

          <button className="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3">
            <MagnifyingGlassPlus size={24} />
            Publicar Anúncio
          </button>
        </div>
      </div>
    </div>
  );
}
