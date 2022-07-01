import {useState} from "react"


function App() {

  const defaultTodo = [
    {
      id: 1,
      text: "Taste JavaScript",
      yapildi: true
    },
    {
      id: 2,
      text: "Code furiously",
      yapildi: true
    },
    {
      id: 3,
      text: "Promote Mavo",
      yapildi: false
    },
    {
      id: 4,
      text: "Give talks",
      yapildi: false
    },
    {
      id: 5,
      text: "Write tutorials",
      yapildi: true
    },
    {
      id: 6,
      text: "Have a life!",
      yapildi: false
    },
  ]


  const [todo, setTodo] = useState("")
  const [form, setForm] = useState(defaultTodo)
  const formSubmit = e =>{
    e.preventDefault()
    if(!todo){return false}
    setForm([
      {
        id: Date.now(),
        text: todo,
        yapildi: false
      },
      ...form,
    ])
    setTodo("")
  }

  const checkChange = (id) =>{
    setForm(form.map(el=>el.id === id ? {...el, yapildi: !el.yapildi} : el))
  }

  const deleteTodo=(id)=>{
    setForm(form.filter(item=> item.id !== id))
  }
  
  const allDone = () => {
    setForm(form.map( 
      allTodo => allTodo.yapildi === false ? 
      {...allTodo, yapildi: true} : 
      {...allTodo})
    )
  }

  const clrCompleted = () => {
    setForm(form.filter(clr => clr.yapildi === false))
  }

  const cmpCounter = form.filter(fltr => fltr.yapildi === false)

  const [foFilter, setFoFilter] = useState(0)


   return (
    <>
    <section className="todoapp">
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={formSubmit}>
        <input
        onChange={(e)=>setTodo(e.target.value)}
        value={todo}
        className="new-todo" 
        placeholder="What needs to be done?" 
        autoFocus />
      </form>
    </header>
	
	<section className="main">
		<input id="toggle-all" className="toggle-all" type="checkbox" />
		<label htmlFor="toggle-all" onClick={()=>allDone()}>Mark all as complete</label>

		<ul className="todo-list">
    
		{
      (foFilter === 0 
        ? form
        : (foFilter === 1 
          ? (form.filter(flsmu=> flsmu.yapildi === false))
          : (form.filter(flsmu=> flsmu.yapildi === true))
          )).map(items => 
      <li key={items.id} className={!items.yapildi ? "bekliyor" : "completed"}>
				<div className="view">
					<input id={items.id} className="toggle" type="checkbox" checked={items.yapildi}/>
					<label htmlFor={items.id} onClick={()=>checkChange(items.id)}>
            {items.text}
          </label>
					<button className="destroy" onClick={()=>{deleteTodo(items.id)}}></button>
				</div>
			</li>)
    }

		</ul>
	</section>


	<footer className="footer">
		<span className="todo-count">
			<strong>{cmpCounter.length}</strong> items left</span>

		<ul className="filters">
			<li>
				<span onClick={()=>{setFoFilter(0)}} className={foFilter === 0 ? "selected" : null} >All</span>
			</li>
			<li>
				<span 
          onClick={()=>{setFoFilter(1)}} className={foFilter === 1 ? "selected" : null}>Active</span>
			</li>
			<li>
				<span onClick={()=>{setFoFilter(2)}} className={foFilter === 2 ? "selected" : null}>Completed</span>
			</li>
		</ul>

		<button className="clear-completed" onClick={()=>{clrCompleted()}}>Clear completed</button>
	</footer>
</section>

<footer className="info">
	<p>Click to edit a todo</p>
	<p>Created by <a href="https://d12n.me/">Dmitry Sharabin</a></p>
	<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
	<p><strong>by <a href="https://app.patika.dev/tahsingibi">tahsingibi</a></strong></p>
</footer>

    </>
  )
}

export default App