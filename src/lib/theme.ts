export const lightTheme = {
  colors: {
    primary: '#6366f1',
    primaryHover: '#4f46e5',
    secondary: '#8b5cf6',
    background: '#ffffff',
    surface: '#f9fafb',
    border: '#e5e7eb',
    text: {
      primary: '#111827',
      secondary: '#6b7280',
      muted: '#9ca3af',
      inverse: '#ffffff',
    },
    status: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
}

export const darkTheme: typeof lightTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: '#0f172a',
    surface: '#1e293b',
    border: '#334155',
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
      muted: '#64748b',
      inverse: '#0f172a',
    },
  },
}

export type AppTheme = typeof lightTheme
