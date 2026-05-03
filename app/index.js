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

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erros, setErros] = useState({});
  const [mensagemErro, setMensagemErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  function validarCampos() {
    const novosErros = {};

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

    setErros(novosErros);

    return Object.keys(novosErros).length === 0;
  }

  function validarAoDigitar(campo, valor) {
    if (campo === 'email') {
      setEmail(valor);
    }

    if (campo === 'senha') {
      setSenha(valor);
    }

    if (mensagemErro) {
      setMensagemErro('');
    }
  }

  async function entrar() {
    const formularioValido = validarCampos();

    if (!formularioValido) return;

    try {
      setCarregando(true);

      const resposta = await login(email, senha);

      if (!resposta.sucesso) {
        setMensagemErro(resposta.mensagem);
        return;
      }

      router.replace('/home');
    } finally {
      setCarregando(false);
    }
  }

  const botaoDesabilitado = !email.trim() || !senha.trim() || carregando;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.topo}>
            <Text style={styles.logo}>FIAP Atende</Text>
            <Text style={styles.subtitulo}>
              Acesse sua conta para acompanhar filas, gerar senhas e consultar
              seus atendimentos.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.titulo}>Entrar</Text>

            {mensagemErro ? (
              <Text style={styles.erroGeral}>{mensagemErro}</Text>
            ) : null}

            <Text style={styles.label}>E-mail</Text>
            <View style={styles.inputArea}>
              <Ionicons name="mail-outline" size={20} color="#8f8f8f" />
              <TextInput
                style={styles.input}
                placeholder="usuario@dominio.com"
                placeholderTextColor="#7d7d7d"
                value={email}
                onChangeText={(texto) => validarAoDigitar('email', texto)}
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
                placeholder="Digite sua senha"
                placeholderTextColor="#7d7d7d"
                value={senha}
                onChangeText={(texto) => validarAoDigitar('senha', texto)}
                secureTextEntry
              />
            </View>
            {erros.senha ? <Text style={styles.erro}>{erros.senha}</Text> : null}

            <Pressable
              style={[
                styles.botao,
                botaoDesabilitado && styles.botaoDesabilitado,
              ]}
              onPress={entrar}
              disabled={botaoDesabilitado}
            >
              {carregando ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.botaoTexto}>Entrar</Text>
              )}
            </Pressable>

            <Pressable onPress={() => router.push('/cadastro')}>
              <Text style={styles.link}>Ainda não tenho conta. Cadastrar</Text>
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
    justifyContent: 'center',
    padding: 22,
  },
  topo: {
    marginBottom: 28,
  },
  logo: {
    color: '#ff1493',
    fontSize: 42,
    fontWeight: '800',
    marginBottom: 10,
  },
  subtitulo: {
    color: '#b3b3b3',
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 18,
    padding: 22,
  },
  titulo: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 20,
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
  link: {
    color: '#ff1493',
    textAlign: 'center',
    marginTop: 18,
    fontSize: 15,
    fontWeight: '700',
  },
});
