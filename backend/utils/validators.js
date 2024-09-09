
import Joi from "joi";

const authSchema =Joi.object({
    username:Joi.string().lowercase().required().trim(),
    password:Joi.string().regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@#$!%*?&]{8,}$/
    ),
    email:Joi.string().trim()
})

export default authSchema
