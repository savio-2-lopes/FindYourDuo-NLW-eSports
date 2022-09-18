import React, { useEffect, useState } from "react";
import { FlatList, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../../components/Background";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

import LogoImg from "../../assets/logo-nlw-esports.png";
import api from "../../services/api";

export function Home() {
  const [dataGames, setDataGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate("game", {
      id,
      title,
      bannerUrl,
    });
  }

  useEffect(() => {
    api
      .get("/games")
      .then((response) => setDataGames(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, [api]);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={LogoImg} style={styles.logo} />
        <Heading
          title="Encontre seu duo"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={dataGames}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
          horizontal
          contentContainerStyle={styles.contentList}
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    </Background>
  );
}
