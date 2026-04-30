import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAtendimento } from '../context/AtendimentoContext';

export default function Historico() {
  const router = useRouter();

  const {
    historico,
    carregandoAtendimento,
    finalizarAtendimentoPorId,
    cancelarAtendimentoPorId,
  } = useAtendimento();

  const [atualizandoId, setAtualizandoId] = useState(null);
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  async function handleFinalizar(id) {
    try {
      setAtualizandoId(id);
      await finalizarAtendimentoPorId(id);
      setMensagemSucesso('Atendimento marcado como concluído.');
    } finally {
      setAtualizandoId(null);
    }
  }

  async function handleCancelar(id) {
    try {
      setAtualizandoId(id);
      await cancelarAtendimentoPorId(id);
      setMensagemSucesso('Atendimento cancelado com sucesso.');
    } finally {
      setAtualizandoId(null);
    }
  }

  if (carregandoAtendimento) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#ff1493" />
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
          <Text style={styles.voltarTexto}>Voltar ao início</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>Histórico</Text>
        <Text style={styles.subtitulo}>Acompanhe seus atendimentos anteriores.</Text>

        {mensagemSucesso ? (
          <Text style={styles.sucessoGeral}>{mensagemSucesso}</Text>
        ) : null}

        {historico.length === 0 ? (
          <View style={styles.vazio}>
            <Ionicons name="file-tray-outline" size={34} color="#ff1493" />
            <Text style={styles.vazioTitulo}>Nenhum atendimento ainda</Text>
            <Text style={styles.vazioTexto}>
              Gere sua primeira senha para começar a visualizar seu histórico.
            </Text>
          </View>
        ) : (
          historico.map((item) => {
            const estaAtualizando = atualizandoId === item.id;
            const estaEmAndamento = item.status === 'Em andamento';

            return (
              <View key={item.id} style={styles.card}>
                <View style={styles.linhaTopo}>
                  <Text style={styles.codigo}>{item.codigo}</Text>

                  <Text
                    style={[
                      styles.status,
                      item.status === 'Concluído'
                        ? styles.concluido
                        : item.status === 'Cancelado'
                        ? styles.cancelado
                        : styles.andamento,
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>

                <Text style={styles.setor}>{item.setorNome}</Text>
                <Text style={styles.info}>Posição inicial: {item.posicao}</Text>
                <Text style={styles.info}>Espera estimada: ~{item.espera} min</Text>
                <Text style={styles.info}>Gerada em: {item.data}</Text>

                {estaEmAndamento ? (
                  <View style={styles.acoes}>
                    <Pressable
                      style={[styles.botaoAcao, styles.botaoConcluir]}
                      onPress={() => handleFinalizar(item.id)}
                      disabled={estaAtualizando}
                    >
                      {estaAtualizando ? (
                        <ActivityIndicator color="#8cffb2" />
                      ) : (
                        <>
                          <Ionicons
                            name="checkmark-circle-outline"
                            size={18}
                            color="#8cffb2"
                          />
                          <Text style={styles.textoConcluir}>Já fui atendido</Text>
                        </>
                      )}
                    </Pressable>

                    <Pressable
                      style={[styles.botaoAcao, styles.botaoCancelar]}
                      onPress={() => handleCancelar(item.id)}
                      disabled={estaAtualizando}
                    >
                      <Ionicons
                        name="close-circle-outline"
                        size={18}
                        color="#ff9bb7"
                      />
                      <Text style={styles.textoCancelar}>Cancelar</Text>
                    </Pressable>
                  </View>
                ) : null}
              </View>
            );
          })
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 22,
    paddingBottom: 36,
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
  },
  subtitulo: {
    color: '#b3b3b3',
    fontSize: 17,
    marginTop: 8,
    marginBottom: 18,
  },
  sucessoGeral: {
    backgroundColor: '#1f3d2a',
    color: '#8cffb2',
    padding: 12,
    borderRadius: 10,
    marginBottom: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  vazio: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 18,
    padding: 22,
    alignItems: 'center',
  },
  vazioTitulo: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 12,
    marginBottom: 10,
  },
  vazioTexto: {
    color: '#b3b3b3',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },
  linhaTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  codigo: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
  },
  status: {
    fontSize: 13,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: 'hidden',
  },
  concluido: {
    backgroundColor: '#1f3d2a',
    color: '#8cffb2',
  },
  cancelado: {
    backgroundColor: '#43212a',
    color: '#ff9bb7',
  },
  andamento: {
    backgroundColor: '#3a2d12',
    color: '#ffd27a',
  },
  setor: {
    color: '#ff1493',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 10,
  },
  info: {
    color: '#b3b3b3',
    fontSize: 15,
    marginBottom: 6,
  },
  acoes: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  botaoAcao: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  botaoConcluir: {
    backgroundColor: '#102818',
    borderWidth: 1,
    borderColor: '#1f5c35',
  },
  botaoCancelar: {
    backgroundColor: '#2b1118',
    borderWidth: 1,
    borderColor: '#5c2231',
  },
  textoConcluir: {
    color: '#8cffb2',
    fontSize: 13,
    fontWeight: '800',
  },
  textoCancelar: {
    color: '#ff9bb7',
    fontSize: 13,
    fontWeight: '800',
  },
});