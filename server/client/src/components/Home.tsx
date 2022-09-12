import { Container, Grid } from '@mui/material'
import React from 'react'
import {TodoForm, TodoList} from './'

function Home() {
  return (
    <Container component="main" maxWidth="lg" style={{margin: "10px auto"}}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          <div>
            <TodoForm />
          </div>
        </Grid>
        <Grid item xs={12} lg={8}>
          <div>
            <TodoList />
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home