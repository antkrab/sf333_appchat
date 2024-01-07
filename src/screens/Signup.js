import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { TextInput } from 'react-native-gesture-handler';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const onHandleSigup = async () => {
        if (email !== "" && password !== ""){
            await addDoc(collection(db,"user"),{
                display_name: username,
                email: email,
                password: password,
            })
            
            await createUserWithEmailAndPassword(auth,email,password).then(() => navigation.navigate("Login") ).catch((err) => alert(err))
            
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.questionmark}> ? </Text>
            <Text style={styles.headerText}>The Mystery Chat</Text>
            <TextInput placeholder="Username" style={styles.input} onChangeText={(text) => setUsername(text)}/>
            <TextInput placeholder='Enter Email' style={styles.input} autoCapitalize='none' keyboardType='email-address' textContentType='emailAddress' autoFocus = {true} value={email} onChangeText={(text) => setEmail(text)} />
            <TextInput placeholder='Enter password' style={styles.input} autoCapitalize='none' autoCorrect={false} secureTextEntry={true} textContentType='password' value={password} onChangeText={(text) => setPassword(text)} />

            <TouchableOpacity style={styles.button} onPress={onHandleSigup}>
                    <Text style={{fontWeight:'bold', color:'#fff' ,fontSize:18}}>Log In</Text>
                </TouchableOpacity>
                <View style={{marginTop:20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                    <Text style={{color:'gray', fontWeight:'600', fontSize:14}}>Don't have an accout?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                        <Text style={{color: '#f57c00', fontWeight:'600', fontSize: 14}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
        </View>
    )
};

export default Signup;

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
        backgroundColor: "#fff",
        height: 58,
        width: '85%',
        marginTop:10,
        marginBottom: 10,
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
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    button: {
        backgroundColor: '#f57c00',
        height: 58,
        width:'85%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    headerText: {
        fontSize: 40,
        marginTop:10, 
        marginBottom:10,
        fontWeight: "bold",
        color:'#50b848',
    },
    normalText: {
        fontSize: 20,
        marginTop: 30,
        color:'white',
    },
    questionmark: {
        marginTop:30, 
        flexDirection: 'row', 
        fontSize: 80,
        fontWeight: "bold",
        color:'#50b848',
    }

});

