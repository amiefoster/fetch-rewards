import { render, screen } from '@testing-library/react';
import SignUpForm from "../components/SignUpForm";
import userEvent from '@testing-library/user-event'

test('has name, email, password, occupation, and state fields and submit button', () => {
  render(<SignUpForm />);

  const nameField = screen.getByLabelText(/full name:/i);
  const emailField = screen.getByLabelText(/email:/i);
  const passwordField = screen.getByText(/password:/i);
  const occupationField = screen.getByLabelText(/occupation:/i);
  const stateField = screen.getByLabelText(/state:/i);
  const submitButton = screen.getByText(/sign up/i);

  expect(nameField).toBeInTheDocument();
  expect(emailField).toBeInTheDocument();
  expect(passwordField).toBeInTheDocument();
  expect(occupationField).toBeInTheDocument();
  expect(stateField).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

});
