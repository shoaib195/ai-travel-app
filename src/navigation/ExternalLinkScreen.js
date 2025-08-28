import { useEffect } from "react";

export default function ExternalLinkScreen({ navigation }) {
    useEffect(() => {
      // Linking.openURL('https://your-link.com');
      navigation.goBack();
    }, [navigation]);
  
    return null;
}``