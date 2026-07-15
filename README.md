###### Node Client Starter

A reusable starter project for building client websites with Node.js, Express, EJS, and ES modules.

## Included features

* Express web server
* EJS page templates
* ES module `import` and `export` syntax
* Routes and controllers
* Centralized environment configuration
* 404 and server-error pages
* Responsive starter CSS
* Mobile navigation
* Health-check route
* Automated route tests
* Development watch mode

## Requirements

* Node.js 24 or newer
* npm

Check your installed versions:

```bash
node --version
npm --version
```

## Installation

Clone or copy the project, then enter its directory:

```bash
cd node-client-starter
```

Install the dependencies:

```bash
npm install
```

Copy the example environment file:

### Windows PowerShell

```powershell
Copy-Item .env.example .env
```

### macOS or Linux

```bash
cp .env.example .env
```

## Development

Start the development server:

```bash
npm run dev
```

The website should be available at:

```text
http://localhost:3000
```

Node will restart the server automatically when the server-side JavaScript files change.

## Production

Start the application without watch mode:

```bash
npm start
```

Production environment variables should normally be configured through the hosting platform.

## Testing

Run all automated tests:

```bash
npm test
```

Run the tests again whenever files change:

```bash
npm run test:watch
```

## Available routes

| Method | Route               | Purpose                             |
| ------ | ------------------- | ----------------------------------- |
| GET    | `/`                 | Displays the home page              |
| GET    | `/health`           | Confirms that the server is running |
| GET    | Any unmatched route | Displays the 404 page               |

## Adding UI components to pages

The HTML snippets in [UI-Components/modal.html](UI-Components/modal.html) and [UI-Components/accordion.html](UI-Components/accordion.html) can be copied directly into any webpage.

### Modal

- Add a trigger button with `data-modal-open="your-modal-id"`.
- Give the dialog the same id value.
- Use `data-modal-close` on any button inside the dialog that should close it.
- Make sure the page loads the shared script in [public/js/main.js](public/js/main.js) or the modal script from [public/js/components/modal.js](public/js/components/modal.js).

### Accordion

- Place all accordion items inside a container with `data-accordion`.
- Give each toggle button `data-accordion-trigger` and matching `id` and `aria-controls` values.
- Make sure the page loads the shared script in [public/js/main.js](public/js/main.js) or the accordion script from [public/js/components/accordion.js](public/js/components/accordion.js).

## Project structure

```text
node-client-starter/
├── public/
│   ├── css/
│   │   └── main.css
│   ├── images/
│   │   └── .gitkeep
│   └── js/
│       └── main.js
├── src/
│   ├── config/
│   │   └── environment.js
│   ├── controllers/
│   │   └── homeController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── notFound.js
│   ├── models/
│   │   └── .gitkeep
│   ├── routes/
│   │   └── homeRoutes.js
│   ├── services/
│   │   └── .gitkeep
│   ├── views/
│   │   ├── errors/
│   │   │   ├── 404.ejs
│   │   │   └── 500.ejs
│   │   ├── pages/
│   │   │   └── home.ejs
│   │   └── partials/
│   │       ├── footer.ejs
│   │       └── header.ejs
│   ├── app.js
│   └── server.js
├── tests/
│   └── app.test.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Folder responsibilities

### `routes`

Connect URLs and HTTP methods to controller functions.

### `controllers`

Handle incoming requests and decide what response should be returned.

### `middleware`

Run code during the request-and-response process.

### `services`

Contain reusable application operations, such as sending email or processing payments.

### `models`

Describe and interact with stored application data.

### `views`

Contain the EJS templates used to generate HTML.

### `public`

Contains files sent directly to the browser, such as CSS, browser JavaScript, images, and fonts.

### `tests`

Contains automated checks that confirm the application behaves as expected.

## Environment variables

Local environment variables belong in `.env`.

Never commit `.env` because it may contain passwords, database addresses, or API keys.

Document required variables in `.env.example` without including real secret values.
