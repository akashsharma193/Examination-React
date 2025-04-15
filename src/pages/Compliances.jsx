import React, { useEffect, useState } from 'react'
import API from '../api/axios';
import { Link } from 'react-router-dom';

export default function Compliances() {
  const [compliances, setCompliances] = useState()

  useEffect(() => {
    API.get('/compliance/getCompliance')
      .then(response => {
        console.log(response.data); // handle success
        console.log(response.data.data)
        setCompliances(response.data.data)
      })
      .catch(error => {
        console.error('Error fetching users:', error); // handle error
      });

  },[])
  return (
    <div>
        <Link to="/login">Login</Link>
      {compliances ?
        <div>
          <h1>All Compliances</h1>
          <ol>
            {compliances.length>0 && compliances.map(({compliance}, index) => {
              return <li key={index}>{compliance}</li>
            })}
          </ol>
        </div>
        :
        <h1>loading...</h1>
      }
    </div>
  )
}
