import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

export default function Cart() {
  const { carrinho } = useLocalSearchParams();

  // estado local do carrinho
  const [itens, setItens] = useState(
    carrinho ? JSON.parse(carrinho) : []
  );

  const total = itens.reduce((acc, item) => acc + item.preco, 0);

  // 🗑️ remover item
  const removerItem = (index) => {
    const novoCarrinho = [...itens];
    novoCarrinho.splice(index, 1);
    setItens(novoCarrinho);
  };

  const finalizarPedido = () => {
    if (itens.length === 0) {
      Alert.alert('Erro', 'Seu carrinho está vazio!');
      return;
    }

    Alert.alert('Sucesso!', 'Pedido realizado!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Carrinho</Text>

      {itens.length === 0 ? (
        <Text style={styles.vazio}>Seu carrinho está vazio</Text>
      ) : (
        itens.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.nome}>
              {item.nome} - R$ {item.preco.toFixed(2)}
            </Text>

            <TouchableOpacity
              style={styles.botaoRemover}
              onPress={() => removerItem(index)}
            >
              <Text style={styles.textoRemover}>Remover</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      <Text style={styles.total}>
        Total: R$ {total.toFixed(2)}
      </Text>

      <TouchableOpacity style={styles.botao} onPress={finalizarPedido}>
        <Text style={styles.textoBotao}>Finalizar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f6f5ff',
  },
  titulo: {
    fontSize: 28,
    color: '#3d13f6',
    marginBottom: 20,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 20,
    color: '#08011e',
  },
  item: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  nome: {
    color: '#08011e',
    marginBottom: 5,
  },
  botaoRemover: {
    backgroundColor: '#f769b2',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  textoRemover: {
    color: '#fff',
    fontSize: 12,
  },
  total: {
    marginTop: 20,
    fontWeight: 'bold',
    color: '#08011e',
  },
  botao: {
    backgroundColor: '#3d13f6',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
  },
  textoBotao: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});