import { GameController } from "phosphor-react";
import { useEffect, useState } from "react";
import api from "../../services/api";
import router, { useSearchParams } from "react-router-dom";

interface ModalProps {
  closeModal: () => any;
  id: Number;
}

export default function Modal(props: ModalProps) {
  const [gameId, setGameId] = useSearchParams();

  const [dataGames, setDataGames] = useState([]);
  const [formData, setFormData] = useState({
    name: null,
    yearsPlaying: null,
    discord: null,
    weekDays: [],
    hoursStart: null,
    hourEnd: null,
    ueVoiceChannel: false,
  });

  useEffect(() => {
    api
      .get("/games")
      .then((response) => setDataGames(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  });

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto text-white rounded-[8px]">
        <div className="flex min-h-full items-end justify-center rounded-[8px] text-center sm:items-center sm:p-0">
          <div className="w-[488px] h-[651px] bg-[#2A2634] rounded-[8px] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-[#2A2634] p-[40px] rounded-[8px]">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h1 className="mb-[32px] font-[900] text-[32px]">
                  Publique um anúncio
                </h1>
                <form action="">
                  <div className="grid">
                    <label
                      className="block font-[600] text-[16px]"
                      htmlFor="gameId"
                    >
                      Qual o game?
                    </label>
                    <select
                      name="gameId"
                      className="bg-[#18181B] placeholder-[#71717A] border-[#18181B] mt-[8px] rounded-[4px] p-[16px]"
                      placeholder="Selecione o game que deseja jogar"
                    >
                      <option selected disabled value="">
                        Selecione o game que deseja jogar
                      </option>
                      {dataGames &&
                        dataGames.map((item: any) => (
                          <option value={item.id}>{item.title}</option>
                        ))}
                    </select>
                  </div>
                  <div className="grid mt-[16px]">
                    <label
                      className="block font-[600] text-[16px]"
                      htmlFor="name"
                    >
                      Seu nome (ou nickname)
                    </label>
                    <input
                      type="text"
                      className="bg-[#18181B] placeholder-[#71717A] border-[#18181B] mt-[8px] rounded-[4px] p-[16px]"
                      id="name"
                      placeholder="Como te chamam dentro do game?"
                    />
                  </div>
                  <div className="grid grid-cols-2 mt-[16px] overflow-hidden">
                    <div className="grid">
                      <label
                        className="block font-[600] text-[16px]"
                        htmlFor="name"
                      >
                        Joga há quantos anos?
                      </label>
                      <input
                        type="text"
                        className="bg-[#18181B] placeholder-[#71717A] border-[#18181B] mt-[8px] rounded-[4px] p-[16px]"
                        id="years"
                        placeholder="Tudo bem ser ZERO"
                      />
                    </div>
                    <div className="grid">
                      <label
                        className="block font-[600] text-[16px]"
                        htmlFor="name"
                      >
                        Qual seu Discord?
                      </label>
                      <input
                        type="text"
                        className="bg-[#18181B] placeholder-[#71717A] border-[#18181B] mt-[8px] rounded-[4px] p-[16px]"
                        id="discord"
                        placeholder="Usuario#0000"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 mt-[16px] overflow-hidden">
                    <div className="grid">
                      <label
                        className="block font-[600] text-[16px]"
                        htmlFor="name"
                      >
                        Quando costuma jogar?
                      </label>
                      <div className="grid grid-cols-5">
                        <input
                          type="checkbox"
                          className="bg-[#18181B] placeholder-[#71717A] border-[#18181B] mt-[8px] rounded-[4px] p-[16px]"
                          id="years"
                        />
                        <input
                          type="checkbox"
                          className="bg-[#18181B] placeholder-[#71717A] border-[#18181B] mt-[8px] rounded-[4px] p-[16px]"
                          id="years"
                        />
                        <input
                          type="checkbox"
                          className="bg-[#18181B] placeholder-[#71717A] border-[#18181B] mt-[8px] rounded-[4px] p-[16px]"
                          id="years"
                        />
                        <input
                          type="checkbox"
                          className="bg-[#18181B] placeholder-[#71717A] border-[#18181B] mt-[8px] rounded-[4px] p-[16px]"
                          id="years"
                        />
                        <input
                          type="checkbox"
                          className="bg-[#18181B] placeholder-[#71717A] border-[#18181B] mt-[8px] rounded-[4px] p-[16px]"
                          id="years"
                        />
                      </div>
                    </div>
                    <div className="grid">
                      <label className="block font-[600] text-[16px]">
                        Qual horário do dia?
                      </label>
                      <div className="grid grid-cols-2 gap-[24px]">
                        <input
                          type="text"
                          className="bg-[#18181B] placeholder-[#71717A] border-[#18181B] mt-[8px] rounded-[4px] p-[16px]"
                          placeholder="De"
                        />
                        <input
                          type="text"
                          className="bg-[#18181B] placeholder-[#71717A] border-[#18181B] mt-[8px] rounded-[4px] p-[16px]"
                          placeholder="Até"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-[24px]">
                    <input type="checkbox" />
                    Costumo me conectar ao chat de voz
                  </div>
                </form>
              </div>
              <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-[#8B5CF6] px-4 py-2 text-base font-medium text-white shadow-sm focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  <GameController
                    size={24}
                    color="#fff"
                    className="mr-[12px]"
                  />
                  Encontrar duo
                </button>
                <button
                  type="button"
                  onClick={props.closeModal}
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-[#71717A] bg-[#71717A] px-4 py-2 text-white font-medium shadow-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
