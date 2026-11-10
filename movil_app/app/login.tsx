import { AppTheme } from "@/constants/appTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState<"success" | "error" | "">("");

  const handleLogin = async () => {
    if (!correo || !contrasena) {
      setTipoMensaje("error");
      setMensaje("Por favor ingresa correo y contraseña.");
      return;
    }

    try {
      setLoading(true);
      setMensaje("");
      setTipoMensaje("");

      const response = await axios.post(
        "http://127.0.0.1:5000/auth/login",
        {
          correo,
          contrasena,
        },
      );

      const user = response.data.user;
      await AsyncStorage.setItem("user", JSON.stringify(user));

      setTipoMensaje("success");
      setMensaje("Inicio de sesión exitoso.");

      setTimeout(() => {
        router.replace("/checkin");
      }, 1200);
    } catch (error: any) {
      setTipoMensaje("error");
      setMensaje(error?.response?.data?.error || "No se pudo iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setTipoMensaje("error");
    setMensaje("Aquí luego conectaremos la recuperación de contraseña.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <Image
              source={require("../assets/images/register.jpeg")}
              style={styles.avatar}
              resizeMode="contain"
            />

            <Text style={styles.title}>¡Hola!, inicia sesión en tu cuenta</Text>

            <Text style={styles.subtitle}>
              Ingresa tus datos para continuar con tu proceso emocional.
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Correo"
              placeholderTextColor="#7B8794"
              keyboardType="email-address"
              autoCapitalize="none"
              value={correo}
              onChangeText={setCorreo}
            />

            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#7B8794"
              secureTextEntry
              value={contrasena}
              onChangeText={setContrasena}
            />

            <TouchableOpacity
              onPress={handleForgotPassword}
              activeOpacity={0.8}
            >
              <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            {mensaje ? (
              <View
                style={[
                  styles.messageBox,
                  tipoMensaje === "success"
                    ? styles.successBox
                    : styles.errorBox,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    tipoMensaje === "success"
                      ? styles.successText
                      : styles.errorText,
                  ]}
                >
                  {mensaje}
                </Text>
              </View>
            ) : null}

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleLogin}
              activeOpacity={0.85}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Cargando..." : "Iniciar sesión"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => router.push("/register")}
              activeOpacity={0.8}
            >
              <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.adminLinkButton}
              onPress={() => router.push("/admin-login")}
              activeOpacity={0.8}
            >
              <Text style={styles.adminLinkText}>
                ¿Eres administrador? Acceder al panel
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 22,
    paddingVertical: 24,
  },
  card: {
    backgroundColor: AppTheme.colors.card,
    borderRadius: AppTheme.radius.xl,
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 24,
    ...AppTheme.shadow,
  },
  avatar: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: AppTheme.colors.textPrimary,
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 31,
  },
  subtitle: {
    fontSize: 14,
    color: AppTheme.colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 18,
  },
  input: {
    width: "100%",
    height: 52,
    backgroundColor: AppTheme.colors.inputBg,
    borderWidth: 1.2,
    borderColor: AppTheme.colors.inputBorder,
    borderRadius: AppTheme.radius.md,
    paddingHorizontal: 16,
    marginBottom: 13,
    fontSize: 16,
    color: AppTheme.colors.textPrimary,
  },
  forgotText: {
    fontSize: 14,
    color: AppTheme.colors.textSecondary,
    marginTop: 2,
    marginBottom: 16,
    textAlign: "center",
  },
  messageBox: {
    width: "100%",
    padding: 12,
    borderRadius: AppTheme.radius.sm,
    marginBottom: 16,
    borderWidth: 1,
  },
  messageText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 20,
  },
  successBox: {
    backgroundColor: AppTheme.colors.successBg,
    borderColor: AppTheme.colors.successBorder,
  },
  errorBox: {
    backgroundColor: AppTheme.colors.errorBg,
    borderColor: AppTheme.colors.errorBorder,
  },
  successText: {
    color: AppTheme.colors.successText,
  },
  errorText: {
    color: AppTheme.colors.errorText,
  },
  button: {
    backgroundColor: AppTheme.colors.primary,
    borderColor: AppTheme.colors.primaryBorder,
    borderWidth: 1.5,
    borderRadius: AppTheme.radius.md,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 170,
    ...AppTheme.shadow,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },
  linkButton: {
    marginTop: 16,
  },
  linkText: {
    color: AppTheme.colors.link,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  adminLinkButton: {
    marginTop: 14,
  },
  adminLinkText: {
    color: "#5B6770",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
});
