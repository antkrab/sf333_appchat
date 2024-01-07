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
        <View>
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

});