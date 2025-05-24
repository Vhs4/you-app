import type React from "react"
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { CheckinData } from "routes"

type StatusCardProps = {
    title: string
    status: string
    statusColor?: string
    showValue?: boolean
    value?: string | null
}

type EmojiCardProps = {
    title: string
    emoji: string
    status: string
    statusColor?: string
}

type SectionProps = {
    title: string
    children: React.ReactNode
}

type RootStackParamList = {
    Home: undefined
}

interface AnaliseProps {
    checkinData: CheckinData
}

const Analise = ({ checkinData }: AnaliseProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const insets = useSafeAreaInsets()

    // Função para determinar a cor baseada no sentimento
    const getSentimentColor = (feeling: string) => {
        switch (feeling.toLowerCase()) {
            case "motivado":
            case "animado":
                return "text-green-400"
            case "cansado":
                return "text-orange-400"
            case "preocupado":
            case "estressado":
                return "text-red-400"
            default:
                return "text-yellow-400"
        }
    }

    // Função para determinar a cor do emoji baseada no label
    const getEmojiColor = (emojiLabel: string) => {
        switch (emojiLabel.toLowerCase()) {
            case "alegre":
                return "text-green-400"
            case "triste":
            case "medo":
                return "text-red-400"
            case "cansado":
                return "text-orange-400"
            case "ansioso":
                return "text-yellow-400"
            default:
                return "text-blue-400"
        }
    }

    // Função para obter status baseado no sentimento
    const getSentimentStatus = (feeling: string) => {
        switch (feeling.toLowerCase()) {
            case "motivado":
                return "Motivado (alto)"
            case "animado":
                return "Animado (alto)"
            case "cansado":
                return "Cansado (médio)"
            case "preocupado":
                return "Preocupado (médio)"
            case "estressado":
                return "Estressado (alto)"
            default:
                return `${feeling} (médio)`
        }
    }

    const StatusCard = ({
        title,
        status,
        statusColor = "text-yellow-400",
        showValue = false,
        value = null,
    }: StatusCardProps) => (
        <TouchableOpacity
            className="bg-white/10 rounded-xl py-4 px-4 shadow-sm mr-3 min-w-[180px] max-w-[220px] border border-white/20"
            style={{
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            <Text className="text-white text-sm font-medium mb-2" numberOfLines={2}>
                {title}
            </Text>
            {showValue && value && (
                <View className="flex-row items-baseline mb-1">
                    <Text className="text-white text-lg font-bold">{value}</Text>
                    <Text className="text-blue-200 text-xs ml-1">(Zona de Alerta)</Text>
                </View>
            )}
            {!showValue && (
                <View className="flex-row items-baseline mb-1">
                    <Text className={`text-base font-bold ${statusColor}`}>{status}</Text>
                </View>
            )}
        </TouchableOpacity>
    )

    const EmojiCard = ({ title, emoji, status, statusColor = "text-yellow-400" }: EmojiCardProps) => (
        <TouchableOpacity
            className="bg-white/10 rounded-xl py-4 px-4 shadow-sm mr-3 min-w-[180px] max-w-[220px] border border-white/20"
            style={{
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            <Text className="text-white text-sm font-medium mb-2">{title}</Text>
            <Text className="text-4xl mb-2">{emoji}</Text>
            <Text className={`text-base font-medium ${statusColor}`}>{status}</Text>
        </TouchableOpacity>
    )

    const Section = ({ title, children }: SectionProps) => (
        <View className="mb-6 w-full">
            <View className="mb-3">
                <Text className="text-white font-bold text-lg">{title}</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-1">
                {children}
            </ScrollView>
        </View>
    )

    return (
        <View className="flex-1 bg-blue-600">
            <StatusBar barStyle="light-content" backgroundColor="#2563eb" />

            {/* Header */}
            <View className="flex justify-center items-start h-16 px-5 border-b border-white/20">
                <Text className="text-white text-lg font-medium">Análises</Text>
            </View>

            {/* Icon Section */}
            <View className="items-center justify-center my-6">
                <View className="bg-blue-500/30 rounded-full p-4 shadow-lg">
                    <Text className="text-4xl">🔍</Text>
                </View>
            </View>

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 90 + Math.max(insets.bottom, 0), // Espaço para tab bar
                }}
            >
                {/* Mapeamento de Riscos para o mês corrente */}
                <View className="mb-6">
                    <Text className="text-white font-bold text-lg mb-3">Mapeamento de Riscos para o mês corrente</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-1">
                        <EmojiCard
                            title="Seu emoji no mês"
                            emoji={checkinData.emoji}
                            status={`${checkinData.emojiLabel} (atual)`}
                            statusColor={getEmojiColor(checkinData.emojiLabel)}
                        />
                        <StatusCard
                            title="Como você se sentia neste mês"
                            status={getSentimentStatus(checkinData.feeling)}
                            statusColor={getSentimentColor(checkinData.feeling)}
                        />
                    </ScrollView>
                </View>

                {/* Fatores de Carga de Trabalho */}
                <Section title="Fatores de Carga de Trabalho">
                    <StatusCard title="Carga de trabalho" status="Alto" statusColor="text-red-400" />
                    <StatusCard title="Trabalho afeta sua qualidade de vida" status="Médio" statusColor="text-yellow-400" />
                    <StatusCard title="Trabalho sem tempo para responder" status="Baixo" statusColor="text-green-400" />
                </Section>

                {/* Sinais de Alerta */}
                <Section title="Sinais de Alerta">
                    <StatusCard
                        title="Sintomas de insônia, irritabilidade ou cansaço extremo"
                        showValue={true}
                        value="2.6"
                        status="2.6"
                        statusColor="text-red-400"
                    />
                    <StatusCard
                        title="Saúde mental prejudica na produtividade no trabalho"
                        showValue={true}
                        value="2.6"
                        status="2.6"
                        statusColor="text-red-400"
                    />
                </Section>

                {/* Diagnóstico de Clima-Relacionamento */}
                <Section title="Diagnóstico de Clima-Relacionamento">
                    <StatusCard
                        title="Relacionamento com seu chefe"
                        showValue={true}
                        value="1.6"
                        status="1.6"
                        statusColor="text-yellow-400"
                    />
                    <StatusCard
                        title="Relacionamento com seus colegas de trabalho"
                        showValue={true}
                        value="0.6"
                        status="0.6"
                        statusColor="text-green-400"
                    />
                    <StatusCard
                        title="Trabalho responde suas mensagens"
                        showValue={true}
                        value="1.0"
                        status="1.0"
                        statusColor="text-yellow-400"
                    />
                </Section>

                {/* Resumo do Check-in Atual */}
                <View className="mb-6">
                    <Text className="text-white font-bold text-lg mb-3">Resumo do Check-in de Hoje</Text>
                    <View className="bg-white/10 rounded-xl p-6 border border-white/20">
                        <View className="flex-row items-center justify-between mb-4">
                            <View className="items-center flex-1">
                                <Text className="text-5xl mb-2">{checkinData.emoji}</Text>
                                <Text className="text-white text-sm">Emoji do Dia</Text>
                                <Text className={`text-base font-semibold ${getEmojiColor(checkinData.emojiLabel)}`}>
                                    {checkinData.emojiLabel}
                                </Text>
                            </View>

                            <View className="w-px h-20 bg-white/20 mx-4" />

                            <View className="items-center flex-1">
                                <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center mb-2">
                                    <Text className="text-2xl">💭</Text>
                                </View>
                                <Text className="text-white text-sm">Sentimento</Text>
                                <Text className={`text-base font-semibold ${getSentimentColor(checkinData.feeling)}`}>
                                    {checkinData.feeling}
                                </Text>
                            </View>
                        </View>

                        {/* Recomendação baseada no estado atual */}
                        <View className="bg-white/10 rounded-lg p-4 mt-4">
                            <Text className="text-white font-medium mb-2">💡 Recomendação:</Text>
                            {(checkinData.feeling === "Estressado" || checkinData.feeling === "Preocupado") && (
                                <Text className="text-blue-200">
                                    Considere técnicas de respiração ou uma pausa para reduzir o estresse.
                                </Text>
                            )}
                            {checkinData.feeling === "Cansado" && (
                                <Text className="text-blue-200">
                                    Que tal fazer uma caminhada ou alongamentos para recarregar as energias?
                                </Text>
                            )}
                            {(checkinData.feeling === "Motivado" || checkinData.feeling === "Animado") && (
                                <Text className="text-blue-200">
                                    Aproveite esse momento positivo para focar em suas metas importantes!
                                </Text>
                            )}
                            {checkinData.emojiLabel === "Ansioso" && (
                                <Text className="text-blue-200">
                                    Pratique mindfulness ou converse com alguém de confiança sobre seus sentimentos.
                                </Text>
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Analise
