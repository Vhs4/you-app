import { View, Text, TouchableOpacity, StatusBar } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"

interface LoginProps {
    onLogin: () => void
    navigation?: any
}

export default function Login({ onLogin, navigation }: LoginProps) {
    const handleEnter = () => {
        onLogin()
    }

    return (
        <View className="flex-1">
            <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

            <LinearGradient
                colors={["#6B73FF", "#4A90E2", "#357ABD"]}
                className="flex-1 px-8 py-12"
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View className="absolute inset-0">
                    <View className="absolute w-48 h-48 rounded-full bg-white/10 -top-6 -right-12" />
                    <View className="absolute w-36 h-36 rounded-full bg-white/10 bottom-48 -left-8" />
                    <View
                        className="absolute top-72 right-20"
                        style={{
                            width: 0,
                            height: 0,
                            borderLeftWidth: 30,
                            borderRightWidth: 30,
                            borderBottomWidth: 50,
                            borderLeftColor: "transparent",
                            borderRightColor: "transparent",
                            borderBottomColor: "rgba(255, 255, 255, 0.08)",
                        }}
                    />
                </View>

                {/* Header with Softtek logo */}
                <View className="items-start mt-5">
                    <View className="flex-row items-center">
                        <View className="w-2 h-2 rounded-full bg-white mr-2" />
                        <Text className="text-white text-base font-semibold">Softtek</Text>
                    </View>
                </View>

                {/* Main content */}
                <View className="flex-1 justify-center items-start -mt-12">
                    <Text className="text-white text-7xl font-black mb-5 tracking-tight">YOu</Text>

                    <Text className="text-emerald-400 text-[42px] leading-[50.4px] font-bold mb-8">Você em{"\n"}primeiro lugar.</Text>

                    <Text className="text-white text-xl font-medium leading-6 opacity-90">
                        Programa de apoio à saúde{"\n"}
                        mental e psicossocial dos{"\n"}
                        <Text className="underline">Softtekers</Text>
                    </Text>
                </View>

                {/* Enter button */}
                <View className="items-start mb-10">
                    <TouchableOpacity
                        className="bg-[#00EFD2] px-6 py-3 rounded-lg flex-row items-center active:bg-emerald-500"
                        onPress={handleEnter}
                    >
                        <Text className="text-black/80 text-base font-semibold mr-2">Entrar</Text>
                        <Ionicons name="arrow-forward" size={20} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <View className="flex-row justify-between items-center">
                    <Text className="text-white text-sm opacity-80">Challenge</Text>
                    <View className="flex-row items-center">
                        <View className="w-1.5 h-1.5 rounded-full bg-white mr-1.5" />
                        <Text className="text-white text-sm font-semibold opacity-80">Softtek</Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}
