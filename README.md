# 📄 Resume Builder

A modern, interactive web application for building ATS-friendly resumes with real-time preview, AI-powered content generation, and professional templates.

## 🌐 Live Demo

Check out the live demo here: [https://resume-builder-sand-eight.vercel.app/](https://resume-builder-sand-eight.vercel.app/)

## ✨ Features

### Core Functionality
- **Real-time Live Preview**: See your resume update instantly as you type
- **Multiple Professional Templates**: Choose from Modern, Classic, and Minimal designs
- **ATS-Friendly**: Optimized for Applicant Tracking Systems to increase your chances of getting noticed
- **PDF Export**: Download your resume as a high-quality PDF with one click
- **Multi-language Support**: Available in English and Arabic
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Smart Features
- **AI-Powered Content Generation**: Leverage Google Gemini AI to generate professional descriptions for your experience, education, and projects
- **Form Validation**: Real-time validation ensures all required fields are properly filled
- **Data Persistence**: Your resume data is automatically saved to local storage
- **Page Break Visualization**: See exactly how your resume will be split across pages
- **Customizable Sections**: Add multiple experiences, education entries, projects, and skills

### Sections Supported
- Personal Information (Name, Contact, Summary)
- Work Experience
- Education
- Projects (with links and technologies)
- Skills

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Osama-2024-Ahmad/resume-builder.git
cd resume-builder
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables (optional for AI features):
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_OPENAI_KEY=your_openai_api_key_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React

### State Management & Forms
- **State Management**: Zustand
- **Form Handling**: React Hook Form
- **Validation**: Zod

### AI & Export
- **AI Integration**: Google Generative AI (Gemini)
- **PDF Generation**: jsPDF + html2canvas

## 📁 Project Structure

```
resume-builder/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── builder/           # Resume builder page
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/            # React components
│   │   ├── forms/            # Form components
│   │   ├── templates/        # Resume templates
│   │   └── ui/               # Reusable UI components
│   └── lib/                   # Utilities and helpers
│       ├── schemas.ts        # Zod validation schemas
│       ├── store.ts          # Zustand state management
│       ├── types.ts          # TypeScript types
│       ├── ai.ts             # AI integration
│       ├── pdf.ts            # PDF export logic
│       └── translations.ts   # i18n translations
├── public/                    # Static assets
└── package.json
```

## 🎨 Available Templates

1. **Modern**: Clean, professional design with blue accents and clear section separators
2. **Classic**: Traditional serif font with centered header and formal styling
3. **Minimal**: Minimalist design with subtle typography and maximum white space

## 🔧 Configuration

### Customizing Templates
Templates can be customized in `src/components/ResumePreview.tsx`. Each template has its own style configuration:

```typescript
const templates = {
  modern: { /* styles */ },
  classic: { /* styles */ },
  minimal: { /* styles */ }
}
```

### Adding New Languages
Add translations in `src/lib/translations.ts`:

```typescript
export const translations = {
  en: { /* English translations */ },
  ar: { /* Arabic translations */ },
  // Add your language here
}
```

## 📝 Usage Guide

1. **Start Building**: Click "Get Started" on the landing page
2. **Fill Personal Info**: Enter your name, contact details, and professional summary
3. **Add Experience**: Include your work history with descriptions
4. **Add Education**: List your educational background
5. **Add Projects**: Showcase your projects with links and technologies
6. **Add Skills**: List your technical and soft skills
7. **Choose Template**: Select from Modern, Classic, or Minimal designs
8. **Use AI (Optional)**: Click AI buttons to generate professional content
9. **Download**: Export your resume as a PDF

## 🤖 AI Features

The application integrates with Google Gemini AI to help you:
- Generate professional job descriptions
- Create compelling project descriptions
- Write effective professional summaries
- Optimize content for ATS systems

**Note**: You need to provide your own Gemini API key to use AI features.

## 📦 Build & Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/resume-builder)

### Deploy to Other Platforms
This is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Google Cloud Platform
- Any Node.js hosting service

## 🔒 Privacy & Data

- All resume data is stored locally in your browser
- No data is sent to external servers (except when using AI features)
- You can clear your data anytime using the "Reset Data" button

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- AI powered by [Google Gemini](https://ai.google.dev/)

