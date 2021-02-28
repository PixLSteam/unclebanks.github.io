let Town = {
    pokecoinShopItems: [
        {
            name: 'Pokeball',
            pokecoins: 100,
            ball: 'pokeball'
        },
        {
            name: 'Greatball',
            pokecoins: 1000,
            ball: 'greatball'
        },
        {
            name: 'Ultraball',
            pokecoins: 10000,
            ball: 'ultraball'
        },
        {
            name: 'Old Rod',
            pokecoins: 10000,
            fishing: 1
        },
        {
            name: 'Good Rod',
            pokecoins: 100000,
            fishing: 2
        },
        {
            name: 'Super Rod',
            pokecoins: 1000000,
            fishing: 3
        }
    ],
    battlecoinShopItems: [
        {
            name: 'Razz Berry',
            battlecoins: 2500000,
            unlockable: 'razzBerry'
        },
        {
            name: 'Masterball',
            battlecoins: 1000000,
            ball: 'masterball'
        }
    ],
    catchcoinShopItems: [
        {
            name: 'Thunder Stone',
            catchcoins: 100000,
            unlockable: 'thunderStone'
        },
        {
            name: 'Fire Stone',
            catchcoins: 100000,
            unlockable: 'fireStone'
        },
        {
            name: 'Water Stone',
            catchcoins: 100000,
            unlockable: 'waterStone'
        },
        {
            name: 'Leaf Stone',
            catchcoins: 100000,
            unlockable: 'leafStone'
        },
        {
            name: 'Moon Stone',
            catchcoins: 100000,
            unlockable: 'moonStone'
        },
    ],
    renderPokeCoinShop: function() {
        let pokecoinShopHTML = '';
        for (let i = 0; i < this.pokecoinShopItems.length; i++) {
            let canBuy = true;
            let own = false;
            if (player.currencyAmount.pokecoins < this.pokecoinShopItems[i].pokecoins)
                canBuy = false;
            if (this.pokecoinShopItems[i].fishing && player.unlocked.fishing >= this.pokecoinShopItems[i].fishing) {
                canBuy = false;
                own = true;
            }
            const disableButton = (!canBuy || own) ? ' disabled="true"' : '';
            const buttonText = (own) ? 'Own' : 'Buy';
            const buttonHTML = ' <button onclick="town.buyPokeCoinItem(\'' + i + '\')"' + disableButton + '>' + buttonText + '</button>';
            pokecoinShopHTML += '<li>' + this.pokecoinShopItems[i].name + ': ' + '<img src="assets/images/currency/PokeCoin.png" height="16" width="16"></img>' + this.pokecoinShopItems[i].pokecoins + buttonHTML + '</li>';
        }
        $('#pokecoinShopItems').innerHTML = pokecoinShopHTML;
    },
    renderBattleCoinShop: function() {
        let battlecoinShopHTML = '';
        for (let i = 0; i < this.battlecoinShopItems.length; i++) {
            let canBuy = true;
            let own = false;
            if (player.currencyAmount.battlecoins < this.battlecoinShopItems[i].battlecoins)
                canBuy = false;
            if (this.battlecoinShopItems[i].unlockable && player.unlocked[this.battlecoinShopItems[i].unlockable]) {
                canBuy = false;
                own = true;
            }
            const disableButton = (!canBuy || own) ? ' disabled="true"' : '';
            const buttonText = (own) ? 'Own' : 'Buy';
            const buttonHTML = ' <button onclick="town.buyBattleCoinItem(\'' + i + '\')"' + disableButton + '>' + buttonText + '</button>';
            battlecoinShopHTML += '<li>' + this.battlecoinShopItems[i].name + ': ' + '<img src="assets/images/currency/BattleCoin.png" height="16" width="16"></img>' + this.battlecoinShopItems[i].battlecoins + buttonHTML + '</li>';
        }
        $('#battlecoinShopItems').innerHTML = battlecoinShopHTML;
    },
    renderCatchCoinShop: function() {
        let catchcoinShopHTML = '';
        for (let i = 0; i < this.catchcoinShopItems.length; i++) {
            let canBuy = true;
            let own = false;
            if (player.currencyAmount.catchcoins < this.catchcoinShopItems[i].catchcoins)
                canBuy = false;
                if (player.unlocked[this.catchcoinShopItems[i].unlockable]) {
                    canBuy = false;
                    own = true;
                }
            const disableButton = (!canBuy || own) ? ' disabled="true"' : '';
            const buttonText = (own) ? 'Own' : 'Buy';
            const buttonHTML = ' <button onclick="town.buyCatchCoinItem(\'' + i + '\')"' + disableButton + '>' + buttonText + '</button>';
            catchcoinShopHTML += '<li>' + '<img src="assets/images/evoStones/' + this.catchcoinShopItems[i].name + '.png" height="30" width="30"></img>' + ': ' + '<img src="assets/images/currency/CatchCoin.png" height="16" width="16"></img>' + this.catchcoinShopItems[i].catchcoins + buttonHTML + '</li>';
        }
        $('#catchcoinShopItems').innerHTML = catchcoinShopHTML;
    },
    buyPokeCoinItem: function(index) {
        const item = this.pokecoinShopItems[index];
        if (player.currencyAmount.pokecoins < item.pokecoins) {
            return false;
        } else {
            player.currencyAmount.pokecoins -= item.pokecoins;
            if (item.ball) {
                player.ballsAmount[item.ball] += 10000;
                dom.renderBalls();
            }
            this.renderPokeCoinShop(); // force refresh of shop
            dom.renderCurrency();
            return true;
        }
    },
    buyBattleCoinItem: function(index) {
        const item = this.battlecoinShopItems[index];
        if (player.currencyAmount.battlecoins < item.battlecoins) {
            return false;
        } else {
            if (item.unlockable) {
                player.unlocked[item.unlockable] = 1;
                dom.renderListBox();
            }
            if (item.ball) {
                player.ballsAmount[item.ball]++;
                dom.renderBalls();
            }
            this.renderBattleCoinShop(); // force refresh of shop
            dom.renderCurrency();
            return true;
        }
    },
    buyCatchCoinItem: function(index) {
        const item = this.catchcoinShopItems[index];
        if (player.currencyAmount.catchcoins < item.catchcoins) {
            return false;
        } else {
            player.currencyAmount.catchcoins -= item.catchcoins;
            if (item.unlockable) {
                player.unlocked[item.unlockable] = 1;
                dom.renderListBox();
            }
            this.renderCatchCoinShop(); // force refresh of shop
            dom.renderCurrency();
            return true;
        }
    },
};