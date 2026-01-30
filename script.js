// State management
let currentScore = 0;
let answeredQuestions = new Set();
const TOTAL_QUESTIONS = 20;

// Correct answers for all 20 questions
const correctAnswers = {
    1: 'Dilation',
    2: '5 cm',
    3: 'One figure can be mapped onto the other using only rigid transformations',
    4: 'Triangle PQR is congruent to Triangle P\'Q\'R\'',
    5: 'Two triangles can have the same angles but different side lengths (similar, not congruent)',
    6: 'If all three pairs of sides are equal, a sequence of rigid transformations can map one triangle onto the other',
    7: 'Itself',
    8: 'Translation then dilation',
    9: '3',
    10: 'In the same position (maps onto itself)',
    11: '(3, -2)',
    12: '(1, 3)',
    13: '(-1, -4)',
    14: '(1, -3)',
    15: '4',
    16: '3',
    17: '5',
    18: '(4, 5)',
    19: 'Isosceles',
    20: 'Rectangle'
};

// Topic mapping for score breakdown
const topicMapping = {
    1: 'Rigid Transformations and Congruence',
    2: 'Rigid Transformations and Congruence',
    3: 'Mapping Figures to Prove Congruence',
    4: 'Mapping Figures to Prove Congruence',
    5: 'Justify Congruence Criteria with Transformations',
    6: 'Justify Congruence Criteria with Transformations',
    7: 'Sequences of Transformations',
    8: 'Sequences of Transformations',
    9: 'Transformation Sequences and Symmetry',
    10: 'Transformation Sequences and Symmetry',
    11: 'Draw Transformed Figures on Coordinate Plane',
    12: 'Draw Transformed Figures on Coordinate Plane',
    13: 'Multiple Transformations Practice',
    14: 'Multiple Transformations Practice',
    15: 'Weighted Average of Points on a Line',
    16: 'Weighted Average of Points on a Line',
    17: 'Distance and Midpoint Formulas',
    18: 'Distance and Midpoint Formulas',
    19: 'Classify Triangles and Quadrilaterals',
    20: 'Classify Triangles and Quadrilaterals'
};

// Track scores by topic
let topicScores = {};

// Initialize topic scores
function initTopicScores() {
    topicScores = {
        'Rigid Transformations and Congruence': { correct: 0, total: 2 },
        'Mapping Figures to Prove Congruence': { correct: 0, total: 2 },
        'Justify Congruence Criteria with Transformations': { correct: 0, total: 2 },
        'Sequences of Transformations': { correct: 0, total: 2 },
        'Transformation Sequences and Symmetry': { correct: 0, total: 2 },
        'Draw Transformed Figures on Coordinate Plane': { correct: 0, total: 2 },
        'Multiple Transformations Practice': { correct: 0, total: 2 },
        'Weighted Average of Points on a Line': { correct: 0, total: 2 },
        'Distance and Midpoint Formulas': { correct: 0, total: 2 },
        'Classify Triangles and Quadrilaterals': { correct: 0, total: 2 }
    };
}

// Check answer function
function checkAnswer(questionNum, answer) {
    if (answeredQuestions.has(questionNum)) return;

    answeredQuestions.add(questionNum);
    const resultEl = document.getElementById(`result${questionNum}`);
    const problemEl = document.getElementById(`problem${questionNum}`);
    const buttons = problemEl.querySelectorAll('.choice-btn');

    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);

    // Find which button was clicked and mark it
    buttons.forEach(btn => {
        if (answer === 'correct' && btn.textContent === correctAnswers[questionNum]) {
            btn.classList.add('selected-correct');
        } else if (answer !== 'correct' && btn.onclick.toString().includes(`'${answer}'`)) {
            btn.classList.add('selected-incorrect');
        }
    });

    const topic = topicMapping[questionNum];

    if (answer === 'correct') {
        currentScore++;
        topicScores[topic].correct++;
        resultEl.textContent = 'Correct!';
        resultEl.className = 'result-inline correct';
        problemEl.classList.add('answered', 'correct-answer');
    } else {
        resultEl.textContent = `Incorrect. Correct answer: ${correctAnswers[questionNum]}`;
        resultEl.className = 'result-inline incorrect';
        problemEl.classList.add('answered', 'incorrect-answer');

        // Highlight the correct answer
        buttons.forEach(btn => {
            if (btn.textContent === correctAnswers[questionNum]) {
                btn.style.border = '3px solid #16a34a';
            }
        });
    }

    // Update score display
    document.getElementById('currentScore').textContent = currentScore;

    // Update progress
    updateProgress();

    // Check if all questions answered
    if (answeredQuestions.size === TOTAL_QUESTIONS) {
        showFinalResults();
    }
}

// Update progress bar
function updateProgress() {
    const progress = (answeredQuestions.size / TOTAL_QUESTIONS) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `${answeredQuestions.size}/${TOTAL_QUESTIONS}`;
}

// Show final results
function showFinalResults() {
    const finalResultsEl = document.getElementById('finalResults');
    finalResultsEl.style.display = 'block';
    document.getElementById('finalScoreNumber').textContent = `${currentScore}`;

    // Generate topic breakdown
    const breakdownEl = document.getElementById('topicBreakdown');
    let breakdownHTML = '';

    for (const [topic, scores] of Object.entries(topicScores)) {
        let scoreClass = '';
        if (scores.correct === scores.total) {
            scoreClass = 'perfect';
        } else if (scores.correct > 0) {
            scoreClass = 'partial';
        } else {
            scoreClass = 'zero';
        }

        breakdownHTML += `
            <div class="topic-score">
                <span class="topic-name">${topic}</span>
                <span class="score ${scoreClass}">${scores.correct}/${scores.total}</span>
            </div>
        `;
    }

    breakdownEl.innerHTML = breakdownHTML;

    // Scroll to results
    finalResultsEl.scrollIntoView({ behavior: 'smooth' });
}

// Print results
function printResults() {
    window.print();
}

// Restart review
function restartReview() {
    currentScore = 0;
    answeredQuestions = new Set();
    initTopicScores();

    // Reset score display
    document.getElementById('currentScore').textContent = '0';

    // Reset progress
    updateProgress();

    // Hide final results
    document.getElementById('finalResults').style.display = 'none';

    // Reset all problems
    for (let i = 1; i <= TOTAL_QUESTIONS; i++) {
        const problemEl = document.getElementById(`problem${i}`);
        const resultEl = document.getElementById(`result${i}`);
        const buttons = problemEl.querySelectorAll('.choice-btn');

        problemEl.classList.remove('answered', 'correct-answer', 'incorrect-answer');
        resultEl.textContent = '';
        resultEl.className = 'result-inline';

        buttons.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('selected-correct', 'selected-incorrect');
            btn.style.border = '';
        });
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    initTopicScores();
    updateProgress();
});
