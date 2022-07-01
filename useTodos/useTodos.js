import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

const initialState = [];

const init = () => {
  return JSON.parse( localStorage.getItem('todos') ) || [];
}

export const useTodos = () => {

  const [ todos, dispatch ] = useReducer( todoReducer, initialState, init );

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify( todos ));
  }, [todos])

  const todosCount = todos.length;
  const pendingTodosCount = todos.filter( ({ done }) => !done ).length;
  
  const onNewTodo = ( todo ) => {

    const action = {
      type: '[TODO] Add Todo',
      payload: todo
    }
  
    dispatch( action );
  
  }

  const onDeleteTodo = ( id ) => {
    
    const action = {
      type: '[TODO] Remove Todo',
      payload: id
    }

    dispatch( action );

  }

  const onToggleTodo = ( id ) => {

    const action = {
      type: '[TODO] Toggle Todo',
      payload: id
    }

    dispatch( action );

  }

  return {
    todos, 
    todosCount, 
    pendingTodosCount,
    onDeleteTodo,
    onToggleTodo,
    onNewTodo
  }
}
