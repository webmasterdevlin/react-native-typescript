import React from 'react';
import RootNavigation from './root-navigation';
import {Provider as PaperProvider} from 'react-native-paper';

const NavigationWrapper: React.FC<void> = () => {
  return (
    <PaperProvider>
      <RootNavigation />
    </PaperProvider>
  );
};
export default NavigationWrapper;
