import {
  WiDaySunny,
  WiNightClear,

  WiDayCloudy,
  WiNightAltCloudy,

  WiCloudy,
  WiFog,

  WiSprinkle,
  WiDayRain,
  WiNightAltRain,

  WiSnowflakeCold,
  WiSnow,
  WiSnowWind,

  WiShowers,

  WiThunderstorm,
  WiDayThunderstorm,
  WiNightAltThunderstorm,

  WiHail
} from "react-icons/wi";

export function getWeatherIcon(weatherCode, isDay) {
  const day = isDay === 1;

  switch (weatherCode) {
    // 0: Clear sky
    case 0:
      return day ? WiDaySunny : WiNightClear;

    // 1,2,3: Mainly clear, partly cloudy, overcast
    case 1:
    case 2:
      return day ? WiDayCloudy : WiNightAltCloudy;
    case 3:
      return WiCloudy;

    // 45,48: Fog
    case 45:
    case 48:
      return WiFog;

    // 51,53,55: Drizzle
    case 51:
    case 53:
    case 55:
      return WiSprinkle;

    // 56,57: Freezing Drizzle
    case 56:
    case 57:
      return WiSnowflakeCold;

    // 61,63,65: Rain
    case 61:
    case 63:
    case 65:
      return day ? WiDayRain : WiNightAltRain;

    // 66,67: Freezing Rain
    case 66:
    case 67:
      return WiSnowflakeCold;

    // 71,73,75: Snow fall
    case 71:
    case 73:
    case 75:
      return WiSnow;

    // 77: Snow grains
    case 77:
      return WiSnowWind;

    // 80,81,82: Rain showers
    case 80:
    case 81:
    case 82:
      return WiShowers;

    // 85,86: Snow showers
    case 85:
    case 86:
      return WiSnowWind;

    // 95: Thunderstorm
    case 95:
      return day ? WiDayThunderstorm : WiNightAltThunderstorm;

    // 96,99: Thunderstorm with hail
    case 96:
    case 99:
      return WiHail;

    default:
      return WiCloudy;
  }
}
