import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const AppCriacao = () =>{ 
        return (
            <View style={StyleSheet.container}>
                <View style={styles.entradas}>
                    <TextInput placeholder="Id" keyboardType="numeric" style={styles.input}/>
                    <TextInput placeholder="Nome" keyboardType="text" style={styles.input}/>
                    <TextInput placeholder="Editora" keyboardType="text" style={styles.input}/>
                </View>
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'black',
    },
    input: {
        height:80,
        textAlign:"center",
        width:"25%",
        fontSize:25,
        marginTop:24,
    }
})

export default AppCriacao;