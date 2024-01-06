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
                    name: "ChatRoomsScreen",
                },
            ],
        });
    }
    return(
        <View style={styles.container}>
            <Text style={styles.questionmark}> ? </Text>
            <Text style={styles.headerText}>The Mystery Chat</Text>
            <Text style={styles.normalText}>Please enter your Mystery name</Text>
            <TextInput placeholder="Username" style={styles.input} onChangeText={(text) => setName(text)}/>
            <TouchableOpacity onPress={ handleSubmit } style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#5d2586',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input:{
        marginTop: 20,
        width: "90%",
        borderWidth: 1,
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 20,
        fontSize: 20,
        backgroundColor: 'white'

    },
    button: {
        marginTop: 20,
        backgroundColor: '#F98128',
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        borderRadius: 10,

    },
    buttonText: {
        color: "white",
        fontSize: 25

    },
    headerText: {
        fontSize: 40,
        fontWeight: "bold",
        marginTop: 10,
        color:'#50b848',
    },
    normalText: {
        fontSize: 20,
        marginTop: 30,
        color:'white',
    },
    questionmark: {
        fontSize: 80,
        fontWeight: "bold",
        marginTop: 10,
        color:'#50b848',
    }
  });