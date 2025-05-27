
// test validation
export function userData(request, response, next) 
{
    const requiredFields    = ["email", "username", "password"]
    const missingValue      = requiredFields.filter(field => !Object.keys(request.body).includes(field));

    if (missingValue.length > 0) 
    {
        return response.status(400).json({ error: `Missing required field: ${missingValue.join(', ')}`})
    }

    next()
}
