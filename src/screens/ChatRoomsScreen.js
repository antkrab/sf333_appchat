import React , { useContext, useState, useEffect , useRoute  }from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const chatRooms = [
  { id: 'messages', category: 'General' },
  { id: 'tech_talk', category: 'Tech Talk' },
  { id: 'game', category: 'Gaming' },
];

const ChatRoomsScreen = ({ navigation }) => {
  const sentname = (roomname) => {
    navigation.navigate('Chat', { dbname: roomname});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerText}>Chat Room</Text>
      <FlatList
        data={chatRooms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => sentname(item.id.toString())}>
            <View style={styles.roomContainer}>
              <Text style={styles.normalText}>{item.category}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5d2586',
  },
  roomContainer: {
    marginVertical:5,
    backgroundColor: '#f57c00',
    width: 350,
    height:50,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 1,
  },
  normalText: {
      fontSize: 20,
      margin: 10,
      color:'white',
      fontWeight:'bold',
    },
    headerText: {
      fontSize: 40,
      marginTop:40, 
      flexDirection: 'row', 
      fontWeight: "bold",
      marginTop: 20,
      marginBottom:20,
      color:'#50b848',
  },
});

export default ChatRoomsScreen;
