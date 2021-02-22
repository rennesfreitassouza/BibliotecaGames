import React, { Component } from 'react';

import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text, 
    TextInput,
    View
  } from 'react-native';

import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';

import styles from './styles';


class HttpGet extends Component {

    constructor(props){
      super(props);
      this.state = {GAMES_ID: 0, NAME: "null", PUBLISHER: "null"};
      this.arrayJ = [];
      this.strNAME = "";
      this.arrayBuscaPorGAMENAME = [];
    }

    render() {
      const nome = this.state.NAME;
      return (
        <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
              <View>
                {this.renderTabelaGames(this.arrayJ)}

              </View>
                
              <View style={StyleSheet.container}>
                <View style={styles.entradas}>
                  <TextInput 
                    style={styles.input} 
                    placeholder="Insira texto aqui para busca por nome do Game" 
                    keyboardType={"default"} 
                    onSubmitEditing={
                      ({nativeEvent}) => {
                        this.setstrNAME({nativeEvent});
                        this.httpGAMEGetRequest(this.strNAME);
                      }
                    }
                    multiline={false} 

                  />
                  
                </View>
                {this.renderTabelaGames(this.arrayBuscaPorGAMENAME)}
              </View>
                      
            </ScrollView>
          </SafeAreaView>
        </>
      )
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState !== this.state) {
        console.log('state state has changed.')
      }
    }
    
    
    componentDidMount = () => {
      fetch('http://10.0.2.2:3000/select/?opcaoSelect=GAMES&daTabelaEmQue=', {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        for (let responseJ in responseJson){
          console.log("GAME DO LAÇO FOR: "+responseJson[responseJ].NAME);
          this.addArrayJ(responseJson[responseJ]);
        }
        this.setState(this.arrayJ);
      })
      .catch((error) => {
        console.error(error);
      });
    }

    httpGAMEGetRequest (valorName) {
      console.log("Parametro entrada httpGAMEGetRequest: "+valorName);
      fetch('http://10.0.2.2:3000/select/?opcaoSelect=GAMES&daTabelaEmQue='+valorName, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.arrayJ = []; //Após a primeira renderização, a array com todos os valores retornados recebe um array vazio para nada ser renderizado novamente.
        for (let responseJ in responseJson){ //Valor UNIQUE para NAME, evitar FOR loop (ou pensar "valor vazio lista tudo")
          console.log("GAME DO LAÇO FOR: "+responseJson[responseJ].NAME);
          this.addObjetosBusca(responseJson[responseJ]);
        }
        this.setState(this.arrayBuscaPorGAMENAME);  
      })
      .catch((error) => {
        console.error(error);
      });
    }

    setstrNAME(nativeEv){
      this.strNAME = nativeEv.nativeEvent.text; //{"nativeEvent": {"target": 13, "text": "Paciencia"}}
      console.log(this.strNAME);
    }

    addObjetosBusca(arrayBuscaPorGAMENAME){
      this.arrayBuscaPorGAMENAME.push(arrayBuscaPorGAMENAME);
    }

    addArrayJ(elem)
    {
      console.log("push method addArrayJ: "+elem.NAME);
      this.arrayJ.push(elem);
    }

    renderTabelaGames(array) {
      

      return array.map((objeto, index) => {
        const key = index;
        this.arrayBuscaPorGAMENAME = [];
        return (
          <View>
            <Text key={key+4}>Dados recuperados da tabela Games:</Text>
            <Text key={key+1}>ID: {objeto.GAMES_ID}</Text>
            <Text key={key+2}>Nome: {objeto.NAME}</Text>
            <Text key={key+3}>Editora: {objeto.PUBLISHER}</Text>
          </View>
        );
      });
    }
}
  


export default HttpGet;