import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import { router, Redirect } from 'expo-router';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';
export default function App() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center min-h-[85vh] items-center px-4">
          <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode="contain" />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl font-bold text-center text-white">
              Discover Endless Possibilities With {''}{' '}
              <Text className="text-secondary-200">Ai-Vibe</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where creativity meets innovation: embark on a journey of limitless exploration with
          </Text>
          <CustomButton
            title="Continue with Email"
            containerStyles="w-full mt-7"
            handlePress={() => router.push('/sign-in')}
          />
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
}
