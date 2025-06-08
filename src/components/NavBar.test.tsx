import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';

jest.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
}));

describe('NavBar', () => {
  it('renders navigation links', () => {
    render(<NavBar />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Audio Jobs')).toBeInTheDocument();
    expect(screen.getByText('Voices')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });
}); 