import { render, screen } from '@testing-library/react';
import App from '../components/App';

test('renders the landing page', () => {
  render(<App />);
  const linkElement = screen.getByText(/fetch rewards/i);
  expect(linkElement).toBeInTheDocument();
});
