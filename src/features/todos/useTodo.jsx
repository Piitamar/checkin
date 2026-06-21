import useTodos from './useTodos';
import { useState, useEffect } from 'react';

export default function useTodo() {
    const { loadTodos } = useTodos()
    const [todos, setTodos] =  useState([])

    //set todos
    useEffect(() => {
      async function fetchData() {
        const res = await loadTodos()
        setTodos(res)
      }
  
      fetchData()
    }, [])

    return { todos, setTodos };
}
