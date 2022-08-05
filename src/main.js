import { arrayTokens, mainNetwork, checkNetwork, requestConnection, checkConnection, signTransaction, createTable } from './constants.js';

// Carga del front
window.onload = async () => {

    let closeModalButtons = document.getElementsByName("closeModal");
    closeModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            document.querySelector(".modal").classList.remove("show");
            document.querySelector(".modal-backdrop").classList.remove("show");
        });
    });
    
    checkConnection().then( dataConnect => {
        const buttonConnect = document.getElementById('button-connect');
        //const buttonSign = document.getElementById('sign-wallet');

        if (!dataConnect.connect) {
            buttonConnect.style.display = 'flex';
            buttonConnect.addEventListener("click", () => {
                requestConnection().then( async (data) => {
                    if (data.connect) {
                        buttonConnect.remove();
                        createTable();
                    } 
                });
            });
        }

        createTable();
    });

    if (window.ethereum) {
        window.ethereum.on('chainChanged', (net_id) => { if (net_id != mainNetwork) {
            setTimeout(() => {
                checkNetwork();
            }, 3000);
        }; });
    }
};