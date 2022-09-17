import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Check, GameController } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { Input } from "./Form/Input";
import axios from "axios";
import Swal from "sweetalert2";
import api from "../services/api";

interface Game {
  id: string;
  title: string;
}

export function CreatedAdModal() {
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [gameSelected, setGameSelected] = useState("");
  const [dataGames, setDataGames] = useState<Game[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  useEffect(() => {
    api
      .get("/games")
      .then((response) => setDataGames(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, [api]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (
      !data.name &&
      !data.yearsPlaying &&
      !data.discord &&
      !gameSelected &&
      !data.hourEnd &&
      !data.hoursStart &&
      !data.weekDays
    ) {
      return;
    }

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
        title: "Anúncio registrado com sucesso",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: `Ocorreu um erro no ${err}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Select.Root onValueChange={setGameSelected}>
              <Select.Trigger className="mt-[8px] flex justify-between bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 text-left">
                <Select.Value placeholder="Selecione o game que deseja jogar *" />
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
            <Input
              label="Seu nome (ou nickname)"
              type="text"
              name="name"
              id="name"
              placeholder="Como te chama dentro do game?"
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
              />
            </div>
            <div className="flex flex-col gap-2">
              <Input
                label="Qual seu Discord?"
                type="text"
                name="discord"
                id="discord"
                placeholder="Usuario#000"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">
                Quando costuma jogar? <span className="text-[#ff0000]">*</span>
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

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia? <span className="text-[#ff0000]">*</span></label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="time"
                  name="hoursStart"
                  id="hoursStart"
                  className="appearance-none"
                  placeholder="De"
                />
                <Input
                  type="time"
                  name="hourEnd"
                  id="hourEnd"
                  className="appearance-none"
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
            Costuma me conectar ao chat de voz? <span className="text-[#ff0000]">*</span>
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
