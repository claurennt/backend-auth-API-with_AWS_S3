  <h1>Welcome to my tiny API to test Authorization/Authentication</h1>
  <h2><u>API Endpoints:</u></h2>

  <div>
    <h3> <span>POST</span> /users/register</h3>
    <p><strong>Creates a new user</strong> -> Expects an email, username and password in the body of the request + a "profile_pic" file <code>{"email": $email, "username": $username, "password": $password, $profile_pic: File} </code> and returns a response with an auth token in the headers</p>
    <h3> <span>POST</span> /auth/login</h3>
    <p><strong>Authenticates an existing user</strong> -> Expects a username and password in the body of the request <code>{"username":$username, "password":$password} </code> and returns a response with an auth token in the headers</p>
    <h3><span>GET</span> /users</h3>
    <p><strong>Returns all users in the database* (*Admin rights required)</strong> -> Expects an Admin token in the headers <code>Authorization: Bearer $token</code></p>
    <h3><span>DELETE</span> /users</h3>
    <p><strong>Delete all users from the database* (*Admin rights required)</strong> -> Expects an Admin token in the headers <code>Authorization: Bearer $token</code></p>
    <h3><span>GET</span> /users/me</h3>
    <p><strong>Returns information about the user making the request</strong> -> Expects an auth token in the headers <code>Authorization: Bearer $token</code></p>
    <h3><span>PATCH</span> /users/me</h3>
    <p><strong>Updates fields of user making the request</strong> -> Expects a body containing the fields the user wants to update and an auth token in the headers <code>Authorization: Bearer $token</code></p>
    <h3><span>DELETE</span> /users/me</h3>
    <p><strong>Deletes the user making the request</strong> -> Expects an auth token in the headers <code>Authorization: Bearer $token</code></p>
  </div>
