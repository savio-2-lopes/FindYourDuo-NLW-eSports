import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Background } from "../../components/Background";
import { Entypo } from "@expo/vector-icons";

import logoImg from "../../assets/logo-nlw-esports.png";

import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { GameParams } from "../../@types/navigation";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { THEME } from "../../theme";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { DuoMatch } from "../../components/DuoMatch";
import api from "../../services/api";

export function Game() {
  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  const [duo, setDuo] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState("");

  useEffect(() => {
    api
      .get(`/games/${game.id}/ads`)
      .then((response) => setDuo(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, [api]);

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar" />
        <FlatList
          data={duo}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard onConnect={() => {}} data={item} />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[
            duo.length > 0 ? styles.contentList : styles.emptyListContent,
          ]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não Há anúncios publicados ainda
            </Text>
          )}
        />

        <DuoMatch
          visible={true}
          discord="savio#222"
          onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}
