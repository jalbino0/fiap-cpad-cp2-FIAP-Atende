import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SectorCard({ setor, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.topo}>
        <Text style={styles.nome}>{setor.nome}</Text>
        <Ionicons name={setor.icone} size={22} color="#c9c9c9" />
      </View>

      <Text style={styles.descricao}>{setor.descricao}</Text>

      <View style={styles.infoLinha}>
        <Ionicons name="time-outline" size={16} color="#8f8f8f" />
        <Text style={styles.infoTexto}>Espera: ~{setor.espera} min</Text>
      </View>

      <View style={styles.infoLinha}>
        <Ionicons name="people-outline" size={16} color="#8f8f8f" />
        <Text style={styles.infoTexto}>{setor.fila} na fila</Text>
      </View>

      <View style={styles.infoLinha}>
        <Ionicons name="flash-outline" size={16} color="#ff1493" />
        <Text style={styles.rapidoTexto}>Rápido: {setor.rapido} min</Text>
      </View>

      <Text style={styles.link}>Ver detalhes</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },
  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  nome: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    flex: 1,
    marginRight: 10,
  },
  descricao: {
    color: '#9f9f9f',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  infoLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoTexto: {
    color: '#b8b8b8',
    fontSize: 15,
    marginLeft: 8,
  },
  rapidoTexto: {
    color: '#ffffff',
    fontSize: 15,
    marginLeft: 8,
    fontWeight: '700',
  },
  link: {
    color: '#ff1493',
    textAlign: 'right',
    marginTop: 12,
    fontWeight: '700',
    fontSize: 15,
  },
});