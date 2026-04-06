import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

export default function Cart() {
  const { cart } = useLocalSearchParams();
  const itens = JSON.parse(cart || '[]');

  const [horario, setHorario] = useState('12:00');

  const total = itens.reduce((acc, item) => acc + item.preco, 0);

  function finalizarPedido() {
    Alert.alert(
      'Pedido confirmado!',
      `Retirada às ${horario}\nTotal: R$ ${total.toFixed(2)}`
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Seu Pedido</Text>

      {itens.length === 0 ? (
        <Text style={styles.vazio}>Seu carrinho está vazio</Text>
      ) : (
        itens.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
          </View>
        ))
      )}

      <Text style={styles.total}>
        Total: R$ {total.toFixed(2)}
      </Text>

      <Text style={styles.subtitulo}>Horário de retirada</Text>

      <View style={styles.horarios}>
        {['12:00', '12:30', '13:00'].map((hora) => (
          <TouchableOpacity
            key={hora}
            style={[
              styles.horarioBtn,
              horario === hora && styles.horarioSelecionado,
            ]}
            onPress={() => setHorario(hora)}
          >
            <Text style={{ color: horario === hora ? '#fff' : '#08011e' }}>
              {hora}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.botao} onPress={finalizarPedido}>
        <Text style={styles.textoBotao}>Finalizar Pedido</Text>
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
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3d13f6',
    marginBottom: 20,
  },
  vazio: {
    fontSize: 16,
    color: '#08011e',
    opacity: 0.6,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#08011e',
  },
  preco: {
    fontSize: 14,
    color: '#f769b2',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#08011e',
  },
  subtitulo: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  horarios: {
    flexDirection: 'row',
    marginTop: 10,
  },
  horarioBtn: {
    padding: 10,
    backgroundColor: '#e0deff',
    borderRadius: 8,
    marginRight: 10,
  },
  horarioSelecionado: {
    backgroundColor: '#3d13f6',
  },
  botao: {
    backgroundColor: '#3d13f6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});