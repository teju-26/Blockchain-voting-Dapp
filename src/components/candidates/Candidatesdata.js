// Handles The SaveCandidate Function

import { useState, useEffect } from "react";
import Wallet from "../Wallet/Wallet";

const CandidatesData = ({ saveCandidates }) => {
    // ******************
    const [state, setState] = useState({
        web: null,
        contract: null,
        accounts: null
    })
    const saveState = (state) => {
        setState(state);
    }
    // ******************


    const fetchData = async () => {
        const { contract } = state;
        if (!contract) {
            return;
        }
        const totalCandidates = await contract.methods.candidatesCount().call();
        console.log(totalCandidates);

        const candidatesData = await contract.methods.getCandidates().call();
        console.log(candidatesData);
        saveCandidates(candidatesData);
    }
    fetchData();


    return (<>
        <Wallet saveState={saveState} />
    </>);

};

export default CandidatesData;