import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, Button, SafeAreaView, Alert } from 'react-native';
import ParticipantInput from './components/ParticipantInput';
import ParticipantList from './components/ParticipantList';

export default function App() {
  const [listaParticipantes, setListaParticipantes] = useState([]);
  const [ganadorRifa, setGanadorRifa] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [girando, setGirando] = useState(false);

  const agregarNombre = (nombre) => {
    setListaParticipantes([...listaParticipantes, nombre]);
  };

  const eliminarParticipante = (indice) => {
    const nuevaLista = listaParticipantes.filter((_, i) => i !== indice);
    setListaParticipantes(nuevaLista);
    if (ganadorRifa === listaParticipantes[indice]) setGanadorRifa(null);
  };

  const editarParticipante = (indice) => {
    // Nota: En un proyecto real usarías otro Modal, aquí usamos un Alert para rapidez
    Alert.prompt(
      "Editar Nombre",
      "Introduce el nuevo nombre:",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Guardar", 
          onPress: (nuevoNombre) => {
            if (nuevoNombre) {
              const copiaLista = [...listaParticipantes];
              copiaLista[indice] = nuevoNombre;
              setListaParticipantes(copiaLista);
            }
          } 
        }
      ],
      "plain-text",
      listaParticipantes[indice]
    );
  };

  const iniciarSorteo = () => {
    if (listaParticipantes.length < 2) return alert("Mínimo 2 personas");
    
    setGirando(true);
    let contador = 0;
    const interval = setInterval(() => {
      setGanadorRifa(listaParticipantes[Math.floor(Math.random() * listaParticipantes.length)]);
      if (++contador > 15) {
        clearInterval(interval);
        setGirando(false);
        setMostrarModal(true);
      }
    }, 100);
  };

  return (
    <SafeAreaView style={styles.pantalla}>
      <Text style={styles.titulo}>rifasDPS01L 🎟️</Text>
      
      <ParticipantInput alAgregarParticipante={agregarNombre} />
      
      <ParticipantList 
        participantes={listaParticipantes}
        ganador={ganadorRifa}
        alSeleccionarGanador={iniciarSorteo}
        alReiniciar={() => { setListaParticipantes([]); setGanadorRifa(null); }}
        alEliminar={eliminarParticipante}
        alEditar={editarParticipante}
      />

      <Modal visible={mostrarModal} transparent animationType="slide">
        <View style={styles.modalFondo}>
          <View style={styles.modalContenido}>
            <Text>¡Ganador Seleccionado!</Text>
            <Text style={styles.nombre}>{ganadorRifa}</Text>
            <Button title="Cerrar" onPress={() => setMostrarModal(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, padding: 20, backgroundColor: '#f0f2f5' },
  titulo: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  modalFondo: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContenido: { backgroundColor: '#fff', padding: 40, borderRadius: 15, alignItems: 'center' },
  nombre: { fontSize: 30, fontWeight: 'bold', marginVertical: 15, color: '#4CAF50' }
});