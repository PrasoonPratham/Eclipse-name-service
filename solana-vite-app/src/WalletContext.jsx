import {
    WalletAdapterNetwork,
    WalletNotConnectedError,
} from "@solana/wallet-adapter-base";
import {
    WalletModalProvider,
    WalletMultiButton,
    WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import {
    getPhantomWallet,
    getSolflareWallet,
    getSolletWallet,
} from "@solana/wallet-adapter-wallets";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import React, { FC, ReactNode, useMemo } from "react";

export const WalletContext = ({ children }) => {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(
        () => [getPhantomWallet(), getSolflareWallet(), getSolletWallet()],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                    <WalletMultiButton />
                    <WalletDisconnectButton />
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
