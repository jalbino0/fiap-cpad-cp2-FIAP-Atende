import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
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
import { useAuth } from '../context/AuthContext';

export default function Cadastro() {
  const router = useRouter();
  const { cadastrar } = useAuth();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [erros, setErros] = useState({});
  const [mensagemErro, setMensagemErro] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);

  function validarCampos() {
    const novosErros = {};

    if (!nome.trim()) {
      novosErros.nome = 'O nome completo é obrigatório.';
    }

    if (!email.trim()) {
      novosErros.email = 'O e-mail é obrigatório.';
    } else if (!email.includes('@') || !email.includes('.')) {
      novosErros.email = 'Digite um e-mail válido.';
    }

    if (!senha.trim()) {
      novosErros.senha = 'A senha é obrigatória.';
    } else if (senha.length < 6) {
      novosErros.senha = 'A senha deve ter no mínimo 6 caracteres.';
    }

    if (!confirmarSenha.trim()) {
      novosErros.confirmarSenha = 'Confirme sua senha.';
    } else if (confirmarSenha !== senha) {
      novosErros.confirmarSenha = 'As senhas não são iguais.';
    }

    setErros(novosErros);

    return Object.keys(novosErros).length === 0;
  }

  function limparMensagens() {
    if (mensagemErro) setMensagemErro('');
    if (mensagemSucesso) setMensagemSucesso('');
  }

  async function handleCadastrar() {
    const formularioValido = validarCampos();

    if (!formularioValido) return;

    try {
      setCarregando(true);

      const resposta = await cadastrar(nome, email, senha);

      if (!resposta.sucesso) {
        setMensagemErro(resposta.mensagem);
        return;
      }

      setMensagemSucesso(resposta.mensagem);

      setTimeout(() => {
        router.replace('/');
      }, 900);
    } finally {
      setCarregando(false);
    }
  }

  const botaoDesabilitado =
    !nome.trim() ||
    !email.trim() ||
    !senha.trim() ||
    !confirmarSenha.trim() ||
    carregando;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Pressable style={styles.voltar} onPress={() => router.replace('/')}>
            <Ionicons name="arrow-back" size={18} color="#ffffff" />
            <Text style={styles.voltarTexto}>Voltar</Text>
          </Pressable>

          <Text style={styles.logo}>Criar conta</Text>
          <Text style={styles.subtitulo}>
            Cadastre-se para usar o FIAP Atende com sessão persistida.
          </Text>

          <View style={styles.card}>
            {mensagemErro ? (
              <Text style={styles.erroGeral}>{mensagemErro}</Text>
            ) : null}

            {mensagemSucesso ? (
              <Text style={styles.sucessoGeral}>{mensagemSucesso}</Text>
            ) : null}

            <Text style={styles.label}>Nome completo</Text>
            <View style={styles.inputArea}>
              <Ionicons name="person-outline" size={20} color="#8f8f8f" />
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome"
                placeholderTextColor="#7d7d7d"
                value={nome}
                onChangeText={(texto) => {
                  setNome(texto);
                  limparMensagens();
                }}
              />
            </View>
            {erros.nome ? <Text style={styles.erro}>{erros.nome}</Text> : null}

            <Text style={styles.label}>E-mail</Text>
            <View style={styles.inputArea}>
              <Ionicons name="mail-outline" size={20} color="#8f8f8f" />
              <TextInput
                style={styles.input}
                placeholder="usuario@dominio.com"
                placeholderTextColor="#7d7d7d"
                value={email}
                onChangeText={(texto) => {
                  setEmail(texto);
                  limparMensagens();
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {erros.email ? <Text style={styles.erro}>{erros.email}</Text> : null}

            <Text style={styles.label}>Senha</Text>
            <View style={styles.inputArea}>
              <Ionicons name="lock-closed-outline" size={20} color="#8f8f8f" />
              <TextInput
                style={styles.input}
                placeholder="Mínimo 6 caracteres"
                placeholderTextColor="#7d7d7d"
                value={senha}
                onChangeText={(texto) => {
                  setSenha(texto);
                  limparMensagens();
                }}
                secureTextEntry
              />
            </View>
            {erros.senha ? <Text style={styles.erro}>{erros.senha}</Text> : null}

            <Text style={styles.label}>Confirmar senha</Text>
            <View style={styles.inputArea}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#8f8f8f" />
              <TextInput
                style={styles.input}
                placeholder="Digite a senha novamente"
                placeholderTextColor="#7d7d7d"
                value={confirmarSenha}
                onChangeText={(texto) => {
                  setConfirmarSenha(texto);
                  limparMensagens();
                }}
                secureTextEntry
              />
            </View>
            {erros.confirmarSenha ? (
              <Text style={styles.erro}>{erros.confirmarSenha}</Text>
            ) : null}

            <Pressable
              style={[
                styles.botao,
                botaoDesabilitado && styles.botaoDesabilitado,
              ]}
              onPress={handleCadastrar}
              disabled={botaoDesabilitado}
            >
              {carregando ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.botaoTexto}>Cadastrar</Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#050505',
  },
  content: {
    flexGrow: 1,
    padding: 22,
    paddingBottom: 36,
  },
  voltar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 22,
    alignSelf: 'flex-start',
  },
  voltarTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  logo: {
    color: '#ff1493',
    fontSize: 40,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitulo: {
    color: '#b3b3b3',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 18,
    padding: 22,
  },
  label: {
    color: '#d6d6d6',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 8,
  },
  inputArea: {
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    paddingVertical: 12,
    marginLeft: 10,
  },
  erro: {
    color: '#ff5c8a',
    fontSize: 13,
    marginBottom: 8,
    marginTop: 2,
  },
  erroGeral: {
    backgroundColor: '#43212a',
    color: '#ff9bb7',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontWeight: '700',
  },
  sucessoGeral: {
    backgroundColor: '#1f3d2a',
    color: '#8cffb2',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontWeight: '700',
  },
  botao: {
    backgroundColor: '#ff1493',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 18,
  },
  botaoDesabilitado: {
    opacity: 0.45,
  },
  botaoTexto: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '800',
  },
});