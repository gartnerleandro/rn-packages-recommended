import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const libraries = [
  {
    name: "react-native-bottom-sheet",
    url: "/(content)/(examples)/bottom-sheet",
  },
  {
    name: "expo-router-bottom-sheet",
    url: "/(content)/(examples)/bottom-sheet-expo-router",
  }
]

const LibraryItem = ({ name, url }: { name: string, url: string }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(url as any)}
      style={styles.item}
    >
      <Text>{name}</Text>
    </TouchableOpacity>
  )
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <FlatList
        data={libraries}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => <LibraryItem name={item.name} url={item.url} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    gap: 8,
  },
  item: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
});
