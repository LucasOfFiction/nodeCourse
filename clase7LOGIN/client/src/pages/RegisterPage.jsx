import {useForm} from 'react-hook-form'
import { useAuth } from '../context/authContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm()
    const {signup, isAuthenticated, errors: registerErrors} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/tasks')
        }
    }, [isAuthenticated])


    const onSubmit = handleSubmit ( async (values)=> {signup(values)})

    return(
        <div className='bg-zinc-900 max-w-md p-10 rounded-md'>
            {
                registerErrors.map((error, i)=>(
                    <div className='bg-red-500 p-2 text-white' key={i}>
                        {error}
                    </div>
                ))
            }
            {/* en lugar de estilizar los elementos por separado puedo transformalos en un componenete reutilizable, investigar más para poder hacerlo */}
            
            <form onSubmit={onSubmit}>
                <input type="text" {...register('username',{required:true})}
                className='w-full bg-zinc-800 text-white px-4 py-2 rounded-md my-2'
                placeholder='Username'
                />   
                {errors.username && <p className='text-red-500'>Username is required</p>}
                <input type="email" {...register('email', {required:true})}
                className='w-full bg-zinc-800 text-white px-4 py-2 rounded-md my-2'
                placeholder='Email'
                />
                {errors.email && <p className='text-red-500'>Email is required</p>}
                <input type="password" {...register('password', {required:true})}
                className='w-full bg-zinc-800 text-white px-4 py-2 rounded-md my-2'
                placeholder='Password'
                />
                {errors.password && <p className='text-red-500'>Password is required</p>}
                <button type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >
                    REGISTER
                </button>
            </form>
        </div>
    )
        
    }
    
    export default RegisterPage