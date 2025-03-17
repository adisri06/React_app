import './App.css';
import Login from './component/login';
import Employee from './component/employee';
import Student from './component/student';
import ParentWrapper from './component/parentWrapper';
import CustomerTable from './component/customerTable';
import Pagination from './component/Pagination/Pagination.jsx';
import DataTable from './component/nachaTable/DataTable.jsx';
import { columns } from './component/nachaTable/columns.jsx';
import { mockData } from './component/nachaTable/mockData.js';


const App = () => {
  const dummydate = Array.from({length:100}, (_,i)=>({
    id: i + 1,
    name: `Customer ${i + 1}`,
  }));
  return (
    
    <div className="App">
    {/* <Pagination 
      data ={dummydate}
      //render row function is passed as a prop to the Pagination component ,it helps to render the data in the table
      //renderRow is a function that takes a value and returns a JSX element so that ui can be dynamic
      renderRow ={function (val) {
        return <div>Hello `{val}`</div>
      }}/>   */}
      <DataTable columns={columns} data={mockData} />
  </div>
  
  );
}

export default App;
