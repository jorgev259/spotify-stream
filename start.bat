SET NODE_ENV=production
if not exist "node_modules" cmd /C npm install --production --force
if not exist ".next" cmd /C npm run build
npm start