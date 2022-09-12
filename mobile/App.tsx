import { StatusBar } from "expo-status-bar";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

interface ButtonProps {
  title: string;
}

function Button() {
  return (
    <TouchableOpacity>
      <Text>Enviar</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello NLW!</Text>
      <StatusBar style="auto" />
      <Button />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#FFF",
    fontSize: 22,
  },
});
