import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

const USERS_KEY = '@fiap_atende_users';
const SESSION_KEY = '@fiap_atende_session';

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarSessao();
  }, []);

  async function carregarSessao() {
    try {
      const sessaoSalva = await AsyncStorage.getItem(SESSION_KEY);

      if (sessaoSalva) {
        setUsuario(JSON.parse(sessaoSalva));
      }
    } catch (error) {
      console.log('Erro ao carregar sessão:', error);
    } finally {
      setCarregando(false);
    }
  }

  async function cadastrar(nome, email, senha) {
    try {
      const dadosSalvos = await AsyncStorage.getItem(USERS_KEY);
      const usuarios = dadosSalvos ? JSON.parse(dadosSalvos) : [];

      const emailNormalizado = email.trim().toLowerCase();

      const usuarioExiste = usuarios.some(
        (item) => item.email === emailNormalizado
      );

      if (usuarioExiste) {
        return {
          sucesso: false,
          mensagem: 'Este e-mail já está cadastrado.',
        };
      }

      const novoUsuario = {
        id: Date.now().toString(),
        nome: nome.trim(),
        email: emailNormalizado,
        senha,
      };

      const usuariosAtualizados = [...usuarios, novoUsuario];

      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(usuariosAtualizados));

      return {
        sucesso: true,
        mensagem: 'Cadastro realizado com sucesso!',
      };
    } catch (error) {
      console.log('Erro ao cadastrar:', error);

      return {
        sucesso: false,
        mensagem: 'Não foi possível realizar o cadastro.',
      };
    }
  }

  async function login(email, senha) {
    try {
      const dadosSalvos = await AsyncStorage.getItem(USERS_KEY);
      const usuarios = dadosSalvos ? JSON.parse(dadosSalvos) : [];

      const emailNormalizado = email.trim().toLowerCase();

      const usuarioEncontrado = usuarios.find(
        (item) => item.email === emailNormalizado && item.senha === senha
      );

      if (!usuarioEncontrado) {
        return {
          sucesso: false,
          mensagem: 'E-mail ou senha incorretos.',
        };
      }

      const usuarioSessao = {
        id: usuarioEncontrado.id,
        nome: usuarioEncontrado.nome,
        email: usuarioEncontrado.email,
      };

      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(usuarioSessao));
      setUsuario(usuarioSessao);

      return {
        sucesso: true,
        mensagem: 'Login realizado com sucesso!',
      };
    } catch (error) {
      console.log('Erro ao fazer login:', error);

      return {
        sucesso: false,
        mensagem: 'Não foi possível fazer login.',
      };
    }
  }

  async function logout() {
    try {
      await AsyncStorage.removeItem(SESSION_KEY);
      setUsuario(null);
    } catch (error) {
      console.log('Erro ao sair:', error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        carregando,
        cadastrar,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}