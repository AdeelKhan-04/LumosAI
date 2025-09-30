# Lumos.ai

Lumos.ai is a modern AI SaaS platform built with React, Vite, and Tailwind CSS. It features a beautiful UI, responsive design, and a suite of AI-powered tools including text generation, image generation, and more.

## Features
- AI-powered text and image generation
- Modern, responsive UI with Tailwind CSS
- Sidebar navigation and user profile
- Customizable footer and branding
- Fast development with Vite

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

### Build for Production
```sh
npm run build
# or
yarn build
```

## Project Structure
```
client/
  src/
    assets/        # Images, logos, and static assets
    component/     # Reusable React components
    pages/         # Page-level components and layouts
    constants/     # App-wide constants
    index.css      # Global styles (Tailwind)
    main.jsx       # App entry point
  public/          # Static files
  package.json     # Project metadata and scripts
  README.md        # Project documentation
```

## Customization
- Update the logo in `src/assets/logo.png`.
- Change site name and branding in `Footer.jsx` and `Navbar.jsx`.
- Add or modify AI tools in the `component` and `pages` folders.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.
