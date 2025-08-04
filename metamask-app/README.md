# MetaMask Connect React App

A beautiful React application that allows users to connect their MetaMask wallet with a modern, responsive UI.

## Features

- 🔗 **MetaMask Integration**: Connect and disconnect from MetaMask wallet
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- 📱 **Responsive**: Works perfectly on desktop and mobile devices
- 🔄 **Auto-reconnect**: Remembers connection state across sessions
- 📋 **Copy Address**: Easy one-click address copying
- 🌐 **Network Detection**: Shows current blockchain network
- ⚡ **Real-time Updates**: Responds to account and network changes

## Prerequisites

- Node.js (version 14 or higher)
- MetaMask browser extension installed

## Installation

1. **Clone or download the project**

   ```bash
   # If you have the project files, navigate to the project directory
   cd metamask-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

## How to Use

### First Time Setup

1. Make sure you have MetaMask extension installed in your browser
2. If MetaMask is not installed, click the "Install MetaMask" button to download it
3. Create or import a wallet in MetaMask

### Connecting Your Wallet

1. Click the "Connect MetaMask" button
2. MetaMask will prompt you to connect your wallet
3. Approve the connection in MetaMask
4. Your wallet address and network information will be displayed

### Features Available After Connection

- **View Account**: See your wallet address (shortened format)
- **Copy Address**: Click to copy your full wallet address to clipboard
- **Network Info**: View which blockchain network you're connected to
- **Disconnect**: Click to disconnect your wallet

## Supported Networks

The app automatically detects and displays the following networks:

- Ethereum Mainnet
- Polygon Mainnet
- Optimism
- Arbitrum One
- Various testnets (Goerli, Mumbai, etc.)

## Project Structure

```
metamask-app/
├── src/
│   ├── components/
│   │   ├── MetaMaskConnect.jsx    # Main MetaMask component
│   │   └── MetaMaskConnect.css    # Component styles
│   ├── App.jsx                    # Main app component
│   ├── App.css                    # App styles
│   ├── main.jsx                   # App entry point
│   └── index.css                  # Global styles
├── public/                        # Static assets
├── package.json                   # Dependencies and scripts
└── README.md                      # This file
```

## Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **CSS3**: Modern styling with gradients and animations
- **MetaMask API**: Web3 wallet integration

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Customization

You can customize the app by:

- Modifying colors in `MetaMaskConnect.css`
- Adding more network support in the `getNetworkName` function
- Extending functionality with additional Web3 features

## Troubleshooting

### MetaMask Not Found

- Ensure MetaMask extension is installed
- Refresh the page after installing MetaMask
- Check if MetaMask is enabled in your browser

### Connection Issues

- Make sure MetaMask is unlocked
- Check if you're on the correct network
- Try refreshing the page and reconnecting

### Network Issues

- The app will show "Unknown" for unsupported networks
- You can add custom network support by modifying the networks object

## Security Notes

- This app only requests read access to your wallet
- No private keys are ever accessed or stored
- All wallet interactions go through MetaMask's secure interface
- Connection state is stored locally in your browser

## Contributing

Feel free to contribute to this project by:

- Reporting bugs
- Suggesting new features
- Submitting pull requests
- Improving documentation

## License

This project is open source and available under the MIT License.
