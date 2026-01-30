// State management
let currentScore = 0;
let answeredQuestions = new Set();
const TOTAL_QUESTIONS = 50;

// Correct answers for all 50 questions (letter of correct answer)
const correctAnswers = {
    // Topic 1: Rigid Transformations and Congruence
    1: 'B',   // Dilation is NOT a rigid transformation
    2: 'C',   // 7 cm (rigid transformations preserve length)
    3: 'D',   // Side lengths and angle measures
    4: 'B',   // 90° (angles preserved)
    5: 'C',   // They preserve distance and angle measure

    // Topic 2: Mapping Figures to Prove Congruence
    6: 'B',   // One figure can be mapped onto the other using only rigid transformations
    7: 'D',   // Triangle PQR is congruent to Triangle P'Q'R'
    8: 'A',   // Figure A is congruent to Figure B
    9: 'C',   // WXYZ ≅ ABCD
    10: 'C',  // Dilation then translation (dilation changes size)

    // Topic 3: Justify Congruence Criteria with Transformations
    11: 'B',  // Two triangles can have same angles but different side lengths
    12: 'C',  // If all three pairs of sides are equal, rigid transformations can map
    13: 'C',  // SAS
    14: 'C',  // The triangles are congruent by SSS
    15: 'B',  // Ambiguous case

    // Topic 4: Sequences of Transformations
    16: 'C',  // Itself
    17: 'B',  // Translation then dilation
    18: 'B',  // In the same position as the original
    19: 'A',  // The figure returns to its original position
    20: 'B',  // It maps onto itself

    // Topic 5: Transformation Sequences and Symmetry
    21: 'D',  // 3 lines of symmetry
    22: 'C',  // In the same position
    23: 'B',  // 2 lines of symmetry
    24: 'B',  // Yes, different orders can produce different results
    25: 'B',  // 90°

    // Topic 6: Draw Transformed Figures on Coordinate Plane
    26: 'C',  // (3, -2)
    27: 'B',  // (1, 3)
    28: 'B',  // (2, 5)
    29: 'C',  // (-4, 1)
    30: 'A',  // (-2, 3)

    // Topic 7: Multiple Transformations Practice
    31: 'B',  // (-1, -4)
    32: 'D',  // (1, -3)
    33: 'A',  // (-5, 0)
    34: 'C',  // (4, 3)
    35: 'C',  // (-1, 1)

    // Topic 8: Weighted Average of Points on a Line
    36: 'B',  // 4
    37: 'B',  // 3
    38: 'C',  // 2
    39: 'C',  // 9
    40: 'C',  // 16

    // Topic 9: Distance and Midpoint Formulas
    41: 'C',  // 5
    42: 'B',  // (4, 5)
    43: 'B',  // 13
    44: 'B',  // (1, 3)
    45: 'C',  // (5, 8)

    // Topic 10: Classify Triangles and Quadrilaterals
    46: 'C',  // Isosceles
    47: 'C',  // Rectangle
    48: 'C',  // Equilateral
    49: 'D',  // Right
    50: 'C'   // Square
};

// Display text for correct answers
const correctAnswerText = {
    1: 'B) Dilation',
    2: 'C) 7 cm',
    3: 'D) Side lengths and angle measures',
    4: 'B) 90°',
    5: 'C) They preserve distance and angle measure',
    6: 'B) One figure can be mapped onto the other using only rigid transformations',
    7: 'D) Triangle PQR is congruent to Triangle P\'Q\'R\'',
    8: 'A) Figure A is congruent to Figure B',
    9: 'C) WXYZ ≅ ABCD (they are congruent)',
    10: 'C) Dilation then translation',
    11: 'B) Two triangles can have the same angles but different side lengths',
    12: 'C) If all three pairs of sides are equal, rigid transformations can map one triangle onto the other',
    13: 'C) SAS',
    14: 'C) The triangles are congruent by SSS',
    15: 'B) There can be two different triangles with the same SSA measurements (ambiguous case)',
    16: 'C) Itself',
    17: 'B) Translation then dilation',
    18: 'B) In the same position as the original',
    19: 'A) The figure returns to its original position',
    20: 'B) It maps onto itself',
    21: 'D) 3',
    22: 'C) In the same position',
    23: 'B) 2',
    24: 'B) Yes, different orders can produce different results',
    25: 'B) 90°',
    26: 'C) (3, -2)',
    27: 'B) (1, 3)',
    28: 'B) (2, 5)',
    29: 'C) (-4, 1)',
    30: 'A) (-2, 3)',
    31: 'B) (-1, -4)',
    32: 'D) (1, -3)',
    33: 'A) (-5, 0)',
    34: 'C) (4, 3)',
    35: 'C) (-1, 1)',
    36: 'B) 4',
    37: 'B) 3',
    38: 'C) 2',
    39: 'C) 9',
    40: 'C) 16',
    41: 'C) 5',
    42: 'B) (4, 5)',
    43: 'B) 13',
    44: 'B) (1, 3)',
    45: 'C) (5, 8)',
    46: 'C) Isosceles',
    47: 'C) Rectangle',
    48: 'C) Equilateral',
    49: 'D) Right',
    50: 'C) Square'
};

// Topic mapping for score breakdown
const topicMapping = {
    1: 'Rigid Transformations and Congruence',
    2: 'Rigid Transformations and Congruence',
    3: 'Rigid Transformations and Congruence',
    4: 'Rigid Transformations and Congruence',
    5: 'Rigid Transformations and Congruence',
    6: 'Mapping Figures to Prove Congruence',
    7: 'Mapping Figures to Prove Congruence',
    8: 'Mapping Figures to Prove Congruence',
    9: 'Mapping Figures to Prove Congruence',
    10: 'Mapping Figures to Prove Congruence',
    11: 'Justify Congruence Criteria',
    12: 'Justify Congruence Criteria',
    13: 'Justify Congruence Criteria',
    14: 'Justify Congruence Criteria',
    15: 'Justify Congruence Criteria',
    16: 'Sequences of Transformations',
    17: 'Sequences of Transformations',
    18: 'Sequences of Transformations',
    19: 'Sequences of Transformations',
    20: 'Sequences of Transformations',
    21: 'Transformation Sequences and Symmetry',
    22: 'Transformation Sequences and Symmetry',
    23: 'Transformation Sequences and Symmetry',
    24: 'Transformation Sequences and Symmetry',
    25: 'Transformation Sequences and Symmetry',
    26: 'Draw Transformed Figures',
    27: 'Draw Transformed Figures',
    28: 'Draw Transformed Figures',
    29: 'Draw Transformed Figures',
    30: 'Draw Transformed Figures',
    31: 'Multiple Transformations Practice',
    32: 'Multiple Transformations Practice',
    33: 'Multiple Transformations Practice',
    34: 'Multiple Transformations Practice',
    35: 'Multiple Transformations Practice',
    36: 'Weighted Average of Points',
    37: 'Weighted Average of Points',
    38: 'Weighted Average of Points',
    39: 'Weighted Average of Points',
    40: 'Weighted Average of Points',
    41: 'Distance and Midpoint Formulas',
    42: 'Distance and Midpoint Formulas',
    43: 'Distance and Midpoint Formulas',
    44: 'Distance and Midpoint Formulas',
    45: 'Distance and Midpoint Formulas',
    46: 'Classify Triangles and Quadrilaterals',
    47: 'Classify Triangles and Quadrilaterals',
    48: 'Classify Triangles and Quadrilaterals',
    49: 'Classify Triangles and Quadrilaterals',
    50: 'Classify Triangles and Quadrilaterals'
};

// Track scores by topic
let topicScores = {};

// Initialize topic scores
function initTopicScores() {
    topicScores = {
        'Rigid Transformations and Congruence': { correct: 0, total: 5 },
        'Mapping Figures to Prove Congruence': { correct: 0, total: 5 },
        'Justify Congruence Criteria': { correct: 0, total: 5 },
        'Sequences of Transformations': { correct: 0, total: 5 },
        'Transformation Sequences and Symmetry': { correct: 0, total: 5 },
        'Draw Transformed Figures': { correct: 0, total: 5 },
        'Multiple Transformations Practice': { correct: 0, total: 5 },
        'Weighted Average of Points': { correct: 0, total: 5 },
        'Distance and Midpoint Formulas': { correct: 0, total: 5 },
        'Classify Triangles and Quadrilaterals': { correct: 0, total: 5 }
    };
}

// Check answer function
function checkAnswer(questionNum, selectedAnswer) {
    if (answeredQuestions.has(questionNum)) return;

    answeredQuestions.add(questionNum);
    const resultEl = document.getElementById(`result${questionNum}`);
    const problemEl = document.getElementById(`problem${questionNum}`);
    const buttons = problemEl.querySelectorAll('.choice-btn');

    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);

    const correctAnswer = correctAnswers[questionNum];
    const isCorrect = selectedAnswer === correctAnswer;
    const topic = topicMapping[questionNum];

    // Find and style the buttons
    buttons.forEach(btn => {
        const btnLetter = btn.textContent.charAt(0);
        if (btnLetter === correctAnswer) {
            btn.classList.add('selected-correct');
        } else if (btnLetter === selectedAnswer && !isCorrect) {
            btn.classList.add('selected-incorrect');
        }
    });

    if (isCorrect) {
        currentScore++;
        topicScores[topic].correct++;
        resultEl.textContent = 'Correct!';
        resultEl.className = 'result-inline correct';
        problemEl.classList.add('answered', 'correct-answer');
    } else {
        resultEl.textContent = `Incorrect. Correct answer: ${correctAnswerText[questionNum]}`;
        resultEl.className = 'result-inline incorrect';
        problemEl.classList.add('answered', 'incorrect-answer');
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
        } else if (scores.correct >= scores.total / 2) {
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
