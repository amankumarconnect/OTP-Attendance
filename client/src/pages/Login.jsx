import React from 'react'

const Login = () => {
  return (
    <div>
        <h1>Login</h1>
        <form action="/login" method="post">
            <label htmlFor="">ID</label>
            <input type="text" name="id" />
            <label htmlFor="">Role</label>
            <select name="role">
                <option value="Faculty">Faculty</option>
                <option value="Student">Student</option>
            </select>
            <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login