import './App.css'
import AppRoutes from './AppRoutes.jsx'
import AppLayout from './layouts/AppLayout'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import store from './store/store.js'
import {SettingProvider} from "./contexts/SettingContext.jsx";
import Header from "./components/Header/Header.jsx";
import {ThemeProvider} from "./contexts/ThemeContext.jsx";
import {useContext} from "react";
import {SettingContext} from "./contexts/SettingContext.jsx";

function AppContent() {
    const {onboardingDone} = useContext(SettingContext);

    return (
        <AppLayout>
            {onboardingDone && (
                <div className={'header-container'}>
                    <Header/>
                </div>
            )}
            <AppRoutes/>
        </AppLayout>
    )
}

function App() {

    return (
        <Provider store={store}>
            <SettingProvider>
                <BrowserRouter>
                    <ThemeProvider>
                        <AppContent/>
                    </ThemeProvider>
                </BrowserRouter>
            </SettingProvider>
        </Provider>

    )
}

export default App
