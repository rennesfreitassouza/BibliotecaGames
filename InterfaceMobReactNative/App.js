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

//import { AppCriacao } from './AppCriacao';

class App extends Component{
  
  constructor(props){
    super(props);
    this.state = {id: '00', nome: 'TESrTE', publisher:'TESTE'};
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>

          {/* <Button
            onPress={
                
              }
              title="Enviar"
          /> */}
          <HttpGet/>
          <Text>aaaaaaaa: {this.state.nome}</Text>

          <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
              <AppCriacao id="id" nome="nome" editora="editora"/>
                
          </ScrollView>
          
        </SafeAreaView>
      </>
    );
  }
}

  class HttpGet extends Component {
    state = {
      nome: ''
   }
    
    componentDidMount = () => {
      fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'GET'
        
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
            nome: responseJson
        })
      })
      .catch((error) => {
        console.error(error);
      });
    //    this.setState({id: "responseJson.GAMES_ID", nome: "responseJson.NAME", publisher: "responseJson.PUBLISHER"})    
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     this.setState({id: "responseJson.GAMES_ID", nome: "responseJson.NAME", publisher: "responseJson.PUBLISHER"})
    //   })
    //  .catch ((error) => {
    //    console.error(error);
    //  });
    }

    render() {
      return (
         <View>
            <Text>
               mmm{this.state.nome.body}
            </Text>
         </View>
      )
   }
  }
 

class AppCriacao extends Component { 
  render(props) {
    return (
      <View style={StyleSheet.container}>
          <View style={styles.entradas}>
              <TextInput placeholder={this.props.id} keyboardType={"numeric"} style={styles.input}  onChangeText={id => this.setState({id: id})} />
              <TextInput placeholder={this.props.nome} keyboardType={"default"} style={styles.input} onChangeText={nome => this.setState({nome: nome})} />
              <TextInput placeholder={this.props.editora} keyboardType={"defaut"} style={styles.input} onChangeText={publisher => this.setState({publisher: publisher})} />
              
          </View>

          
          
      </View>
    );
  }


}


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  entradas: {
    flexDirection: 'row',
  },
  input: {
        height: 80,
        textAlign: "center",
        width: "33.3%",
        fontSize: 15,
        marginTop: 24,
  },
  button: {
    backgroundColor: "gray"
  },
  buttonText:{
    alignSelf: 'center',
    padding: 30,
    fontSize: 20,
    color: 'lightgray',
    fontWeight: 'bold',
  }

});

export default App;