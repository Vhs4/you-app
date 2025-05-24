"use client"

import { View, Text, TouchableOpacity, StatusBar } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"

interface FeelingsCheckinProps {
    onNext: (feeling: string) => void
    navigation?: any
}

const feelingOptions = [
    { label: "Motivado", value: "motivado" },
    { label: "Cansado", value: "cansado" },
    { label: "Preocupado", value: "preocupado" },
    { label: "Estressado", value: "estressado" },
    { label: "Animado", value: "animado" },
]

export default function FeelingsCheckin({ onNext }: FeelingsCheckinProps) {
    const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null)

    const handleNext = () => {
        if (selectedFeeling) {
            console.log("Sentimento selecionado:", selectedFeeling)
            onNext(selectedFeeling)
        }
    }

    return (
        <View className="flex-1">
            <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

            <LinearGradient
                colors={["#6B73FF", "#4A90E2", "#357ABD"]}
                className="flex-1"
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {/* Header */}
                <View className="flex-row justify-between items-center px-6 py-4 pt-12">
                    <Text className="text-white text-lg font-medium">Check-in</Text>
                    <TouchableOpacity>
                        <Text className="text-white text-lg font-medium">Pular</Text>
                    </TouchableOpacity>
                </View>

                {/* Main Content */}
                <View className="flex-1 px-6 py-8">
                    {/* Title */}
                    <Text className="text-white text-3xl font-bold leading-10 mb-16">Como você se{"\n"}sente hoje?</Text>

                    {/* Feeling Options */}
                    <View className="flex-1 justify-center space-y-8">
                        {feelingOptions.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                className={`py-6 px-6 rounded-lg border-2 ${selectedFeeling === option.value ? "bg-white/20 border-white/50" : "bg-white/10 border-white/20"
                                    }`}
                                onPress={() => setSelectedFeeling(option.label)}
                            >
                                <Text className="text-white text-xl font-medium text-center">{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Next Button */}
                    <View className="pb-8">
                        <TouchableOpacity
                            className={`py-4 px-6 rounded-xl ${selectedFeeling ? "bg-emerald-400" : "bg-gray-400"}`}
                            onPress={handleNext}
                            disabled={!selectedFeeling}
                        >
                            <Text className="text-white text-lg font-semibold text-center">Ir para o app</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}
