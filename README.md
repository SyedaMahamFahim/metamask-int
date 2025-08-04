# MetaMask Wallet Integration Project

A complete full-stack application with React frontend and Node.js backend for MetaMask wallet integration and database storage.

## 🏗️ Project Structure

```
metamask-int/
├── metamask-app/          # React Frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── MetaMaskConnect.jsx
│   │   │   └── MetaMaskConnect.css
│   │   ├── App.jsx
│   │   └── ...
│   └── package.json
├── metamask-backend/      # Node.js Backend (Express + MongoDB)
│   ├── models/
│   │   └── Wallet.js
│   ├── routes/
│   │   └── wallet.js
│   ├── server.js
│   ├── .env
│   └── package.json
└── README.md
```

## 🚀 Features

### Frontend (React + Vite)

- ✅ **MetaMask Integration**: Connect and disconnect from MetaMask wallet
- ✅ **Beautiful UI**: Modern gradient design with smooth animations
- ✅ **Responsive Design**: Works on desktop and mobile
- ✅ **Auto-reconnect**: Remembers connection state
- ✅ **Network Detection**: Shows current blockchain network
- ✅ **Copy Address**: One-click address copying
- ✅ **API Integration**: Automatically saves wallet addresses to database

### Backend (Node.js + Express + MongoDB)

- ✅ **RESTful API**: Complete CRUD operations for wallet addresses
- ✅ **Database Storage**: MongoDB with Mongoose ODM
- ✅ **Data Validation**: Ethereum address format validation
- ✅ **Error Handling**: Comprehensive error responses
- ✅ **CORS Support**: Cross-origin resource sharing enabled
- ✅ **Environment Configuration**: Secure environment variables

## 📋 Prerequisites

- Node.js (version 14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- MetaMask browser extension

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd metamask-int
```

### 2. Backend Setup

```bash
cd metamask-backend
npm install
```

### 3. Environment Configuration

Create a `.env` file in `metamask-backend/`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/metamask-app
CORS_ORIGIN=http://localhost:5173
```

### 4. Frontend Setup

```bash
cd ../metamask-int/metamask-app
npm install
```

## 🚀 Running the Application

### Start Backend Server

```bash
cd metamask-backend
npm run dev
```

Backend will run on: `http://localhost:5000`

### Start Frontend Server

```bash
cd metamask-int/metamask-app
npm run dev
```

Frontend will run on: `http://localhost:5173`

## 📡 API Endpoints

### Wallet Management

- `POST /api/wallet/connect` - Save wallet address to database
- `GET /api/wallet/addresses` - Get all saved wallet addresses
- `GET /api/wallet/address/:address` - Get specific wallet by address
- `DELETE /api/wallet/address/:address` - Deactivate wallet (soft delete)

### API Request Examples

#### Connect Wallet

```javascript
POST http://localhost:5000/api/wallet/connect
Content-Type: application/json

{
  "address": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
  "network": "Ethereum Mainnet"
}
```

#### Get All Wallets

```javascript
GET http://localhost:5000/api/wallet/addresses
```

## 🗄️ Database Schema

### Wallet Collection

```javascript
{
  address: String (required, unique, lowercase),
  network: String (default: "Unknown"),
  connectedAt: Date (default: now),
  lastConnected: Date (default: now),
  connectionCount: Number (default: 1),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 How It Works

### 1. User Clicks "Connect MetaMask"

- Frontend requests MetaMask connection
- MetaMask prompts user for approval
- User approves connection

### 2. Frontend Processes Connection

- Gets wallet address and network
- Updates UI to show connected state
- Calls backend API to save data

### 3. Backend API Processing

- Validates Ethereum address format
- Checks if wallet already exists
- Creates new record or updates existing
- Returns success/error response

### 4. Database Storage

- Saves wallet address with metadata
- Tracks connection count and timestamps
- Maintains connection history

## 🎯 Usage Flow

1. **Open Application**: Navigate to `http://localhost:5173`
2. **Install MetaMask**: If not installed, click "Install MetaMask"
3. **Connect Wallet**: Click "Connect MetaMask" button
4. **Approve Connection**: Approve in MetaMask popup
5. **View Data**: See your wallet address and network info
6. **Database Storage**: Address automatically saved to MongoDB

## 🔍 Testing the API

### Using cURL

```bash
# Connect a wallet
curl -X POST http://localhost:5000/api/wallet/connect \
  -H "Content-Type: application/json" \
  -d '{"address":"0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6","network":"Ethereum Mainnet"}'

# Get all wallets
curl http://localhost:5000/api/wallet/addresses
```

### Using Postman

- Import the API endpoints
- Test with sample wallet addresses
- Verify database storage

## 🛡️ Security Features

- **Address Validation**: Ethereum address format validation
- **CORS Protection**: Configured for frontend domain
- **Error Handling**: Comprehensive error responses
- **Data Sanitization**: Address normalization (lowercase)
- **Soft Deletes**: Wallet deactivation instead of hard deletion

## 🚨 Troubleshooting

### Backend Issues

- **MongoDB Connection**: Ensure MongoDB is running
- **Port Conflicts**: Check if port 5000 is available
- **Environment Variables**: Verify .env file configuration

### Frontend Issues

- **MetaMask Not Found**: Install MetaMask extension
- **Connection Errors**: Check backend server status
- **CORS Errors**: Verify backend CORS configuration

### Database Issues

- **Connection Failed**: Check MongoDB URI in .env
- **Data Not Saving**: Verify API endpoint responses
- **Validation Errors**: Check address format

## 🔄 Development Commands

### Backend

```bash
npm run dev    # Start development server with nodemon
npm start      # Start production server
```

### Frontend

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
```

## 📝 Environment Variables

### Backend (.env)

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/metamask-app
CORS_ORIGIN=http://localhost:5173
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

For issues and questions:

- Check the troubleshooting section
- Review API documentation
- Check console logs for errors
- Verify database connectivity

---

**Happy Coding! 🚀**
