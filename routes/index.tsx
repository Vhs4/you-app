"use client"

import { useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"

import Home from "../screens/Home"
import Analise from "../screens/Analise"
import Login from "../screens/Login"

import { Text } from "react-native"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#007AFF",
                tabBarStyle: {
                    backgroundColor: "#fff",
                    borderTopWidth: 0,
                    elevation: 8,
                    shadowOpacity: 0.1,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text>,
                    tabBarLabel: "Início",
                }}
            />
            <Tab.Screen
                name="Analise"
                component={Analise}
                options={{
                    tabBarIcon: () => <Text style={{ fontSize: 20 }}>📊</Text>,
                    tabBarLabel: "Análise",
                }}
            />
        </Tab.Navigator>
    )
}

export default function Routes() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogin = () => {
        setIsLoggedIn(true)
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isLoggedIn ? (
                    <Stack.Screen name="Login">{(props) => <Login {...props} onLogin={handleLogin} />}</Stack.Screen>
                ) : (
                    <Stack.Screen name="MainApp" component={BottomTabs} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
