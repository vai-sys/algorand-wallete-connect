// import React, { useState, useEffect } from 'react';
// import algosdk from 'algosdk';
// import axios from 'axios';
// import { PeraWalletConnect } from '@perawallet/connect';

// const peraWallet = new PeraWalletConnect({ network: 'testnet' });

// const endpoints = [
//     'https://testnet-api.algonode.cloud',
//     'https://testnet.algoexplorerapi.io',
//     'https://testnet-api.4160.nodely.dev'
// ];

// const App = () => {
//     const [address, setAddress] = useState('');
//     const [balance, setBalance] = useState(0);
//     const [accountDetails, setAccountDetails] = useState(null);
//     const [error, setError] = useState('');
//     const [showAccountDetails, setShowAccountDetails] = useState(false);

//     useEffect(() => {
//         checkConnection();
//         peraWallet.connector?.on('disconnect', handleDisconnect);
//         return () => {
//             peraWallet.connector?.off('disconnect', handleDisconnect);
//         };
//     }, []);

//     const checkConnection = async () => {
//         const accounts = await peraWallet.reconnectSession();
//         if (accounts && accounts.length > 0) {
//             const connectedAddress = accounts[0];
//             setAddress(connectedAddress);
//             fetchBalance(connectedAddress);
//         }
//     };

//     const handleDisconnect = () => {
//         setAddress('');
//         setBalance(0);
//         setAccountDetails(null);
//         setError('');
//     };

//     const connectWallet = async () => {
//         try {
//             const newAccounts = await peraWallet.connect();
//             if (newAccounts && newAccounts.length > 0) {
//                 const connectedAddress = newAccounts[0];
//                 setAddress(connectedAddress);
//                 fetchBalance(connectedAddress);
//             }
//         } catch (error) {
//             console.error('Failed to connect wallet:', error);
//             setError('Connection failed. Please try again.');
//         }
//     };

//     const disconnectWallet = () => {
//         peraWallet.disconnect();
//         handleDisconnect();
//     };

//     const fetchBalance = async (accountAddress) => {
//         if (!accountAddress) return;
//         const algodClient = new algosdk.Algodv2('', endpoints[0], '');
//         try {
//             const accountInfo = await algodClient.accountInformation(accountAddress).do();
//             setBalance(accountInfo.amount / 1e6);
//         } catch (error) {
//             console.error('Failed to fetch balance:', error);
//             setError('Failed to fetch balance.');
//         }
//     };

//     const fetchAccountDetails = async () => {
//         if (!address) return;
//         try {
//             const response = await axios.get(`${endpoints[0]}/v2/accounts/${address}`);
//             setAccountDetails(response.data);
//             fetchBalance(address);
//         } catch (error) {
//             console.error('Failed to fetch account details:', error);
//             setError('Failed to fetch account details. Please try again later.');
//         }
//     };

//     const toggleAccountDetails = () => {
//         setShowAccountDetails(!showAccountDetails);
//         fetchAccountDetails();
//     };

//     return (
//         <div className="app-container bg-gray-100 min-h-screen flex items-center justify-center p-6">
//             <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
//                 <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//                     Algorand Wallet & Account Info
//                 </h1>

//                 {!address ? (
//                     <button
//                         onClick={connectWallet}
//                         className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
//                     >
//                         Connect Wallet
//                     </button>
//                 ) : (
//                     <div>
//                         <div className="p-6 mb-4 bg-gray-50 rounded-lg">
//                             <p className="text-sm font-medium text-gray-500">Connected Address</p>
//                             <p className="text-sm font-mono text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">{address}</p>
//                             <p className="text-lg font-semibold text-green-600 mt-4">
//                                 Balance: {balance.toFixed(6)} ALGO
//                             </p>
//                         </div>
                        
//                         <button
//                             onClick={disconnectWallet}
//                             className="w-full py-3 mb-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all"
//                         >
//                             Disconnect Wallet
//                         </button>

//                         <button
//                             onClick={toggleAccountDetails}
//                             className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-all"
//                         >
//                             {showAccountDetails ? 'Hide Account Info' : 'Show Account Info'}
//                         </button>

//                         {showAccountDetails && accountDetails && (
//                             <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-inner">
//                                 <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Details</h2>
//                                 <div className="text-sm text-gray-700">
//                                     <p><strong>Address:</strong> {accountDetails.address}</p>
//                                     <p><strong>Balance:</strong> {(accountDetails.amount / 1e6).toFixed(6)} ALGO</p>
//                                     <p><strong>Status:</strong> {accountDetails.status}</p>
//                                     <p><strong>Pending Rewards:</strong> {(accountDetails['pending-rewards'] / 1e6).toFixed(6)} ALGO</p>
//                                     <p><strong>Total Assets Opted In:</strong> {accountDetails['total-assets-opted-in']}</p>
//                                     <p><strong>Total Apps Opted In:</strong> {accountDetails['total-apps-opted-in']}</p>
//                                     <p><strong>Min Balance Required:</strong> {(accountDetails['min-balance'] / 1e6).toFixed(6)} ALGO</p>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 )}

//                 {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
//             </div>
//         </div>
//     );
// };

// export default App;




import React, { useState, useEffect } from 'react';
import algosdk from 'algosdk';
import axios from 'axios';
import { PeraWalletConnect } from '@perawallet/connect';

const peraWallet = new PeraWalletConnect({ network: 'testnet' });

const endpoints = [
    'https://testnet-api.algonode.cloud',
    'https://testnet.algoexplorerapi.io',
    'https://testnet-api.4160.nodely.dev'
];

const App = () => {
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState(0);
    const [accountDetails, setAccountDetails] = useState(null);
    const [error, setError] = useState('');
    const [showAccountDetails, setShowAccountDetails] = useState(false);

    useEffect(() => {
        checkConnection();
        peraWallet.connector?.on('disconnect', handleDisconnect);
        return () => {
            peraWallet.connector?.off('disconnect', handleDisconnect);
        };
    }, []);

    const checkConnection = async () => {
        const accounts = await peraWallet.reconnectSession();
        if (accounts && accounts.length > 0) {
            const connectedAddress = accounts[0];
            setAddress(connectedAddress);
            fetchBalance(connectedAddress);
        }
    };

    const handleDisconnect = () => {
        setAddress('');
        setBalance(0);
        setAccountDetails(null);
        setError('');
    };

    const connectWallet = async () => {
        try {
            const newAccounts = await peraWallet.connect();
            if (newAccounts && newAccounts.length > 0) {
                const connectedAddress = newAccounts[0];
                setAddress(connectedAddress);
                fetchBalance(connectedAddress);
            }
        } catch (error) {
            console.error('Failed to connect wallet:', error);
            setError('Connection failed. Please try again.');
        }
    };

    const disconnectWallet = () => {
        peraWallet.disconnect();
        handleDisconnect();
    };

    const fetchBalance = async (accountAddress) => {
        if (!accountAddress) return;
        const algodClient = new algosdk.Algodv2('', endpoints[0], '');
        try {
            const accountInfo = await algodClient.accountInformation(accountAddress).do();
            setBalance(accountInfo.amount / 1e6);
        } catch (error) {
            console.error('Failed to fetch balance:', error);
            setError('Failed to fetch balance.');
        }
    };

    const fetchAccountDetails = async () => {
        if (!address) return;
        try {
            const response = await axios.get(`${endpoints[0]}/v2/accounts/${address}`);
            setAccountDetails(response.data);
            fetchBalance(address);
        } catch (error) {
            console.error('Failed to fetch account details:', error);
            setError('Failed to fetch account details. Please try again later.');
        }
    };

    const toggleAccountDetails = () => {
        setShowAccountDetails(!showAccountDetails);
        fetchAccountDetails();
    };

    return (
        <div className="app-container bg-white min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
                    Algorand Wallet & Account Info
                </h1>

                {!address ? (
                    <button
                        onClick={connectWallet}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
                    >
                        Connect Wallet
                    </button>
                ) : (
                    <div>
                        <div className="p-6 mb-4 bg-gray-100 rounded-lg">
                            <p className="text-sm font-medium text-gray-500">Connected Address</p>
                            <p className="text-sm font-mono text-ellipsis overflow-hidden text-gray-900">
                                {address}
                            </p>
                            <p className="text-lg font-semibold text-green-600 mt-4">
                                Balance: {balance.toFixed(6)} ALGO
                            </p>
                        </div>

                        <button
                            onClick={disconnectWallet}
                            className="w-full py-3 mb-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all"
                        >
                            Disconnect Wallet
                        </button>

                        <button
                            onClick={toggleAccountDetails}
                            className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-semibold transition-all"
                        >
                            {showAccountDetails ? 'Hide Account Info' : 'Show Account Info'}
                        </button>

                        {showAccountDetails && accountDetails && (
                            <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-inner">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Details</h2>
                                <div className="text-sm text-gray-700">
                                    <p><strong>Address:</strong> {accountDetails.address}</p>
                                    <p><strong>Balance:</strong> {(accountDetails.amount / 1e6).toFixed(6)} ALGO</p>
                                    <p><strong>Status:</strong> {accountDetails.status}</p>
                                    <p><strong>Pending Rewards:</strong> {(accountDetails['pending-rewards'] / 1e6).toFixed(6)} ALGO</p>
                                    <p><strong>Total Assets Opted In:</strong> {accountDetails['total-assets-opted-in']}</p>
                                    <p><strong>Total Apps Opted In:</strong> {accountDetails['total-apps-opted-in']}</p>
                                    <p><strong>Min Balance Required:</strong> {(accountDetails['min-balance'] / 1e6).toFixed(6)} ALGO</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
            </div>
        </div>
    );
};

export default App;
