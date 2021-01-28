export const getCentigrade = (data) => {
    const KELVIN = 273.15;
    return Math.floor(data - KELVIN);
}