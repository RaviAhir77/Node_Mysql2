import bcrypt from "bcryptjs";

const salt = 10;

export const hashPass = async(pass) =>{
    try{
        const hasedPass = await bcrypt.hash(pass,salt)
        console.log(hasedPass)
        return hasedPass
    }catch(error){
        console.log('hassing password have a error')   
        throw error
    }
}

export const verifyPass = async(pass,dbpass) => {
    try{
        return await bcrypt.compare(pass,dbpass)
    }catch(error){
        throw error    
    }
}