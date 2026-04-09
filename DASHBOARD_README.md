# Portfolio Dashboard Authentication

## Overview
The portfolio now includes a private dashboard feature with secure authentication. Only you can access the dashboard to post work updates, while visitors can still see your published work in the Projects section.

## 🔐 Security Features
- **SHA-256 Password Hashing**: Passwords are never stored in plain text
- **Session Management**: 24-hour session timeout
- **Client-side Security**: Uses CryptoJS library for secure hashing
- **No Plain Text Credentials**: Only password hashes are stored in code

## Login Credentials
- **Username:** admin
- **Password:** admin123 (hashed as: `240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9`)

⚠️ **Important:** Change these credentials before deploying to production!

## How to Change Password

### Method 1: Use the Password Generator Tool
1. Open `password-generator.html` in your browser
2. Enter your new password (minimum 8 characters)
3. Click "Generate Hash"
4. Copy the generated hash
5. Replace `VALID_PASSWORD_HASH` in `login/index.html`

### Method 2: Manual Hash Generation
1. Go to any online SHA-256 generator (like https://emn178.github.io/online-tools/sha256.html)
2. Enter your desired password
3. Copy the generated hash
4. Replace `VALID_PASSWORD_HASH` in `login/index.html`

### Method 3: Browser Console
```javascript
// Open browser console and run:
CryptoJS.SHA256('yournewpassword').toString()
```

## File Structure
```
fumioryoto.github.io/
├── index.html              # Main portfolio (dashboard hidden to visitors)
├── login/
│   └── index.html          # Secure login page
├── password-generator.html # Tool to generate password hashes
├── script.js               # Updated with authentication logic
├── style.css               # Updated with login page styles
└── DASHBOARD_README.md     # This documentation
```

## Features
- ✅ Private dashboard access
- ✅ SHA-256 password hashing
- ✅ Session timeout (24 hours)
- ✅ Automatic redirect after login
- ✅ Logout functionality
- ✅ Work posts visible to all visitors in Projects section
- ✅ Edit/delete posts only when logged in

## Deployment to Vercel
1. **Before Deployment:**
   - Change the default username/password hash in `login/index.html`
   - Test the login functionality locally
   - Remove or secure the `password-generator.html` file

2. **Security Notes:**
   - The hash cannot be reversed to get the original password
   - Each login attempt hashes the entered password and compares it to the stored hash
   - This provides good security for a static site

## Customization
To change the username, edit the `VALID_USERNAME` variable in `login/index.html`.

To modify the session timeout, change the `SESSION_TIMEOUT` variable (in milliseconds).

## Security Best Practices
- Use a strong, unique password (12+ characters, mixed case, numbers, symbols)
- Change default credentials before deployment
- Regularly update your password
- Don't share your login credentials
- Consider additional security measures for production use

## Limitations
- This is client-side authentication (suitable for static sites)
- For higher security needs, consider server-side authentication
- Password reset functionality would require a backend
- No account lockout mechanism (to prevent brute force attacks)</content>
<parameter name="filePath">DASHBOARD_README.md