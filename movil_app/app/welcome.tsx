import { AppTheme } from "@/constants/appTheme";
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

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>¡Bienvenido!</Text>

          <Image
            source={require("../assets/images/logo.jpeg")}
            style={styles.image}
            resizeMode="contain"
          />

          <Text style={styles.description}>
            Este espacio está diseñado para ayudarte a comprender tus emociones
            y fortalecer tu bienestar emocional a través del análisis
            inteligente y el seguimiento personalizado.
          </Text>

          <View style={styles.securityBox}>
            <Text style={styles.securityText}>
              Tu información es confidencial, segura y será tratada con
              responsabilidad por parte de la universidad.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/login")}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Empezar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 22,
    paddingVertical: 30,
  },
  card: {
    backgroundColor: AppTheme.colors.card,
    borderRadius: AppTheme.radius.xl,
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 24,
    alignItems: "center",
    ...AppTheme.shadow,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: AppTheme.colors.textPrimary,
    marginBottom: 14,
    textAlign: "center",
  },
  image: {
    width: 190,
    height: 190,
    marginBottom: 14,
  },
  description: {
    fontSize: 16,
    lineHeight: 25,
    color: AppTheme.colors.textPrimary,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 18,
  },
  securityBox: {
    width: "100%",
    backgroundColor: "#F5FAFF",
    borderWidth: 1,
    borderColor: "#D7E8F8",
    borderRadius: 16,
    padding: 14,
  },
  securityText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#35526B",
    textAlign: "center",
    fontWeight: "600",
  },
  button: {
    alignSelf: "center",
    backgroundColor: AppTheme.colors.primary,
    borderColor: AppTheme.colors.primaryBorder,
    borderWidth: 1.5,
    borderRadius: AppTheme.radius.md,
    paddingVertical: 15,
    paddingHorizontal: 36,
    minWidth: 180,
    marginTop: 24,
    ...AppTheme.shadow,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
});
