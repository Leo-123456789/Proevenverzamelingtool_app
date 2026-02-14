# Proevenverzamelingtool - Excel File Upload Application

A modern web application for uploading, viewing, and exporting Excel files. Built with React 17, Redux, and a Python/Streamlit backend.

## Quick Start

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   npm install --legacy-peer-deps
   ```

2. Build the React frontend:
   ```bash
   npm run build
   ```

3. Run the application:
   ```bash
   streamlit run streamlit_app.py
   ```

Visit http://localhost:8501 to see your app!

## Project Structure

```
src/
├── assets/              # Static files
├── components/          # Reusable UI components
│   ├── Alert/          # Notifications
│   ├── Button/         # Buttons
│   ├── Card/           # Cards
│   ├── DataTable/      # Table display
│   ├── LoadingSpinner/ # Loading indicator
│   └── Modal/          # Dialogs
├── modules/            # Page components
│   └── Dashboard/      # Main page
├── store/              # Redux state management
│   ├── index.ts        # Store config
│   └── slices/         # State slices
├── utils/              # Utility functions
├── App.tsx             # Root component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Features

- ✅ Upload Excel files (.xlsx, .xls, .csv)
- ✅ View data in interactive table
- ✅ Export data as CSV
- ✅ Load sample data for testing
- ✅ Fully responsive design
- ✅ TypeScript for type safety
- ✅ WCAG 2.1 accessibility
- ✅ Modern Tailwind CSS styling

## Technology Stack

- **Frontend**: React 17, Redux, TypeScript, Tailwind CSS
- **Backend**: Python, Streamlit
- **Build**: Vite (development), npm
- **Database**: Pandas DataFrames
- **File Parsing**: XLSX library

## Development

```bash
# Terminal 1: React dev server
npm run dev

# Terminal 2: Streamlit server
streamlit run streamlit_app.py
```

Access the app at http://localhost:5173 (React) or http://localhost:8501 (Streamlit)

## Available Scripts

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm run type-check # TypeScript checking
npm run lint       # Run ESLint
```

## Architecture

- **Components**: Pure, reusable UI pieces (no Redux)
- **Modules**: Smart containers with Redux integration
- **Store**: Redux Toolkit for state management
- **Utils**: Helper functions and constants

## Requirements

- Node.js 14.18+ (16+ for optimal support)
- npm 8.0+
- Python 3.7+

## File Upload Specifications

- **Supported Formats**: .xlsx, .xls, .csv
- **Maximum File Size**: 5MB
- **Headers**: First row is treated as column headers
- **Processing**: Data validation and parsing with XLSX library

## Deployment

The app is configured to run on Streamlit Cloud:

1. Push code to GitHub
2. Deploy via Streamlit Cloud dashboard
3. Configure secrets in Streamlit settings if needed

## License

MIT License - See LICENSE file for details
