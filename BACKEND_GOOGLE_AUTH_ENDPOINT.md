# Backend Google Auth Endpoint Implementation

## 🔧 **Required Endpoint: POST /api/v1/auth/google**

### **Request Format:**
```javascript
POST /api/v1/auth/google
Content-Type: application/json

{
  "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6...", // Google JWT token
  "email": "user@gmail.com",
  "username": "John Doe",
  "image": "https://lh3.googleusercontent.com/...",
  "role": "USER"
}
```

### **Response Format (Success):**
```javascript
{
  "EC": 0,
  "EM": "Google login successful",
  "DT": {
    "access_token": "backend_generated_token",
    "refresh_token": "backend_refresh_token",
    "username": "John Doe",
    "email": "user@gmail.com",
    "image": "https://lh3.googleusercontent.com/...",
    "role": "USER",
    "id": 123
  }
}
```

### **Response Format (Error):**
```javascript
{
  "EC": 1,
  "EM": "Google login failed: Invalid token"
}
```

## 🔧 **Backend Implementation Logic:**

### **1. Verify Google Token:**
```javascript
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    return ticket.getPayload();
  } catch (error) {
    throw new Error('Invalid Google token');
  }
}
```

### **2. Find or Create User:**
```javascript
app.post('/api/v1/auth/google', async (req, res) => {
  try {
    const { token, email, username, image, role } = req.body;
    
    // 1. Verify Google token
    const googleUser = await verifyGoogleToken(token);
    
    if (googleUser.email !== email) {
      return res.json({
        EC: 1,
        EM: "Token email mismatch"
      });
    }
    
    // 2. Find existing user by email
    let user = await User.findOne({ email: email });
    
    if (!user) {
      // 3. Create new user if not exists
      user = await User.create({
        email: email,
        username: username,
        image: image,
        role: role || 'USER',
        password: null, // Google users don't have password
        googleId: googleUser.sub,
        isGoogleUser: true
      });
    } else {
      // 4. Update existing user info
      user.username = username;
      user.image = image;
      user.googleId = googleUser.sub;
      user.isGoogleUser = true;
      await user.save();
    }
    
    // 5. Generate JWT tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    
    // 6. Return user data
    res.json({
      EC: 0,
      EM: "Google login successful",
      DT: {
        access_token: accessToken,
        refresh_token: refreshToken,
        username: user.username,
        email: user.email,
        image: user.image,
        role: user.role,
        id: user.id
      }
    });
    
  } catch (error) {
    console.error('Google auth error:', error);
    res.json({
      EC: 1,
      EM: "Google login failed: " + error.message
    });
  }
});
```

### **3. Database Schema Update:**
```sql
-- Add Google-specific fields to users table
ALTER TABLE users ADD COLUMN google_id VARCHAR(255);
ALTER TABLE users ADD COLUMN is_google_user BOOLEAN DEFAULT FALSE;
ALTER TABLE users MODIFY COLUMN password VARCHAR(255) NULL; -- Allow null for Google users
```

## 🔧 **Environment Variables:**
```env
GOOGLE_CLIENT_ID=532302330381-82t1meqlgbh2ji6ucieihb7dmmapgotv.apps.googleusercontent.com
```

## 🔧 **Dependencies:**
```bash
npm install google-auth-library
```

## 📋 **Testing:**

### **1. Test with Postman:**
```javascript
POST http://localhost:8081/api/v1/auth/google
{
  "token": "actual_google_jwt_token",
  "email": "test@gmail.com",
  "username": "Test User",
  "image": "https://example.com/avatar.jpg",
  "role": "USER"
}
```

### **2. Expected Database Result:**
- New user created in `users` table
- User visible in `/admins/manage-users`
- User can login/logout normally

## 🎯 **Frontend Integration:**

Once backend endpoint is ready:
1. Frontend will call this endpoint on Google login
2. User will be created/updated in database
3. User will appear in manage-users table
4. Normal login/logout flow will work

## 🔒 **Security Considerations:**

1. **Always verify Google token** server-side
2. **Check token audience** matches your Client ID
3. **Validate email** from token matches request
4. **Rate limiting** on auth endpoints
5. **Sanitize user input** before database save

## 📱 **Mobile Considerations:**

- Endpoint works for both web and mobile Google login
- Same token verification process
- Consistent user data format
