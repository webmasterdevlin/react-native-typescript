import 'react-native-gesture-handler';
import React from 'react';
import RootNavigation from './app/navigation/root-navigation';
import {Provider as PaperProvider} from 'react-native-paper';
declare var global: {HermesInternal: null | {}};

const App = () => {
  return (
    <PaperProvider>
      <RootNavigation />
    </PaperProvider>
  );
};
export default App;
