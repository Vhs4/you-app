"use client"

import { useRef, useEffect } from "react"
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Animated,
    Dimensions,
    PanResponder,
    Linking,
    Alert,
    ScrollView,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Svg, Path } from "react-native-svg"

const { height: SCREEN_HEIGHT } = Dimensions.get("window")

interface HelpModalProps {
    visible: boolean
    onClose: () => void
}

// Componente SVG da logo "U"
const ULogo = ({ size = 24, color = "#FFFFFF" }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M7 3V13C7 16.866 10.134 20 14 20H14C17.866 20 21 16.866 21 13V3H18V13C18 15.209 16.209 17 14 17H14C11.791 17 10 15.209 10 13V3H7Z"
            fill={color}
            stroke={color}
            strokeWidth="0.5"
        />
    </Svg>
)

export default function HelpModal({ visible, onClose }: HelpModalProps) {
    const insets = useSafeAreaInsets()
    const MODAL_HEIGHT = SCREEN_HEIGHT * 0.65

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
                    paddingBottom: Math.max(insets.bottom, 0),
                }}
                {...panResponder.panHandlers}
            >
                <LinearGradient
                    colors={["#1e3a8a", "#3b82f6", "#1e40af"]}
                    className="flex-1 rounded-t-3xl"
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    {/* Handle bar - Agora funcional */}
                    <TouchableOpacity onPress={handleClose} className="items-center py-3" activeOpacity={0.7}>
                        <View className="w-12 h-1 bg-white/30 rounded-full" />
                    </TouchableOpacity>

                    {/* Header */}
                    <View className="flex-row items-center justify-between px-6 py-3">
                        <View
                            className="bg-emerald-400 items-center justify-center"
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: 24,
                            }}
                        >
                            <Svg width="24" height="38" viewBox="0 0 28 38" fill="none">
                                <Path d="M27.6096 12.3188V23.3423C27.6095 28.1546 26.4703 31.7463 24.1917 34.1177C21.9128 36.4891 18.5606 37.6753 14.135 37.6753C9.67642 37.6753 6.3074 36.507 4.02856 34.1704C1.7828 31.8338 0.6604 28.311 0.6604 23.603V12.3188L5.2854 10.0112L7.74438 11.9243V22.7661C7.74438 24.5445 7.90932 26.0268 8.2395 27.2124C8.56975 28.3981 9.19763 29.2875 10.1223 29.8804C11.0801 30.4732 12.4176 30.77 14.135 30.77C15.8524 30.77 17.1574 30.4732 18.0491 29.8804C18.9736 29.2875 19.6175 28.3979 19.9807 27.2124C20.3439 26.0268 20.5256 24.5623 20.5256 22.8188V11.9243L22.9856 10.0112L27.6096 12.3188ZM7.74438 8.78369L5.2854 10.0112L0.6604 6.4126V0.324707H7.74438V8.78369ZM27.6096 6.4126L22.9856 10.0112L20.5256 8.78369V4.18408H27.6096V6.4126Z" fill="#212329" />
                            </Svg>
                        </View>
                        <TouchableOpacity onPress={handleClose} className="p-2">
                            <Ionicons name="close" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Content with ScrollView */}
                    <ScrollView
                        className="flex-1 px-6"
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    >
                        {/* Dicas Section */}
                        <View className="mb-6">
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
                        <View className="bg-white/10 rounded-xl p-4 border border-white/20 mb-4">
                            <Text className="text-white font-medium mb-2">💡 Dica do dia:</Text>
                            <Text className="text-white/90 text-sm leading-5">
                                Fazer exercícios pode te ajudar a melhorar o humor e pode ajudar a conhecer pessoas novas.
                            </Text>
                        </View>
                    </ScrollView>
                </LinearGradient>
            </Animated.View>
        </Modal>
    )
}
