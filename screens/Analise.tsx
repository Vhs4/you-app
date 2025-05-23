import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type StatusCardProps = {
    title: string;
    status: string;
    statusColor?: string;
    showValue?: boolean;
    value?: string | null;
}

type EmojiCardProps = {
    title: string;
    emoji: string;
    status: string;
    statusColor?: string;
}

type SectionProps = {
    title: string;
    children: React.ReactNode;
}

type RootStackParamList = {
    Home: undefined;
};

const Analise = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    // Componente de card reutilizável com status
    const StatusCard = ({ title, status, statusColor = 'text-yellow-500', showValue = false, value = null }: StatusCardProps) => (
        <TouchableOpacity 
            className="bg-white bg-opacity-10 rounded-xl py-3 px-4 shadow-sm mr-3 min-w-[180px] max-w-[220px]"
            style={{ 
                borderColor: 'rgba(255,255,255,0.2)', 
                borderWidth: 1,
                display: 'flex',
                justifyContent: 'space-between'
            }}
        >
            <Text className="text-white text-sm font-medium mb-2" numberOfLines={2}>{title}</Text>
            {showValue && value && (
                <View className="flex-row items-baseline mb-1">
                    <Text className="text-white text-lg font-bold">{value}</Text>
                    <Text className="text-white text-xs ml-1">(Zona de Alerta)</Text>
                </View>
            )}
            {!showValue && (
  <Text className={`text-base font-bold ${statusColor}`}>
    {status}
  </Text>
)}

        </TouchableOpacity>
    );

    // Componente de card com emoji
    const EmojiCard = ({ title, emoji, status, statusColor = 'text-yellow-500' }: EmojiCardProps) => (
        <TouchableOpacity 
            className="bg-white bg-opacity-10 rounded-xl py-3 px-4 shadow-sm mr-3 min-w-[180px] max-w-[220px]"
            style={{ 
                borderColor: 'rgba(255,255,255,0.2)', 
                borderWidth: 1,
                display: 'flex',
                justifyContent: 'space-between'
            }}
        >
            <Text className="text-white text-sm font-medium mb-1">{title}</Text>
            <Text className="text-3xl mb-1">{emoji}</Text>
            <Text className={`text-base font-medium ${statusColor}`}>
                {status}
            </Text>
        </TouchableOpacity>
    );

    // Componente de seção reutilizável
    const Section = ({ title, children }: SectionProps) => (
        <View className="mb-6 w-full">
            <View className="mb-3">
                <Text className="text-white font-bold text-lg">{title}</Text>
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
            <Text className="text-white text-lg font-medium">Análises</Text>
            </View>


            {/* Ícone central */}
            <View className="items-center justify-center my-4">
                <View className="bg-blue-500 bg-opacity-30 rounded-full p-3">
                    <Text className="text-3xl">🔍</Text>
                </View>
            </View>

            {/* Conteúdo principal com scroll */}
            <ScrollView className="flex-1 px-5">
                {/* Seção de Mapeamento de Riscos */}
                <View className="mb-6">
                    <Text className="text-white font-bold text-lg mb-3">Mapeamento de Riscos para o mês corrente</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-1">
                        <EmojiCard 
                            title="Seu emoji no mês" 
                            emoji="🤔" 
                            status="Ansioso (ligado)" 
                            statusColor="text-yellow-500"
                        />
                        <StatusCard 
                            title="Como você se sentia neste mês" 
                            status="Estressado (médio)"
                            statusColor="text-orange-500"
                        />
                    </ScrollView>
                </View>

                {/* Seção de Fatores de Carga de Trabalho */}
                <Section title="Fatores de Carga de Trabalho">
                    <StatusCard 
                        title="Carga de trabalho" 
                        status="Alto"
                        statusColor="text-red-500"
                    />
                    <StatusCard 
                        title="Trabalho afeta sua qualidade de vida" 
                        status="Médio"
                        statusColor="text-yellow-500"
                    />
                    <StatusCard 
                        title="Trabalho sem tempo para responder" 
                        status="Baixo"
                        statusColor="text-green-500"
                    />
                </Section>

                {/* Seção de Sinais de Alerta */}
                <Section title="Sinais de Alerta">
                    <StatusCard 
                        title="Sintomas de insônia, irritabilidade ou cansaço extremo" 
                        showValue={true}
                        value="2.6"
                        status="2.6"
                        statusColor="text-red-500"
                    />
                    <StatusCard 
                        title="Saúde mental prejudica na produtividade no trabalho" 
                        showValue={true}
                        value="2.6"
                        status="2.6"
                        statusColor="text-red-500"
                    />
                </Section>

                {/* Seção de Diagnóstico de Clima-Relacionamento */}
                <Section title="Diagnóstico de Clima-Relacionamento">
                    <StatusCard 
                        title="Relacionamento com seu chefe" 
                        showValue={true}
                        value="1.6"
                        status="1.6"
                        statusColor="text-yellow-500"
                    />
                    <StatusCard 
                        title="Relacionamento com seus colegas de trabalho" 
                        showValue={true}
                        value="0.6"
                        status="0.6"
                        statusColor="text-green-500"
                    />
                    <StatusCard 
                        title="Trabalho responde suas mensagens" 
                        showValue={true}
                        value="1.0"
                        status="1.0"
                        statusColor="text-yellow-500"
                    />
                </Section>

                {/* Espaço adicional no final para garantir que todo o conteúdo seja visível */}
                <View className="h-20" />
            </ScrollView>

            {/* Barra de navegação inferior */}
            <View className="flex-row justify-around items-center py-3 bg-white">
                <TouchableOpacity className="items-center" onPress={() => navigation.navigate('Home')}>
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
                    />
                </TouchableOpacity>
                <TouchableOpacity className="items-center">
                    <Text className="text-2xl">⚙️</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Analise;
