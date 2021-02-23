import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
 
import HttpGet from './HttpGet';
import AppCriacao from './AppCriacao';
import AppDelecao from './AppDelecao';

const {Navigator, Screen} = createBottomTabNavigator();

function AppTab(){
    return (
        <NavigationContainer>
            <Navigator
                tabBarOptions={{
                    style: {
                        elevation: 0,
                        shadowOpacity: 0,
                        height: 64,
                    },
                    tabStyle: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                    labelStyle: {
                        fontSize: 13,
                        marginLeft: 16
                    },
                    inactiveBackgroundColor: '#fafafc',
                    activeBackgroundColor: '#ebebf5',
                    inactiveTintColor: '#c1bccc',
                    activeTintColor: 'black'
                }}
            >
                <Screen name="[Listagem]" component={HttpGet} />
                <Screen name="[Inserção]" component={AppCriacao} />
                <Screen name="[Deleção]" component={AppDelecao} />
            </Navigator>
        </NavigationContainer>
    )
}

export default AppTab;
