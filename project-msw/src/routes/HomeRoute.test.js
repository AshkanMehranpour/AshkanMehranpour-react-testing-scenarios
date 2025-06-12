import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import HomeRoute from './HomeRoute';
import { createServer } from '../test/server';

/**
 * Mock server setup for GitHub repository API
 *
 * This creates a mock server that intercepts requests to '/api/repositories'
 * and responds with mock data based on the language parameter in the query.
 *
 * The server extracts the language from the query parameter (q=language:X)
 * and dynamically generates repository names based on that language.
 * This allows us to test the UI for multiple languages with a single mock.
 *
 * @example
 * Request: '/api/repositories?q=language:javascript'
 * Response: { items: [
 *   { id: 1, full_name: 'javascript_one' },
 *   { id: 2, full_name: 'javascript_two' }
 * ]}
 */
createServer([
  {
    path: '/api/repositories',
    res: (req) => {
      // Extract the language from the query parameter
      // The format is expected to be 'q=language:X'
      const language = req.url.searchParams.get('q').split('language:')[1];

      console.log('language', language);

      // Return two mock repositories with names based on the language
      return {
        items: [
          { id: 1, full_name: `${language}_one` },
          { id: 2, full_name: `${language}_two` },
        ],
      };
    },
  },
]);

/**
 * Test: Repository links are correctly rendered for each language
 *
 * This test verifies that the HomeRoute component:
 * 1. Makes API requests for repositories in different languages
 * 2. Correctly renders two repository links per language
 * 3. Sets the proper link text and href attributes for each repository
 *
 * The component is expected to fetch and display repositories for
 * multiple programming languages, with each language section showing
 * the repositories returned from the API for that language.
 */
test('renders two links for each language', async () => {
  // Render the HomeRoute component inside a Router
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );

  // Define the programming languages we expect to see
  const languages = [
    'javascript',
    'typescript',
    'rust',
    'go',
    'python',
    'java',
  ];

  // Test each language section separately
  for (let language of languages) {
    // Find all links that contain the language name
    // Using regex to match partial text (e.g., "javascript_one")
    // Using findAllByRole to wait for async rendering
    const links = await screen.findAllByRole('link', {
      name: new RegExp(`${language}_`),
    });

    // Assertions for each language section:

    // 1. Verify we have exactly two repository links
    expect(links).toHaveLength(2);

    // 2. Verify the link text contains expected repository names
    expect(links[0]).toHaveTextContent(`${language}_one`);
    expect(links[1]).toHaveTextContent(`${language}_two`);

    // 3. Verify the links have the correct href attributes
    // This ensures clicking would navigate to the correct repository detail page
    expect(links[0]).toHaveAttribute('href', `/repositories/${language}_one`);
    expect(links[1]).toHaveAttribute('href', `/repositories/${language}_two`);
  }
});

/**
 * Helper function to create a delay in tests
 *
 * This function creates a Promise that resolves after a short delay (100ms).
 * It can be used to introduce pauses in test execution when needed,
 * particularly useful for debugging asynchronous behavior.
 *
 * @returns {Promise} A promise that resolves after 100ms
 * @example
 * // Usage in a test:
 * await pause();
 */
const pause = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 100);
  });
