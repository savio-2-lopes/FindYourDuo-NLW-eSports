import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Check, GameController } from "phosphor-react";

import { useEffect, useState } from "react";
import api from "../services/api";
import { Input } from "./Form/Input";

interface Game {
  id: string;
  title: string;
}

export function CreatedAdModal() {
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [dataGames, setDataGames] = useState<Game[]>([]);
  const [formData, setformData] = useState({
    game: "",
    name: "",
    yearsPlaying: "",
    discord: "",
    weekDays: weekDays,
    hoursStart: "",
    hourEnd: "",
    ueVoiceChannel: "",
  });

  useEffect(() => {
    api
      .get("/games")
      .then((response) => setDataGames(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, [api]);

  const handleSubmit = async () => {
    const registerFormData = new FormData();

    registerFormData.append("game", formData.game);
    registerFormData.append("name", formData.name);
    registerFormData.append("yearsPlaying", formData.yearsPlaying);
    registerFormData.append("discord", formData.discord);
    registerFormData.append("weekDays", formData.weekDays);
    registerFormData.append("hoursStart", formData.hoursStart);
    registerFormData.append("hourEnd", formData.hourEnd);
    registerFormData.append("ueVoiceChannel", formData.ueVoiceChannel);

    try {
      await api({
        method: "post",
        url: "/api/login",
        data: registerFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: any) => {
    setformData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  console.log("\n\n\n\n\n\n\n", formData);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Select.Root>
              <Select.Trigger className="mt-[8px] bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 text-left">
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
                type="text"
                name="discord"
                id="discord"
                placeholder="Usuario#000"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-5 gap-2 mt-3"
                value={weekDays}
                onValueChange={setWeekDays}
                onChange={handleChange}
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
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="time"
                  name="hoursStart"
                  id="hoursStart"
                  className="appearance-none"
                  placeholder="De"
                  onChange={handleChange}
                />
                <Input
                  type="time"
                  name="hourEnd"
                  id="hourEnd"
                  className="appearance-none"
                  placeholder="Até"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root className="w-6 h-6 p-1 rounded bg-zinc-900">
              <Checkbox.Indicator>
                <Check
                  name="ueVoiceChannel"
                  onChange={handleChange}
                  className="w-4 h-4 text-emerald-400"
                />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costuma me conectar ao chat de voz
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
