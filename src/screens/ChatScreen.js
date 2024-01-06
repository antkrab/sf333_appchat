import { StyleSheet, Text, View,TextInput ,FlatList, Keyboard, ActivityIndicator , Image } from 'react-native';
import React, { useContext, useState, useEffect , useRoute } from 'react';
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

const ChatScreen = ({ navigation , route }) => {

    const { username } = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    let dbname = route.params?.dbname || 'game';
    

    
    useEffect(() =>{
        const q = query(collection(db,dbname), orderBy("timestamp","asc"));
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
        await addDoc(collection(db,dbname),{
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
    const userImages = {};
    function getRandomImage(username) {
        if (!userImages[username]) {
          const images = [
            'https://preview.redd.it/an871k4o1sn51.png?width=440&format=png&auto=webp&s=85dcd6cb73b8760802e254ee14dfa3c7ab444591',
            'https://preview.redd.it/iio3xm4o1sn51.png?width=440&format=png&auto=webp&s=2b9fb1b29396502998feda5c6ed2ed75919c6ad8',
            'https://preview.redd.it/ppawzo4o1sn51.png?width=440&format=png&auto=webp&s=d09c261013546996e8325d507ff230a7e9513793',
            'https://i.redd.it/9kvk25sh2sn51.png',
            'https://i.redd.it/xyqo6hx42sn51.png',
            'https://preview.redd.it/xprpkp063sn51.png?width=440&format=png&auto=webp&s=5d51eb262af4a50e8f935218feb52682540aa525',
            'https://i.redd.it/0j244l4o1sn51.png',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIUEpl0o8y889_4k8SF0GXNUsMlmxUHgbaEBEicyQt0vFxYBbTeVl23XlBzocxrMr_Jcs&usqp=CAU',
            // เพิ่ม รูป
          ];
          const randomIndex = Math.floor(Math.random() * images.length);
          userImages[username] = images[randomIndex];
        }
        return userImages[username];
    }
    return(
        <View style = {styles.container}>
            <FlatList 
                data={messages} 
                renderItem={({ item }) => (
                    <Message
                        {...item} 
                        right={username === item.user} 
                        image={getRandomImage(item.user)}
                        // image = 'https://logos-world.net/wp-content/uploads/2021/08/Among-Us-Logo.png'
                    />
                )} 
                keyExtractor={(item) => item.id}  
            />
            
            <View style = {styles.bottomInput} >
                <TextInput placeholder = "Write a message" style={styles.input} onChangeText={(text) => setMessage(text)}/>
                <TouchableOpacity style = {styles.btnSend} onPress={ sendMessage }>
                    <MaterialCommunityIcons name = "send" color = {"#fff"} size={25}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnLogout} onPress={ returnToHome }><Text>Exit</Text></TouchableOpacity>
            </View>
            
        </View>
    )
}
export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#5d2586"
    },
    bottomInput: {
        width: "100%",
        height: 50,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#5d2586",
        marginVertical: 5,

    },
    input: {
        width: "70%",
        borderWidth: 1,
        height: 45,
        borderRadius: 10,
        paddingHorizontal: 20,
        fontSize: 20,
        backgroundColor: "white"
        
    },
    btnSend:{
        height: 45,
        width: 50,
        flex: 0,
        backgroundColor: "#50b848",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginLeft: 5,
    },
    btnLogout:{
        height: 45,
        width: 50,
        fontSize: 20,
        backgroundColor:"red",
        alignSelf:'center',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginLeft: 5,
    },
  });