import app from "./app";

app.listen(process.env.PORT, () => {
  console.log(`Server started on localhost:${process.env.PORT}`);
});
