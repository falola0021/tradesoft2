// Rest of the import statements
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Gilro-Bold': require('./assets/fonts/gilroy/Gilroy-Bold.ttf'),
  });

  // ...
}
