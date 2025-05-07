import { Alert, Linking, StyleSheet, View } from 'react-native';
import HighlightedText, { Highlight } from 'react-native-highlighter';

export default function App() {
  const mainKeywords = new Highlight({
    keywords: ['react native', 'javascript'],
    style: { color: '#6C00FF', fontWeight: 'bold' },
    onPress: (keyword) => Alert.alert(`Has interactuado con: ${keyword}`),
  });

  const extraMarkers = new Highlight({
    keywords: ["user interface", "highlight", "palabras clave"],
    style: { backgroundColor: '#F7DB6A' },
    onPress: (keyword) => Alert.alert(`Has interactuado con: ${keyword}`),
  });

  return (
    <View style={styles.container}>
        <View style={styles.card}>
            <HighlightedText
            highlights={[mainKeywords, extraMarkers]}
            caseSensitive={false}
            hashtags={true}
            hashtagStyle={styles.hashtagStyle}
            mentions={true}
            mentionStyle={styles.mentionStyle}
            onMentionPress={(mention) =>
                Linking.openURL(`https://twitter.com/${mention.replace('@', '')}`)
            }
            emails={true}
            emailStyle={styles.emailStyle}
            onEmailPress={(email) => Linking.openURL(`mailto:${email}`)}
            links={true}
            onLinkPress={(url) => Linking.openURL(url)}
            >
            React Native combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces.
            Use a little—or a lot. You can use React Native today in your existing Android and iOS projects or you can create a whole new app from scratch.
            For more please visit https://reactnative.dev or read latest posts from @reactnative.

            #react #reactnative #javascript
            </HighlightedText>
        </View>
        <View style={styles.card}>
            <HighlightedText
                highlights={[mainKeywords, extraMarkers]}
                caseSensitive={false}
                hashtags={true}
                hashtagStyle={styles.hashtagStyle}
            >
                Con esta librería podrás resaltar palabras clave en un texto y hacer que se puedan presionar.

                #react #reactnative #javascript #librerías
            </HighlightedText>
        </View>
        <View style={styles.card}>
            <HighlightedText
                highlights={[mainKeywords, extraMarkers]}
                caseSensitive={false}
                hashtags={true}
                hashtagStyle={styles.hashtagStyle}
                mentions={true}
                mentionStyle={styles.mentionStyle}
                onMentionPress={(mention) =>
                    Linking.openURL(`https://twitter.com/${mention.replace('@', '')}`)
                }
            >
                Si te gusta este proyecto puedes seguirme en Twitter @gartner_leandro

                #react #reactnative #javascript #librerías
            </HighlightedText>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingTop: 100,
        paddingHorizontal: 10,
        alignItems: "center",
        gap: 20,
    },
    card: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    hashtagStyle: { color: '#F54291' },
    mentionStyle: { color: '#379237', fontWeight: 'bold' },
    emailStyle: { color: '#FF6D28', fontWeight: 'bold' },
});