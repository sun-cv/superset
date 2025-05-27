import * as users_service   from '#services/user.service.js'

export async function getAllUsers(request, response)
{
    try
    {
        const users = await users_service.getAllUsers();
        response.status(201).json(users)
    }
    catch(error)
    {
        response.status(500).json({ error: "Get all users failed" })
    }
}

export async function getUser(request, response)
{
    const { id } = request.params
    
    try 
    {
        await users_service.getUser(Number(id))
        response.status(201).json(user)
    }
    catch(error)
    {
        response.status(500).json({ error: 'Get user failed' })
    }
}


export async function createUser(request, response)
{
    const { email, password } = request.body

    try 
    {
        await users_service.createUser({ email, password });
        response.status(201)
    } 
    catch (error) 
    {
        response.status(500).json({ error: 'Create user failed' })
    }


    }

export async function deleteUser(request, response)
{
    const { id } = request.params

    try
    {
        await users_service.deleteUser({ id })
        response.status(201)
    }
    catch(error)
    {
        response.status(500).json({ error: "Delete user failed" })
    }
}

export async function updateUser(request, response)
{
    const { email, password, username } = request.body
    
    try 
    {
        await users_service.updateUser({ email, password, username })
        response.status(201)
    }
    catch (error)
    {
        console.log(error)
        response.status(500).json({ error: "Update user failed" })    
    }

}

