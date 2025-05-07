import { useRouter } from 'expo-router';
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const libraries = [
  {
    name: "react-native-bottom-sheet",
    url: "/(content)/(examples)/bottom-sheet",
    image: require('../../assets/images/Screenshot-react-native-bottom-sheet.png')
  },
  {
    name: "expo-router-bottom-sheet",
    url: "/(content)/(examples)/bottom-sheet-expo-router",
    image: require('../../assets/images/Screenshot-expo-router.png')
  },
  {
    name: "lottie-react-native",
    url: "/(content)/(examples)/lottie-react-native",
    image: require('../../assets/images/Screenshot-lottie.png')
  },
  {
    name: "react-native-toast-message",
    url: "/(content)/(examples)/toast-message",
    image: require('../../assets/images/Screenshot-toast.png')
  },
  {
    name: "react-native-highlighter",
    url: "/(content)/(examples)/react-native-highlighter",
    image: require('../../assets/images/Screenshot-highlighter.png')
  },
  {
    name: "react-native-calendars",
    url: "/(content)/(examples)/react-native-calendars",
    image: require('../../assets/images/Screenshot-calendar.png')
  }
]

const LibraryItem = ({ name, url, image }: { name: string, url: string, image: any }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(url as any)}
      style={styles.item}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>Ver ejemplo</Text>
      </View>
    </TouchableOpacity>
  )
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Paquetes Recomendados</Text>
        <Text style={styles.headerSubtitle}>React Native + Expo</Text>
      </View>
      <FlatList
        data={libraries}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
          <LibraryItem 
            name={item.name} 
            url={item.url} 
            image={item.image}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  contentContainer: {
    paddingVertical: 16,
    gap: 24,
    paddingBottom: 32,
  },
  item: {
    marginHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 8,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
  },
});
