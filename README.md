# Public Holidays

A React application that displays public holidays for countries around the world. Built with TypeScript, Vite, and React 19.

## Features

- **Country Selection**: Browse and select from a comprehensive list of countries
- **Holiday Display**: View public holidays for the selected country with dates and names
- **Loading States**: User-friendly loading indicators while fetching data
- **Error Handling**: Graceful error messages if data fetching fails
- **Real-time Data**: Integrates with the [Open Holidays API](https://openholidaysapi.org/) for accurate, up-to-date holiday information

## Tech Stack

- **React 19** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **ESLint** - Code quality and consistency
- **PaperCSS** - Lightweight CSS framework

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd public-holidays
```

2. Install dependencies:
```bash
npm install
```

### Available Scripts

- **`npm run dev`** - Start the development server with hot module replacement
- **`npm run build`** - Build the application for production
- **`npm run lint`** - Run ESLint to check code quality
- **`npm run preview`** - Preview the production build locally

## Project Structure

```
src/
├── components/
│   ├── CountrySelector.tsx   # Dropdown for country selection
│   ├── PublicHolidays.tsx    # Displays holidays for selected country
│   └── Spinner.tsx           # Loading indicator component
├── App.tsx                   # Main application component
├── types.ts                  # TypeScript type definitions
├── main.tsx                  # Entry point
├── App.css                   # Application styles
└── index.css                 # Global styles
```

## API Integration

This application fetches data from the [Open Holidays API](https://openholidaysapi.org/):

- **Countries endpoint**: `https://openholidaysapi.org/Countries?languageIsoCode=EN`
- **Holidays endpoint**: Fetches holidays for the current year for selected countries

## Development

### Running the Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173` with hot module replacement enabled.

### Building for Production

```bash
npm run build
```

The optimized build will be generated in the `dist/` directory.

## License

This project is open source and available under the MIT License.
