import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { setores } from '../data/setores';
import SectorCard from '../components/SectorCard';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const router = useRouter();
  const { usuario, logout } = useAuth();

  const [busca, setBusca] = useState('');

  const setorMaisRapido = [...setores].sort((a, b) => a.rapido - b.rapido)[0];

  const setoresFiltrados = useMemo(() => {
    const textoBusca = busca.trim().toLowerCase();

    if (!textoBusca) {
      return setores;
    }

    return setores.filter((setor) => {
      const nome = setor.nome.toLowerCase();
      const descricao = setor.descricao.toLowerCase();

      return nome.includes(textoBusca) || descricao.includes(textoBusca);
    });
  }, [busca]);

  async function handleLogout() {
    await logout();
    router.replace('/');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerTexto}>
            <Text style={styles.logo}>FIAP Atende</Text>
            <Text style={styles.subtitulo}>
              Olá, {usuario?.nome || 'aluno(a)'}! Acompanhe o status dos
              atendimentos.
            </Text>
          </View>

          <Pressable style={styles.botaoSair} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#ffffff" />
          </Pressable>
        </View>

        <View style={styles.destaque}>
          <Text style={styles.destaqueTitulo}>Atendimento mais rápido agora</Text>
          <Text style={styles.destaqueTexto}>
            {setorMaisRapido.nome} • {setorMaisRapido.rapido} min
          </Text>
        </View>

        <View style={styles.buscaArea}>
          <Ionicons name="search-outline" size={20} color="#8f8f8f" />
          <TextInput
            style={styles.buscaInput}
            placeholder="Buscar setor..."
            placeholderTextColor="#7d7d7d"
            value={busca}
            onChangeText={setBusca}
          />
        </View>

        <View style={styles.topoSecao}>
          <Text style={styles.tituloSecao}>Painel de Atendimento</Text>

          <Pressable onPress={() => router.push('/historico')}>
            <Text style={styles.linkHistorico}>Ver histórico</Text>
          </Pressable>
        </View>

        {setoresFiltrados.length === 0 ? (
          <View style={styles.vazio}>
            <Ionicons name="search-outline" size={34} color="#ff1493" />
            <Text style={styles.vazioTitulo}>Nenhum setor encontrado</Text>
            <Text style={styles.vazioTexto}>
              Tente buscar por outro nome ou serviço disponível.
            </Text>
          </View>
        ) : (
          setoresFiltrados.map((setor) => (
            <SectorCard
              key={setor.id}
              setor={setor}
              onPress={() => router.push(`/detalhes?id=${setor.id}`)}
            />
          ))
        )}
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
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 26,
  },
  headerTexto: {
    flex: 1,
    marginRight: 14,
  },
  logo: {
    color: '#ff1493',
    fontSize: 40,
    fontWeight: '800',
  },
  subtitulo: {
    color: '#b3b3b3',
    fontSize: 16,
    marginTop: 8,
    lineHeight: 24,
  },
  botaoSair: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  destaque: {
    backgroundColor: '#111111',
    borderColor: '#222222',
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
  },
  destaqueTitulo: {
    color: '#8d8d8d',
    fontSize: 14,
    marginBottom: 6,
  },
  destaqueTexto: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },
  buscaArea: {
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buscaInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    paddingVertical: 12,
    marginLeft: 10,
  },
  topoSecao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  tituloSecao: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '800',
    flex: 1,
    marginRight: 12,
  },
  linkHistorico: {
    color: '#ff1493',
    fontSize: 15,
    fontWeight: '700',
  },
  vazio: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
  },
  vazioTitulo: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 12,
    marginBottom: 8,
  },
  vazioTexto: {
    color: '#b3b3b3',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});
