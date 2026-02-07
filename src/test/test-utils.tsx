import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

/**
 * Custom render function that wraps components with necessary providers
 * Currently no providers are needed, but this structure allows for easy addition
 * of context providers, routers, or theme providers in the future
 */
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { ...options });
}

// Re-export everything from React Testing Library
export * from '@testing-library/react';
export { customRender as render };
