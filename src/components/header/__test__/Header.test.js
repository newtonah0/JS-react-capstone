import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';

describe('header testing', () => {
  it('shoud be in the document', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('shoud be visible in the document', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    expect(screen.getByTestId('header')).toBeVisible();
  });
});
