import { AppTheme } from "@/constants/appTheme";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type EstadoOption = {
  key: string;
  label: string;
  emoji: string;
  color: string;
};

export default function CheckinScreen() {
  const router = useRouter();
  const [seleccionado, setSeleccionado] = useState<string>("");

  const fechaTexto = useMemo(() => {
    const ahora = new Date();

    const dias = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
    const meses = [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ];

    let horas = ahora.getHours();
    const minutos = ahora.getMinutes().toString().padStart(2, "0");
    const ampm = horas >= 12 ? "pm" : "am";
    horas = horas % 12 || 12;

    return `Hoy, ${dias[ahora.getDay()]} ${ahora.getDate()} de ${
      meses[ahora.getMonth()]
    }, ${horas}:${minutos}${ampm}`;
  }, []);

  const opciones: EstadoOption[] = [
    { key: "increible", label: "increíble", emoji: "😊", color: "#F4B63B" },
    { key: "bien", label: "bien", emoji: "🙂", color: "#88C441" },
    { key: "meh", label: "meh", emoji: "😐", color: "#57A9D9" },
    { key: "mal", label: "mal", emoji: "😟", color: "#F28C2E" },
    { key: "horrible", label: "horrible", emoji: "😠", color: "#E96A8D" },
  ];

  const handleContinuar = () => {
    if (!seleccionado) return;
    router.replace("/intro-chat");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>¿Cómo te sientes el día de hoy?</Text>

          <View style={styles.dateRow}>
            <Text style={styles.dateIcon}>🗓️</Text>
            <Text style={styles.dateText}>{fechaTexto}</Text>
          </View>

          <View style={styles.grid}>
            {opciones.map((opcion) => {
              const activo = seleccionado === opcion.key;

              return (
                <TouchableOpacity
                  key={opcion.key}
                  style={styles.optionWrapper}
                  activeOpacity={0.85}
                  onPress={() => setSeleccionado(opcion.key)}
                >
                  <View
                    style={[
                      styles.emojiCircle,
                      { backgroundColor: opcion.color },
                      activo && styles.emojiCircleSelected,
                    ]}
                  >
                    <Text style={styles.emojiText}>{opcion.emoji}</Text>
                  </View>

                  <Text
                    style={[
                      styles.optionLabel,
                      { color: opcion.color },
                      activo && styles.optionLabelSelected,
                    ]}
                  >
                    {opcion.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, !seleccionado && styles.buttonDisabled]}
          onPress={handleContinuar}
          disabled={!seleccionado}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Continuar</Text>
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
    paddingVertical: 28,
  },
  card: {
    backgroundColor: AppTheme.colors.card,
    borderRadius: AppTheme.radius.xl,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: "center",
    ...AppTheme.shadow,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: AppTheme.colors.textPrimary,
    textAlign: "center",
    lineHeight: 34,
    marginBottom: 16,
    maxWidth: 290,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 34,
  },
  dateIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  dateText: {
    fontSize: 15,
    color: "#6EAC44",
    fontWeight: "600",
  },
  grid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    columnGap: 20,
    rowGap: 22,
  },
  optionWrapper: {
    width: 100,
    alignItems: "center",
  },
  emojiCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    justifyContent: "center",
    alignItems: "center",
    ...AppTheme.shadow,
  },
  emojiCircleSelected: {
    borderWidth: 4,
    borderColor: AppTheme.colors.primary,
    transform: [{ scale: 1.06 }],
  },
  emojiText: {
    fontSize: 38,
  },
  optionLabel: {
    marginTop: 9,
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  optionLabelSelected: {
    fontWeight: "800",
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
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
});
