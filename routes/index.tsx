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

import { View, TouchableOpacity, Platform } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Svg, Path } from "react-native-svg"
import HelpModal from "../components/HelpModal"

// Criando os navegadores
const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

// Tipos para os dados do check-in
export interface CheckinData {
    emoji: string
    emojiLabel: string
    feeling: string
}

// Componente SVG da logo "U"
const ULogo = () => (
    <Svg width="28" height="38" viewBox="0 0 28 38" fill="none">
        <Path d="M27.6096 12.3188V23.3423C27.6095 28.1546 26.4703 31.7463 24.1917 34.1177C21.9128 36.4891 18.5606 37.6753 14.135 37.6753C9.67642 37.6753 6.3074 36.507 4.02856 34.1704C1.7828 31.8338 0.6604 28.311 0.6604 23.603V12.3188L5.2854 10.0112L7.74438 11.9243V22.7661C7.74438 24.5445 7.90932 26.0268 8.2395 27.2124C8.56975 28.3981 9.19763 29.2875 10.1223 29.8804C11.0801 30.4732 12.4176 30.77 14.135 30.77C15.8524 30.77 17.1574 30.4732 18.0491 29.8804C18.9736 29.2875 19.6175 28.3979 19.9807 27.2124C20.3439 26.0268 20.5256 24.5623 20.5256 22.8188V11.9243L22.9856 10.0112L27.6096 12.3188ZM7.74438 8.78369L5.2854 10.0112L0.6604 6.4126V0.324707H7.74438V8.78369ZM27.6096 6.4126L22.9856 10.0112L20.5256 8.78369V4.18408H27.6096V6.4126Z" fill="#212329" />
    </Svg>
)

// Componente customizado para o botão central
function CentralHelpButton({ onPress }: { onPress: () => void }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="bg-emerald-400 items-center justify-center -mt-2"
            style={{
                width: 64,
                height: 64,
                borderRadius: 32, // Perfeitamente circular
                elevation: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
            }}
        >
            <ULogo />
        </TouchableOpacity>
    )
}

// TabNavigator separado (sem o Login)
function BottomTabs({ checkinData }: { checkinData: CheckinData }) {
    const [helpModalVisible, setHelpModalVisible] = useState(false)
    const insets = useSafeAreaInsets()

    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: "#34d399", // emerald-400
                    tabBarInactiveTintColor: "#94a3b8", // slate-400
                    tabBarStyle: {
                        backgroundColor: "#2563eb", // bg-blue-600
                        borderTopWidth: 0,
                        elevation: 0,
                        paddingBottom: Math.max(insets.bottom, 8), // Responsivo para safe area
                        paddingTop: 8,
                        height: 70 + Math.max(insets.bottom, 0), // Altura dinâmica
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: "500",
                        marginTop: 4,
                        marginBottom: Platform.OS === "android" ? 4 : 0,
                    },
                }}
            >
                <Tab.Screen
                    name="Home"
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
                        ),
                        tabBarLabel: "Início",
                    }}
                >
                    {(props) => <Home {...props} checkinData={checkinData} />}
                </Tab.Screen>

                <Tab.Screen
                    name="Help"
                    component={() => <View />} // Componente vazio, só queremos o botão
                    options={{
                        tabBarIcon: () => <CentralHelpButton onPress={() => setHelpModalVisible(true)} />,
                        tabBarLabel: "",
                        tabBarButton: (props) => (
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <CentralHelpButton onPress={() => setHelpModalVisible(true)} />
                            </View>
                        ),
                    }}
                />

                <Tab.Screen
                    name="Analise"
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons name={focused ? "pulse" : "pulse-outline"} size={24} color={color} />
                        ),
                        tabBarLabel: "Análise",
                    }}
                >
                    {(props) => <Analise {...props} checkinData={checkinData} />}
                </Tab.Screen>
            </Tab.Navigator>

            {/* Help Modal */}
            <HelpModal visible={helpModalVisible} onClose={() => setHelpModalVisible(false)} />
        </>
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
