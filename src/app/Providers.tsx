import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { store, persistor } from '@/store'
import { lightTheme, darkTheme } from '@/lib/theme'
import { useAppSelector } from '@/hooks/redux'

interface ProvidersProps {
  children: React.ReactNode
}

const ThemeWrapper = ({ children }: ProvidersProps) => {
  const mode = useAppSelector((s) => s.theme.mode)
  const theme = mode === 'dark' ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <div className={mode}>{children}</div>
    </ThemeProvider>
  )
}

const InnerProviders = ({ children }: ProvidersProps) => (
  <BrowserRouter>
    <ThemeWrapper>{children}</ThemeWrapper>
  </BrowserRouter>
)

export const Providers = ({ children }: ProvidersProps) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <InnerProviders>{children}</InnerProviders>
    </PersistGate>
  </Provider>
)
