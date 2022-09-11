import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Todo } from '../@types/types';
import { Grid } from '@mui/material';

export default function SingleCard({ todo }: { todo: Todo }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
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
            Status:
            <Typography variant="body2" color="text.secondary">
              {todo.status}
            </Typography>
          </Grid>
          <Grid item sm={6}>
            Priority:
            <Typography variant="body2" color="text.secondary">
              {todo.priority}
            </Typography>
          </Grid>
        </Grid>
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
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}