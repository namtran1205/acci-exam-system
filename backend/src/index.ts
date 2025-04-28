import app from "./app";
import db from "./db/connection";


db();
app.listen(process.env.PORT, () => {
  console.log(`Server started on localhost:${process.env.PORT}`);
});
