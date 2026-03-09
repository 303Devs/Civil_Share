

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DeployCivilShare = buildModule("DeployCivilShare", (m) => {
    const civilShare = m.contract("CivilShare");
    return { civilShare };
});

export default DeployCivilShare;