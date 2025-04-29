import bcrypt from "bcryptjs";
import "dotenv/config";
import { employees } from "../models/employee";
import db from "./connection";
import { truncateTable } from "./utils";

async function createEmployees() {
  console.log("Setting up employees");
  await truncateTable("employee");

  await db.insert(employees).values([
    {
      username: "npa",
      password: bcrypt.hashSync("npa", bcrypt.genSaltSync(12)),
      name: "Nguyễn Phúc An",
      role: "acceptance",
    },
    {
      username: "nhnt",
      password: bcrypt.hashSync("nhnt", bcrypt.genSaltSync(12)),
      name: "Nguyễn Hà Nam Trân",
      role: "accounting",
    },
    {
      username: "nna",
      password: bcrypt.hashSync("nna", bcrypt.genSaltSync(12)),
      name: "Nguyễn Nguyệt Ánh",
      role: "data",
    },
    {
      username: "tgh",
      password: bcrypt.hashSync("tgh", bcrypt.genSaltSync(12)),
      name: "Tiết Gia Hồng",
      role: "admin",
    },
  ]);
}

createEmployees().then(() => {
  console.log("Finished setting up database");
  process.exit(0);
});
