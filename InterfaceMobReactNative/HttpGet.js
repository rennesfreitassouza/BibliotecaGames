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
      this.strParaUrlBusca = "";
      this.arrayBuscaPorGAMENAME = [];
    }

    render() {
      const nome = this.state.NAME;
      return (
        <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>                
              <View style={StyleSheet.container}>
                <View style={styles.entradas}>
                  <Text>Tabela Games:</Text>
                  <TextInput 
                    style={styles.input} 
                    placeholder="Busca por nome Game" 
                    keyboardType={"default"} 
                    onSubmitEditing={
                      ({nativeEvent}) => {
                        this.setstrNAME({nativeEvent});
                        this.httpGetRequest("GAMES",this.strParaUrlBusca);
                      }
                    }
                    multiline={false} 
                  />
                  <Text>Tabela Platform:</Text>
                  <TextInput 
                    style={styles.input} 
                    placeholder="Busca por nome Plataforma" 
                    keyboardType={"default"} 
                    onSubmitEditing={
                      ({nativeEvent}) => {
                        this.setstrNAME({nativeEvent});
                        this.httpGetRequest("PLATAFORMS",this.strParaUrlBusca);
                      }
                    }
                    multiline={false} 
                  />
                  <Text>Tabela Releases:</Text>
                  <TextInput
                    style={styles.input} 
                    placeholder="Busca por valor de Game ou Platform em Releases" 
                    keyboardType={"default"} 
                    onSubmitEditing={
                      ({nativeEvent}) => {
                        this.setstrNAME({nativeEvent});
                        this.httpGetRequest("RELEASES", this.strParaUrlBusca);
                      }
                    }
                    multiline={false} 
                  />

                </View>
                {this.renderTables(this.arrayJ)}
                {this.renderTables(this.arrayBuscaPorGAMENAME)}
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
      fetch('http://10.0.2.2:3000/select/?opcaoSelect=todas', {
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
          this.addArrayJ(responseJson[responseJ]);
        }
        this.setState(this.arrayJ);
      })
      .catch((error) => {
        console.error(error);
      });
    }

    httpGetRequest (nomeTabela, valorProcurado) {
      fetch('http://10.0.2.2:3000/select/?opcaoSelect='+nomeTabela+'&daTabelaEmQue='+valorProcurado, {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.arrayJ = []; //Após a primeira renderização, o array (arranjo de dados) arrayJ com todos os valores retornados recebe um array vazio para nada ser renderizado novamente.
        for (let responseJ in responseJson){
          this.addObjetosBusca(responseJson[responseJ]);
        }
        this.setState(this.arrayBuscaPorGAMENAME);  
      })
      .catch((error) => {
        console.error(error);
      });
    }

    setstrNAME(nativeEv){
      this.strParaUrlBusca = nativeEv.nativeEvent.text; //{"nativeEvent": {"target": 13, "text": "Paciencia"}}
      console.log(this.strParaUrlBusca);
    }

    addObjetosBusca(arrayBuscaPorGAMENAME){
      this.arrayBuscaPorGAMENAME.push(arrayBuscaPorGAMENAME);
    }

    addArrayJ(elem)
    {
      this.arrayJ.push(elem);
    }

    renderTables(array) {
      return array.map((objeto, index) => {
        const key = index;
        this.arrayBuscaPorGAMENAME = [];


        return (
          <>
            {this.dadosParaSeremRenderizados(key, objeto)}
          </>
        );
      });
    }

    dadosParaSeremRenderizados(key, objeto){
      if (objeto.GAMES_ID != undefined){
        return (
          <View>
            <Text key={objeto.GAMES_ID+1}>Registros recuperados da tabela Games:</Text>
            <Text key={objeto.GAMES_ID}>ID: {objeto.GAMES_ID}</Text>
            <Text key={objeto.NAME.toString()}>Nome: {objeto.NAME}</Text>
            <Text key={objeto.PUBLISHER.toString()}>Editora: {objeto.PUBLISHER}</Text>
          </View>
        );
      }
      else{
        if (objeto.PLATAFORMS_ID != undefined){
          return (
            <View>
              <Text key={objeto.PLATAFORMS_ID+1}>Registros recuperados da tabela Platforms:</Text>
              <Text key={objeto.PLATAFORMS_ID}>ID: {objeto.PLATAFORMS_ID}</Text>
              <Text key={objeto.NAME.toString()}>Nome: {objeto.NAME}</Text>
            </View>
          );
        }
        else{
          if (objeto.GAME != undefined){
            return (
              <View>
                <Text key={objeto.GAME+8}>Registros recuperados da tabela Releases:</Text>
                <Text key={objeto.GAME + 2}>Game: {objeto.GAME}</Text>
                <Text key={objeto.PLATAFORM + 2}>Platform: {objeto.PLATAFORM}</Text>
                <Text key={objeto.RELEASEDATE.toString()}>Data lançamento: {objeto.RELEASEDATE}</Text>
                <Text key={objeto.VERSION.toString()}>Versão: {objeto.VERSION}</Text>              
              </View>
            );
          }
        }
      }
    }
}
  


export default HttpGet;