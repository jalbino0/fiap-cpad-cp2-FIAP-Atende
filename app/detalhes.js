import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { setores } from '../data/setores';

export default function Detalhes() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const setor = setores.find((item) => item.id === String(id));

  if (!setor) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.erro}>Setor não encontrado.</Text>

          <Pressable
            style={styles.botaoVoltar}
            onPress={() => router.replace('/home')}
          >
            <Text style={styles.botaoTexto}>Voltar</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
          style={styles.voltar}
          onPress={() => router.replace('/home')}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={18} color="#ffffff" />
          <Text style={styles.voltarTexto}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>{setor.nome}</Text>
        <Text style={styles.descricao}>{setor.descricao}</Text>

        <View style={styles.badges}>
          <View style={styles.badge}>
            <Text style={styles.badgeTexto}>{setor.horario}</Text>
          </View>

          <View style={styles.infoSimples}>
            <Ionicons name="people-outline" size={16} color="#8f8f8f" />
            <Text style={styles.infoTexto}>{setor.fila} na fila</Text>
          </View>

          <View style={styles.infoSimples}>
            <Ionicons name="time-outline" size={16} color="#8f8f8f" />
            <Text style={styles.infoTexto}>~{setor.espera} min de espera</Text>
          </View>
        </View>

        <Text style={styles.subtitulo}>Serviços Disponíveis</Text>

        {setor.servicos.map((servico, index) => (
          <View key={index} style={styles.servicoCard}>
            <View style={styles.servicoLinha}>
              <Ionicons
                name="checkmark-circle-outline"
                size={22}
                color="#ff1493"
              />
              <Text style={styles.servicoTitulo}>{servico.titulo}</Text>
            </View>

            <Text style={styles.servicoDescricao}>{servico.descricao}</Text>
          </View>
        ))}

        <View style={styles.gerarCard}>
          <Text style={styles.gerarTitulo}>Gerar Senha</Text>
          <Text style={styles.gerarTexto}>
            Precisa de atendimento? Gere sua senha e aguarde ser chamado.
          </Text>

          <Pressable
            style={styles.botao}
            onPress={() => router.push(`/senha?id=${setor.id}`)}
          >
            <Text style={styles.botaoTexto}>Pegar minha senha</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
  },
  content: {
    padding: 22,
    paddingBottom: 36,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 22,
  },
  erro: {
    color: '#ffffff',
    fontSize: 20,
    marginBottom: 16,
  },
  voltar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
    paddingVertical: 8,
    paddingRight: 12,
    alignSelf: 'flex-start',
  },
  voltarTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  titulo: {
    color: '#ff1493',
    fontSize: 38,
    fontWeight: '800',
    marginBottom: 10,
  },
  descricao: {
    color: '#b3b3b3',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  badges: {
    marginBottom: 28,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#0d0d0d',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 12,
  },
  badgeTexto: {
    color: '#ffffff',
    fontWeight: '700',
  },
  infoSimples: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoTexto: {
    color: '#b8b8b8',
    marginLeft: 8,
    fontSize: 16,
  },
  subtitulo: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 16,
  },
  servicoCard: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },
  servicoLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  servicoTitulo: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10,
    flex: 1,
  },
  servicoDescricao: {
    color: '#b3b3b3',
    fontSize: 16,
    lineHeight: 24,
  },
  gerarCard: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 18,
    padding: 20,
    marginTop: 10,
  },
  gerarTitulo: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 10,
  },
  gerarTexto: {
    color: '#b3b3b3',
    fontSize: 17,
    lineHeight: 25,
    marginBottom: 18,
  },
  botao: {
    backgroundColor: '#ff1493',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  botaoVoltar: {
    backgroundColor: '#ff1493',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  botaoTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
});