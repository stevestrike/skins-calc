class SkinsCalculator {
    constructor() {
        this.playersInput = document.getElementById('players');
        this.totalSkinsInput = document.getElementById('totalSkins');
        this.skinAmountInput = document.getElementById('skinAmount');
        this.potAmountInput = document.getElementById('potAmount');
        this.skinValueRadio = document.getElementById('skinValue');
        this.skinsPotRadio = document.getElementById('skinsPot');
        this.skinValueGroup = document.getElementById('skinValueGroup');
        this.skinsPotGroup = document.getElementById('skinsPotGroup');
        this.calculateBtn = document.getElementById('calculate');
        this.payoutTable = document.getElementById('payoutTable');
        this.potInfo = document.getElementById('potInfo');
        
        this.bindEvents();
        this.calculate();
    }
    
    bindEvents() {
        this.calculateBtn.addEventListener('click', () => this.calculate());
        this.playersInput.addEventListener('input', () => this.calculate());
        this.totalSkinsInput.addEventListener('input', () => this.calculate());
        this.skinAmountInput.addEventListener('input', () => this.calculate());
        this.potAmountInput.addEventListener('input', () => this.calculate());
        
        this.skinValueRadio.addEventListener('change', () => this.toggleCalculationMethod());
        this.skinsPotRadio.addEventListener('change', () => this.toggleCalculationMethod());
    }
    
    toggleCalculationMethod() {
        if (this.skinValueRadio.checked) {
            this.skinValueGroup.style.display = 'block';
            this.skinsPotGroup.style.display = 'none';
        } else {
            this.skinValueGroup.style.display = 'none';
            this.skinsPotGroup.style.display = 'block';
        }
        this.calculate();
    }
    
    calculate() {
        const players = parseInt(this.playersInput.value);
        const totalSkins = parseInt(this.totalSkinsInput.value);
        
        if (!players || !totalSkins || players < 2 || totalSkins < 1) {
            this.payoutTable.innerHTML = '<p style="text-align: center; color: #666;">Enter valid values to see payouts</p>';
            return;
        }
        
        const maxSkins = Math.min(10, totalSkins);
        const payouts = this.calculatePayouts(players, totalSkins, maxSkins);
        this.displayPotInfo(players, totalSkins);
        this.displayPayouts(payouts);
    }
    
    calculatePayouts(players, totalSkins, maxSkins) {
        const payouts = [];
        
        for (let skins = 0; skins <= maxSkins; skins++) {
            const payout = this.calculateIndividualPayout(skins, players, totalSkins);
            payouts.push({
                skins: skins,
                payout: payout
            });
        }
        
        return payouts;
    }
    
    calculateIndividualPayout(playerSkins, totalPlayers, totalSkins) {
        let skinAmount;
        if (this.skinValueRadio.checked) {
            skinAmount = parseFloat(this.skinAmountInput.value) || 1;
        } else {
            const playerContribution = parseFloat(this.potAmountInput.value) || 0;
            const totalPot = playerContribution * totalPlayers;
            skinAmount = totalPot / totalSkins / totalPlayers;
        }
        
        const skinValue = totalPlayers * skinAmount;
        const entryFee = totalSkins * skinAmount;
        const grossWinnings = playerSkins * skinValue;
        const netPayout = grossWinnings - entryFee;
        
        return Math.round(netPayout * 100) / 100;
    }
    
    displayPayouts(payouts) {
        let html = '<div class="payout-table">';
        
        payouts.forEach(payout => {
            const cssClass = payout.payout > 0 ? 'positive' : 
                           payout.payout < 0 ? 'negative' : 'zero';
            
            const sign = payout.payout > 0 ? '+' : '';
            const formattedPayout = payout.payout === 0 ? 'Even' : 
                                  `${sign}$${Math.abs(payout.payout).toFixed(2)}`;
            
            html += `
                <div class="payout-row ${cssClass}">
                    <span class="skins-count">${payout.skins} Skin${payout.skins !== 1 ? 's' : ''}</span>
                    <span class="payout-amount">${formattedPayout}</span>
                </div>
            `;
        });
        
        html += '</div>';
        this.payoutTable.innerHTML = html;
    }
    
    displayPotInfo(players, totalSkins) {
        let skinAmount;
        if (this.skinValueRadio.checked) {
            skinAmount = parseFloat(this.skinAmountInput.value) || 1;
        } else {
            const playerContribution = parseFloat(this.potAmountInput.value) || 0;
            const totalPot = playerContribution * players;
            skinAmount = totalPot / totalSkins / players;
        }
        
        const totalPot = players * totalSkins * skinAmount;
        const skinValue = players * skinAmount;
        const entryFee = totalSkins * skinAmount;
        
        this.potInfo.innerHTML = `
            <p><strong>Total Pot:</strong> $${totalPot.toFixed(2)}</p>
            <p><strong>Each Skin Worth:</strong> $${skinValue.toFixed(2)}</p>
            <p><strong>Entry Fee (per player):</strong> $${entryFee.toFixed(2)}</p>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SkinsCalculator();
});