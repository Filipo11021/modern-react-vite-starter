// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthImport } from './routes/auth'
import { Route as AppImport } from './routes/app'
import { Route as IndexImport } from './routes/index'
import { Route as AuthLoginImport } from './routes/auth/login'
import { Route as AppPostsIndexImport } from './routes/app/posts/index'
import { Route as AppPostsPostIdIndexImport } from './routes/app/posts/$postId/index'

// Create/Update Routes

const AuthRoute = AuthImport.update({
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const AppRoute = AppImport.update({
  path: '/app',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  path: '/login',
  getParentRoute: () => AuthRoute,
} as any)

const AppPostsIndexRoute = AppPostsIndexImport.update({
  path: '/posts/',
  getParentRoute: () => AppRoute,
} as any)

const AppPostsPostIdIndexRoute = AppPostsPostIdIndexImport.update({
  path: '/posts/$postId/',
  getParentRoute: () => AppRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/app': {
      preLoaderRoute: typeof AppImport
      parentRoute: typeof rootRoute
    }
    '/auth': {
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/auth/login': {
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof AuthImport
    }
    '/app/posts/': {
      preLoaderRoute: typeof AppPostsIndexImport
      parentRoute: typeof AppImport
    }
    '/app/posts/$postId/': {
      preLoaderRoute: typeof AppPostsPostIdIndexImport
      parentRoute: typeof AppImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  AppRoute.addChildren([AppPostsIndexRoute, AppPostsPostIdIndexRoute]),
  AuthRoute.addChildren([AuthLoginRoute]),
])
