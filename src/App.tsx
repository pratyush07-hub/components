import { useState } from "react";
import { InputField } from "./components/InputField";
import { UserCircle2 } from "lucide-react";
import "./index.css";
import { DataTable, type Column } from "./components/DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const users: User[] = [
  { id: 1, name: "Pratyush", email: "pratyush@example.com", age: 22 },
  { id: 2, name: "Bhavesh", email: "bhavesh@example.com", age: 21 },
  { id: 3, name: "Kunal", email: "kunal@example.com", age: 23 },
];

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

const App = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [search, setSearch] = useState("");

  const handleSubmit = () => {
    setSubmitted(true);

    if (!name || !password || !email) return;

    alert(
      `Form submitted successfully!\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Password: ${password}\n` +
        `Search: ${search || "N/A"}`
    );

    setName("");
    setPassword("");
    setEmail("");
    setSearch("");
    setSubmitted(false);
  };

  const namePattern = /^[A-Za-z\s]{3,30}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const isNameValid = namePattern.test(name);
  const isEmailValid = emailPattern.test(email);
  const isPasswordValid = passwordPattern.test(password);

  return (
    <>
      <main className="min-h-screen flex flex-col md:flex-row items-center gap-20 justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <div className="bg-white/90 shadow-xl rounded-2xl p-8 space-y-7 w-96 flex flex-col items-center">
          <UserCircle2 size={56} className="text-blue-400 mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">Welcome!</h1>
          <p className="text-gray-500 text-center mb-2">
            Please fill out the form below to get started.
          </p>

          <InputField
            label="Name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            helperText="Only letters (min 3 characters)"
            clearable
            invalid={submitted && !isNameValid}
            errorMessage="Name must be at least 3 letters"
            className="text-black"
          />

          <InputField
            label="Password"
            placeholder="Enter password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            helperText="Min 8 chars, 1 uppercase, 1 number, 1 special char"
            clearable
            invalid={submitted && !isPasswordValid}
            errorMessage="Password too weak"
            className="text-black"
          />

          <InputField
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText="Example: xxxx798@gmail.com"
            variant="filled"
            size="lg"
            clearable
            invalid={submitted && !isEmailValid}
            errorMessage="Invalid email address"
          />

          <InputField
            label="Search"
            value={search}
            placeholder="Search..."
            variant="ghost"
            onChange={(e) => setSearch(e.target.value)}
            size="sm"
            clearable
            className="text-black mt-2"
          />

          <button
            type="button"
            onClick={handleSubmit}
            className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105 transition-transform duration-200 shadow-md rounded-lg px-4 py-2 w-full disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            disabled={!isNameValid || !isPasswordValid || !isEmailValid}
          >
            Submit
          </button>
        </div>

        <section className="w-full max-w-3xl text-black">
          <h2 className="text-xl font-bold mb-4">User Table</h2>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <DataTable<User>
              data={users}
              columns={columns}
              selectable
              onRowSelect={(rows) => console.log("Selected Rows:", rows)}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
