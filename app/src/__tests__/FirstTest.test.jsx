import {render, screen} from '@testing-library/react';
import App from '../App';


test("Page renders successfully", () => {
  render(<App />);
  const heading = screen.getByRole('heading', {level: 1})
  expect(heading).toBeInTheDocument();
  expect(heading).toHaveTextContent(/Home/i);
});

// test("Example 1 renders successfully", () => {
//   render(<FirstTest/>);
//   const element = screen.getByText(/First Test/i);
//   expect(element).toBeInTheDocument();
// });


