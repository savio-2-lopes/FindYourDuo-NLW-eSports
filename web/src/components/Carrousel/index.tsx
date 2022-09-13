import Carousel from "react-multi-carousel";
import { Image } from "semantic-ui-react";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};
const images = [
  "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550330039-a54e15ed9d33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549737328-8b9f3252b927?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549833284-6a7df91c1f65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549985908-597a09ef0a7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550064824-8f993041ffd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
];

// Because this is an inframe, so the SSR mode doesn't not do well here.
// It will work on real devices.
const Simple = () => {
  return (
    <Carousel
      ssr
      partialVisbile
      deviceType="desktop"
      itemClass="image-item"
      responsive={responsive}
    >
      {images.slice(0, 5).map((image) => {
        return (
          <>
            {/* <div className="grid grid-cols-6 gap-6 mt-16"> */}
            <a href="" className="relative rounded-lg overflow-hidden">
              <img src="/image-1.png" alt="" />
              <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
                <strong className="font-bold text-white block">
                  League of Legends
                </strong>
                <span className="text-zinc-300 text-sm block">4 anúncios</span>
              </div>
            </a>

            <a href="" className="relative rounded-lg overflow-hidden">
              <img src="/image-2.png" alt="" />
              <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
                <strong className="font-bold text-white block">Dota 2</strong>
                <span className="text-zinc-300 text-sm block">4 anúncios</span>
              </div>
            </a>

            <a href="" className="relative rounded-lg overflow-hidden">
              <img src="/image-3.png" alt="" />
              <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
                <strong className="font-bold text-white block">
                  Counter Strike
                </strong>
                <span className="text-zinc-300 text-sm block">4 anúncios</span>
              </div>
            </a>

            <a href="" className="relative rounded-lg overflow-hidden">
              <img src="/image-4.png" alt="" />
              <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
                <strong className="font-bold text-white block">
                  World of Warcraft
                </strong>
                <span className="text-zinc-300 text-sm block">4 anúncios</span>
              </div>
            </a>

            <a href="" className="relative rounded-lg overflow-hidden">
              <img src="/image-5.png" alt="" />
              <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
                <strong className="font-bold text-white block">Apex</strong>
                <span className="text-zinc-300 text-sm block">4 anúncios</span>
              </div>
            </a>

            <a href="" className="relative rounded-lg overflow-hidden">
              <img src="/image-6.png" alt="" />
              <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
                <strong className="font-bold text-white block">Fortnite</strong>
                <span className="text-zinc-300 text-sm block">4 anúncios</span>
              </div>
            </a>
          </>
        );
      })}
    </Carousel>
  );
};

export default Simple;
