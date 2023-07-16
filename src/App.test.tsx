import {
  configure,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import App from './App';
import Page from './Page/Page';

configure({ asyncUtilTimeout: 5000 });

describe('Weather forecast app testing', () => {
  test('renders header text', () => {
    render(<App />);
    const header = screen.getByText(/^Weather$/i);
    expect(header).toBeInTheDocument();
  });

  test('enters location in the input field', async () => {
    render(<Page />);
    const input = screen.getAllByTestId('search');
    fireEvent.change(input[0], { target: { value: 'sydney' } });
    expect((input[0] as any).value).toBe('sydney');
  });

  test('trigger search button', async () => {
    render(<Page />);
    const input = screen.getAllByTestId('search');
    fireEvent.change(input[0], { target: { value: 'sydney' } });
    fireEvent.click(screen.getByText('SEARCH'));
    await waitFor(() => {
      const loading = screen.getByText(/^loading/i);
      expect(loading).toBeInTheDocument();
    });
  });

  test('checks location is correct', async () => {
    render(<Page />);
    const input = screen.getAllByTestId('search');
    fireEvent.change(input[0], { target: { value: 'sydney' } });
    fireEvent.click(screen.getByText('SEARCH'));
    await waitFor(() => {
      const city = screen.getByText(/^sydney/i);
      expect(city).toBeInTheDocument();
    });
  });

  test('checks for incorrect location', async () => {
    render(<Page />);
    const input = screen.getAllByTestId('search');
    fireEvent.change(input[0], { target: { value: 'sydney123' } });
    fireEvent.click(screen.getByText('SEARCH'));
    await waitFor(() => {
      const city = screen.getByText(/^There is no such location/i);
      expect(city).toBeInTheDocument();
    });
  });
});
