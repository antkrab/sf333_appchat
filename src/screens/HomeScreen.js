import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import UserContext from '../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
    const { setUsername } = useContext(UserContext);
    const [name, setName] = useState("");

    const handleSubmit = async () => {
        setUsername(name);
        await AsyncStorage.setItem("username",name);
        navigation.reset({
            index: 0,
            routes: [
                {
                    name: "Chat",
                },
            ],
        });
    }
    return(
        <View style={styles.container}>
            <TextInput placeholder="Username" style={styles.input} onChangeText={(text) => setName(text)}/>
            <TouchableOpacity onPress={ handleSubmit } style={styles.button}>
                <Text style={styles.buttonText}>submit</Text>
            </TouchableOpacity>
        </View>
    )
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input:{
        width: "90%",
        borderWidth: 1,
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 20,
        fontSize: 20,

    },
    button: {
        marginTop: 20,
        backgroundColor: "lightblue",
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        borderRadius: 10,

    },
    buttonText: {
        color: "white",

    },
  });