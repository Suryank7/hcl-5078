import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const UseFetchApi = () => {
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/v1/user/`);

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const message = await response.text();
                setData(message);
            } catch (err) {
                setError(err instanceof TypeError
                    ? `Cannot reach the backend at ${API_BASE_URL}. Start the backend and allow requests from http://localhost:5173.`
                    : err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <h2>Loading...</h2>;

    if (error) return <h2>Error: {error}</h2>;

    return (
        <div>
            <h1>HRMS Application</h1>
            <h2>{data}</h2>
        </div>
    );
};

export default UseFetchApi;

// import React, { useEffect, useState } from 'react'
//
// function UseFetchApi() {
//  const[serverData,setServerData]=useState([]);
//
//
//     useEffect(()=>{
//
//      async function getData(){
//         try{
//                   const serverData= await fetch("http://localhost:8080/");
//                   const jsonData=  await serverData.text();
//                   console.log(jsonData)
//                   setServerData(jsonData);
//                 }
//         catch(e){
//                 console.log(e);
//         }
//       }
//       getData();
//
//     },[])
//
//
//   return (
//     <div>UseFetchApi
//
//    <h2>
//     {
//         JSON.stringify(serverData)
//     }
//    </h2>
//
//     </div>
//   )
// }
//
// export default UseFetchApi