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
        this.updateSpinnerButtons();
        this.calculate();
        this.loadRandomBackground();
    }
    
    bindEvents() {
        this.calculateBtn.addEventListener('click', () => this.calculate());
        this.playersInput.addEventListener('input', () => this.calculate());
        this.totalSkinsInput.addEventListener('input', () => this.calculate());
        this.skinAmountInput.addEventListener('input', () => this.calculate());
        this.potAmountInput.addEventListener('input', () => this.calculate());
        
        this.skinValueRadio.addEventListener('change', () => this.toggleCalculationMethod());
        this.skinsPotRadio.addEventListener('change', () => this.toggleCalculationMethod());
        
        this.bindSpinnerEvents();
    }
    
    bindSpinnerEvents() {
        const spinnerBtns = document.querySelectorAll('.spinner-btn');
        spinnerBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleSpinnerClick(e));
        });
    }
    
    handleSpinnerClick(e) {
        const target = e.target.dataset.target;
        const action = e.target.dataset.action;
        const input = document.getElementById(target);
        
        if (!input) return;
        
        const currentValue = parseInt(input.value);
        const min = parseInt(input.min);
        const max = parseInt(input.max);
        
        let newValue = currentValue;
        
        if (action === 'increase' && currentValue < max) {
            newValue = currentValue + 1;
        } else if (action === 'decrease' && currentValue > min) {
            newValue = currentValue - 1;
        }
        
        if (newValue !== currentValue) {
            input.value = newValue;
            this.updateSpinnerButtons();
            this.calculate();
        }
    }
    
    updateSpinnerButtons() {
        const spinnerBtns = document.querySelectorAll('.spinner-btn');
        
        spinnerBtns.forEach(btn => {
            const target = btn.dataset.target;
            const action = btn.dataset.action;
            const input = document.getElementById(target);
            
            if (!input) return;
            
            const currentValue = parseInt(input.value);
            const min = parseInt(input.min);
            const max = parseInt(input.max);
            
            if (action === 'increase') {
                btn.disabled = currentValue >= max;
            } else if (action === 'decrease') {
                btn.disabled = currentValue <= min;
            }
        });
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
        
        const maxSkins = totalSkins;
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
            const formattedPayout = payout.payout === 0 ? 'Even Steven!' : 
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
    
    async loadRandomBackground() {
        try {
            // First try to load from manifest (supports any filename)
            const images = await this.loadImagesFromManifest();
            
            // Fallback to predefined names if manifest is empty or fails
            if (images.length === 0) {
                await this.loadImagesFromPredefinedNames(images);
            }
            
            if (images.length > 0) {
                const randomImage = images[Math.floor(Math.random() * images.length)];
                document.body.style.backgroundImage = `url('${randomImage}')`;
            }
        } catch (error) {
            // Silently fail if no images are found
            console.log('No background images found');
        }
    }
    
    async loadImagesFromManifest() {
        try {
            const response = await fetch('images/manifest.json');
            if (response.ok) {
                const manifest = await response.json();
                const validImages = [];
                
                // Verify each image in manifest exists
                for (const imagePath of manifest) {
                    if (await this.imageExists(`images/${imagePath}`)) {
                        validImages.push(`images/${imagePath}`);
                    }
                }
                
                return validImages;
            }
        } catch (error) {
            console.log('Manifest not found, falling back to predefined names');
        }
        return [];
    }
    
    async loadImagesFromPredefinedNames(images) {
        const imageFormats = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'];
        const commonNames = [
            'background1', 'background2', 'background3', 'background4', 'background5',
            'bg1', 'bg2', 'bg3', 'bg4', 'bg5',
            'image1', 'image2', 'image3', 'image4', 'image5',
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
        ];
        
        // Check for existing images with predefined names
        for (const name of commonNames) {
            for (const format of imageFormats) {
                const imagePath = `images/${name}.${format}`;
                if (await this.imageExists(imagePath)) {
                    images.push(imagePath);
                }
            }
        }
        
        // Also check for any images in the root directory that might be backgrounds
        for (const format of imageFormats) {
            const imagePath = `background.${format}`;
            if (await this.imageExists(imagePath)) {
                images.push(imagePath);
            }
        }
    }
    
    imageExists(imagePath) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = imagePath;
        });
    }
}

// Prevent double-tap zoom on iOS
function preventDoubleTabZoom() {
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

document.addEventListener('DOMContentLoaded', () => {
    new SkinsCalculator();
    preventDoubleTabZoom();
});