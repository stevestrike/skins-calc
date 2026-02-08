const appTitles = [
    "TeeMath",
    "HandiCalc",
    "Slope & Stroke",
    "Net Par Engine",
    "Fix My Handicap"
];

const taglines = [
    "Yep. Still this.",
    "Same as always.",
    "This again.",
    "We checked. It's you.",
    "Nothing new here.",
    "That tracks.",
    "You're consistent, I'll give you that.",
    "No, really.",
    "About right.",
    "Exactly.",
    "We used your numbers.",
    "We accounted for optimism.",
    "This number will follow you.",
    "It's remarkably consistent.",
    "Nothing here is accidental.",
    "Still higher than you expected.",
    "We removed outliers. This remained.",
    "The math was very calm about it.",
    "Hard to argue with.",
    "You'll remember this later.",
    "Statistically speaking\u2026 no.",
    "This explains a lot.",
    "This seems right.",
    "Confirmed: it was not the course.",
    "Accounting for ego since page load.",
    "Math: undefeated against confidence.",
    "Finally, a neutral third party.",
    "Making excuses measurable.",
    "Identity erosion through arithmetic.",
    "Yes, even after that one good round.",
    "This won't fix your swing.",
    "Lowering expectations, not scores.",
    "The course didn't do this to you.",
    "Trend lines are unforgiving.",
    "Take a second. Look at it again.",
    "This is who you are right now.",
    "We checked twice. It didn't help.",
    "Power wasn't the issue.",
    "Accuracy remains elusive.",
    "This happens more than you think.",
    "You went after it.",
    "Tempo matters.",
    "Rushed. Again.",
    "All that effort\u2026",
    "Commitment was there.",
    "That's your number when you're relaxed.",
    "You might want to work on control.",
    "Still counts. Even today.",
    "Bad rounds remembered forever.",
    "Objectively measuring how bad this got.",
    "This seemed fair at the time.",
    "Everyone agreed to this.",
    "Yes, this includes that hole.",
    "Everyone saw that coming.",
    "That escalated quickly.",
    "You said you were comfortable with this.",
    "Risky, but memorable.",
    "That's the cost of enthusiasm.",
    "Bold strategy.",
    "Next time, maybe ease into it.",
    "Confidence has a price.",
    "This includes everything.",
    "Raised eyebrow. Long sip.",
    "That's not the length you were hoping for.",
    "Firm conditions today.",
    "It looked good\u2026 until it didn't.",
    "Still not enough club.",
    "You really tried to force that.",
    "Short again. Consistently.",
    "A lot of confidence for that result.",
    "You swung hard. Results pending.",
    "Aggressive line. Questionable outcome.",
    "That felt better than it looked.",
    "At least you finished.",
    "It rarely goes the way you imagine.",
    "You really committed to that.",
    "Everyone noticed.",
    "That explains the confidence.",
    "You didn't hold back.",
    "This is familiar territory.",
    "You've been here before.",
    "You'll want a mulligan.",
    "There was a pause in the calculation.",
    "Even we were surprised.",
    "Historical data agrees.",
    "The algorithm sighed.",
    "We wish this were a joke.",
    "No notes.",
    "That's about what we expected.",
    "No one's surprised.",
    "You talked it up.",
    "Ambitious.",
    "All show.",
    "You felt good going in.",
    "Ah. One of those rounds.",
    "We've seen this pattern before.",
    "This tracks.",
    "About right for you.",
    "You'll bounce back. Probably.",
    "This feels familiar.",
    "Strong confidence. Familiar outcome."
];

const indexTaglines = [
    "You Could've Gone Home Early",
    "Time Was Also Spent",
    "This Was How You Chose to Spend Today",
    "There Were Other Options",
    "Hope This Was Worth It",
    "Several Hours, Explained",
    "Productivity Remains Zero",
    "Before Food & Drinks",
    "Gross Winnings Only",
    "Not Net of Regret",
    "Taxes Not Included (Neither Is Dignity)",
    "This Is Not \"Up\" Yet",
    "You'll Want to Sit Down",
    "Cool Story, Still Owe Money",
    "Does Not Cover the Loaded Tots",
    "Tots Win Again",
    "Kitchen Still Profits",
    "House Always Wins",
    "Minus Appetizers",
    "This Won't Touch the Tab",
    "Before You Order Again",
    "Anyway, Here's the Damage",
    "Let's See What That Was For",
    "The Moment of Truth",
    "This Is the Outcome",
    "Everyone Was Confident Earlier",
    "This Felt Bigger Earlier",
    "All That For This",
    "Read It Slowly",
    "Yep",
    "No, Really",
    "This Barely Matters",
    "Historical Bar Data Agrees",
    "Close the Tab",
    "Because Bobby G is good a maths."
];

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

(function() {
    const taglineEl = document.getElementById('tagline');
    if (taglineEl) {
        taglineEl.textContent = pickRandom(taglines);
    }

    const indexTaglineEl = document.getElementById('indexTagline');
    if (indexTaglineEl) {
        indexTaglineEl.textContent = pickRandom(indexTaglines);
    }

    const appTitleEl = document.getElementById('appTitle');
    if (appTitleEl) {
        const title = pickRandom(appTitles);
        appTitleEl.textContent = title;
        document.title = title;
    }
})();
