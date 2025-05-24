"use client"

import { useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"

import Home from "../screens/Home"
import Analise from "../screens/Analise"
import Login from "../screens/Login"
import EmojiCheckin from "../screens/EmojiCheckin"
import FeelingsCheckin from "../screens/FeelingsCheckin"

import { Text } from "react-native"

// Criando os navegadores
const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

// Tipos para os dados do check-in
export interface CheckinData {
    emoji: string
    emojiLabel: string
    feeling: string
}

// TabNavigator separado (sem o Login)
function BottomTabs({ checkinData }: { checkinData: CheckinData }) {
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
                options={{ tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text>, tabBarLabel: "Início" }}
            >
                {(props) => <Home {...props} checkinData={checkinData} />}
            </Tab.Screen>
            <Tab.Screen
                name="Analise"
                options={{ tabBarIcon: () => <Text style={{ fontSize: 20 }}>📊</Text>, tabBarLabel: "Análise" }}
            >
                {(props) => <Analise {...props} checkinData={checkinData} />}
            </Tab.Screen>
        </Tab.Navigator>
    )
}

// Navegador principal que contém todas as telas
export default function Routes() {
    const [currentScreen, setCurrentScreen] = useState("Login") // Login, EmojiCheckin, FeelingsCheckin, MainApp
    const [checkinData, setCheckinData] = useState<CheckinData>({
        emoji: "😊",
        emojiLabel: "Alegre",
        feeling: "Motivado",
    })

    const handleLogin = () => {
        setCurrentScreen("EmojiCheckin")
    }

    const handleEmojiNext = (emoji: string, emojiLabel: string) => {
        setCheckinData((prev) => ({ ...prev, emoji, emojiLabel }))
        setCurrentScreen("FeelingsCheckin")
    }

    const handleFeelingsNext = (feeling: string) => {
        setCheckinData((prev) => ({ ...prev, feeling }))
        setCurrentScreen("MainApp")
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {currentScreen === "Login" && (
                    <Stack.Screen name="Login">{(props) => <Login {...props} onLogin={handleLogin} />}</Stack.Screen>
                )}
                {currentScreen === "EmojiCheckin" && (
                    <Stack.Screen name="EmojiCheckin">
                        {(props) => <EmojiCheckin {...props} onNext={handleEmojiNext} />}
                    </Stack.Screen>
                )}
                {currentScreen === "FeelingsCheckin" && (
                    <Stack.Screen name="FeelingsCheckin">
                        {(props) => <FeelingsCheckin {...props} onNext={handleFeelingsNext} />}
                    </Stack.Screen>
                )}
                {currentScreen === "MainApp" && (
                    <Stack.Screen name="MainApp">{(props) => <BottomTabs checkinData={checkinData} />}</Stack.Screen>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
