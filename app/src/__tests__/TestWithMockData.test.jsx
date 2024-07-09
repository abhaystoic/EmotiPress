import {render, screen} from '@testing-library/react';
// import {userEvent} from '@testing-library/user-event';
// import TestWithMockData from '../App';
import App from '../App';

test("Page renders successfully", () => {
  render(<App />);
  const heading = screen.getByRole('heading', {level: 1})
  expect(heading).toBeInTheDocument();
  expect(heading).toHaveTextContent(/Home/i);
});

// const mockData = [
//   {
//     "id": 1,
//     "first_name": "Fletcher",
//     "last_name": "McVanamy",
//     "email": "mmcvanamy0@e-recht24.de",
//     "age": 30
//   }, {
//     "id": 2,
//     "first_name": "Clarice",
//     "last_name": "Harrild",
//     "email": "charrild1@dion.ne.jp",
//     "age": 35
//   }, {
//     "id": 3,
//     "first_name": "Amby",
//     "last_name": "Emmer",
//     "email": "aemmer2@buzzfeed.com",
//     "age": 67
//   }
// ]
// test("List renders successfully", () => {
//   render(<TestWithMockData data={mockData} displayUnorderedList={true}/>);
//   expect(screen.getByText(/fletcher/i)).toBeInTheDocument();
// });

// test("Ordered list renders", () => {
//   render(<TestWithMockData data={mockData} displayUnorderedList={false} />)
//   expect(screen.getByText(/McVanamy/i)).toBeInTheDocument()
// });

// test("Email link click handler called", async () => {
//   const mockHandleClick = jest.fn();
//   render(<TestWithMockData 
//               data={mockData} 
//               displayUnorderedList={true}
//               handleClick = {mockHandleClick}
//         />)
//   expect(screen.getByText(/mmcvanamy0@e-recht24.de/i)).toBeInTheDocument();
//   await userEvent.click(screen.getByText(/mmcvanamy0@e-recht24.de/i));
//   expect(mockHandleClick).toHaveBeenCalled();
// });