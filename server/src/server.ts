import express from 'express'
const app = express();

app.get("/ads", (request, response) => {
  return response.json([
    { id: 1, name: "Hello NLW 1 " },
    { id: 2, name: "Hello NLW 2 " },
    { id: 3, name: "Hello NLW 3 " },
    { id: 4, name: "Hello NLW 4 " },
  ]);
});

app.listen(3333);
