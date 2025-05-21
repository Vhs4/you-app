import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    Configuracoes: undefined;
};

const Home = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-2xl font-bold mb-4">Home Screen</Text>

            <TouchableOpacity
                className="bg-blue-500 px-4 py-2 rounded"
                onPress={() => navigation.navigate('Configuracoes')}
            >
                <Text className="text-white font-semibold">Ir para a página de configurações</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home