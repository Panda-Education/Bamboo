import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import type { LinksFunction } from "@remix-run/node";
import styles from "./tailwind.css?url";
import { Toaster } from '@/components/shadcn/ui/sonner';
import { ServiceProvider } from '~/services/provider';
import { Provider } from 'jotai';
import React from 'react';
import AuthGuard from '~/guards/auth_guard';

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Panda Learn</title>
        <Meta />
        <Links />
      </head>
      <Provider>
        <ServiceProvider>
          <body>
            <Toaster richColors />
            <AuthGuard>
              {children}
            </AuthGuard>
            <ScrollRestoration />
            <Scripts />
          </body>
        </ServiceProvider>
      </Provider>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
