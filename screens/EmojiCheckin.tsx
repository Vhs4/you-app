"use client"

import { View, Text, TouchableOpacity, StatusBar } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"

interface EmojiCheckinProps {
    onNext: (emoji: string, emojiLabel: string) => void
    navigation?: any
}

const emojiOptions = [
    { emoji: "😊", label: "Alegre", value: "alegre" },
    { emoji: "😟", label: "Triste", value: "triste" },
    { emoji: "😩", label: "Cansado", value: "cansado" },
    { emoji: "😤", label: "Ansioso", value: "ansioso" },
    { emoji: "😱", label: "Medo", value: "medo" },
]

export default function EmojiCheckin({ onNext }: EmojiCheckinProps) {
    const [selectedEmoji, setSelectedEmoji] = useState<{ emoji: string; label: string; value: string } | null>(null)

    const handleNext = () => {
        if (selectedEmoji) {
            console.log("Emoji selecionado:", selectedEmoji)
            onNext(selectedEmoji.emoji, selectedEmoji.label)
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
                    <Text className="text-white text-3xl font-bold leading-10 mb-12">
                        Já escolheu o{"\n"}seu emoji de{"\n"}hoje?
                    </Text>

                    {/* Emoji Options */}
                    <View className="flex-1 justify-center space-y-6">
                        {emojiOptions.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                className={`flex-row items-center py-4 px-2 rounded-lg ${selectedEmoji?.value === option.value ? "bg-white/20" : ""
                                    }`}
                                onPress={() => setSelectedEmoji(option)}
                            >
                                <Text className="text-4xl mr-4">{option.emoji}</Text>
                                <Text className="text-white text-xl font-medium">{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Next Button */}
                    <View className="pb-8">
                        <TouchableOpacity
                            className={`py-4 px-6 rounded-xl flex-row items-center justify-center ${selectedEmoji ? "bg-emerald-400" : "bg-gray-400"
                                }`}
                            onPress={handleNext}
                            disabled={!selectedEmoji}
                        >
                            <Text className="text-white text-lg font-semibold mr-2">Próximo</Text>
                            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}
