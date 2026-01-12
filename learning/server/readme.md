JWT Authentication – Simple Flow
Step 1: User Registers

User sends email and password.
Backend saves the user.

Step 2: User Logs In

User sends email and password.
Backend verifies the credentials.

Step 3: Backend Creates JWT

Backend creates one JWT token.
The token contains the user id and an expiry time.

Step 4: Backend Sends JWT as Cookie using res.cookie

Backend sends the token using Set-Cookie.
Browser / Postman stores the cookie automatically.

Step 5: User Makes Protected Request. (example: get products)

User calls a protected API (example: get products).
Cookie is automatically sent with the request.

Step 6: Auth Middleware Runs

Backend reads the cookie.
JWT is verified.

If valid → request continues

If expired or invalid → request is blocked

Step 7: Protected Route Responds

If JWT is valid, backend sends the data.
If not, backend returns 401 Unauthorized.

Step 8: Token Expiry

JWT expires after the set time.
Next request fails with 401.

Step 9: Frontend Logs Out User

Frontend sees 401.
User is redirected to login.

Step 10: Manual Logout

User clicks logout.
Backend clears the cookie.
User is logged out.

One-line summary

Login gives a token, every request proves identity, expiry is checked on request, and 401 means logout.
