import  JWT from "jsonwebtoken"

const gentoken = async ( userId ) =>{

    try {
        const token =  await JWT.sign({userId} , process.env.JWT_SCREATE, { expiresIn: "10y"})

        return token
    } catch (error) {
         return res.status(500).json(  `gen tone error ${error}`)
    }
}


export default gentoken