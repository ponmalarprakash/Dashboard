import React from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const chats = [
  {name: 'Prem', text: 'My God in heaven, you look like an angel'},
  {name: 'Pooja', text: 'Are you for real?'},
  {name: 'Prem', text: 'You have the best pics I have ever seen'},
  {name: 'Prem', text: 'Everything about you is perfect'},
  {name: 'Pooja', text: 'OMG ahaha, thank you so so much 🙌'},
  {name: 'Prem', text: 'I dont want your thank you & all'},
  {name: 'Pooja', text: 'So what do you want?'},
  {name: 'Prem', text: 'Plz just teach me how to edit pics 🙏'},
  {name: 'Pooja', text: 'Go to hell 😡'},
  {name: 'Prem', text: 'Are you there?'},
  {name: 'Prem', text: 'Did you just block me? 😅'},
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={require('./src/images/user.png')} style={styles.img} />
        {chats.map((chat, i) => (
          <Text
            key={i}
            style={[
              styles.commonChat,
              chat.name === 'Prem' ? styles.rightChat : styles.leftChat,
            ]}>
            <Text style={styles.username}>@{chat.name}: </Text>
            {chat.text}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  img: {
    width: '20%',
    height: '10%',
    alignSelf: 'flex-end',
    resizeMode: 'contain',
    tintColor: 'white',
  },
  commonChat: {
    color: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    overflow: 'hidden',
    padding: '3%',
    margin: '5%',
    fontSize: RFValue(15),
  },
  leftChat: {
    backgroundColor: '#c83660',
    alignSelf: 'flex-start',
  },
  rightChat: {
    backgroundColor: 'rebeccapurple',
    alignSelf: 'flex-end',
  },
  username: {
    fontWeight: 'bold',
  },
});
