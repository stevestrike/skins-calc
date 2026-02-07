// Official USGA combined course data
const courseData = {
    'pines-creek': {
        blue:  { rating: 70.9, slope: 125, par: 71 },
        white: { rating: 67.7, slope: 118, par: 71 },
        gold:  { rating: 65.5, slope: 113, par: 71 }
    },
    'creek-trails': {
        blue:  { rating: 72.1, slope: 128, par: 71 },
        white: { rating: 69.2, slope: 122, par: 71 },
        gold:  { rating: 66.7, slope: 116, par: 71 }
    },
    'pines-trails': {
        blue:  { rating: 73.2, slope: 130, par: 72 },
        white: { rating: 69.7, slope: 122, par: 72 },
        gold:  { rating: 67.6, slope: 116, par: 72 }
    }
};

// Calculate Course Handicap using USGA formula:
// Course Handicap = Handicap Index × (Slope / 113) + (Rating - Par)
function calculateCourseHandicap(handicapIndex, rating, slope, par) {
    const courseHandicap = handicapIndex * (slope / 113) + (rating - par);
    return Math.round(courseHandicap);
}

// Update the table with calculated handicaps
function updateHandicaps() {
    const input = document.getElementById('handicapIndex');
    const handicapIndex = parseFloat(input.value);

    // Clear results if no valid input
    if (isNaN(handicapIndex) || handicapIndex < 0) {
        clearResults();
        return;
    }

    // Show snarky comment for high handicaps
    updateSnarkyComment(handicapIndex);

    const combinations = ['pines-creek', 'creek-trails', 'pines-trails'];
    const tees = ['blue', 'white', 'gold'];

    combinations.forEach(combo => {
        tees.forEach(tee => {
            const course = courseData[combo][tee];
            const courseHandicap = calculateCourseHandicap(
                handicapIndex,
                course.rating,
                course.slope,
                course.par
            );

            const cellId = `${combo}-${tee}`;
            const cell = document.getElementById(cellId);
            if (cell) {
                cell.textContent = courseHandicap;
            }
        });
    });
}

function clearResults() {
    const cells = document.querySelectorAll('.handicap-cell');
    cells.forEach(cell => cell.textContent = '-');
}

function updateSnarkyComment(handicapIndex) {
    const commentEl = document.getElementById('snarkyComment');
    if (!commentEl) return;

    if (handicapIndex > 20) {
        commentEl.textContent = "Wow, you might want to spend more time at the range!";
    } else if (handicapIndex > 15) {
        commentEl.textContent = "Keep practicing, you'll get there!";
    } else if (handicapIndex < 5) {
        commentEl.textContent = "Show off! Save some birdies for the rest of us.";
    } else {
        commentEl.textContent = "";
    }
}

// Initialize event listener
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('handicapIndex');
    input.addEventListener('input', updateHandicaps);
});
