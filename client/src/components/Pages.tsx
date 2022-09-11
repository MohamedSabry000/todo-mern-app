import { Grid } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Todo } from '../@types/types';
import { SingleCard } from './';

function Pages() {
  const { page } = useParams();
  const { todos } = useSelector((state: any) => state);

  const renderPage = (p: string) => {
    const find = todos?.filter((todo: Todo) => todo.status === p)
    console.log(find)
    return find.length === 0
      ? <h1>Not Found</h1>
      : <Grid container spacing={2}>
          {
            find.map((todo: Todo) => (
              <Grid item xs={12} sm={6} md={4} key={todo._id}>
                <SingleCard todo={todo} />
              </Grid>
            ))
          }
        </Grid>
  }


  return (
    <main className='flex-center'>
      {renderPage(page || 'all')}
    </main>
    )
}

export default Pages