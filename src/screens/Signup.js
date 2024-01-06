import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { TextInput } from 'react-native-gesture-handler';

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onHandleSigup = () => {
        if (email !== "" && password !== ""){
            createUserWithEmailAndPassword(auth,email,password).then(() => console.log("Signup is success")) .catch((err) => alert("Error"))

        }
    };
    return (
        <View>
            <TextInput placeholder='Enter Email' style={styles.input} autoCapitalize='none' keyboardType='email-address' textContentType='emailAddress' autoFocus = {true} value={email} onChangeText={(text) => setEmail(text)} />
            <TextInput placeholder='Enter password' style={styles.input} autoCapitalize='none' autoCorrect={false} secureTextEntry={true} textContentType='password' value={password} onChangeText={(text) => setPassword(text)} />
        </View>
    )
};

export default Signup;

const styles = StyleSheet.create({

});