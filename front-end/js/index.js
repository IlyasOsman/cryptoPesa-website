/* 

100 per page api:
https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false

10 per page:
'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&price_change_percentage=1h%2C%2024h%2C%207d%2C%2014d%2C%2030d%2C%20200d%2C%201y'

*/

// Function to fetch API endpoint. Converted from Curl to Fetch.
// new api endpoint >>> testing
const coinGeckoApiData = () => {
    return fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false', { 

        headers: {
           Accept: "application/json"
        }
    })
       .then( response => response.json())
       .then(json => {

        rendercoinGeckoApiData(json)

       }).catch(err => {
           console.log(err)

        })
}
coinGeckoApiData()

// Function to render API data on the DOM
const rendercoinGeckoApiData = (json) => {
    const tableBody = document.querySelector('#tableBody');

    json.forEach(coin => {
    const div = document.createElement('div')

    div.innerHTML = `
        <button data-symbol="${coin.symbol}" id="modalButton" type="button" class="list-group-item list-group-item-action" data-bs-toggle="modal" data-bs-target="#modalID">
                <div class="d-flex w-100 justify-content-between">
                <span class="marketRank">${coin.market_cap_rank}</span>
                <img id="searchCoinImage" src="${coin.image}" alt="" height="30px">
                <p id="coinName" class="mb-1">${coin.name} ${coin.symbol.toUpperCase()}</p>
                Price: $${coin.current_price}
                </div>
                
        </button` 
        div.querySelector('button').addEventListener('click', (event) => {
            modalData(coin)
        })
        tableBody.appendChild(div);
    });
}

// const rendercoinGeckoApiData =.map((coin) => {
//     let tableData = "";
//     tableData += `
//     <tr>
//         <td>
//             <small><span class="marketRank">${coin.market_cap_rank}</span></small>
//         </td>

//         <td>
//             <img id="searchCoinImage" src="${coin.image}" alt="" height="30px">
//             <div class="d-flex w-100 justify-content-between">
//             <h6 id="coinName" class="mb-1">${coin.name} ${coin.symbol}</h6>
//         </td>
//             <small>${coin.current_price}</small>
//         <td>
//             <small>${coin.price_change_percentage_24h}</small>
//         </td>

//         <td>
//             <small>${coin.market_cap}</small>
//         </td>
//     </tr>`;

//     document.getElementById('tableBody');
//     innerHTML = tableData;
// }
// )

/*
Top search Function to search for coins based on user input. 
Must update code to work with new API endpoint
*/
const topSearch = () => {
    const topSearchForm = document.querySelector('#form-1');
    topSearchForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const userInput = document.querySelector('input#searchCoinID');
  
        fetch(`https://api.coingecko.com/api/v3/search?query=${userInput.value}`, { 

                 headers: {
                    Accept: "application/json"
                 }
             })
                .then( response => response.json())
                .then(json => {
        
                    renderSearchCoins(json.coins)
                })
    });
}
topSearch()

// Top search Function END!

/*
Main search function to search for coins based on user input. 
Must update code to work with new API endpoint
*/
const mainSearch = () => {
    const mainSearchForm = document.querySelector('#form-2');
    mainSearchForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const userInput = document.querySelector('input#searchCoinID2');
            fetch(`https://api.coingecko.com/api/v3/search?query=${userInput.value}`, { 

                 headers: {
                    Accept: "application/json"
                 }
            })
                .then( response => response.json())
                .then(json => {
                    renderSearchCoins(json.coins)
                })
    });
}
mainSearch()
// Main search fetch Function END!


// Function to render search results
function renderSearchCoins(coins) {
    const searchResults = document.querySelector('#searchResults');
    coins.forEach(coin => {
        const div = document.createElement('div')
        div.className = 'list-group';
        div.innerHTML = `
                <button data-symbol="${coin.symbol}" id="modalButton" type="button" class="list-group-item list-group-item-action" data-bs-toggle="modal" data-bs-target="#modalID">
                    <img id="searchCoinImage"src="${coin.thumb}">
                    <div class="d-flex w-100 justify-content-between">
                            <h6 id="coinName" class="mb-1">${coin.name} (${coin.symbol})</h6>
                        <small>Rank:<span class="marketRank">${coin.market_cap_rank}<span></small>
                    </div>
                </button>
        `
        div.querySelector('button').addEventListener('click', (e) => {
            searchModalData(coin)
        })
        searchResults.appendChild(div);
    });
}

function modalData({
    name,  
    symbol, 
    image, 
    market_cap_rank, 
    current_price, 
    high_24h, 
    low_24h

}) {
    const modalHeader = document.getElementById('modalHeader')
    const modalCoinTitle = document.getElementById('modalH5')
        modalCoinTitle.textContent = `
            ${name}  ${symbol}
        `
    const modalCoinImage = document.getElementById('modalCoinImage')
        modalCoinImage.src = `
            ${image}
        `
    const marketCapRankTD = document.getElementById('marketCapRankTD')
        marketCapRankTD.textContent = `
            ${market_cap_rank}
        `
    const currentPriceTD = document.getElementById('currentPriceTD')
        currentPriceTD.textContent = `
            $${current_price}
        `
    const high24TD = document.getElementById('high24TD')
        high24TD.textContent = `
            $${high_24h}
        `
    const low24TD = document.getElementById('low24TD')
        low24TD.textContent = `
            $${low_24h}
        `
}

function searchModalData({
    name,  
    symbol, 
    thumb, 
    market_cap_rank 
}) {
    const modalHeader = document.getElementById('modalHeader')
    const modalCoinTitle = document.getElementById('modalH5')
        modalCoinTitle.textContent = `
            ${name}  ${symbol.toUppercase()}
        `
    const modalCoinImage = document.getElementById('modalCoinImage')
        modalCoinImage.src = `
            ${thumb}
        `
    const marketCapRankTD = document.getElementById('marketCapRankTD')
        marketCapRankTD.textContent = `
            ${market_cap_rank}
        `
}

function fetchTrendingCoins() {
    return fetch("https://api.coingecko.com/api/v3/search/trending", {
        headers: {
            Accept: "application/json"
        }
    })
    .then(resp => resp.json())
    .then(json => renderTrendingCoins(json.coins));
    
}

// render top 7 trending coins on Modal.
function renderTrendingCoins(coins) {
    const trendingResults = document.querySelector('#trendingResults');
    coins.sort((a, b) => a.item.market_cap_rank - b.item.market_cap_rank);
    coins.forEach(coin => {
        const div = document.createElement('div')
        
        
        div.className = 'list-group';
        div.innerHTML = `
        <button type="button" class="list-group-item list-group-item-action" data-bs-toggle="modal" data-bs-target="#modalID">
                <img src="${coin.item.small}" alt="" height="30px">
            <div class="d-flex w-100 justify-content-between">
                <h6 id="coinName" class="mb-1">${coin.item.name} (${coin.item.symbol})</h6>
                <small>Rank: <span class="marketRank">${coin.item.market_cap_rank}</span></small>
            </div>
            <small>Score: ${coin.item.score}</small>
        </button>
        `
        trendingResults.appendChild(div);
    });
}

const resetSearch = () => {
    const resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', () => {
        const searchResults = document.getElementById('searchResults')
        searchResults.innerHTML = " ";
        const form2 = document.getElementById('form-2').reset()
    })
}

document.addEventListener("DOMContentLoaded", function() {
    fetchTrendingCoins()
});