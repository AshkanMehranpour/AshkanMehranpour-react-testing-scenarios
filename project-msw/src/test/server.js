import { setupServer } from 'msw/node';
import { rest } from 'msw';

/**
 * Creates a mock server for testing HTTP requests
 * 
 * This utility function sets up a Mock Service Worker (MSW) server
 * to intercept HTTP requests during tests and respond with mock data.
 * 
 * @param {Array} handlerConfig - Array of handler configuration objects
 * @param {string} handlerConfig[].path - API endpoint path to mock (e.g. '/api/user')
 * @param {Function} handlerConfig[].res - Function that returns the mock response data
 * @param {string} [handlerConfig[].method='get'] - HTTP method to mock (defaults to 'get')
 * 
 * @example
 * // Example usage:
 * createServer([
 *   {
 *     path: '/api/users',
 *     method: 'get',
 *     res: () => {
 *       return { users: [{ id: 1, name: 'John' }] };
 *     }
 *   },
 *   {
 *     path: '/api/posts',
 *     method: 'post',
 *     res: (req) => {
 *       // Access request body or params if needed
 *       return { success: true, id: 123 };
 *     }
 *   }
 * ]);
 */
export function createServer(handlerConfig) {
  // Transform configuration objects into MSW request handlers
  const handlers = handlerConfig.map((config) => {
    // Use specified HTTP method or default to 'get'
    return rest[config.method || 'get'](config.path, (req, res, ctx) => {
      // Call the response function from config and wrap it in a JSON response
      return res(ctx.json(config.res(req, res, ctx)));
    });
  });
  
  // Create the MSW server with all configured handlers
  const server = setupServer(...handlers);

  // Set up testing lifecycle hooks to manage the server
  
  // Start the server before all tests
  beforeAll(() => {
    server.listen();
  });
  
  // Reset handlers after each test for isolation
  afterEach(() => {
    server.resetHandlers();
  });
  
  // Clean up and close server after all tests complete
  afterAll(() => {
    server.close();
  });
}
