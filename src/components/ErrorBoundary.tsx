'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    // Suppress React Three Fiber hydration errors
    if (
      error.message.includes('Minified React error #425') ||
      error.message.includes('Minified React error #418') ||
      error.message.includes('Minified React error #423') ||
      error.message.includes('Hydration')
    ) {
      console.warn('Suppressed React Three Fiber hydration error:', error.message)
      return
    }
    console.error('ErrorBoundary caught an error:', error)
  }

  render() {
    if (this.state.hasError && this.props.fallback) {
      return this.props.fallback
    }

    return this.props.children
  }
}