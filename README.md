# Seating Chart App

## About

Service to allow teachers to create seating charts automatically

## How to Build the Server and Web App

```
npm i
npm run build
```

## How to Run the Server and Web App

```
npm run start-dev
```

## How to Build the Web App Alone

```
cd web-app
npm i
```

## How to Run the Web App Alone

```
cd web-app
npm start
```

## Project Structure

```
.
├── src/                        # server code
│   └── index.ts
├── web-app/                    # web app code
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
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
├── Procfile
├── tsconfig.json
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```