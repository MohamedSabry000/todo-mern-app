import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../redux/todos/todos-slice';
import { Todo } from '../@types/types';
import { SingleCard } from './';
import { Grid } from '@mui/material';

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
      <Grid container spacing={2}>
      {
        todos?.map((todo: Todo) => (
          <Grid item xs={12} sm={6} md={4} key={todo._id}>
            <SingleCard todo={todo} />
          </Grid>
        ))
      }
      </Grid>
    </div>
  )
}

export default TodoList