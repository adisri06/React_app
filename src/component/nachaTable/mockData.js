export const mockData = Array.from({ length: 100 }, (_, index) => ({
  key: index,
  account: 8845585 + index, // Unique account numbers
  fund: 1002 + (index % 5), // Varying fund values
  effDate: `0${(index % 9) + 1}/0${(index % 9) + 1}/24`, // Randomized date pattern
  resubDate: `0${(index % 5) + 1}/1${(index % 4) + 1}/24`, // Another randomized date pattern
  amount: (index % 3 === 0 ? "500.00" : index % 3 === 1 ? "250.00" : "100.00"),
  rejcd: index % 2 === 0 ? "R01" : "R02",
  cxlflg: index % 2 === 0 ? "Y" : "N",
  delagr: index % 3 === 0 ? "YES" : "NO",
  rejDescription: index % 2 === 0 ? "INSUFFICIENT FUNDS" : "ACCOUNT CLOSED",
}));