'use client';

import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import * as apiTodo from "@/actions/todos.actions"
import { useRouter } from "next/navigation";


export const NewTodo = () => {
    const router = useRouter()
    const [description, setDescription] = useState('')
    
    const onSubmit = async(e:FormEvent) => {
        e.preventDefault()
        if ( ! description.trim().length) return
        console.log('dec:', description)
        await apiTodo.createTodo(description)
        router.refresh()
        setDescription('')
    }

    const deleteMany = async(e:FormEvent) => {
        e.preventDefault()
        const count = await apiTodo.deleteManyTodo()
        console.log('eliminados', count)
        router.refresh()
    }

    return (
        <form className='flex w-full' onSubmit={onSubmit}>
            <input 
                type="text"
                onChange={e => setDescription(e.target.value)}
                className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
                placeholder="¿Qué necesita ser hecho?" />

            <button type='submit' className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
                Crear
            </button>

            <span className='flex flex-1'></span>

            <button
                type='submit' 
                onClick={ (e) => deleteMany(e) }
                className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
                <IoTrashOutline />
                <span className="ml-2">Borrar compleatdos</span>
            </button>


        </form>
    )
}