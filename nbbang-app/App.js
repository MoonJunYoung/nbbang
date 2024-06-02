import React, { useEffect, useRef, useCallback } from "react";
import { WebView } from "react-native-webview";
import {
  SafeAreaView,
  BackHandler,
  Platform,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";
import Constants from "expo-constants";

export default function App(props) {
  const webviewRef = useRef(null);
  const uri = "https://nbbang.shop";
  const onAndroidBackPress = useCallback(() => {
    if (webviewRef.current) {
      webviewRef.current.goBack();
      return true; // prevent default behavior (exit app)
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
        //style={styles.container}
        source={{ uri: uri }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
