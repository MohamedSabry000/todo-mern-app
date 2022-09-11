import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../redux/todos/todos-slice';
import { Todo } from '../@types/types';
import { SingleCard } from './';

function TodoList() {
  const { todos } = useSelector((state: any) => {
    console.log(state);
    return state
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos() as any);
  }, [dispatch]);

  return (
    <div>
      {
        todos?.map((todo: Todo) => (
          <div key={todo.id}>
            <SingleCard todo={todo} />
          </div>
        ))
      }
    </div>
  )
}

export default TodoList