import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

const AtendimentoContext = createContext({});

export function AtendimentoProvider({ children }) {
  const { usuario } = useAuth();

  const [senhaAtual, setSenhaAtual] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [carregandoAtendimento, setCarregandoAtendimento] = useState(false);

  const historicoKey = usuario
    ? `@fiap_atende_historico_${usuario.email}`
    : '@fiap_atende_historico';

  const senhaAtualKey = usuario
    ? `@fiap_atende_senha_atual_${usuario.email}`
    : '@fiap_atende_senha_atual';

  useEffect(() => {
    carregarDados();
  }, [usuario]);

  async function carregarDados() {
    if (!usuario) {
      setSenhaAtual(null);
      setHistorico([]);
      return;
    }

    try {
      setCarregandoAtendimento(true);

      const senhaSalva = await AsyncStorage.getItem(senhaAtualKey);
      const historicoSalvo = await AsyncStorage.getItem(historicoKey);

      setSenhaAtual(senhaSalva ? JSON.parse(senhaSalva) : null);
      setHistorico(historicoSalvo ? JSON.parse(historicoSalvo) : []);
    } catch (error) {
      console.log('Erro ao carregar atendimentos:', error);
    } finally {
      setCarregandoAtendimento(false);
    }
  }

  async function salvarSenhaAtual(novaSenha) {
    if (novaSenha) {
      await AsyncStorage.setItem(senhaAtualKey, JSON.stringify(novaSenha));
    } else {
      await AsyncStorage.removeItem(senhaAtualKey);
    }
  }

  async function salvarHistorico(novoHistorico) {
    await AsyncStorage.setItem(historicoKey, JSON.stringify(novoHistorico));
  }

  async function gerarSenha(setor) {
    if (!setor) return null;

    const prefixo = setor.nome
      .split(' ')
      .map((palavra) => palavra[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const numero = Math.floor(Math.random() * 900 + 100);
    const codigo = `${prefixo}-${numero}`;

    const novaSenha = {
      id: Date.now().toString(),
      codigo,
      setorId: setor.id,
      setorNome: setor.nome,
      posicao: Math.max(setor.fila - Math.floor(Math.random() * 3), 1),
      espera: setor.espera,
      status: 'Em andamento',
      data: new Date().toLocaleString('pt-BR'),
    };

    const novoHistorico = [novaSenha, ...historico];

    setSenhaAtual(novaSenha);
    setHistorico(novoHistorico);

    await salvarSenhaAtual(novaSenha);
    await salvarHistorico(novoHistorico);

    return novaSenha;
  }

  async function atualizarStatusAtendimento(id, novoStatus) {
    const novoHistorico = historico.map((item) =>
      item.id === id ? { ...item, status: novoStatus } : item
    );

    setHistorico(novoHistorico);
    await salvarHistorico(novoHistorico);

    if (senhaAtual?.id === id) {
      setSenhaAtual(null);
      await salvarSenhaAtual(null);
    }
  }

  async function finalizarSenha() {
    if (!senhaAtual) return;

    await atualizarStatusAtendimento(senhaAtual.id, 'Concluído');
  }

  async function cancelarSenha() {
    if (!senhaAtual) return;

    await atualizarStatusAtendimento(senhaAtual.id, 'Cancelado');
  }

  async function finalizarAtendimentoPorId(id) {
    await atualizarStatusAtendimento(id, 'Concluído');
  }

  async function cancelarAtendimentoPorId(id) {
    await atualizarStatusAtendimento(id, 'Cancelado');
  }

  return (
    <AtendimentoContext.Provider
      value={{
        senhaAtual,
        historico,
        carregandoAtendimento,
        gerarSenha,
        finalizarSenha,
        cancelarSenha,
        finalizarAtendimentoPorId,
        cancelarAtendimentoPorId,
      }}
    >
      {children}
    </AtendimentoContext.Provider>
  );
}

export function useAtendimento() {
  return useContext(AtendimentoContext);
}