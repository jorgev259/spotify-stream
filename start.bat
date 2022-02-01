if not exist "node_modules" npm install --only=prod
if not exist ".next" npm run build
npm start