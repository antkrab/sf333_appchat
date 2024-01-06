import React , { useContext, useState, useEffect , useRoute  }from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ChatRoom from '../context/ChatRoom';
import AsyncStorage from '@react-native-async-storage/async-storage';

// สร้างข้อมูลแบบตัวอย่างของห้องแชทแยกหมวดหมู่
const chatRooms = [
  { id: 1, category: 'General' },
  { id: 2, category: 'Tech Talk' },
  { id: 3, category: 'Gaming' },
  // เพิ่มหมวดหมู่เพิ่มเติมตามที่ต้องการ
];

const ChatRoomsScreen = ({ navigation }) => {

  const { setChatRoom } = useContext(ChatRoom);
  const [roomNameChat, setRoomname] = useState("");

  const enterChatRoom = async (roomname) => {
    // setRoomname(roomname);
    // ทำการนำผู้ใช้ไปยังห้องแชทที่เลือก
    // ในที่นี้เราจะให้ไปยังหน้าแชทของหมวดหมู่นั้นๆ
    navigation.navigate('Chat', { dbname: roomname });
    // setChatRoom(roomname);
    // await AsyncStorage.setItem("chatroom",roomname);
    console.log(roomname);
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
          <TouchableOpacity onPress={() => enterChatRoom('game')}>
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
