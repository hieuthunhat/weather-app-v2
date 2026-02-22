import moment from "moment-timezone";
import {getWeatherIcon} from "../consts/iconMaps";

export const buildForecastURL = ({url, obj, latitude, longitude}) => {
    if (latitude == null || longitude == null) {
        return null;
    }

    const query = Object.entries(obj)
        .filter(([_, value]) => Array.isArray(value) && value.length > 0)
        .map(([key, value]) => `${key}=${value.join(",")}`)
        .join("&");

    return `${url}?latitude=${latitude}&longitude=${longitude}&${query}&timeformat=unixtime`;
};

/**
 * @param {number} unix - unix timestamp (seconds)
 * @param {string} tz - timezone, ví dụ: "Asia/Ho_Chi_Minh"
 * @param {string} format - format output
 * @param allowHours
 */
export const formatUnixWithTZ = (
    {
        unix,
        tz = moment.tz.guess(),
        format = "dddd DD-MM-YYYY",
        allowHours = false
    }
) => {
    let finalFormat = format;
    if (!unix) return "";
    if (allowHours) {
        finalFormat = format + " h:mm A";
    }

    return moment.unix(unix).tz(tz).format(finalFormat);
};

/**
 *
 * @param {*} param0
 * @returns
 */
export function WeatherIcon({weatherCode, is_day, size = 48}) {
    const Icon = getWeatherIcon(weatherCode, is_day);
    const color = getWeatherColor(weatherCode, is_day);
    return (
        <Icon
            size={size}
            color={color}
            className={`weather-icon ${getIconClass(weatherCode)}`}
        />
    );
}

export function getWeatherColor(weatherCode, isDay) {
    if (weatherCode === 0) return isDay ? "#FDB813" : "#4A6FA5";

    if ([1, 2, 3].includes(weatherCode)) return "#90A4AE";

    if ([45, 48].includes(weatherCode)) return "#B0BEC5";

    if (
        [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)
    )
        return "#4FC3F7";

    if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) return "#E1F5FE";

    if ([95, 96, 99].includes(weatherCode)) return "#9575CD";

    return "#90A4AE";
}

function getIconClass(weatherCode) {
    if (weatherCode === 0) return "sun";
    if ([61, 63, 65, 80, 81, 82].includes(weatherCode)) return "rain";
    if ([71, 73, 75, 85, 86].includes(weatherCode)) return "snow";
    if ([95, 96, 99].includes(weatherCode)) return "thunder";
    return "";
}
