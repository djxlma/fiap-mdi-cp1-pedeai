import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const cardapio = [
  {
    id: '1',
    nome: 'Coxinha de Frango',
    descricao: 'Massa crocante com recheio',
    preco: 7.5,
    imagem: 'https://picsum.photos/seed/coxinha/100',
    disponivel: true,
  },
  {
    id: '2',
    nome: 'Pão de Queijo',
    descricao: 'Assado na hora',
    preco: 5,
    imagem: 'https://picsum.photos/seed/pao/100',
    disponivel: true,
  },
  {
    id: '3',
    nome: 'Suco de Laranja',
    descricao: 'Copo 500ml, natural sem açúcar',
    preco: 8,
    imagem: 'https://picsum.photos/seed/suco/100',
    disponivel: false,
  }
];

export default function Menu() {
  const [carrinho, setCarrinho] = useState([]);
  const router = useRouter();

  const adicionar = (item) => {
    setCarrinho([...carrinho, item]);
    Alert.alert('Adicionado!', item.nome);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Cardápio</Text>

      {cardapio.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={{ uri: item.imagem }} style={styles.img} />

          <View style={{ flex: 1 }}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text>{item.descricao}</Text>

            <View style={styles.linha}>
              <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>

              <Text
                style={[
                  styles.status,
                  item.disponivel ? styles.disponivel : styles.esgotado
                ]}
              >
                {item.disponivel ? 'Disponível' : 'Esgotado'}
              </Text>
            </View>

            <TouchableOpacity 
              style={[
                styles.botao,
                !item.disponivel && styles.botaoDesativado
              ]}
              disabled={!item.disponivel}
              onPress={() => adicionar(item)}
            >
              <Text style={styles.textoBotao}>
                {item.disponivel ? 'Adicionar' : 'Indisponível'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <TouchableOpacity
        style={styles.botaoCarrinho}
        onPress={() =>
          router.push({
            pathname: '/cart',
            params: { carrinho: JSON.stringify(carrinho) },
          })
        }
      >
        <Text style={styles.textoBotao}>
          Ir para Carrinho ({carrinho.length})
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f5ff',
    padding: 20
  },
  titulo: {
    fontSize: 28,
    color: '#3d13f6',
    marginBottom: 20
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10
  },
  img: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  nome: {
    fontWeight: 'bold'
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5
  },
  preco: {
    color: '#f769b2',
    fontWeight: 'bold'
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  disponivel: {
    color: '#6ad408'
  },
  esgotado: {
    color: '#d3d3d3'
  },
  botao: {
    backgroundColor: '#3d13f6',
    padding: 6,
    marginTop: 8,
    borderRadius: 5
  },
  botaoDesativado: {
    backgroundColor: '#ccc'
  },
  botaoCarrinho: {
    backgroundColor: '#f769b2',
    padding: 15,
    borderRadius: 10,
    marginTop: 20
  },
  textoBotao: {
    color: '#fff',
    textAlign: 'center'
  }
});