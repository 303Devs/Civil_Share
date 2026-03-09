import * as dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.28",
        settings: {
    optimizer: {
        enabled: true,
        runs: 200,
    },
    viaIR: true,
    },
},
    networks: {
        baseGoerli: {
            url: process.env.BASE_TESTNET_RPC || "",
            accounts: process.env.FOUNDER_PRIVATE_KEY ? [process.env.FOUNDER_PRIVATE_KEY] : [],
        },
    },
};

export default config;
