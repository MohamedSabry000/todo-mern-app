import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodo, editTodo, resetFormState } from "../redux/todos/todos-slice";

const pages = [
  {key: 'todo', value: 'Todo'},
  {key: 'in-progress', value: 'In Progress'},
  {key: 'under-review', value: 'Under Review'},
  {key: 'rework', value: 'Rework'},
  {key: 'completed', value: 'Completed'}
]

const initialData = {
  _id: '',
  title: '',
  description: '',
  priority: 'low',
  status: 'todo',
  startDate: new Date().toISOString().split('T')[0],
  endDate: new Date().toISOString().split('T')[0]
}

function TodoForm() {
  const dispatch = useDispatch()
  const { todo, formState } = useSelector((state: any) => state);

  const [user, setUser] = useState(initialData);
  const priorityRef = useRef();
  const dateRef = useRef();

  useEffect(() => {
    setUser(formState === "edit"? todo : initialData)
  }, [formState, todo])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(user);
    formState === "new" ? dispatch(createTodo(user) as any) : dispatch(editTodo(user) as any);
  }

  return (
    <div style={{border: "1px solid #CCC", borderRadius: "5px"}}>
      <div style={{padding: "15px"}}>
        <TextField
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoComplete="title"
          autoFocus
          style={{marginBottom: '10px'}}
          value={user.title}
          onChange={(e) => setUser({ ...user, title: e.target.value })}
        />
        <TextField
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
          autoComplete="description"
          autoFocus
          style={{marginBottom: '10px'}}
          value={user.description}
          onChange={(e) => setUser({ ...user, description: e.target.value })}
        />
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Priority</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            style={{marginBottom: '10px'}}
            defaultValue={user.priority}
            ref={priorityRef}
            onChange={(e) => setUser({ ...user, priority: e.target.value })}
            name="radio-buttons-group"
          >
            <FormControlLabel value="low" control={<Radio />} label="Low" />
            <FormControlLabel value="medium" control={<Radio />} label="Medium" />
            <FormControlLabel value="high" control={<Radio />} label="High" />
          </RadioGroup>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{marginBottom: '10px'}}
            value={user.status}
            label="Status"
            onChange={(e) => setUser({ ...user, status: e.target.value })}
          >
            {
              pages.map((page: {key:string, value:string}) => (
                <MenuItem key={page.key} value={page.key}>{page.value}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <TextField
        id="date"
        label="Birthday"
        type="date"
        fullWidth
        style={{marginBottom: '10px'}}
        defaultValue={user.endDate}
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          {formState === "edit"? "Update" : "Add"} Todo
        </Button>
        {
          formState === "edit" &&
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => dispatch(resetFormState())}
          >
            Reset Form
          </Button>
        }
      </div>
    </div>
  );
}

export default TodoForm;
