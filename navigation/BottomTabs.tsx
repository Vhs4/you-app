import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Analise from '../screens/Analise';
import Home from '../screens/Home';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: { backgroundColor: 'white', height: 60 },
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName: any;

                    if (route.name === 'Home') iconName = 'home-outline';
                    else if (route.name === 'Análise') iconName = 'analytics-outline';
                    else if (route.name === 'Configurações') iconName = 'settings-outline';

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#0891b2', // cyan-600
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Análise" component={Analise} />
        </Tab.Navigator>
    );
}
