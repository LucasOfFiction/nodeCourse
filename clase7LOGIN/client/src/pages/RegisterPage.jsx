import {useForm} from 'react-hook-form'
import { registerRequest } from '../api/auth'


function RegisterPage() {
    const {register, handleSubmit} = useForm()
    const onSubmit = handleSubmit ( async (values)=> {
        const res = await registerRequest(values)
        console.log(res)})
    return(
        <div className='bg-zinc-900 max-w-md p-10 rounded-md'>
            
            {/* en lugar de estilizar los elementos por separado puedo transformalos en un componenete reutilizable, investigar más para poder hacerlo */}
            
            <form onSubmit={onSubmit}>
                <input type="text" {...register('username',{required:true})}
                className='w-full bg-zinc-800 text-white px-4 py-2 rounded-md my-2'
                placeholder='Username'
                />   
                <input type="email" {...register('email', {required:true})}
                className='w-full bg-zinc-800 text-white px-4 py-2 rounded-md my-2'
                placeholder='Email'
                />
                <input type="password" {...register('password', {required:true})}
                className='w-full bg-zinc-800 text-white px-4 py-2 rounded-md my-2'
                placeholder='Password'
                />
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