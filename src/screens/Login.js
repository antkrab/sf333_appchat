import React, { useSate} from "react";
import { StyleSheet ,Text ,View ,Button ,TextInput ,Image ,SafeAreaView , TouchableOpacity, Alert } from "react-native";
import {signInWithEmailEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";
const backImage = require("../assets/icon.png");

export default function Login({navigation}) {

    const [email, setEmail] = useSate("");
    const [password, setPassword] = useState("");

    const onHandleLogin = () => {
        if (email !== "" && password !=="") {
            signInWithEmailEmailAndPassword(auth, email, password)
             .then(() => console.log("Login success"))
             .catch((err) => Alert.alert("Login error", err.message));
        }
    }

    return (
        <View style={styles.container}>
            <Image source={backImage} style={styles.backImage} />
            <View style={styles.whiteSheet}/>
            <SafeAreaView style={styles.form}>
                <Text style={styles.title}></Text>
                <TextInput
                    style={styles.input}
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title:{
        fontSize: 36,
        fontWeight: 'bold',
        color: "red",
        alignSelf:"center",
        paddingBottom: 24,
    },
    input: {
        backgroundColor: "#1111",
        height: 58,
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
        width: '100%',
        height:'75%',
        position: 'absolute',
        buttom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 60,
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    button: {
        backgroundColor: '#f57c00',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    }
})
