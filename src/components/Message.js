import { StyleSheet, Text, TextBase, View , Image } from 'react-native';
import React, { useContext, useState } from 'react';


const Message1 = ({ user, content, timestamp, right, image }) => {
    return (
        <View style={[styles.messageContainer, right ? styles.rightMessage : styles.leftMessage]}>
        {!right && (
          <View style={styles.userInfo}>
            {image ? (
              <Image source={{uri: 'https://reactjs.org/logo-og.png'}} style={styles.userImage} />
            ) : (
              <View style={styles.defaultUserImage}></View>
            )}
            <Text style={styles.username}> {user} </Text>
          </View>
        )}
        <Text style={styles.content}>{content}</Text>
        <Text style={[styles.timestamp, right && styles.rightTimestamp]}>{timestamp}</Text>
      </View>
    );
  };

  const Message = ({ user, content, timestamp, right, image }) => {
    return (
        <View style={[styles.messageContainer, right ? styles.rightMessage : styles.leftMessage]}>
        {!right && (
          <View style={styles.userInfo}>
            <Image source={{uri: image }} style={styles.userImage} />
            <Text style={styles.username}> {user} </Text>
          </View>
        )}
        <Text style={styles.content}>{content}</Text>
        <Text style={[styles.timestamp, right && styles.rightTimestamp]}>{timestamp}</Text>
      </View>
    );
  };

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
    timestamp: {
        textAlign: 'right',
        fontSize: 12,
        color: 'grey',
    },
    rightTimestamp: {
        alignSelf: 'flex-end',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    username: {
        fontWeight: 'bold',
        marginLeft: 5,
    },
    userImage: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    defaultUserImage: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'white',
      },
    content: {},
    
});

export default Message;