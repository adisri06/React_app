// api/fetchMockData.js

export const fetchMockData = async () => {
    try {
      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay
  
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const shouldFail = Math.random() < 0.3;
      if (shouldFail) {
        throw new Error("Simulated API failure");
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const json = await response.json();
  
      const mappedData = json.slice(0, 5).map((item, index) => ({
        key: index,
        account: 880000 + item.id,
        fund: 1000 + item.userId,
        effDate: "01/05/24",
        resubDate: "02/10/24",
        amount: (Math.random() * 1000).toFixed(2),
        rejcd: "R0" + (index + 1),
        cxlflg: index % 2 === 0 ? "Y" : "N",
        delagr: index % 2 === 0 ? "YES" : "NO",
        rejDescription: item.title.toUpperCase().slice(0, 30),
      }));
  
      return mappedData;
    } catch (error) {
      throw new Error("Something went wrong, please try again later.");
    }
  };