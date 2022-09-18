import { GameController } from "phosphor-react-native";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import api from "../../services/api";
import { THEME } from "../../theme";
import { DuoInfo } from "../DuoInfo";
import { styles } from "./styles";

export interface DuoCardProps {
  id: string;
  hourEnd: string;
  hoursStart: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface Props {
  data: DuoCardProps;
  onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo label="Nome" value={data.name} />
      <DuoInfo
        label="Nome"
        value={
          Number(data.yearsPlaying) > 1
            ? `${data.yearsPlaying} anos`
            : `${data.yearsPlaying} ano`
        }
      />
      <DuoInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dias \u2022 ${data.hoursStart} - ${data.hourEnd}`}
      />
      <DuoInfo
        label="Chamada de áudio"
        value={data.useVoiceChannel ? "Sim" : "Não"}
        colorValue={
          data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
      />
      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController color={THEME.COLORS.TEXT} size={20} />
        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}
