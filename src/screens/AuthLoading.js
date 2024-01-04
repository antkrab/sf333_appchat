import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../context/UserContext";

const AuthLoading = ({ navigation }) =>{
    const { setUsername } = useContext(UserContext);
    useEffect(() => {
        (async () => {
            const username = await AsyncStorage.getItem("username");
            if(username){
                setUsername(username);
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Chat" }],
                })
            }else{
                navigation.navigate("Home");
            }
        })();
    },[]);
    return(
        <View style={styles.container}>
            <ActivityIndicator />
        </View>
    );
};

export default AuthLoading;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: "center",
        justifyContent: "center",

    }
});