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
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <FlatList
        data={chatRooms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => sentname(item.id.toString())}>
            <View style={styles.roomContainer}>
              <Text>{item.category}</Text>
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
  },
  roomContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 1,
  },
});

export default ChatRoomsScreen;
