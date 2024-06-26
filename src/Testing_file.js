import logo from './logo.svg';
import './App.css';
const books = [
  { id: 1, title: 'Shubham ' },
  { id: 2, title: 'Adit' },
  { id: 3, title: 'Deepanshi' },
];
const categories =[
  {id:1, title:'fruits', item: ["apple","mango"]},
  {id:2, title:'vegetables', item:["tomato","potato"]},
  {id:3, title:'mushroom', item:["glowing","poisonous"]}

]
const users = [
  { id: 1, name: 'Admin', role: 'admin' },
  { id: 2, name: 'User1', role: 'user' },
  { id: 3, name: 'User2', role: 'user' },
];

const UserGreeting = () => <p>Welcome back, User!</p>;
const AdminGreeting = () => <p>Welcome back, Admin!</p>;
const GuestGreeting = () => <p>Please sign up or log in.</p>;

const greeting=({role}) =>{
  switch (role){
    case 'Admin':
      return <AdminGreeting/>;
    case 'user':
      return <UserGreeting/>
    case 'guest':
      return <GuestGreeting/>


  }
}
let isloggedin = false;
let userRole = 'admin';

const App = ({isloggedin, userRole}) => {
  const handleClick = (title) => {
    alert(`You clicked on ${title}`);
  };

  let count = 1;
  let name = {
    firstName : "Shubham",
    lastName : "Sriva"
  }
  return (
    <form>
      <p/>Length of {name.firstName} {">"} {name.lastName} {name.firstName.length > name.lastName.length ? isloggedin = 'True': isloggedin = 'False'}<p/>
      {/* Accessing variable */}
      <div>
      {isloggedin ? <greeting role={userRole} /> : <GuestGreeting />}
      <ul>
        {users.map((user) => (
          user.role === 'user' && <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
      <h1>Welcome {name.firstName} {name.lastName}</h1><br/><br/>
      <input type='text' placeholder='name'/>Write your name {count} times<br/><br/>
      <p>Let total sum be ({(count + count++ )* count --}) </p><br/><br/>
      <input type='password' placeholder='password'/><br/><br/>
      <input type='submit' nvalue= "log"/><br/><br/>
    {/* event handler */}
      <ul>
        <p>Name of books which need to published</p>
      {books.map((book) => (
        <li key={book.id} onClick={() => handleClick(book.title)}>
          {book.title}
        </li>
      ))}
    </ul>
    {/* creating table */}
    <div>
      <p>Different categories of items which we have in stock</p>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
       
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Items</th>
        </tr>
      </thead>
      <tbody>
       {categories.map(catr =>(
        <tr key={catr.id}>
        <td>{catr.id}</td>
        <td>{catr.title}</td>
        <td>{catr.item.join(',')}</td>
        {/* conditional rendering */}
        <td>{catr.item.length >= 2 ? <h4>available</h4>:<h4>Not available</h4>}</td>
        </tr>
       )) }
      </tbody>
      
      </table>
        
    </div>
    {/* //nesting map function */}

    <div>
      {categories.map((category) => (
        <div key={category.id}>
          <h3>{category.title}</h3>
          <ul>
            {category.item.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    
  {/* react logo */}

  {
  
      < div className="App" >
        {isloggedin ? <greeting role={userRole} /> : 
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
}
    </div>
}
    </form>


    
  );
}

export default App;
