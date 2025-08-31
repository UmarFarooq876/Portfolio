# Portfolio Website

A beautiful, modern portfolio website built with Next.js and Tailwind CSS.

## Features

- 🎨 **Modern Design**: Clean and professional design with gradient backgrounds and glass effects
- 📱 **Responsive**: Fully responsive design that works on all devices
- ⚡ **Fast**: Built with Next.js for optimal performance
- 🎯 **Interactive**: Smooth scrolling navigation and hover effects
- 📝 **Complete Sections**: Hero, About, Skills, Projects, and Contact sections

## Sections Included

1. **Hero Section**: Eye-catching introduction with call-to-action buttons
2. **About Section**: Personal information with skill progress bars
3. **Skills Section**: Technology stack with colorful cards
4. **Projects Section**: Portfolio showcase with project cards
5. **Contact Section**: Contact form and contact information
6. **Navigation**: Fixed navigation bar with smooth scrolling

## Technologies Used

- **Next.js 15** - React framework
- **Tailwind CSS 4** - Utility-first CSS framework
- **TypeScript** - Type safety
- **React 19** - Latest React features

## Getting Started

### Prerequisites

- Node.js 18+ installed on your machine
- npm or yarn package manager

### Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd portfolio
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Customization

### Personal Information
Update the following in `app/page.tsx`:
- Name and title in the Hero section
- About section content
- Contact information
- Project details

### Styling
- Colors and gradients can be modified in the Tailwind classes
- Custom CSS is available in `app/globals.css`

### Adding Projects
Add new projects to the projects array in the Projects section of `app/page.tsx`.

## Deployment

This project can be easily deployed to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

## Project Structure

```
portfolio/
├── app/
│   ├── page.tsx          # Main portfolio page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── public/               # Static assets
├── package.json          # Dependencies
└── README.md            # This file
```

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js & Tailwind CSS
