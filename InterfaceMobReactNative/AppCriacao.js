import React, { Component } from 'react';

import { StyleSheet,
         Text, 
         View, 
         TextInput, 
         StatusBar,
         SafeAreaView,
         ScrollView,
         TouchableOpacity,
         Alert,
         Button} from 'react-native';

import styles from './styles'
class AppCriacao extends Component{

    constructor(props){
        super(props);
        this.state = {TABLE: "", PI: false, PII: false, PIII: false, PIV: false};
        this.inputGAME = {NAME: "", PUBLISHER: ""};
        this.inputPLATAFORMS = {NAME: ""};
        this.inputRELEASES = {GAME: "", PLATAFORM: "", VERSION: "", DATE: ""};
        this.inputAlgumaTabela = {};
    }

    setInputGAMENAME(nativeEv) {
        if (nativeEv.nativeEvent.text != ""){        
            this.inputGAME.NAME = nativeEv.nativeEvent.text;
            this.setState({TABLE: "GAME", PI: true});
        }
        else{
            this.setState({PI: false});
        }
        console.log("this.inputGAME.NAME: " +this.inputGAME.NAME);
    }

    setInputGAMEPUBLISHER(nativeEv) {
        if (nativeEv.nativeEvent.text != ""){
            this.inputGAME.PUBLISHER = nativeEv.nativeEvent.text;
            this.setState({TABLE: "GAME", PII: true});
        }
        else{
            this.setState({PII: false});
        }
        console.log("this.inputGAME.PUBLISHER: " +this.inputGAME.PUBLISHER);        
    }

    setInputPLATAFORMSNAME(nativeEv) {
        if (nativeEv.nativeEvent.text != ""){
            this.inputPLATAFORMS.NAME = nativeEv.nativeEvent.text;
            this.setState({TABLE: "PLATAFORMS", PI: true});
        }
        else{
            this.setState({PI: false});
        }
        console.log("this.inputPLATAFORMS.NAME: " +this.inputPLATAFORMS.NAME);
    }

    setInputRELEASESGAME(nativeEv) {
        if (nativeEv.nativeEvent.text != ""){
            this.inputRELEASES.GAME = nativeEv.nativeEvent.text;
            this.setState({TABLE: "RELEASES", PI: true});
        }
        else{
            this.setState({PI: false});
        }
        console.log("this.inputRELEASES.GAME: " +this.inputRELEASES.GAME);
    }

    setInputRELEASESPLATAFORM(nativeEv) {
        if (nativeEv.nativeEvent.text != ""){
            this.inputRELEASES.PLATAFORM = nativeEv.nativeEvent.text;
            this.setState({TABLE: "RELEASES", PII: true});
        }
        else{
            this.setState({PII: false});
        }
        console.log("this.inputRELEASES.PLATAFORM: " +this.inputRELEASES.PLATAFORM);
    }

    setInputRELEASESVERSION(nativeEv) {
        if (nativeEv.nativeEvent.text != ""){
            this.inputRELEASES.VERSION = nativeEv.nativeEvent.text;
            this.setState({TABLE: "RELEASES", PIII: true});
        }
        else{
            this.setState({PIII: false});
        }
        console.log("this.inputRELEASES.VERSION: " +this.inputRELEASES.VERSION);
    }

    setInputRELEASESDATE(nativeEv) {
        if (nativeEv.nativeEvent.text != ""){
            this.inputRELEASES.DATE = nativeEv.nativeEvent.text;
            this.setState({TABLE: "RELEASES", PIV: true});
        }
        else{
            this.setState({PIV: false});
        }
        console.log("this.inputRELEASES.DATE: " +this.inputRELEASES.DATE);
    }

    analisarDadosInseridos(registroTabela){
        let aux;
        aux = this.state;

        console.log("aux.PI: "+aux.PI);
        console.log("aux.PII: "+aux.PII);
        console.log("aux.PIII: "+aux.PIII);
        console.log("aux.PIV: "+aux.PIV);
        console.log(registroTabela);

        if (   (aux.TABLE == "GAME" && aux.PI == true && aux.PII == true)
            || (aux.TABLE == "PLATAFORMS" && aux.PI == true)
            || (aux.TABLE == "RELEASES" && aux.PI == true && aux.PII == true && aux.PIII == true && aux.PIV == true)
        ){
            this.httpPOSTRequest(registroTabela);
        }
    }

    httpPOSTRequest(valor) {
        var url = "";
        
        if (this.state.TABLE == "GAME")
        {
            url = 'http://10.0.2.2:3000/insert/'+valor.NAME+".."+valor.PUBLISHER;
        }
        else{
            if (this.state.TABLE == "PLATAFORMS"){
                url = 'http://10.0.2.2:3000/insert/'+valor.NAME;
            }
            else{
                url = 'http://10.0.2.2:3000/insert/'+valor.GAME+".."+valor.PLATAFORM+".."+valor.DATE+".."+valor.VERSION;
            }
        }

        fetch(url, {
            method: 'POST',
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                Alert.alert(url);
            })
            .catch((error) => {
                console.error(error);
            });

            this.state.TABLE = ""
            this.state.PI = false; 
            this.state.PII = false; 
            this.state.PIII = false;
            this.state.PIV = false;
    }

    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <ScrollView contentInsetAjustmentBehavior="automatic" stye={StyleSheet.scrollView}>

                    <View style={StyleSheet.container}>
                        <View style={styles.entradas}>
                            <Text>
                                GAME TABLE:
                            </Text>
                            
                            <Text>
                                input (NAME, PUBLISHER);
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="NAME"
                                keyboardType={"default"}
                                onSubmitEditing={
                                    ({nativeEvent}) => {
                                        this.setInputGAMENAME({nativeEvent});
                                        props = this.inputGAME;
                                    }
                                }
                                multiline={false}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="PUBLISHER"
                                keyboardType={"default"}
                                onSubmitEditing={
                                    ({nativeEvent}) => {
                                        this.setInputGAMEPUBLISHER({nativeEvent});
                                        props = this.inputGAME;
                                    }
                                }
                                multiline={false}

                            />
                            
                        </View>
                    </View>

                    <View style={StyleSheet.container}>
                        <View style={styles.entradas}>
                                <Text>
                                    PLATAFORMS TABLE:
                                </Text>
                                <Text>
                                    input (NAME);
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="NAME"
                                    keyboardType={"default"}
                                    onSubmitEditing={
                                        ({nativeEvent}) => {
                                            this.setInputPLATAFORMSNAME({nativeEvent});
                                            props = this.inputPLATAFORMS;
                                        }
                                    }
                                    multiline={false}
                                />
                                
                        </View>
                    </View>
        
                    <View style={StyleSheet.container}>
                        <View style={styles.entradas}>
                            <Text>
                                RELEASES TABLE:
                            </Text>
                            
                            <Text>
                                input (GAME, PLATAFORM, VERSION, DATE);
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="GAME"
                                keyboardType={"default"}
                                onSubmitEditing={
                                    ({nativeEvent}) => {
                                        this.setInputRELEASESGAME({nativeEvent});
                                        props = this.inputRELEASES;
                                    }
                                }
                                multiline={false}

                            />
                            <TextInput
                                style={styles.input}
                                placeholder="PLATAFORM"
                                keyboardType={"default"}
                                onSubmitEditing={
                                    ({nativeEvent}) => {
                                        this.setInputRELEASESPLATAFORM({nativeEvent});
                                        props = this.inputRELEASES;
                                    }
                                }
                                multiline={false}

                            />
                            <TextInput
                                style={styles.input}
                                placeholder="VERSION"
                                keyboardType={"default"}
                                onSubmitEditing={
                                    ({nativeEvent}) => {
                                        this.setInputRELEASESVERSION({nativeEvent});
                                        props = this.inputRELEASES;
                                    }
                                }
                                multiline={false}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="DATE"
                                keyboardType={"default"}
                                onSubmitEditing={
                                    ({nativeEvent}) => {
                                        this.setInputRELEASESDATE({nativeEvent});
                                        props = this.inputRELEASES;
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
    };
    
    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state && prevProps !== props) {
            this.analisarDadosInseridos(props);
        }
          
        
    }
}



export default AppCriacao;