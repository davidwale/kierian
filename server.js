const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(cors());
const port = 3000;

// sqlite Database setup for demonstration
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const Transaction = sequelize.define('Transaction', {
    sourceAgentId: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    destinationWalletId: DataTypes.STRING,
    date: DataTypes.DATE,
    status: DataTypes.STRING,
    errorMsg: DataTypes.TEXT
  });
  

app.use(bodyParser.json());

// const generateOTP = () => "123456"; 
const validateOTP = (otp) => otp === "123456";

app.post('/api/transaction', async (req, res) => {
    const { sourceAgentId, amount, destinationWalletId, pin, otp } = req.body;
    console.log(req.body);

    if (!sourceAgentId || sourceAgentId.length !== 12) {
        return res.status(400).send({ message: "Invalid Agent ID" });
    }
    
    if (typeof amount !== 'number') {
        return res.status(400).send({ message: "Invalid Amount" });
    }
    
    if (!destinationWalletId) {
        return res.status(400).send({ message: "Missing Destination Wallet ID" });
    }
    
    if (pin.length !== 4) {
        return res.status(400).send({ message: "Invalid PIN" });
    }
    

    if (!validateOTP(otp)) {
        return res.status(400).send({ message: "Invalid OTP" });
    }

    try {
        const transaction = await Transaction.create({
          sourceAgentId,
          amount,
          destinationWalletId,
          date: new Date(),
          status: "Successful",
          errorMsg: null
        });
        res.status(200).send({ message: "Transaction Successful", transaction });
      } catch (error) {
        await Transaction.create({
          sourceAgentId,
          amount,
          destinationWalletId,
          date: new Date(),
          status: "Failed",
          errorMsg: error.message
        });
        res.status(500).send({ message: "Transaction Failed", error: error.message });
      }
});

sequelize.sync().then(() => {
  app.listen(port, () => {
      console.log(`Server running at port ${port}`);
  });
});
