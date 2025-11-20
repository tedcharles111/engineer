import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: '/styles/index.css' }
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>Multiverse - AI Web App Builder</title>
      </head>
      <body>
        <div className="multiverse-app">
          <header className="app-header">
            <h1>🚀 Multiverse AI Builder</h1>
            <p>Create web apps with the power of multiple AI models</p>
          </header>
          <main>
            <Outlet />
          </main>
        </div>
        <ScrollRestoration />
        <Scripts />
        <script src="https://code.responsivevoice.org/responsivevoice.js?key=WkAsgle4"></script>
      </body>
    </html>
  );
}
