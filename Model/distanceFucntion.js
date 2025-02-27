import axios from 'axios';
const OPENCAGE_API_KEY = 'a5896d377db44f1eb05edc7fa73ac50c';

export function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; 
    return distance;
}

export async function getCityCoordinates(city) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${OPENCAGE_API_KEY}&limit=1`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        
        if (data.results.length === 0) {
            throw new Error(`No results found for ${city}`);
        }

        const { lat, lng } = data.results[0].geometry;
        return { lat, lng };
    } catch (error) {
        console.error(`Error geocoding ${city}:`, error.message);
        throw error;
    }
}