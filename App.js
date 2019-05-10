/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as firebase from 'firebase';
import { NativeRouter, Route, Switch } from 'react-router-native';
import {firebaseConfig} from './config';

firebase.initializeApp(firebaseConfig);

class UserInfo extends Component {
  render() {
    return <View>
      <Button title="Go back" onPress={() => this.props.history.push('/')}/>
      <Text>User Private infos</Text>
      <Text>User Private infos</Text>
      <Text>User Private infos</Text>
      <Text>User Private infos</Text>
      <Text>User Private infos</Text>
      <Text>User Private infos</Text>
    </View>
  }
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  signUpUser = (email, password) => {
    try {
      if (password.length < 6) {
        alert("Please enter a password of at least 6 characters");
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password)
    }
    catch (error) {
      alert('error email or password inco')
      // console.log(error)
    }
  }

  logInUser = (email, password) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password).then(user => { if (user) { console.log(user); alert('Welcome !'); this.props.history.push('/user') } else alert('email or password incorrect') })
    }
    catch (error) {
      console.log(error)
    }

  }
  render() {
    return <View>
      <TextInput placeholder="Your Email ..." value={this.state.email} onChangeText={(email) => this.setState({ email })} style={{ borderColor: 'black', borderWidth: 2, width: 300, margin: 5 }} />
      <TextInput placeholder="your password ..." value={this.state.password} onChangeText={(password) => this.setState({ password })} secureTextEntry style={{ borderColor: 'black', borderWidth: 2, width: 300, margin: 5 }} />
      <Button title="Log in" onPress={() => this.logInUser(this.state.email, this.state.password)} />
      <Button title="Sign up" color="green" onPress={() => this.signUpUser(this.state.email, this.state.password)} />

    </View>
  }
}

export default class App extends Component {
  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <Switch>
          <Route exact path='/' component={Form} />
          <Route exact path="/user" component={UserInfo} /> 
          </Switch>
        </View>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
