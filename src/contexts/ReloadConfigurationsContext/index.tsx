import { createContext, ReactNode, useContext, useState } from 'react';

type ReloadConfigurationsContextData = {
  stateToReloadConfiguration: boolean;
  setStateToReloadConfiguration: React.Dispatch<React.SetStateAction<boolean>>;
};

type ReloadOperationsProps = {
  children: ReactNode;
}

const ReloadConfigurationContext = createContext({} as ReloadConfigurationsContextData);

export function ReloadConfigurationProvider({children}: ReloadOperationsProps) {
  const [stateToReloadConfiguration, setStateToReloadConfiguration] = useState(false);
  return (
    <ReloadConfigurationContext.Provider value={{stateToReloadConfiguration, setStateToReloadConfiguration}}>
      {children}
    </ReloadConfigurationContext.Provider>
  );
}

export function useReloadConfiguration(): ReloadConfigurationsContextData {
  const context = useContext(ReloadConfigurationContext);

  if(!context) {
    throw new Error('useReloadConfiguration must be used within an NewOperationProvider');
  }

  return context;
}