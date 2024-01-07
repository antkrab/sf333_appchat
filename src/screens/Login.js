import React, { useState, useContext} from "react";
import { StyleSheet ,Text ,View ,Button ,TextInput ,Image ,SafeAreaView , TouchableOpacity, Alert } from "react-native";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import UserContext from '../context/UserContext';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({navigation}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUsername } = useContext(UserContext);
    var isUser = false;
    const onHandleLogin = () => {
        // if (email !== "" && password !=="") {
        //     signInWithEmailAndPassword(auth, email, password)
        //      .then(() => console.log("Login success"))
        //      .catch((err) => Alert.alert("Login error", err.message));
        // }
        if (email !== "" && password !=="") {
            const q = query(collection(db,"user"));
            const userData = [];
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    userData.push({
                        ...doc.data(),
                    });
                });
                userData.forEach(myFunc);
                function  myFunc(value){
                    if(email === value.email && password === value.password){
                        setUsername(value.display_name);
                        AsyncStorage.setItem("username",value.display_name);
                        isUser = true;
                        navigation.navigate("ChatRoomsScreen");
                    }
                }
                if(!isUser){
                    alert("Login Error!");
                }
            });
            
        }
    }

    return (
        <View style={styles.container}>
            {/* <Image source={backImage} style={styles.backImage} /> */}
            <View />
                <Text style={styles.questionmark}> ? </Text>
                <Text style={styles.headerText}>The Mystery Chat</Text>
            <SafeAreaView style={styles.form}>
                
                <Text style={styles.title}></Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoFocus={true}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />

                <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
                    <Text style={{fontWeight:'bold', color:'#fff' ,fontSize:18}}>Log In</Text>
                </TouchableOpacity>
                <View style={{marginTop:20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                    <Text style={{color:'gray', fontWeight:'600', fontSize:14}}>Don't have an accout?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                        <Text style={{color: '#f57c00', fontWeight:'600', fontSize: 14}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5d2586',
        alignItems: 'center',
        
    },
    title:{
        fontSize: 36,
        fontWeight: 'bold',
        color: "red",
        alignSelf:"center",
        paddingBottom: 24,
    },
    input: {
        backgroundColor: "white",
        height: 58,
        width: '85%',
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
    },
    backImage:{
        width :'100%',
        height: 340,
        position: "absolute",
        top: 0,
        resizeMode: 'cover',
    },
    whiteSheet: {
        marginTop:220, 
        flexDirection: 'row', 
        alignItems: 'center', 
        alignSelf: 'center',
        width: '90%',
        height:'35%',
        position: "absolute",
        buttom: 0,
        backgroundColor: '#fff',
        borderRadius: 40,
    },
    form: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#f57c00',
        height: 58,
        width: '85%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    headerText: {
        fontSize: 40,
        marginTop:10, 
        flexDirection: 'row', 
        fontWeight: "bold",
        color:'#50b848',
    },
    normalText: {
        fontSize: 20,
        marginTop: 30,
        color:'white',
    },
    questionmark: {
        marginTop:50, 
        flexDirection: 'row', 
        fontSize: 80,
        fontWeight: "bold",
        color:'#50b848',
    }
})
