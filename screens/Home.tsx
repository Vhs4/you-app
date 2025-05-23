import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

type RootStackParamList = {
    Analise: undefined;
};

type CardProps = {
    title: string;
    status?: string;
    emoji?: string;
};

type SectionProps = {
    title: string;
    actionText?: string;
    children: React.ReactNode;
};

const Home = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
    // Componente de card reutilizável
    const Card = ({ title, status = 'Não Respondido', emoji }: CardProps) => (
        <TouchableOpacity 
            className="bg-white rounded-xl p-4 shadow-sm mr-3 min-w-[120px] max-w-[150px]"
            style={{ elevation: 2 }}
        >
            {emoji && (
                <View className="mb-2">
                    <Text className="text-4xl">{emoji}</Text>
                </View>
            )}
            <Text className="text-blue-900 font-medium mb-2" numberOfLines={3}>{title}</Text>
            <Text className={`text-xs ${status === 'Não Respondido' ? 'text-gray-500' : status === 'Ansioso' || status === 'Estressado' ? 'text-red-500' : 'text-blue-500'}`}>
                {status}
            </Text>
        </TouchableOpacity>
    );

    // Componente de seção reutilizável
    const Section = ({ title, actionText = "Responder", children }: SectionProps) => (
        <View className="mb-6 w-full">
            <View className="flex-row justify-between items-center mb-3">
                <Text className="text-white font-bold text-lg">{title}</Text>
                <TouchableOpacity>
                    <Text className="text-green-300 text-sm">{actionText}</Text>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-1">
                {children}
            </ScrollView>
        </View>
    );

    return (
        <View className="flex-1 bg-blue-600">
            {/* Cabeçalho */}
                <View className="flex justify-center items-start h-16 px-5 border-b border-white">
                <Text className="text-white text-lg font-medium">Início</Text>
                </View>

            {/* Conteúdo principal com scroll */}
            <ScrollView className="flex-1 mt-4 px-5">
                {/* Seção de Mapeamento de Riscos */}
                <Section title="Mapeamento de Riscos">
                    <Card 
                        title="Seu emoji hoje" 
                        status="Ansioso" 
                        emoji="🤔" 
                    />
                    <Card 
                        title="Como você se sente hoje" 
                        status="Estressado" 
                    />
                </Section>

                {/* Seção de Fatores de Carga de Trabalho */}
                <Section title="Fatores de Carga de Trabalho">
                    <Card title="Carga de trabalho" />
                    <Card title="Trabalho afeta sua qualidade de vida" />
                    <Card title="Trabalho sem tempo para responder" />
                </Section>

                {/* Seção de Sinais de Alerta */}
                <Section title="Sinais de Alerta">
                    <Card title="Sintomas de insônia, irritabilidade ou cansaço extremo" />
                    <Card title="Saúde mental prejudica na produtividade no trabalho" />
                </Section>

                {/* Seção de Diagnóstico de Clima-Relacionamento */}
                <Section title="Diagnóstico de Clima-Relacionamento">
                    <Card title="Relacionamento com seu chefe" />
                    <Card title="Relacionamento com seus colegas de trabalho" />
                    <Card title="Trabalho responde suas mensagens" />
                </Section>

                {/* Espaço adicional no final para garantir que todo o conteúdo seja visível */}
                <View className="h-4" />
            </ScrollView>

            {/* Barra de navegação inferior */}
            <View className="flex-row justify-around items-center py-3 bg-white">
                <TouchableOpacity className="items-center">
                    <Text className="text-2xl">🏠</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                                    className="items-center justify-center bg-cyan-400 rounded-full w-12 h-12 -mt-2"
                                    style={{ elevation: 4 }}
                                >
                                    <Image 
                                        source={require('../assets/you-softtek-u.png')} 
                                        style={{ width: 24, height: 24 }} 
                                        resizeMode="contain"
                                    /></TouchableOpacity>
                <TouchableOpacity 
                    className="items-center"
                    onPress={() => navigation.navigate('Analise')}
                >
                    <Text className="text-2xl">⚙️</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Home;
