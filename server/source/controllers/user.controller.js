import * as users_service   from '#services/user.service.js'

export function getAllUsers(request, response)
{

}

export function getUser(request, response)
{

}


export async function createUser(request, response)
{
    const { name, email, age } = request.body
    try 
    {
        const user = await users_service.createUser({name, email, age});
        response.status(201).json(user);
    } 
    catch (error) 
    {
        response.status(500).json({ error: 'Creat user failed'})
    }


    }

export function deleteUser(request, response)
{

}

export function updateUser(request, response)
{

}

