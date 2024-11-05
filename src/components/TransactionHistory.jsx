import React, { useState, useEffect } from 'react';
import { fetchTransactionHistory } from './WalleteService';

const TransactionHistory = ({ address }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (address) {
            setLoading(true);
            fetchTransactionHistory(address, setTransactions).finally(() => setLoading(false));
        }
    }, [address]);

    return (
        <div className="mt-6">
            <h3 className="font-medium">Transaction History</h3>
            {loading ? (
                <p>Loading...</p>
            ) : transactions.length > 0 ? (
                <ul className="space-y-4">
                    {transactions.map((tx, index) => (
                        <li key={index} className="p-4 bg-gray-50 rounded-lg">
                            <p><strong>Transaction ID:</strong> {tx.id}</p>
                            <p><strong>Type:</strong> {tx['tx-type']}</p>
                            <p><strong>Amount:</strong> {tx['payment-transaction']?.amount / 1e6 || 0} ALGO</p>
                            <p><strong>Timestamp:</strong> {new Date(tx['round-time'] * 1000).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No transactions found.</p>
            )}
        </div>
    );
};

export default TransactionHistory;
