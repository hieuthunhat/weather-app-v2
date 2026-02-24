import React from 'react';
import {useSelector} from "react-redux";

function Analytics() {
    const location = useSelector((state) => state.weather.location);
    console.log(location);
    return (
        <div></div>
    );
}

export default Analytics;