import React, { useEffect, useRef, useCallback } from "react";
import { WebView } from "react-native-webview";
import { SafeAreaView, BackHandler, StyleSheet } from "react-native";
import Constants from "expo-constants";

export default function App(props) {
  const webviewRef = useRef(null);
  const uri = "https://nbbang.shop";
  const onAndroidBackPress = useCallback(() => {
    if (webviewRef.current) {
      webviewRef.current.goBack();
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onAndroidBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onAndroidBackPress);
    };
  }, [onAndroidBackPress]);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        allowsBackForwardNavigationGestures={
          props.allowsBackForwardNavigationGestures ?? true
        }
        ref={webviewRef}
        style={styles.container}
        source={{ uri: uri }}
        userAgent={
          "Mozilla/5.0 (Linux; Android 13; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36"
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight / 2,
  },
});
