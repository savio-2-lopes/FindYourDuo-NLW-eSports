import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { Check, GameController, X } from "phosphor-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../services/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

interface Game {
  id: string;
  title: string;
}

const validationData = yup.object().shape({
  name: yup
    .string()
    .required("O nome é obrigatório")
    .max(40, "O título precisa ter menosde 40 caracteres"),
  discord: yup
    .string()
    .required("O perfil do Discord é obrigatório")
    .max(40, "O perfil do Discord precisa ter menos de 40 caracteres"),
  yearsPlaying: yup
    .string()
    .required("A Quantidade de Anos jogando é obrigatório"),
  hoursStart: yup
    .string()
    .required("A Quantidade de Anos jogando é obrigatório"),
  hourEnd: yup.string().required("A Quantidade de Anos jogando é obrigatório"),
});

export function CreatedAdModal() {
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [gameSelected, setGameSelected] = useState("");
  const [dataGames, setDataGames] = useState<Game[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationData),
  });

  useEffect(() => {
    api
      .get("/games")
      .then((response) => setDataGames(response.data))
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

  const onsubmit = (data: any) => {
    try {
      api.post(`/games/${gameSelected}/ads`, {
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        hoursStart: data.hoursStart,
        hourEnd: data.hourEnd,
        ueVoiceChannel: useVoiceChannel,
        weekDays: weekDays.map(Number),
        name: data.name,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        text: "Anúncio registrado com sucesso",
        showConfirmButton: false,
        timer: 1000,
      });
      setTimeout(() => window.location.reload(), 800);
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "warning",
        text: `Ocorreu um erro no ${err}`,
        showConfirmButton: false,
        timer: 1000,
      });
      setTimeout(() => window.location.reload(), 800);
    }
  };

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
          overflow-scroll 
          lg:overflow-hidden 
          h-[500px] lg:h-auto
          -translate-x-1/2 
          -translate-y-1/2 
          rounded-lg 
          max-w-[480px] 
          shadow-lg 
          shadow-black/25
        "
      >
        <Dialog.Title className="text-3xl font-black flex justify-between">
          Publique um anúncio
          <Dialog.Close className="cursor-pointer mt-2" asChild>
            <X size={25} color="white" />
          </Dialog.Close>
        </Dialog.Title>

        <form
          className="mt-8 flex flex-col gap-4"
          onSubmit={handleSubmit(onsubmit)}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="game">
              Qual o game? <span className="text-rose-700">*</span>
            </label>
            <Select.Root onValueChange={setGameSelected}>
              <Select.Trigger className="mt-[8px] flex justify-between bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 text-left">
                <Select.Value placeholder="Selecione o game que deseja jogar" />
                <Select.Icon />
              </Select.Trigger>

              <Select.Portal className="mt-[8px] bg-zinc-900 py-3 px-4 rounded text-sm text-zinc-500">
                <Select.Content>
                  <Select.ScrollUpButton />
                  <Select.Viewport>
                    <Select.Group>
                      {dataGames ? (
                        dataGames.map((game: any) => {
                          return (
                            <Select.Item
                              key={game.id}
                              value={game.id}
                              className="cursor-pointer hover:bg-zinc-800 mt-2 hover:text-zinc-400"
                            >
                              <Select.ItemText>{game.title}</Select.ItemText>
                            </Select.Item>
                          );
                        })
                      ) : (
                        <Select.Trigger className="mt-[8px] bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 text-left">
                          <Select.Value placeholder="Sem dados" />
                        </Select.Trigger>
                      )}
                    </Select.Group>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold">
              Seu nome (ou nickname) <span className="text-rose-700">*</span>
            </label>
            <input
              type="text"
              {...register("name")}
              name="name"
              id="name"
              className={`mt-[8px] bg-zinc-900 ${
                errors.name
                  ? "border-[1px] focus:outline-none border-rose-500 focus:ring"
                  : ""
              } py-3 px-4 rounded text-sm placeholder:text-zinc-500`}
              placeholder="Como te chama dentro do game?"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying" className="font-semibold">
                Joga há quantos anos <span className="text-rose-700">*</span>
              </label>
              <input
                type="number"
                {...register("yearsPlaying")}
                name="yearsPlaying"
                id="yearsPlaying"
                className={`mt-[8px] bg-zinc-900 ${
                  errors.yearsPlaying
                    ? "border-[1px] focus:outline-none border-rose-500 focus:ring"
                    : ""
                } py-3 px-4 rounded text-sm placeholder:text-zinc-500`}
                placeholder="Tudo bem ser ZERO"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="discord" className="font-semibold">
                Qual seu Discord? <span className="text-rose-700">*</span>
              </label>
              <input
                type="text"
                className={`mt-[8px] bg-zinc-900 ${
                  errors.discord
                    ? "border-[1px] focus:outline-none border-rose-500 focus:ring"
                    : ""
                } py-3 px-4 rounded text-sm placeholder:text-zinc-500`}
                {...register("discord")}
                name="discord"
                id="discord"
                placeholder="Usuario#000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:flex gap-6">
            <div className="lg:flex lg:flex-col gap-2">
              <label htmlFor="weekDays">
                Quando costuma jogar? <span className="text-rose-700">*</span>
              </label>
              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-5 gap-2 mt-3"
                id="weekDays"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  title="Segunda"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  title="Terça"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  title="Quarta"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  title="Quinta"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  title="Sexta"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>

            <div className="lg:flex lg:flex-col gap-2 lg:flex-1">
              <label htmlFor="hourStart">
                Qual horário do dia? <span className="text-rose-700">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="time"
                  className={`mt-[8px] bg-zinc-900 ${
                    errors.hoursStart
                      ? "border-[1px] focus:outline-none border-rose-500 focus:ring"
                      : ""
                  } py-3 px-4 rounded text-sm placeholder:text-zinc-500`}
                  {...register("hoursStart")}
                  name="hoursStart"
                  id="hoursStart"
                  placeholder="De"
                />
                <input
                  type="time"
                  className={`mt-[8px] bg-zinc-900 ${
                    errors.hourEnd
                      ? "border-[1px] focus:outline-none border-rose-500 focus:ring"
                      : ""
                  } py-3 px-4 rounded text-sm placeholder:text-zinc-500`}
                  {...register("hourEnd")}
                  name="hourEnd"
                  id="hourEnd"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                checked ? setUseVoiceChannel(true) : setUseVoiceChannel(false);
              }}
              className="w-6 h-6 p-1 rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costuma me conectar ao chat de voz?{" "}
            <span className="text-rose-700">*</span>
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
            >
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
  );
}
