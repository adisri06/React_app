import React, { useState, useEffect } from 'react';

const CustomerTable = () => {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [minPurchaseAmount, setMinPurchaseAmount] = useState(0);
    const [count, setCount] = useState(0);


    useEffect(() => {
        console.log('Component mounted or minPurchaseAmount changed');
        // Fetch data from the local JSON file
        const fetchCustomers = async () => {
            try {
                const response = await fetch('/customer.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCustomers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCustomers();
    }, []); // Empty array means this effect runs once after the component mounts

    useEffect(() => {
        // Filter customers based on the minimum purchase amount
        const filtered = customers.filter(customer => customer.purchaseAmount >= minPurchaseAmount);
        setFilteredCustomers(filtered);
    }, [minPurchaseAmount, customers]); // Re-run the effect when minPurchaseAmount or customers changes

    useEffect(() => {
        // Log count every time the component renders
        console.log('Component rendered, count:', count);
    }); // No dependency array means this effect runs after every render

    useEffect(() => {
        // Increment count every second
        const interval = setInterval(() => {
            setCount(prevCount => prevCount + 1);
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []); // Empty array means this effect runs once after the component mounts

    return (
        <div>
            <h1>Customer List</h1>
            <label>
                Min Purchase Amount: 
                <input
                    type="number"
                    value={minPurchaseAmount}
                    onChange={(e) => setMinPurchaseAmount(Number(e.target.value))}
                />
            </label>
            {filteredCustomers.length > 0 ? (
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Purchase Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map(customer => (
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.name}</td>
                                <td>{customer.age}</td>
                                <td>{customer.purchaseAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No customers found</p>
            )}
        </div>
    );
};

export default CustomerTable;
