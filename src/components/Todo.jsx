import React, { useState } from 'react';

function Todo() {
    const [value, setValue] = useState('');
    const [todos, setTodos] = useState([]);
    const [editing, setEditing] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        addTodo(value);
        setValue('');
    }

    const addTodo = todo => {
        if (!value) return;
        setTodos([...todos, todo])
    }

    const deleteTodo = index => {
        setTodos(todos => {
            return todos.filter((_, i) => i !== index)
        })
    }

    const updateTodo = (val, index) => {
        setTodos(
            todos.map((todo, i) => {
              if (i === index) {
                todo = val;
              }
              return todo;
            }),
        );
    }

    const editTodo = (index) => {
        setEditing(index);
    }

    const handleUpdatedDone = (event) => {
        if (event.key === 'Enter') {
          setEditing(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={value} placeholder="Add Todo" onChange={e => setValue(e.target.value)} />
                <button type='submit'>Submit</button>
            </form>

            { todos.length > 0 ? 
                <div className='todo-list'>
                    {todos.map((todo, index) => (
                        <div key={index} className={index === editing ? 'view-mode' : 'edit-mode'}>
                            <p className='todo-name'>{todo}</p>
                            <input type='text' value={todo} onChange={(e) => updateTodo(e.target.value, index)} onKeyDown={handleUpdatedDone}/>
                            <div>
                                <button onClick={() => editTodo(index)}>Edit</button>
                                <button onClick={() => deleteTodo(index)}>Delete</button>
                            </div>
                        </div>
                    ))
                    }
                </div>
                : ''
            }

        </div>
      );
}

export default Todo;