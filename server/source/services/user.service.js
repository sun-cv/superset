import database from '#lib/prisma.js'


export async function getAllUsers()
{
    const users = await database.users.findMany({ select: { uid: true, email: true, username: true }});
    return users
}

export async function getUser(id)
{
    const user = await database.users.findUnique({ where: { uid: id}, select: { uid: true, email: true, username: true }})
    return user;
}

export async function createUser({ email, password })
{
    await database.users.create({ data: { email, password }});
    return
}

export async function deleteUser({ id })
{
    await database.users.delete({ where: { uid: Number(id)}})
    return
}

export async function updateUser({ email, password, username })
{
    const user      = await database.users.findUnique({ where: { email: email }})
    await database.users.update({ where: { uid: user.uid }, data: { email: email, password: password, username: username}, select: { uid: true, email: true, username: true }});
    return
}
