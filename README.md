# Seating Chart App

## About

Service to allow teachers to create seating charts automatically

## Get Started (Web App)

### How to Build the Web App

```
cd web-app
npm i
```

### How to Run the Web App

```
cd web-app
npm start
```

## Get Started (Server and Web App)

### How to Build the Server and Web App

```
npm i
npm run build
```

### How to Run the Server and Web App

```
npm run start-dev
```

## Project Structure

```
.
├── src/                        # server code
│   └── index.ts
├── web-app/                    # web app code
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html          # static webpage served
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── index.tsx           # web app entry point
│   │   ├── App.tsx
│   │   ├── index.scss
│   │   ├── App.test.tsx
│   │   ├── setupTests.ts
│   │   ├── reportWebVitals.ts
│   │   └── react-app-env.d.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── yarn.lock
│   ├── README.md
│   ├── .env
│   └── .gitignore
├── Procfile                    # Heroku build file
├── tsconfig.json
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```