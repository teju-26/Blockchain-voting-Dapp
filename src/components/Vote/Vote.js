import { useState } from "react";
import CandidatesData from "../candidates/Candidatesdata";
import './Vote.css'; // Import your CSS file


const Vote = ({ state }) => {

    const [candidates, setCandidates] = useState([]);

    const saveCandidates= (arr) => {
        setCandidates(arr);
    }


    const [selectedCandidate, setSelectedCandidate] = useState('');
    const [voted, setVoted] = useState('');



    function openPopup() {
        const popup = document.querySelector('.popup');
        if (popup) {
            popup.classList.add('open-popup');
        }
        if (selectedCandidate) {
            if (voted) {
                console.log("You have already voted!");
            } else {
                handleVote();
            }
        } else {
            closePopup();
            console.log("No candi selected! Caller: openPopupFunc")
            alert("No Candidate Selected!");
        }

    }

    function closePopup() {
        const popup = document.querySelector('.popup');
        if (popup) {
            popup.classList.remove('open-popup');
        }
    }


    const handleSelectChange = (event) => {
        setSelectedCandidate(event.target.value);
    };

    const checker = async (event) => {
        const { contract } = state;
        const { accounts } = state;


        if (!contract) {
            return;
        }
        const currentAccount = accounts[0];
        const VoteStatus = await contract.methods.voters(currentAccount).call();
        VoteStatus && console.log(VoteStatus)
        setVoted(VoteStatus);
        if (VoteStatus === true) {
           // console.log("Already Voted!!");
            const popuph2 = document.querySelector('.popup-h2');
            const popupP = document.querySelector('.popup-p');
            const popupimg = document.querySelector('.img-popup');
            popuph2.innerHTML = "Sorry!"
            popupP.innerHTML = "You have already Voted!"
            if (popupimg) {
                popupimg.classList.add('img-popup-cross');
            }
        }
    }
    checker();


    const handleVote = async (event) => {
        // event.preventDefault();
        const { contract } = state;
        const { accounts } = state;

        if (!contract) {
            return;
        }
        const currentAccount = accounts[0];

        if (selectedCandidate) {
            const transaction = await contract.methods.vote(selectedCandidate).send({ from: currentAccount });
            console.log('Transaction is done:', transaction);
            const popuph2 = document.querySelector('.popup-h2');
            const popupP = document.querySelector('.popup-p');
            const popupimg = document.querySelector('.img-popup');
            if (popupimg) {
                popupimg.classList.add('img-popup-tick');
            }
            popuph2.innerHTML = "Congrats!"
            popupP.innerHTML = "Your Vote is Submitted on the Blockchain!"
            
        } else {
            console.log("No Candidate Selected, Caller: HandleVote")
        }

    };

    return (
        <>
        <CandidatesData saveCandidates={saveCandidates}/>
            <div className="body11">
                <select
                    id="candidatesDropdown"
                    name="candidatesDropdown"
                    value={selectedCandidate}
                    onChange={handleSelectChange} >
                    <option value="" selected class="selected">Select a candidate</option>
                    {candidates.map((candidate) => (
                        <option key={candidate.id} value={candidate.id}>
                            {candidate.name}
                        </option>
                    ))}
                </select>
                <button className="VoteBtn" onClick={openPopup}>VOTE</button>
                <div className="container1">
                    <div className="popup">
                        <img className="img-popup" />
                        <h2 className="popup-h2">Please Wait!</h2>
                        <p className="popup-p">Your Transaction is in progress!</p>
                        <button type="submit" class="btn" onClick={closePopup}>Close</button>
                    </div>
                </div>
            </div>


        </>
    );
}

export default Vote;