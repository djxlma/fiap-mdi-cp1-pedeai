import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Status() {
  const { total, horario } = useLocalSearchParams();

  const [tempo, setTempo] = useState(20);
  const [status, setStatus] = useState('Pedido recebido');

  // ⏱️ contador
  useEffect(() => {
    const interval = setInterval(() => {
      setTempo((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 🔄 mudança de status
  useEffect(() => {
    if (tempo > 15) {
      setStatus('Pedido recebido');
    } else if (tempo > 5) {
      setStatus('Preparando...');
    } else if (tempo > 0) {
      setStatus('Quase pronto...');
    } else {
      setStatus('Pronto para retirada!');
    }
  }, [tempo]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Status do Pedido</Text>

      <View style={styles.card}>
        <Text style={styles.info}>Horário: {horario}</Text>
        <Text style={styles.info}>Total: R$ {Number(total).toFixed(2)}</Text>

        <Text style={styles.status}>Status: {status}</Text>
        <Text style={styles.tempo}>Tempo estimado: {tempo}s</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f5ff',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3d13f6',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    color: '#08011e',
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#f769b2',
  },
  tempo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#3d13f6',
  },
});