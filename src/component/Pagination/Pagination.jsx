import React, { useState } from 'react'
import './style.css'

const size = 1;
const default_page = 3;

export default function Pagination({data, renderRow, page_size = size}) {
    const[currentPage, setcurrentPage]= useState(default_page);
    const[pageSize, setPageSize] = useState(page_size);
    // we gave -1 because we want to start from 0 in array
    const currentindex = (currentPage -1 )* pageSize;
    const endindex = currentindex + pageSize;
    const totalpage = Math.ceil(data.length/pageSize);
    const currentData = data.slice(currentindex, endindex);
    const arraypages = Array.from({length : totalpage},(_,i)=>(i+1));
    const noofbuttons = 5;
    const half = Math.floor(noofbuttons / 2);
    let left = Math.max(currentPage - half,1);
    let right = left + noofbuttons -1;
    if(right > totalpage){
        right = totalpage;
        left = Math.max(right -noofbuttons +1,1);
    }
    const buttonsvisible = arraypages.slice(left -1,right);


  return (
    <div>Pagination Component
        {currentData.map((item) => (
          <div>
            {renderRow(item.name)}
          </div>
          
        ))}
        <div className='pagination'>
            <select onChange={(e) =>{ setPageSize(Number(e.target.value));  setcurrentPage(1)}}>
                <option value = {page_size}>{page_size}</option>
                <option value = {10}>10</option>
                <option value = {20}>20</option>
                <option value = {30}>30</option>
                <option value = {40}>40</option>
            </select>
            <button onClick = {() => setcurrentPage(1)} disabled = {currentPage === 1}> First </button>
            <button  onClick = {() => setcurrentPage(currentPage -1)} disabled = {currentPage === 1}> Previous</button>
            {buttonsvisible.map((page)=>{
                return(
                    <button  key = {page} onClick = {() => setcurrentPage(page) } disabled = {currentPage === page}> {page}</button>
                )
            })}
            <button onClick = {() => setcurrentPage(currentPage +1)} disabled = {currentPage === totalpage}> Next </button>
            <button onClick = {() => setcurrentPage(totalpage)} disabled = {currentPage === totalpage}> Last </button>

        </div>
   
    </div>
  )
}
