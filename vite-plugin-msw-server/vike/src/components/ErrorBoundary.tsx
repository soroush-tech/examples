import React from 'react'

type Props = { fallback: React.ReactNode; children: React.ReactNode }
type State = { hasError: boolean }

// A minimal React error boundary. When a child (here, a `useAsync` fetch) throws — whether
// on the server during SSR/prerender or on the client — React unmounts the subtree and
// renders `fallback` instead of crashing the whole render. Error boundaries have to be
// class components; there is no hook equivalent.
export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    // Surface the cause in the server/browser console; swap for your telemetry.
    console.error('API call failed:', error)
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}
