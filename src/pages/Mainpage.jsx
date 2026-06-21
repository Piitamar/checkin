import { useState, useEffect } from 'react'
import TodoList from '../features/todos/TodoList';
import TodoInput from '../features/todos/TodoInput';
import useTodo from '../features/todos/useTodo';
import useGroup from '../features/todos/useGroup';
import useTodos from '../features/todos/useTodos';

export default function Mainpage() {
  const {createTodo, deleteTodo, markDoneTodo} = useTodos();
  const [text, setText] = useState('')
  const [toast, setToast] = useState('')
  const { todos, setTodos } = useTodo();
  const group = useGroup({ todos });

  //Tạo alert cho toast
  useEffect(() => {
      if (!toast) return 

      const t = setTimeout(() => {
        setToast('')
      }, 2000)

      return () => {
        clearTimeout(t)
      }
  }, [toast])

  const onAdd = async () => {
      //Nếu ko nhập gì, báo lỗi
      if (!text || text.trim() === '') {
      setToast('Please enter your note!')
      return; 
      }
      //Lưu vào db, trả toast, todos
      const result = await createTodo(text);
      if (result.success) {
        setToast('Da luu')
        setTodos(prev => [result.data, ...prev])
        setText('')
      }
      else {
        setToast(result.error)
      }
  }

  const onDelete = async(id) => {
      const result = await deleteTodo(id);
      if (result.success) {
        setTodos(prev => prev.filter(todo => todo.id !== id))
        setToast('Da xoa')
      }
      else {
        setToast(result.error)
      }
  }

  const onMarkDone = async(state, id) => {
      const result = await markDoneTodo(state, id);

      if (result.success){
        setTodos(prev =>
          prev.map(todo =>
            todo.id === id
              ? { ...todo, markdone: state }
              : todo
          )
        );
        setToast('Đã update markdone');
      }

      else {
        setToast(result.error)
      }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <TodoInput  text={text} 
                  setText={setText} 
                  onAdd={onAdd}
                  toast={toast} />

      <TodoList   group={group}
                  onDelete={onDelete}
                  onMarkDone={onMarkDone} />
                    
    </main>
  )
}
