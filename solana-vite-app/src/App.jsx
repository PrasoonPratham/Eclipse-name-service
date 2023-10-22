import React, { useState } from "react";
import { WalletContext } from "./WalletContext";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
import idl from "./idl.json"; // Make sure this path is correct and the file is present

const programID = new PublicKey("Your Program ID Here");
const network = clusterApiUrl("devnet");
const opts = {
  preflightCommitment: "processed",
};

function App() {
  const [name, setName] = useState("");

  const createName = async () => {
    try {
      const connection = new Connection(network, opts.preflightCommitment);
      const provider = new AnchorProvider(connection, window.solana, opts);
      const program = new Program(idl, programID, provider);
      const nameAccount = web3.Keypair.generate();
      await program.rpc.createName(name, {
        accounts: {
          nameAccount: nameAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        },
        signers: [nameAccount],
      });
      alert("Name Created Successfully");
    } catch (error) {
      console.error("Error creating name:", error);
      alert("Failed to create name");
    }
  };

  return (
    <div className="App">
      <WalletContext>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={createName}>Create Name</button>
      </WalletContext>
    </div>
  );
}

export default App;
