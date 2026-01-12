1. User register

2. User Login -> create jwt token -> res.cookie -> res.status(200)
   Browser will store the cookie.

3. Backend AuthMiddleware.
   req.cookies.mytoken -> verify token -> decode the payload of the token -> store it in the req object. (so every controller who calls this authMiddleware will be able to use that req object.)

4. Frontend
   Set up a API instance of the axios. with baseUrl and withCredential.
   Routes -> Wrap the routes which we have to protect.

5. ProtectedRoute wrapper.
   call a "auth/me" endpoint in the backend.
   if the endpoint returns 401, then the user is logged out. redirect to /login page.
   if the endpoint returns 200, then the user is logged in, renders the Outlet
