const mockData = Array.from({ length: 50 }, (_, index) => ({
    key: index + 1,
    account: Math.floor(100000000 + Math.random() * 900000000).toString(), // Random 9-digit account number
    fund: Math.floor(Math.random() * 100) + 1, // Random fund between 1 and 100
    amount: (Math.random() * 1000).toFixed(2), // Random amount up to 1000
  }));
  
  export default mockData;
  