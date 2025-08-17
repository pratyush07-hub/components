📦 React Reusable Components

This repository contains reusable UI components (DataTable and InputField) built with React, TypeScript, and TailwindCSS.
The goal is to provide flexible, customizable, and responsive components for modern applications.

🚀 Setup Instructions

Clone the repo
git clone https://github.com/your-username/react-components.git
cd react-components

Install dependencies
npm install
or
yarn install

Run the development server
npm run dev
or
yarn dev

Open http://localhost:5173 (Vite default) to see it running.


📊 Components
DataTable

Displays tabular data with sorting, row selection, loading, and empty states.

Responsive by default with horizontal scroll on smaller screens.

InputField

Flexible input with label, placeholder, helper text, error handling, and multiple variants.

Supports clear button, password toggle, and light/dark themes.

🛠️ Approach

Modular Design → Each component lives in its own folder with a dedicated file and an index.ts for easy exports.

TypeScript First → Strong typing ensures reusability and reduces bugs.

TailwindCSS → Used for fast, responsive styling and theme support.

Reusability & Flexibility → Components are generic and accept props to cover multiple use cases.

Clean States Handling → Loading and empty states are built-in so developers don’t need to reinvent them.

Responsiveness → Ensured by wrapping tables in scroll containers and using adaptive spacing and font sizes.

🤝 Contributing

Contributions are welcome! Fork the repository, create a feature branch, make your changes, and submit a pull request.
