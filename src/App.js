import React, {useState, useEffect} from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "./services/api";

export default function App() {

  const [repositories, setRepositories] = useState([]);

  async function handleLikeRepository(id) {
    try {
      const res = await api.post(`repositories/${id}/like`);
      const data = repositories.map(repo => {
        if(repo.id === id){
          repo = res.data
        }
        return repo;
      })
      setRepositories(data); 
    } catch (error) {
      return;
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("repositories");
        setRepositories(res.data); 
      } catch (error) {
        return;
      }
    })();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        {repositories.length > 0 && repositories.map(repo => (
          <View key={repo.id} style={styles.repositoryContainer}>
          <Text style={styles.repository}>{repo.title}</Text>

          <View style={styles.techsContainer}>
            {repo.techs.map(tech => (
              <Text key={tech} style={styles.tech}>
                {tech}
              </Text>
            ))}
          </View>

          <View style={styles.likesContainer}>
            <Text
              style={styles.likeText}
              // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
              testID={`repository-likes-${repo.id}`}
            >
              {`${repo.likes} ${repo.likes === 1 ? "curtida" : "curtidas"}`}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(repo.id)}
            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
            testID={`like-button-${repo.id}`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
        </View>
        ))}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
