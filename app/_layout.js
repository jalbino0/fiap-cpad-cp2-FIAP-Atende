import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { AtendimentoProvider } from '../context/AtendimentoContext';

function RotasProtegidas() {
  const router = useRouter();
  const segments = useSegments();
  const { usuario, carregando } = useAuth();

  useEffect(() => {
    if (carregando) return;

    const rotaAtual = segments[0];

    const estaEmRotaPublica =
      !rotaAtual || rotaAtual === 'index' || rotaAtual === 'cadastro';

    if (!usuario && !estaEmRotaPublica) {
      router.replace('/');
      return;
    }

    if (usuario && estaEmRotaPublica) {
      router.replace('/home');
    }
  }, [usuario, carregando, segments]);

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff1493" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#050505' },
      }}
    />
  );
}

export default function Layout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AtendimentoProvider>
          <RotasProtegidas />
        </AtendimentoProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#050505',
    justifyContent: 'center',
    alignItems: 'center',
  },
});