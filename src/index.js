// Create an Express server on port 3000 with GET / returning {status:"ok"} and a /health endpoint.

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;      

app.get('/', (req, res) => {
  res.json({ status: "ok" });
}   
);

app.get('/health', (req, res) => {
  res.json({ status: "healthy" });
}); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 

