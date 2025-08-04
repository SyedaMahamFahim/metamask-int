import { useState, useEffect } from 'react';
import './MetaMaskConnect.css';

const MetaMaskConnect = () => {
  const [account, setAccount] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window.ethereum !== 'undefined';
  };

  // Connect to MetaMask
  const connectWallet = async () => {
    try {
      setError('');
      
      if (!isMetaMaskInstalled()) {
        setError('MetaMask is not installed. Please install MetaMask extension.');
        return;
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length > 0) {
        const walletAddress = accounts[0];
        setAccount(walletAddress);
        setIsConnected(true);
        localStorage.setItem('metamask-connected', 'true');
        
        // Get network name
        const network = await getNetworkName();
        
        // Save wallet address to database via API
        try {
          const response = await fetch('http://localhost:5000/api/wallet/connect', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              address: walletAddress,
              network: network
            })
          });

          const data = await response.json();
          
          if (data.success) {
            console.log('✅ Wallet saved to database:', data.message);
          } else {
            console.error('❌ Failed to save wallet to database:', data.error);
          }
        } catch (apiError) {
          console.error('❌ API Error:', apiError);
          // Don't show API error to user, just log it
        }
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      setError('Failed to connect to MetaMask. Please try again.');
    }
  };

  // Disconnect from MetaMask
  const disconnectWallet = () => {
    setAccount('');
    setIsConnected(false);
    setError('');
    localStorage.removeItem('metamask-connected');
  };

  // Handle account changes
  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // User disconnected their wallet
      disconnectWallet();
    } else if (accounts[0] !== account) {
      // User switched accounts
      setAccount(accounts[0]);
    }
  };

  // Handle chain changes
  const handleChainChanged = () => {
    // Reload the page when chain changes
    window.location.reload();
  };

  // Format account address for display
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Get network name
  const [networkName, setNetworkName] = useState('Unknown');

  const getNetworkName = async () => {
    if (!window.ethereum) return 'Unknown';
    
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const networks = {
        '0x1': 'Ethereum Mainnet',
        '0x3': 'Ropsten Testnet',
        '0x4': 'Rinkeby Testnet',
        '0x5': 'Goerli Testnet',
        '0x2a': 'Kovan Testnet',
        '0x89': 'Polygon Mainnet',
        '0x13881': 'Mumbai Testnet',
        '0xa': 'Optimism',
        '0xa4b1': 'Arbitrum One'
      };
      const network = networks[chainId] || `Chain ID: ${parseInt(chainId, 16)}`;
      setNetworkName(network);
      return network;
    } catch {
      setNetworkName('Unknown');
      return 'Unknown';
    }
  };

  useEffect(() => {
    // Check if user was previously connected
    const wasConnected = localStorage.getItem('metamask-connected');
    
    if (wasConnected && isMetaMaskInstalled()) {
      // Try to get the current account
      window.ethereum.request({ method: 'eth_accounts' })
        .then(async (accounts) => {
          if (accounts.length > 0) {
            const walletAddress = accounts[0];
            setAccount(walletAddress);
            setIsConnected(true);
            
            // Get network name
            const network = await getNetworkName();
            
            // Save wallet address to database via API
            try {
              const response = await fetch('http://localhost:5000/api/wallet/connect', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  address: walletAddress,
                  network: network
                })
              });

              const data = await response.json();
              
              if (data.success) {
                console.log('✅ Wallet reconnected and saved to database:', data.message);
              } else {
                console.error('❌ Failed to save wallet to database:', data.error);
              }
            } catch (apiError) {
              console.error('❌ API Error:', apiError);
              // Don't show API error to user, just log it
            }
          }
        })
        .catch(console.error);
    }

    // Set up event listeners
    if (isMetaMaskInstalled()) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      // Cleanup event listeners
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [account]);

  if (!isMetaMaskInstalled()) {
    return (
      <div className="metamask-container">
        <div className="metamask-card">
          <h2>MetaMask Not Found</h2>
          <p>Please install MetaMask extension to use this app.</p>
          <a 
            href="https://metamask.io/download/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="install-button"
          >
            Install MetaMask
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="metamask-container">
      <div className="metamask-card">
        <h2>MetaMask Connection</h2>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {!isConnected ? (
          <div className="connect-section">
            <p>Connect your MetaMask wallet to get started</p>
            <button 
              onClick={connectWallet}
              className="connect-button"
            >
              Connect MetaMask
            </button>
          </div>
        ) : (
          <div className="account-section">
            <div className="account-info">
              <h3>Connected Account</h3>
              <p className="account-address">{formatAddress(account)}</p>
                             <p className="network-info">Network: {networkName}</p>
            </div>
            
            <div className="account-actions">
              <button 
                onClick={() => navigator.clipboard.writeText(account)}
                className="copy-button"
              >
                Copy Address
              </button>
              <button 
                onClick={disconnectWallet}
                className="disconnect-button"
              >
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetaMaskConnect; 