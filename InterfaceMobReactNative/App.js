import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import HttpGet from './HttpGet';

//import { AppCriacao } from './AppCriacao';

class App extends Component{

  render() {
    return (//
      <>
          {/* <Button
            onPress={
                <HttpGet/>
              }
              title="Games"
          /> */}
          <HttpGet/>
      </>
    );
  }
}

export default App;