import * as exercise_service from '#services/exercise.service.js'



export async function getAllExercises(request, response)
{
    try
    {
        const exercises = await exercise_service.getAllExercises()    
        response.status(201).json(exercises)
    }
    catch (error)
    {
       response.status(500).json({ error: 'Get all exercises failed' }); 
    }
}

export async function getExercise(request, response)
{
    const { id } = request.body
    try 
    {
        const exercise = await exercise_service.getExercise(id)   
        response.status(201).json(exercise)
    }
    catch (error)
    {
        response.status(500).json({ error: `Get exercise ${id} failed` })    
    }
}

export async function createCustomExercise(request, response)
{
    const { } = request.body
    try 
    {
        await exercise_service.createCustomExercise({ })
    }
    catch (error)
    {
        
    }
}