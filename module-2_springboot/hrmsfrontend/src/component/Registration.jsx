import React, { useState } from 'react';

function Registration() {
    const [employee, setEmployee] = useState({
        emp_id: '',
        emp_name: '',
        designation: '',
        stack: ''
    });

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };

    const sendData = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const employeeData = {
            emp_id: Number(employee.emp_id),
            emp_name: employee.emp_name,
            designation: employee.designation,
            stack: employee.stack
        };

        try {
            const response = await fetch(
                'http://localhost:8080/v1/user/addemp',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(employeeData)
                }
            );

            const result = await response.text();

            if (!response.ok) {
                throw new Error(result || `Request failed: ${response.status}`);
            }

            setMessage(result);

            setEmployee({
                emp_id: '',
                emp_name: '',
                designation: '',
                stack: ''
            });
        } catch (error) {
            console.error('Registration error:', error);
            setMessage(`Registration failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Employee Registration</h2>

            <form onSubmit={sendData}>
                <div className="form-group mb-3">
                    <label htmlFor="emp_id">Employee ID</label>
                    <input
                        type="number"
                        className="form-control"
                        id="emp_id"
                        name="emp_id"
                        value={employee.emp_id}
                        onChange={handleChange}
                        placeholder="Enter employee ID"
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="emp_name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="emp_name"
                        name="emp_name"
                        value={employee.emp_name}
                        onChange={handleChange}
                        placeholder="Enter name"
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="designation">Designation</label>
                    <input
                        type="text"
                        className="form-control"
                        id="designation"
                        name="designation"
                        value={employee.designation}
                        onChange={handleChange}
                        placeholder="Enter designation"
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="stack">Tech Stack</label>
                    <input
                        type="text"
                        className="form-control"
                        id="stack"
                        name="stack"
                        value={employee.stack}
                        onChange={handleChange}
                        placeholder="Enter tech stack"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? 'Registering...' : 'Register Employee'}
                </button>
            </form>

            {message && <p className="mt-3">{message}</p>}
        </div>
    );
}

export default Registration;

// import React, { useState } from 'react'
//
// function Registration() {
// const[empId,setEmpId]=useState();
// const[EmpName,setEmpName]=useState();
// const[EmpDesignation,setEmpDesignation]=useState();
// const[EmpStack,setEmpStack]=useState();
// const[email,setEmail]=useState();
// const[password,setPassword]=useState();
//
//
//
//
// async function sendData(e){
//
// try{
//   e.preventDefault();
//   const server=await fetch("http://localhost:8080/v1/user/addemp",{
//                     method:'Post',
//                     body:JSON.stringify({empId,EmpName,EmpDesignation,EmpStack,email,password}),
//                     headers:{"Content-Type":"application/json"}
//                   });
//
//                   const statue=await server.text();
//                   alert(statue);
//
// }catch(e){
//  console.log(e)
// }
// }
//
//
//   return (
//     <div>
//
// <form>
//
//  <div class="form-group">
//     <label for="exampleInputEmail1">Empid</label>
//     <input type="number" onChange={(e)=>setEmpId(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter emp_id" required />
//
//   </div>
//
//  <div class="form-group">
//     <label for="exampleInputEmail1">Name</label>
//     <input type="text" onChange={(e)=>setEmpName(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name" required />
//
//   </div>
//
//
//   <div class="form-group">
//     <label for="exampleInputEmail1">Email address</label>
//     <input type="email" onChange={(e)=>setEmail(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
//     <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
//   </div>
//
//
// <div class="form-group">
//     <label for="exampleInputEmail1">Designation</label>
//     <input type="text" onChange={(e)=>setEmpDesignation(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter deisgnation" required />
//
//   </div>
//
// <div class="form-group">
//     <label for="exampleInputEmail1">Tech stack</label>
//     <input type="text" onChange={(e)=>setEmpStack(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Tech stack like test Engineer, Java FSD etc" required />
//
//   </div>
//
//
//   <div class="form-group">
//     <label for="exampleInputPassword1">Password</label>
//     <input type="password" onChange={(e)=>setPassword(e.target.value)} class="form-control" id="exampleInputPassword1" placeholder="Password" required />
//   </div>
//
//   <button type="submit" onClick={sendData} class="btn btn-primary">Register</button>
// </form>
//
//     </div>
//   )
// }
//
// export default Registration