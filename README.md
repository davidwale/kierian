## Kieriantech

### Introduction

This project was developed as part of the interview process for Kieriantech. It provides a simple yet effective demonstration of a service-oriented architecture using NodeJS to facilitate peer-to-peer transactions for agents.


### Overview

It comprises:
- A backend server using Node.js and Express.js to handle API requests.
- SQLite for transaction logging and audit trails.
- Basic front-end form to simulate agent interactions.

### Key Features

1. **Parameter Validation**: The API ensures all required fields are correctly filled, with specific emphasis on the length of the Agent ID and PIN.
2. **Transaction Logging**: All transactions, whether successful or failed, are logged into the SQLite database, enabling a full audit trail.
3. **Front-end Interface**: A straightforward form provides a visual means for testing the API's capabilities.
4. **Static OTP Validation**: For demonstration purposes, a static OTP is utilized. In a real-world scenario, this would be dynamically generated and sent to the agent's phone.

### Running the Application

1. **Setup & Installation**
   \```sh
   git clone https://github.com/davidwale/kierian.git
   cd node
   npm install
   node server.js
   \```

2. **Access the Frontend Form**: open the html file in a browser to access the transaction form.

### Explaining Design Choices

- **SQLite**: SQLite, an in-memory database, was chosen for its simplicity and to avoid external database setup complexities. For production, a persistent, scalable database would be more appropriate.
  
- **Static OTP**: For simplicity, a static OTP was used. In real-world applications, integration with an SMS gateway would be necessary to send dynamic OTPs.

- **Express.js**: Being lightweight and efficient, Express.js serves as an ideal choice for this task, ensuring quick setup without excess overhead.


