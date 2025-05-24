"use client"

import { useRef, useEffect } from "react"
import { View, Text, TouchableOpacity, Modal, Animated, Dimensions, PanResponder, Linking, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"

const { height: SCREEN_HEIGHT } = Dimensions.get("window")
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.6

interface HelpModalProps {
    visible: boolean
    onClose: () => void
}

export default function HelpModal({ visible, onClose }: HelpModalProps) {
    const translateY = useRef(new Animated.Value(MODAL_HEIGHT)).current
    const backdropOpacity = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (visible) {
            // Animar entrada
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(backdropOpacity, {
                    toValue: 0.5,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start()
        } else {
            // Animar saída
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: MODAL_HEIGHT,
                    duration: 250,
                    useNativeDriver: true,
                }),
                Animated.timing(backdropOpacity, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                }),
            ]).start()
        }
    }, [visible])

    const handleClose = () => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: MODAL_HEIGHT,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(backdropOpacity, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onClose()
        })
    }

    const handleCall = () => {
        Alert.alert("Ligação Anônima", "Deseja fazer uma ligação anônima para o suporte?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Ligar",
                onPress: () => {
                    // Aqui você colocaria o número real do suporte
                    Linking.openURL("tel:+5511999999999")
                },
            },
        ])
    }

    const handleMessage = () => {
        Alert.alert("Enviar Mensagem", "Deseja enviar uma mensagem para o suporte?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Enviar",
                onPress: () => {
                    // Aqui você pode abrir WhatsApp, SMS ou chat interno
                    Linking.openURL("https://wa.me/5511999999999?text=Olá, preciso de ajuda")
                },
            },
        ])
    }

    // PanResponder para arrastar para baixo e fechar
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
            return gestureState.dy > 0 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx)
        },
        onPanResponderMove: (_, gestureState) => {
            if (gestureState.dy > 0) {
                translateY.setValue(gestureState.dy)
            }
        },
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dy > 100) {
                handleClose()
            } else {
                Animated.spring(translateY, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start()
            }
        },
    })

    return (
        <Modal transparent visible={visible} animationType="none" onRequestClose={handleClose}>
            {/* Backdrop */}
            <Animated.View className="flex-1 bg-black" style={{ opacity: backdropOpacity }} onTouchEnd={handleClose} />

            {/* Modal Content */}
            <Animated.View
                className="absolute bottom-0 left-0 right-0"
                style={{
                    transform: [{ translateY }],
                    height: MODAL_HEIGHT,
                }}
                {...panResponder.panHandlers}
            >
                <LinearGradient
                    colors={["#1e3a8a", "#3b82f6", "#1e40af"]}
                    className="flex-1 rounded-t-3xl"
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    {/* Handle bar */}
                    <View className="items-center py-3">
                        <View className="w-12 h-1 bg-white/30 rounded-full" />
                    </View>

                    {/* Header */}
                    <View className="flex-row items-center justify-between px-6 py-4">
                        <View className="bg-emerald-400 w-12 h-12 rounded-2xl items-center justify-center">
                            <Text className="text-white text-xl font-black">U</Text>
                        </View>
                        <TouchableOpacity onPress={handleClose} className="p-2">
                            <Ionicons name="close" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Content */}
                    <View className="flex-1 px-6">
                        {/* Dicas Section */}
                        <View className="mb-8">
                            <Text className="text-white font-bold text-lg mb-4">Dicas</Text>
                            <View className="flex-row items-start">
                                <View className="bg-white/20 p-2 rounded-lg mr-3 mt-1">
                                    <Ionicons name="notifications-outline" size={20} color="white" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-white text-base leading-6">
                                        Meditação pode ajudar a melhorar{"\n"}o bem-estar. Pratique todos os dias{"\n"}
                                        pelo menos 30 min.
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Help Section */}
                        <View className="mb-6">
                            <Text className="text-white font-bold text-lg mb-4">Estamos aqui para te ajudar</Text>

                            <View className="flex flex-row gap-4">
                                {/* Call Button */}
                                <TouchableOpacity
                                    onPress={handleCall}
                                    className="flex-1 bg-white/20 rounded-xl p-4 items-center border border-white/30"
                                >
                                    <View className="bg-white/20 w-12 h-12 rounded-full items-center justify-center mb-3">
                                        <Ionicons name="call-outline" size={24} color="white" />
                                    </View>
                                    <Text className="text-white text-sm font-medium text-center">Fazer uma ligação{"\n"}anônima</Text>
                                </TouchableOpacity>

                                {/* Message Button */}
                                <TouchableOpacity
                                    onPress={handleMessage}
                                    className="flex-1 bg-white/20 rounded-xl p-4 items-center border border-white/30"
                                >
                                    <View className="bg-white/20 w-12 h-12 rounded-full items-center justify-center mb-3">
                                        <Ionicons name="chatbubble-outline" size={24} color="white" />
                                    </View>
                                    <Text className="text-white text-sm font-medium text-center">Enviar uma{"\n"}mensagem</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Additional Tips */}
                        <View className="bg-white/10 rounded-xl p-4 mb-12 border border-white/20">
                            <Text className="text-white font-medium mb-2">💡 Dica do dia:</Text>
                            <Text className="text-white/90 text-sm">
                                Fazer exercícios pode te ajudar a melhorar o humor e pode ajudar a conhecer pessoas novas.
                            </Text>
                        </View>
                    </View>
                </LinearGradient>
            </Animated.View>
        </Modal>
    )
}
