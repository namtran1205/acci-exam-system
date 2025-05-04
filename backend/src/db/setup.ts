import bcrypt from "bcryptjs";
import "dotenv/config";
import { certificates } from "../models/certificate";
import { customers } from "../models/customer";
import { employees } from "../models/employee";
import { enrollments } from "../models/enrollment";
import { participants } from "../models/participant";
import { registrations } from "../models/registration";
import { results } from "../models/result";
import { schedules } from "../models/schedule";
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

async function createCustomers() {
  console.log("Setting up customers");
  await truncateTable("customer");

  await db.insert(customers).values([
    {
      name: "Albus Percival Wulfric Brian Dumbledore",
      phone: "+1 234 567 890",
      email: "dumbledore@example.com",
      role: "individual",
    },
    {
      name: "Minerva McGonagall",
      phone: "+1 234 567 890",
      email: "mcgonagall@example.com",
      role: "individual",
    },
    {
      name: "Severus Snape",
      phone: "+1 234 567 890",
      email: "snape@example.com",
      role: "individual",
    },
    {
      name: "Gilderoy Lockhart",
      phone: "+1 234 567 890",
      email: "lockhart@fanmail.com",
      role: "individual",
    },
    {
      name: "Remus Lupin",
      phone: "+1 234 567 890",
      email: "lupin@example.com",
      role: "individual",
    },
    {
      name: "Hogwarts School of Witchcraft and Wizardry",
      phone: "+1 234 567 890",
      email: "hogwarts@example.com",
      role: "organization",
    },
    {
      name: "Fumizuki Academy",
      phone: "+1 234 567 890",
      email: "fumizuki@example.com",
      role: "organization",
    },
    {
      name: "Tomoeda Primary School",
      phone: "+1 234 567 890",
      email: "tomoeda@example.com",
      role: "organization",
    },
    {
      name: "Wayne Enterprises",
      phone: "+1 234 567 890",
      email: "wayne@example.com",
      role: "organization",
    },
    {
      name: "Stark Industry",
      phone: "+1 234 567 890",
      email: "stark@example.com",
      role: "organization",
    },
  ]);
}

async function createRegistrations() {
  console.log("Setting up registrations");
  await truncateTable("registrations");

  await db.insert(registrations).values([
    {
      customerId: 1,
    },
    {
      customerId: 5,
    },
    {
      customerId: 6,
    },
    {
      customerId: 7,
    },
    {
      customerId: 8,
    },
  ]);
}

async function createParticipants() {
  console.log("Setting up participants");
  await truncateTable("participants");

  await db.insert(participants).values([
    {
      name: "Harry Potter",
      dateOfBirth: "1990/04/01",
      gender: "male",
      registrationId: 1,
    },
    {
      name: "Ronald Weaseley",
      dateOfBirth: "1990/04/01",
      gender: "male",
      registrationId: 1,
    },
    {
      name: "Hermione Granger",
      dateOfBirth: "1990/04/01",
      gender: "female",
      registrationId: 1,
    },
    {
      name: "James Potter",
      dateOfBirth: "1970/04/01",
      gender: "male",
      registrationId: 2,
    },
    {
      name: "Sirius Black",
      dateOfBirth: "1970/04/01",
      gender: "male",
      registrationId: 2,
    },
    {
      name: "Peter Pettigrew",
      dateOfBirth: "1970/04/01",
      gender: "male",
      registrationId: 2,
    },
    {
      name: "Tom Marvolo Riddle",
      dateOfBirth: "1990/10/12",
      gender: "male",
      registrationId: 3,
    },
    {
      name: "Rubeus Hagrid",
      dateOfBirth: "1970/04/01",
      gender: "male",
      registrationId: 3,
    },
    {
      name: "Myrtle",
      dateOfBirth: "1970/04/01",
      gender: "female",
      registrationId: 3,
    },
    {
      name: "Neville Longbottom",
      dateOfBirth: "2000/04/1",
      gender: "male",
      registrationId: 3,
    },
    {
      name: "Yoshii Akihisa",
      dateOfBirth: "2002/01/01",
      gender: "idiot",
      registrationId: 4,
    },
    {
      name: "Sakamoto Yuuji",
      dateOfBirth: "2002/01/01",
      gender: "male",
      registrationId: 4,
    },
    {
      name: "Himeji Mizuki",
      dateOfBirth: "2002/01/01",
      gender: "female",
      registrationId: 4,
    },
    {
      name: "Kinoshita Hideyoshi",
      dateOfBirth: "2002/01/01",
      gender: "male",
      registrationId: 4,
    },
    {
      name: "Kudou Aiko",
      dateOfBirth: "2002/01/01",
      gender: "female",
      registrationId: 4,
    },
    {
      name: "Kinomoto Sakura",
      dateOfBirth: "2006/11/14",
      gender: "female",
      registrationId: 5,
    },
    {
      name: "Kero",
      dateOfBirth: "1970/01/01",
      gender: "nonbinary",
      registrationId: 5,
    },
    {
      name: "Li Shaoran",
      dateOfBirth: "2006/11/14",
      gender: "male",
      registrationId: 5,
    },
    {
      name: "Tomoyo Daidouji",
      dateOfBirth: "2006/11/14",
      gender: "female",
      registrationId: 5,
    },
    {
      name: "Yue",
      dateOfBirth: "1970/01/01",
      gender: "nonbinary",
      registrationId: 5,
    },
  ]);
}

async function createSchedules() {
  console.log("Setting up schedules");
  await truncateTable("schedule");

  await db.insert(schedules).values([
    {
      startTime: new Date(),
      endTime: new Date(Date.now() + 3600000),
      location: "Class 2-F, Fumizuki Academy",
      name: "Chemistry",
      price: 10.0,
      slots: 50,
    },
    {
      startTime: new Date(),
      endTime: new Date(Date.now() + 3600000),
      location: "Class 2-F, Fumizuki Academy",
      name: "Physics",
      price: 10.0,
      slots: 50,
    },
    {
      startTime: new Date(),
      endTime: new Date(Date.now() + 3600000),
      location: "Class 2-F, Fumizuki Academy",
      name: "Maths",
      price: 10.0,
      slots: 50,
    },
    {
      startTime: new Date(),
      endTime: new Date(Date.now() + 3600000),
      location: "Class 2-F, Fumizuki Academy",
      name: "Physical Education",
      price: 10.0,
      slots: 50,
    },
    {
      startTime: new Date(),
      endTime: new Date(Date.now() + 3600000),
      location: "Class 2-F, Fumizuki Academy",
      name: "Traditional Japanese",
      price: 10.0,
      slots: 50,
    },
    {
      startTime: new Date(),
      endTime: new Date(Date.now() + 3600000),
      location: "Griffindor Tower, Hogwarts",
      name: "Defense against the Dark Art",
      price: 10.0,
      slots: 50,
    },
    {
      startTime: new Date(),
      endTime: new Date(Date.now() + 3600000),
      location: "Potions Brewer, Slytherin Tower, Hogwarts",
      name: "Potions",
      price: 10.0,
      slots: 50,
    },
    {
      startTime: new Date(),
      endTime: new Date(Date.now() + 3600000),
      location: "Philosopher's Stone's Basement, Hogwarts",
      name: "Magic Chess",
      price: 10.0,
      slots: 50,
    },
    {
      startTime: new Date(),
      endTime: new Date(Date.now() + 3600000),
      location: "Quidditch Field, Hogwarts",
      name: "Quidditch",
      price: 10.0,
      slots: 50,
    },
    {
      startTime: new Date(),
      endTime: new Date(Date.now() + 3600000),
      location: "Top of Astrology and Fortune Telling Tower, Hogwarts",
      name: "Fortune Telling",
      price: 10.0,
      slots: 50,
    },
  ]);
}

async function createEnrollments() {
  console.log("Setting up enrollments");
  await truncateTable("enrollments");

  await db.insert(enrollments).values([
    {
      participantId: 11,
      scheduleId: 1,
      number: "ER0000001",
    },
    {
      participantId: 11,
      scheduleId: 2,
      number: "ER0000001",
    },
    {
      participantId: 11,
      scheduleId: 3,
      number: "ER0000001",
    },
    {
      participantId: 12,
      scheduleId: 2,
      number: "ER0000002",
    },
    {
      participantId: 12,
      scheduleId: 4,
      number: "ER0000002",
    },
    {
      participantId: 13,
      scheduleId: 5,
      number: "ER0000003",
    },
    {
      participantId: 14,
      scheduleId: 3,
      number: "ER0000004",
    },
    {
      participantId: 14,
      scheduleId: 5,
      number: "ER0000004",
    },
    {
      participantId: 15,
      scheduleId: 1,
      number: "ER0000005",
    },
    {
      participantId: 15,
      scheduleId: 5,
      number: "ER0000005",
    },
  ]);
}

async function createCertificates() {
  console.log("Setting up certificates");
  await truncateTable("certificates");

  await db.insert(certificates).values([
    {
      name: "Beginner Chemist",
      received: false,
    },
    {
      name: "Intermediate Physician",
      received: false,
    },
    {
      name: "Advanced Mathematician",
      received: true,
    },
    {
      name: "Advanced Physician",
      received: false,
    },
    {
      name: "Beginner Athlete",
      received: true,
    },
  ]);
}

async function createResults() {
  console.log("Setting up results");
  await truncateTable("results");

  await db.insert(results).values([
    {
      enrollmentId: 1,
      result: 8.0,
      certificateId: 1,
    },
    {
      enrollmentId: 2,
      result: 9.0,
      certificateId: 2,
    },
    {
      enrollmentId: 3,
      result: 6.5,
      certificateId: 3,
    },
    {
      enrollmentId: 4,
      result: 10.0,
      certificateId: 4,
    },
    {
      enrollmentId: 5,
      result: 5.0,
      certificateId: 5,
    },
  ]);
}

Promise.all([createEmployees(), createCustomers(), createSchedules(), createCertificates()])
  .then(() => Promise.all([createRegistrations()]))
  .then(() => Promise.all([createParticipants()]))
  .then(() => Promise.all([createEnrollments()]))
  .then(() => Promise.all([createResults()]))
  .then(() => {
    console.log("Finished setting up database");
    process.exit(0);
  });
