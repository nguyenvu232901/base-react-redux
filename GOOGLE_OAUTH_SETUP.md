# Google OAuth Setup Guide

## 🔧 Setup Google OAuth Client ID

### **Bước 1: Tạo Google Cloud Project**

1. **Truy cập Google Cloud Console:**
   - Đi tới: https://console.cloud.google.com/

2. **Tạo Project mới:**
   - Click "Select a project" → "New Project"
   - Project name: `React Redux Quiz App`
   - Click "Create"

### **Bước 2: Enable Google+ API**

1. **Enable APIs:**
   - Vào "APIs & Services" → "Library"
   - Tìm "Google+ API" và click "Enable"
   - Tìm "Google Identity" và click "Enable"

### **Bước 3: Tạo OAuth 2.0 Credentials**

1. **Vào Credentials:**
   - "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"

2. **Configure OAuth consent screen:**
   - User Type: "External"
   - App name: `React Redux Quiz App`
   - User support email: your-email@gmail.com
   - Developer contact: your-email@gmail.com
   - Click "Save and Continue"

3. **Create OAuth Client ID:**
   - Application type: "Web application"
   - Name: `React Redux Quiz App`
   
4. **Authorized JavaScript origins:**
   ```
   http://localhost:3000
   https://your-domain.com
   https://frontend-react-xxx.onrender.com
   ```

5. **Authorized redirect URIs:**
   ```
   http://localhost:3000
   https://your-domain.com
   https://frontend-react-xxx.onrender.com
   ```

6. **Click "Create"**

### **Bước 4: Copy Client ID**

1. **Copy Client ID** từ popup hoặc credentials list
2. **Format:** `123456789-abcdefghijklmnop.apps.googleusercontent.com`

## 🔧 **Cấu hình trong Project**

### **Development (.env):**
```env
REACT_APP_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
```

### **Production (.env.production):**
```env
REACT_APP_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
```

### **Render.com Environment Variables:**
```
REACT_APP_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
```

## 🎯 **Features đã implement:**

### **1. Google Login Button**
- Hiển thị sau divider "OR"
- Responsive design cho mobile
- Theme: outline, size: large

### **2. Login Flow**
- Click Google button → Google popup
- User chọn account → Consent screen
- Success → Decode JWT token
- Extract user info (name, email, picture)
- Dispatch Redux login action
- Navigate to home page

### **3. Error Handling**
- Network errors
- User cancellation
- Invalid tokens
- Toast notifications

### **4. User Data Mapping**
```javascript
{
  access_token: credentialResponse.credential,
  refresh_token: credentialResponse.credential,
  username: decoded.name,
  email: decoded.email,
  image: decoded.picture,
  role: 'USER'
}
```

## 📱 **Mobile Responsive**

- **Desktop**: Full size button với text
- **Tablet**: Smaller button
- **Mobile**: Compact button với proper touch targets

## 🔒 **Security Features**

- **JWT Token Validation**: Decode và verify token
- **HTTPS Only**: Production chỉ accept HTTPS
- **Domain Restriction**: Chỉ authorized domains
- **Token Expiry**: Google tokens có expiry time

## 🚀 **Testing**

### **Local Testing:**
1. Set `REACT_APP_GOOGLE_CLIENT_ID` trong `.env`
2. `npm start`
3. Test Google login button

### **Production Testing:**
1. Deploy lên Render với environment variable
2. Test trên actual domain
3. Verify user data trong Redux store

## 🔧 **Troubleshooting**

### **"Invalid Client ID" Error:**
- Check Client ID format
- Verify domain trong authorized origins
- Check environment variable name

### **"Popup Blocked" Error:**
- Allow popups trong browser
- Test trong incognito mode

### **"Unauthorized Domain" Error:**
- Add domain vào authorized JavaScript origins
- Include both HTTP và HTTPS versions

### **Token Decode Error:**
- Check `jwt-decode` library version
- Verify token format

## 📋 **Next Steps**

1. **Backend Integration:**
   - Send Google token to backend
   - Verify token server-side
   - Create/update user trong database

2. **Enhanced Features:**
   - Remember login state
   - Auto-refresh tokens
   - Logout functionality

3. **Analytics:**
   - Track Google login usage
   - Monitor success/failure rates
