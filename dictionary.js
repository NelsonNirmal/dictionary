import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import axios from 'axios';


export default function Dict() {
  const [word, setWord] = useState('hi');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [sound, setSound] = useState(null);

  const searchWord = async () => {
    if (!word) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      setData(response.data[0]);
    } catch (error) {
      alert('Word not found');
      setData(null);
    }
    setLoading(false);
  };

 
  async function playSound(url) {
    const { sound } = await Audio.Sound.createAsync({ uri: url });
    setSound(sound);
    await sound.playAsync();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dictionary</Text>


      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a word..."
          value={word}
          onChangeText={setWord}
        />
        <Button title="Search" onPress={searchWord} />
      </View>


      {loading && <ActivityIndicator size="large" color="#000" />}


      {data && !loading && (
        <ScrollView style={styles.resultContainer}>
          <Card tyle={styles.card}>
            <Text style={styles.wordTitle}>{data.word}</Text>
            <Text style={styles.phonetic}>{data.phonetic}</Text>

            
           

            {data.meanings.map((meaning, index) => (
              <View key={index} style={styles.meaningContainer}>
                <Text style={styles.partOfSpeech}>{meaning.partOfSpeech}</Text>
                {meaning.definitions.map((definition, defIndex) => (
                  <Text key={defIndex} style={styles.definition}>
                    {defIndex + 1}. {definition.definition}
                  </Text>
                ))}
              </View>
            ))}


            <Text style={styles.source}>
              Source: <Text style={styles.link}>{data.sourceUrls[0]}</Text>
            </Text>
            <Text style={styles.license}>License: {data.license.name}</Text>
          </Card>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0F4C81', 
    borderRadius: 20, 
    marginTop:20,
  },
  card:{
    borderRadius: 20, 
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFFFFF', 
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#1E6BA8', 
    padding: 10,
  },
  input: {
    borderColor: '#A8DADC',
    borderWidth: 1,
    padding: 10,
    flex: 1,
    marginRight: 10,
    borderRadius: 10, 
    color: '#FFFFFF',
    backgroundColor: '#0A2749', 
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#123A59',
    borderRadius:20,
  },
  wordTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black', 
  },
  phonetic: {
    fontSize: 18,
    color: 'black', 
  },
  phoneticContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    
  },
  meaningContainer: {
    marginTop: 20,

  },
  partOfSpeech: {
    fontStyle: 'italic',
    fontSize: 18,
    color: 'black', // Text color changed to white
  },
  definition: {
    fontSize: 16,
    marginTop: 5,
    color: 'black', // Text color changed to white
  },
  source: {
    marginTop: 20,
    color: 'black', // Text color changed to white
  },
  link: {
    color: '#1e90ff', // Link color adjusted to a vibrant blue
  },
  license: {
    marginTop: 5,
    color: 'black', // Lighter text color for less emphasis
  },
});
