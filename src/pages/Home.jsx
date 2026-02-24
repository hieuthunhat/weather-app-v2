import React from 'react';
import {SettingProvider} from "../contexts/SettingContext.jsx";
import BodyLayout from "../layouts/BodyLayout.jsx";

function Home() {
    return (
        <SettingProvider>
            {/*<Header />*/}
            <BodyLayout/>
        </SettingProvider>
    );
}

export default Home;