import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

// Simulação de um banco de dados
const cardapio = [
  {
    id: '1',
    nome: 'Coxinha de Frango',
    descricao: 'Massa crocante com bastante recheio de frango desfiado.',
    preco: 7.50,
    imagem: 'https://picsum.photos/seed/coxinha/100',
    disponivel: true,
  },
  {
    id: '2',
    nome: 'Pão de Queijo',
    descricao: 'Tradicional, assado na hora. Tamanho grande.',
    preco: 5.00,
    imagem: 'https://picsum.photos/seed/pao/100',
    disponivel: true,
  },
  {
    id: '3',
    nome: 'Suco de Laranja',
    descricao: 'Copo 500ml, natural sem açúcar.',
    preco: 8.00,
    imagem: 'https://picsum.photos/seed/suco/100',
    disponivel: false,
  }
];

export default function Home() {
  const [carrinho, setCarrinho] = useState([]);
  const router = useRouter();

  const adicionarAoCarrinho = (item) => {
    setCarrinho([...carrinho, item]);

    Alert.alert('Sucesso!', `${item.nome} foi adicionado ao seu pedido.`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Cardápio</Text>
        <Text style={styles.contador}>🛒 {carrinho.length} itens</Text>
      </View>
      
      {cardapio.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={{ uri: item.imagem }} style={styles.imagem} />
          
          <View style={styles.infoContainer}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.descricao}>{item.descricao}</Text>
            
            <View style={styles.rodapeCard}>
              <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
              
              <Text style={[
                styles.status,
                item.disponivel ? styles.statusDisponivel : styles.statusEsgotado
              ]}>
                {item.disponivel ? 'Disponível' : 'Esgotado'}
              </Text>
            </View>

            <TouchableOpacity 
              style={[styles.botao, !item.disponivel && styles.botaoDesativado]}
              disabled={!item.disponivel}
              onPress={() => adicionarAoCarrinho(item)}
            >
              <Text style={styles.textoBotao}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* BOTÃO PARA IR AO CARRINHO */}
      <TouchableOpacity
        style={styles.botaoCarrinho}
        onPress={() =>
          router.push({
            pathname: '/cart',
            params: { cart: JSON.stringify(carrinho) },
          })
        }
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          Ir para Carrinho
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f5ff',
    padding: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3d13f6',
  },
  contador: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#08011e',
    backgroundColor: '#e0deff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  imagem: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#08011e',
  },
  descricao: {
    fontSize: 14,
    color: '#666',
  },
  rodapeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  preco: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f769b2',
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusDisponivel: {
    color: '#6ad408',
  },
  statusEsgotado: {
    color: '#d3d3d3',
  },
  botao: {
    backgroundColor: '#3d13f6',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoDesativado: {
    backgroundColor: '#ccc',
  },
  textoBotao: {
    color: '#f6f5ff',
    fontWeight: 'bold',
  },
  botaoCarrinho: {
    backgroundColor: '#3d13f6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
});