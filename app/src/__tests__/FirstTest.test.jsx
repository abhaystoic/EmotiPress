import {render, screen} from '@testing-library/react';
import FirstTest from '../App';

test("Example 1 renders successfully", () => {
  render(<FirstTest/>);
  const element = screen.getByText(/First Test/i);
  expect(element).toBeInTheDocument();
});

