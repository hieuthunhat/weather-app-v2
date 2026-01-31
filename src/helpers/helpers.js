export const buildForecastURL = ({url, obj, latitude, longitude}) => {
    if (latitude == null || longitude == null) {
        return null;
    }

    const query = Object.entries(obj)
        .filter(([_, value]) => Array.isArray(value) && value.length > 0)
        .map(([key, value]) => `${key}=${value.join(',')}`)
        .join('&');

    return `${url}?latitude=${latitude}&longitude=${longitude}&${query}&timeformat=unixtime`;
};
