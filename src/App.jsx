import './App.css'
import AppRoutes from './AppRoutes.jsx'
import AppLayout from './layouts/AppLayout'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import store from './store/store.js'
import {SettingProvider} from "./contexts/SettingContext.jsx";
import Header from "./components/Header/Header.jsx";
import {ThemeProvider} from "./contexts/ThemeContext.jsx";

function App() {

    return (
        <Provider store={store}>
            <SettingProvider>
                <BrowserRouter>
                    <ThemeProvider>
                        <AppLayout>
                            <div className={'header-container'}>
                                <Header/>
                            </div>
                            <AppRoutes/>
                        </AppLayout>
                    </ThemeProvider>
                </BrowserRouter>
            </SettingProvider>
        </Provider>

    )
}

export default App
