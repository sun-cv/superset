import prisma from '#lib/prisma.js'



export async function createUser(data)
{
    return await prisma.users.create({data});
}

export function deleteUser()
{

}

export function getUser()
{

}

export function getAllUsers()
{

}