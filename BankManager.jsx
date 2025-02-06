import React, { useState } from 'react';

const BankManager = () => {
    const [banks, setBanks] = useState([
        { id: 1, name: 'Bank A', balance: 300, branchCode: 'Chennai' },
        { id: 2, name: 'Bank B', balance: 150, branchCode: 'Mumbai' },
        { id: 3, name: 'Bank C', balance: 500, branchCode: 'Chennai' },
    ]);

    const [newBank, setNewBank] = useState({ name: '', balance: '', branchCode: '' });

    const handleAddBank = (e) => {
        e.preventDefault();
        const updatedBanks = [
            ...banks,
            { id: banks.length + 1, ...newBank, balance: parseFloat(newBank.balance) },
        ];
        setBanks(updatedBanks);
        setNewBank({ name: '', balance: '', branchCode: '' });
    };

    const handleDeleteBank = (id) => {
        setBanks(banks.filter(bank => bank.id !== id));
    };

    const handleDeductFee = () => {
        const updatedBanks = banks.map(bank => ({
            ...bank,
            balance: (bank.balance * 0.9).toFixed(2),
        }));
        setBanks(updatedBanks);
    };

    const totalBalance = banks.reduce((acc, bank) => acc + parseFloat(bank.balance), 0).toFixed(2);

    return (
        <div>
            <h1>Bank Management</h1>
            <h2>Total Balance: {totalBalance}</h2>

            <h3>Banks with Balance > 200:</h3>
            {banks.filter(bank => bank.balance > 200).map(bank => (
                <div key={bank.id}>
                    <p>{bank.name}: {bank.balance} (Branch: {bank.branchCode})</p>
                    <button onClick={() => handleDeleteBank(bank.id)}>Delete</button>
                </div>
            ))}

            <button onClick={handleDeductFee}>Deduct 10% Monthly Service Fee</button>

            <h3>Banks with Balance > 200 and Branch Code "Chennai":</h3>
            {banks.filter(bank => bank.balance > 200 && bank.branchCode === 'Chennai').map(bank => (
                <div key={bank.id}>
                    <p>{bank.name}: {bank.balance} (Branch: {bank.branchCode})</p>
                    <button onClick={() => handleDeleteBank(bank.id)}>Delete</button>
                </div>
            ))}

            <h3>Add New Bank:</h3>
            <form onSubmit={handleAddBank}>
                <input
                    type="text"
                    placeholder="Name"
                    value={newBank.name}
                    onChange={(e) => setNewBank({ ...newBank, name: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Balance"
                    value={newBank.balance}
                    onChange={(e) => setNewBank({ ...newBank, balance: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Branch Code"
                    value={newBank.branchCode}
                    onChange={(e) => setNewBank({ ...newBank, branchCode: e.target.value })}
                    required
                />
                <button type="submit">Add Bank</button>
            </form>
        </div>
    );
};

export default BankManager;


### Step 5: Edit App Component

1. *Open App.jsx*: In the src directory, open the App.jsx file.

2. *Import and Use BankManager Component*: Modify App.jsx to import and include the BankManager component:

jsx
import React from 'react';
import BankManager from './BankManager';

const App = () => {
    return (
        <div>
            <BankManager />
        </div>
    );
};

export default App;
