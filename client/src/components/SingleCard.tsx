import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Todo } from '../@types/types';
import { Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { resetFormState, updateTodo } from '../redux/todos/todos-slice';

export default function SingleCard({ todo }: { todo: Todo}) {
  const dispatch = useDispatch();
  const handleUpdate = () => {
    dispatch(updateTodo(todo))
  }

  const styles = {
    heading: {
      width: "100%",
      height: "20px",
      fontWeight: "bold",
      textAlign: "center",
      borderBottom: "1px solid black",
      background: todo.priority === "high" ? "red" : todo.priority === "medium" ? "yellow" : "green",
      color: todo.priority === "high" ? "white" : todo.priority === "medium" ? "black" : "white",
    }
  } as any;

  return (
    <Card sx={{ maxWidth: 345 }} style={{margin: "10px"}}>
      <div style={styles?.heading || {}}>
          {todo.status}
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {todo.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {todo.description}
        </Typography>
        <hr />
        <Grid container spacing={2}>
          <Grid item sm={6}>
            From:
            <Typography variant="body2" color="text.secondary">
              {todo.startDate}
            </Typography>
          </Grid>
          <Grid item sm={6}>
            To:
            <Typography variant="body2" color="text.secondary">
              {todo.endDate}
            </Typography>
          </Grid>
        </Grid>


      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleUpdate}>edit</Button>
        <Button size="small">delete</Button>
      </CardActions>
    </Card>
  );
}