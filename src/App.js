// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useEffect } from 'react';
import { GestureHandlerRootView, } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider as PaperProvider } from 'react-native-paper';
// =================================================================== 
// Store
// ===================================================================
import { store, persistor } from 'reduxConfiguration/store'
// =================================================================== 
// Root
// ===================================================================
import Root from './Root'
// =================================================================== 
import { SplashScreen } from 'components'

export default function App() {

  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAppReady(true);
    }, 500)
  }, []);

  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PaperProvider>
          <PersistGate persistor={persistor}>
            <SplashScreen isAppReady={isAppReady}>
              {isAppReady && <Root />}
            </SplashScreen>
          </PersistGate>
        </PaperProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
