import { StyleSheet, Text, View,TextInput ,FlatList, Keyboard, ActivityIndicator } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Message from '../components/Message';
import UserContext from '../context/UserContext';
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime)

const ChatScreen = ({navigation}) =>{

    const { username } = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    
    useEffect(() =>{
        
        const q = query(collection(db,"messages"), orderBy("timestamp","asc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const newMessages = [];
            querySnapshot.forEach((doc) => {
                newMessages.push({
                    id: doc.id,
                    ...doc.data(),
                    timestamp: doc.data().timestamp ? dayjs(doc.data().timestamp.toDate()).fromNow() : dayjs(new Date()).fromNow(),
                });
            });
            setMessages(newMessages);
        });
        return unsubscribe;
    },[]);

    const sendMessage = async () => {
        await addDoc(collection(db,"messages"),{
            user: username,
            content: message,
            timestamp: serverTimestamp(),
        })
        setMessage("");
        Keyboard.dismiss();
        

    };
    const returnToHome = async () => {
        await AsyncStorage.removeItem("username");
        navigation.reset({
            index: 0,
            routes: [
                {
                    name: "Home",
                },
            ],
        });
    }
    return(
        <View style = {styles.container}>
          
            <FlatList data={messages} renderItem={({ item }) => <Message {...item} right={username === item.user} />} keyExtractor={(item) => item.id}  />
            
            <View style = {styles.bottomInput} >
                <TextInput placeholder = "Write a message" style={styles.input} onChangeText={(text) => setMessage(text)}/>
                <TouchableOpacity style = {styles.btnSend} onPress={ sendMessage }>
                    <MaterialCommunityIcons name = "send" color = {"white"} size={25}/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.btnLogout} onPress={ returnToHome }><Text>Logout</Text></TouchableOpacity>
        </View>
    )
}
export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    bottomInput: {
        width: "100%",
        height: 50,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        marginVertical: 5,

    },
    input: {
        width: "80%",
        borderWidth: 1,
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 20,
        fontSize: 20,
        
    },
    btnSend:{
        height: 45,
        width: 60,
        flex: 0,
        backgroundColor: "cyan",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    btnLogout:{
        width: "100%",
        height: 35,
        backgroundColor:"red",
        alignSelf:'center',
        alignItems: "center",
        justifyContent: "center",
    },
  });