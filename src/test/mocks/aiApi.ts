import { vi } from 'vitest';
import { GeneratedProject } from '../../App';

/**
 * Mock AI API responses for testing
 */

/**
 * Setup fetch mock for AI API calls
 */
export function setupFetchMock() {
  global.fetch = vi.fn();
  return global.fetch;
}

/**
 * Mock successful AI generation response
 */
export function mockSuccessfulGeneration(projects: GeneratedProject[]) {
  (global.fetch as any).mockResolvedValueOnce({
    ok: true,
    json: async () => ({ projects }),
  });
}

/**
 * Mock failed AI generation response
 */
export function mockFailedGeneration(error: string = 'API Error') {
  (global.fetch as any).mockRejectedValueOnce(new Error(error));
}

/**
 * Mock network error
 */
export function mockNetworkError() {
  (global.fetch as any).mockRejectedValueOnce(new Error('Network Error'));
}

/**
 * Reset fetch mock
 */
export function resetFetchMock() {
  if (global.fetch && typeof (global.fetch as any).mockReset === 'function') {
    (global.fetch as any).mockReset();
  }
}

/**
 * Verify fetch was called with specific parameters
 */
export function expectFetchCalledWith(url: string, options?: RequestInit) {
  expect(global.fetch).toHaveBeenCalledWith(url, expect.objectContaining(options || {}));
}
