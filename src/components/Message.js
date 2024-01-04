import { StyleSheet, Text, TextBase, View } from 'react-native';
import React, { useContext, useState } from 'react';

const Message = ({user ,content, timestamp,right}) => {
    return(
        <View 
            style = {[styles.messageContainer, right ? styles.rightMessage : styles.leftMessage]}>
                { !right && <Text style={styles.username}> {user} </Text> }
                <Text style={styles.content}>{content}</Text>
                <Text style={styles.timestamp}>{timestamp}</Text>
        </View>
    );
};

export default Message;

const styles =StyleSheet.create({
    messageContainer:{
        width: "60%",
        marginVertical: 10,
        marginHorizontal: 5,
        borderRadius: 10,
        padding: 10,

    },
    rightMessage:{
        alignSelf: "flex-end",
        backgroundColor: "lightblue",
    },
    leftMessage:{
        backgroundColor: "#ccc",
    },
    timestamp:{
        textAlign: "right",
    },
});