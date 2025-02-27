import {calculateDistance,getCityCoordinates} from '../Model/distanceFucntion.js'
import pool from "../config/db.js";


export async function getDistanceBetweenCities(req,res) {
    const {city1,city2} = req.body

    if(!city1 || !city2){
        return res.status(400).json({ message: 'both city is a required' });
    }

    try {
        
        const coords1 = await getCityCoordinates(city1);
        const coords2 = await getCityCoordinates(city2);

        const distance = calculateDistance(coords1.lat, coords1.lng, coords2.lat, coords2.lng);

        console.log(`Distance between ${city1} and ${city2}:`);
        console.log(`${distance.toFixed(2)} kilometers`);
        res.status(200).json({ message: `distance between ${city1} and ${city2}`,distance : Number(distance.toFixed(2)) , unite : 'KM' });
    } catch (error) {
        console.error('Failed to calculate distance:', error.message);
    }
}


export const DistanceCustom = async(req,res) => {
    const {city1,city2} = req.body

    const query = `SELECT name, lat, lng FROM gujaratcities WHERE name IN (?, ?);`

    try{
        const value = [city1,city2]
        const [result] = await pool.query(query,value)

        if(result.length < 2){
            return res.status(400).json({ 
                message: `only available city is : [Ahmedabad,Surat,Vadodara,Rajkot,
                        Bhavnagar,Jamnagar,Gandhinagar,Anand,Navsari,Morbi]`
            });
        }

        

        const lat1 = Number(result[0].lat)
        const lng1 = Number(result[0].lng)
        const lat2 = Number(result[1].lat)
        const lng2 = Number(result[1].lng)

        // console.log('all long lat : ',lat1,lng1,lat2,lng2)

        const distance = calculateDistance(lat1,lng1,lat2,lng2).toFixed(2) + " KM";

        res.status(200).json({message : `distance between a ${city1} to ${city2}`,distance : distance });
    }catch(error){
        res.status(500).json({ message: 'server error' });
    }
}