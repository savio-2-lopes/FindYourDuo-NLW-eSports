import React, { useEffect, useState } from "react";
import { FlatList, Image, View } from "react-native";
import LogoImg from "../../assets/logo-nlw-esports.png";
import { GameCard } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import api from "../../services/api";
import { styles } from "./styles";

export function Home() {
  const [dataGames, setDataGames] = useState([]);

  useEffect(() => {
    api
      .get("/games")
      .then((response) => setDataGames(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  });
  return (
    <View style={styles.container}>
      <Image source={LogoImg} style={styles.logo} />
      <Heading
        title="Encontre seu duo"
        subtitle="Selecione o game que deseja jogar..."
      />

      <FlatList
        data={dataGames}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => <GameCard data={item} />}
        horizontal
        contentContainerStyle={styles.contentList}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
