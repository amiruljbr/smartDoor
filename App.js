import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firebase from 'firebase';


export default function App() {
  const [isOpen, setisOpen] = useState(false);
  const mati = () => {
    var newPostKey = firebase.database().ref().child('histories').push().key;
    var updates = {};
    setisOpen(true);
    updates['/histories/' + newPostKey] = new Date();
    firebase.database().ref().update(updates);


    firebase.database().ref('histories/').push({
      datetime: new Date()
    })
      .then((data) => {
        //success callback
        console.log('data ', data, new Date())
      }).catch((error) => {
        //error callback
        console.log('error ', error)
      });
    firebase.database().ref('data/').set(
      1, (err) => {
        setTimeout(() => {
          firebase.database().ref('data/').set(
            0
          );


          setisOpen(false);
        },5000)
      }
    );
  }




  return (
    <View style={styles.container}>

      {/* <Button title="Open" onPress={mati}
      disabled={isOpen} /> */}
      {isOpen? <Button title="Open" onPress={mati}
      disabled={true} /> : <Button title="Open" onPress={mati}
      disabled={false } />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



const firebaseConfig = {
  apiKey: "AIzaSyAcS-HA98lrib11VdRHj0uTdBe5PdAiJeU",
  authDomain: "ng-complete-guide-d628c.firebaseapp.com",
  databaseURL: "https://ng-complete-guide-d628c.firebaseio.com",
  projectId: "ng-complete-guide-d628c",
  storageBucket: "ng-complete-guide-d628c.appspot.com",
  messagingSenderId: "576075912682",
  appId: "1:576075912682:web:4cb84739a8813b14618e93"
};

firebase.initializeApp(firebaseConfig);