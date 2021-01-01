import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  FlatList,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  const handleAddRepository = useCallback(async () => {
    try {
      const {data} = await api.post('repositories', {
        title: `New project ${Date.now()}`,
        url: 'https://github.com/fernando-meira',
        techs: ['Node', 'Express', 'TypeScript'],
      });

      const newRepository = data;

      setRepositories([...repositories, newRepository]);
    } catch (error) {
      console.log(error);
    }
  }, [repositories]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={(repository) => repository.id}
          renderItem={({item: repository}) => (
            <Text style={styles.title}>{repository.title}</Text>
          )}
        />

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={handleAddRepository}>
          <Text style={styles.textButton}>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    margin: 20,
    padding: 20,
    borderRadius: 4,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  textButton: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
