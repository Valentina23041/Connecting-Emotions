import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LegalScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Image
            source={require("../assets/images/bienestar.png")}
            style={styles.image}
            resizeMode="contain"
          />

          <Text style={styles.title}>
            Protección y confidencialidad de datos
          </Text>

          <Text style={styles.text}>
            Tu información es confidencial y está protegida conforme a la Ley
            1581 de 2012 y el Decreto 1377 de 2013. Los datos registrados en la
            aplicación serán tratados de manera segura, responsable y únicamente
            con fines de orientación, análisis emocional y acompañamiento
            institucional.
          </Text>

          <Text style={styles.text}>
            La información no será compartida con terceros sin autorización. Su
            uso estará orientado al bienestar emocional del usuario, respetando
            los principios de privacidad, seguridad, confidencialidad y
            protección de datos personales.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace("/login")}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>Finalizar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF1F7",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  card: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  image: {
    width: 145,
    height: 145,
    marginBottom: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#263238",
    textAlign: "center",
    marginBottom: 14,
    lineHeight: 29,
  },
  text: {
    fontSize: 15,
    lineHeight: 24,
    color: "#4D5B66",
    textAlign: "center",
    marginBottom: 13,
  },
  button: {
    backgroundColor: "#2F80ED",
    paddingVertical: 14,
    paddingHorizontal: 34,
    borderRadius: 14,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },
});
