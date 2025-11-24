# GitHub OAuth Setup Instructions

## 1. Create GitHub OAuth App
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in:
   - Application name: Multiverse AI Builder
   - Homepage URL: http://localhost:5173
   - Authorization callback URL: http://localhost:5000/api/auth/github/callback
4. Click "Register application"
5. Copy Client ID and Client Secret

## 2. Configure Environment
1. Edit server/.env file
2. Update with your GitHub credentials:
   GITHUB_CLIENT_ID=your_actual_github_client_id
   GITHUB_CLIENT_SECRET=your_actual_github_client_secret

## 3. Start MongoDB
Make sure MongoDB is running on your system.

## 4. Start the Application
1. Start backend: `cd server && npm start`
2. Start frontend: `npm run dev`
3. Open http://localhost:5173

## 5. Test GitHub OAuth
1. Click "Continue with GitHub"
2. You'll be redirected to GitHub for authorization
3. After authorizing, you'll be logged into Multiverse AI Builder
