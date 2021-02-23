import React, { Component } from 'react';
import { SafeAreaView, 
    ScrollView, 
    StatusBar, 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    Alert } from 'react-native';

import styles from './styles';



class AppDelecao extends Component {
    constructor(props){
        super(props);
        this.state = {TABLE: "", VALORI: "", VALORII: "", VALORIII: ""};
    }
    render() {
        return (
            <>
                <StatusBar barStyle="dark-contet" />
                <SafeAreaView>
                    <ScrollView contentInsetAdjustmentBehavior="automatic" style={StyleSheet.ScrollView}>
                    
                    <View style={StyleSheet.container}>
                            <View style={styles.entradas}>
                                <Text>
                                    DELETAR UM REGISTRO DA TABELA RELEASES:
                                </Text>

                                <TextInput
                                    style={styles.input}
                                    placeholder="Insira o Id do Game"
                                    keyboardType={"default"}
                                    onSubmitEditing={
                                        ({nativeEvent}) => {
                                            this.setInputRELEASESGAME({nativeEvent});
                                        }
                                    }
                                    multiline={false}
                                />

                                <TextInput
                                    style={styles.input}
                                    placeholder="Insira o Id da plataforma"
                                    keyboardType={"default"}
                                    onSubmitEditing={
                                        ({nativeEvent}) => {
                                            this.setInputRELEASESPLATAFORM({nativeEvent});
                                        }
                                    }
                                    multiline={false}
                                />

                                <TextInput
                                    style={styles.input}
                                    placeholder="Insira o número da versão"
                                    keyboardType={"default"}
                                    onSubmitEditing={
                                        ({nativeEvent}) => {
                                            this.setInputRELEASESVERSION({nativeEvent});
                                        }
                                    }
                                    multiline={false}
                                />
                            </View>
                        </View>

                        <View style={StyleSheet.container}>
                            <View style={styles.entradas}>
                                <Text>
                                    DELETAR UM REGISTRO DA TABELA GAME:
                                </Text>

                                <TextInput
                                    style={styles.input}
                                    placeholder="Insira o Id do Game ou seu nome"
                                    keyboardType={"default"}
                                    onSubmitEditing={
                                        ({nativeEvent}) => {
                                            this.setInput("GAMES", {nativeEvent});
                                        }
                                    }
                                    multiline={false}
                                />
                            </View>
                        </View>
                        
                        <View style={StyleSheet.container}>
                            <View style={styles.entradas}>
                                <Text>
                                    DELETAR UM REGISTRO DA TABELA PLATAFORMS:
                                </Text>

                                <TextInput
                                    style={styles.input}
                                    placeholder="Insira o Id da Plataforma ou seu nome"
                                    keyboardType={"default"}
                                    onSubmitEditing={
                                        ({nativeEvent}) => {
                                            this.setInput("PLATAFORMS", {nativeEvent});
                                        }
                                    }
                                    multiline={false}
                                />

                            </View>
                        </View>

                    </ScrollView>

                    
                </SafeAreaView>
            </>
        )
    }
    
    setInput(tableName, nativeEv){
        if (nativeEv.nativeEvent.text != ""){
            this.setState({TABLE: tableName, VALORI: nativeEv.nativeEvent.text});
        }
    }

    setInputRELEASESGAME(nativeEv) {
        if (nativeEv.nativeEvent.text != ""){
            this.setState({TABLE: "RELEASES", VALORI: nativeEv.nativeEvent.text});
        }
    }

    setInputRELEASESPLATAFORM(nativeEv) {
        if (nativeEv.nativeEvent.text != ""){
            this.setState({TABLE: "RELEASES", VALORII: nativeEv.nativeEvent.text});
        }
    }

    setInputRELEASESVERSION(nativeEv) {
        if (nativeEv.nativeEvent.text != ""){
            this.setState({TABLE: "RELEASES", VALORIII: nativeEv.nativeEvent.text});
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state){
            if ((this.state.TABLE == "RELEASES")
                && !(this.state.VALORI == ""
                    || this.state.VALORI == ""
                    || this.state.VALORIII == "" ))
            {
                this.httpDELETERequest();
            }
            else{
                if((this.state.TABLE === "GAMES") || (this.state.TABLE === "PLATAFORMS")){
                    this.httpDELETERequest();
                }
            }
            
        }
            
    }

    httpDELETERequest(){
        var url = "";
        
        if (this.state.TABLE == "GAME"){
            url = 'http://10.0.2.2:3000/delete/?opcaoDelete='+this.state.TABLE+
                    '&GAMESgame_IdOrName='+this.state.VALORI;
        }
        else{
            if (this.state.TABLE == "PLATAFORMS"){
                url = 'http://10.0.2.2:3000/delete/?opcaoDelete='+this.state.TABLE+
                    '&PLATAFORMSplataforms_IdOrName='+this.state.VALORI;
            }
            else{
                url = 'http://10.0.2.2:3000/delete/?opcaoDelete='+this.state.TABLE+
                    '&game='+this.state.VALORI+'&plataform='+this.state.VALORII+
                    '&version='+this.state.VALORIII;
            }
        }
        console.log("url: "+url);

        fetch(url, {
            method: 'DELETE',
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            Alert.alert("Registro da tabela " +this.state.TABLE+" deletado.");
            this.state.TABLE = "";
            this.state.VALORI = "";
            this.state.VALORII = "";
            this.state.VALORIII = "";
        })
        .catch((error) => {
            console.error(error);
        });

        
    }

}

export default AppDelecao;