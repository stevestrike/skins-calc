// Course data with actual ratings and slopes
const courseData = {
    'pines-trails': {
        blue: { rating: 72.8, slope: 135 },   // Average of Pines Blue (73.4) and Trails Blue (72.2)
        white: { rating: 70.05, slope: 124 }, // Average of Pines White (70.3) and Trails White (69.8)
        gold: { rating: 67.35, slope: 117 }   // Average of Pines Gold (67.9) and Trails Gold (66.8)
    },
    'pines-creek': {
        blue: { rating: 72.35, slope: 132 },  // Average of Pines Blue (73.4) and Creek Blue (71.3)
        white: { rating: 69.3, slope: 123.5 }, // Average of Pines White (70.3) and Creek White (68.3)
        gold: { rating: 66.85, slope: 117.5 } // Average of Pines Gold (67.9) and Creek Gold (65.8)
    },
    'creek-trails': {
        blue: { rating: 71.75, slope: 132 },  // Average of Creek Blue (71.3) and Trails Blue (72.2)
        white: { rating: 69.05, slope: 122.5 }, // Average of Creek White (68.3) and Trails White (69.8)
        gold: { rating: 66.3, slope: 116.5 }    // Average of Creek Gold (65.8) and Trails Gold (66.8)
    }
};

// Course handicap calculation formula: (Handicap Index × Slope Rating) ÷ 113 + (Course Rating - Par)
// For simplicity, assuming par is standard 72, but this can be adjusted
function calculateCourseHandicap(handicapIndex, slope, rating, par = 72) {
    return Math.round((handicapIndex * slope) / 113 + (rating - par));
}

// Snarky comments based on handicap ranges
function getSnarkyComment(handicap) {
    if (handicap < 3) return "Scratch golfer alert! 🎯";
    if (handicap < 6) return "You go girl! Show-off! 🔥";
    if (handicap < 9) return "Single digits, nice flex! 💪";
    if (handicap < 12) return "Respectable game you got there! ⛳";
    if (handicap < 15) return "Back at it again are you? 😏";
    if (handicap < 18) return "Hey, at least you're trying! 🤷‍♂️";
    return "Bless your heart... keep swinging! 🏌️";
}

function isValidHandicap(value) {
    // Must be a decimal number between 0.1 and 20.0
    const num = parseFloat(value);
    if (isNaN(num) || num < 0.1 || num > 20.0) return false;

    // Check if it has a decimal point
    const str = value.toString();
    return str.includes('.') && str.split('.')[1].length > 0;
}

function updateHandicapDisplay() {
    const input = document.getElementById('handicapIndex');
    const handicapValue = input.value;
    const commentDiv = document.getElementById('snarkyComment');

    // Clear previous calculations
    Object.keys(courseData).forEach(courseKey => {
        Object.keys(courseData[courseKey]).forEach(teeKey => {
            const cellId = `${courseKey}-${teeKey}`;
            const cell = document.getElementById(cellId);
            if (cell) {
                cell.textContent = '-';
            }
        });
    });

    // Clear comment
    commentDiv.innerHTML = '';

    // Validate handicap
    if (!handicapValue || !isValidHandicap(handicapValue)) {
        return;
    }

    const handicapIndex = parseFloat(handicapValue);

    // Show snarky comment
    commentDiv.innerHTML = getSnarkyComment(handicapIndex);

    // Calculate and populate all combinations
    Object.keys(courseData).forEach(courseKey => {
        const course = courseData[courseKey];
        Object.keys(course).forEach(teeKey => {
            const teeData = course[teeKey];
            const courseHandicap = calculateCourseHandicap(handicapIndex, teeData.slope, teeData.rating);
            const cellId = `${courseKey}-${teeKey}`;
            const cell = document.getElementById(cellId);
            if (cell) {
                cell.textContent = courseHandicap;
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const handicapInput = document.getElementById('handicapIndex');

    // Auto-calculate when handicap input changes
    handicapInput.addEventListener('input', updateHandicapDisplay);
});