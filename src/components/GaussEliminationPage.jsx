import { useState } from 'react';
import './GaussEliminationPage.css';

const steps = [
  {
    number: '01',
    title: 'Start with the augmented matrix',
    operation: 'We begin with the system represented as an augmented matrix.',
    explanation:
      'The coefficient matrix and constant vector are combined into one matrix. Our goal is to create zeros below each pivot.',
    matrix: [
      [3, -1, -1, 0],
      [1, 1, 0, 5],
      [2, 0, -3, 2],
    ],
    highlight: null,
  },
  {
    number: '02',
    title: 'Normalize the first pivot',
    operation: 'R₁ → R₁ ÷ 3',
    explanation:
      'We divide the first row by its pivot, 3. This makes the first pivot equal to 1.',
    matrix: [
      [1, -0.333, -0.333, 0],
      [1, 1, 0, 5],
      [2, 0, -3, 2],
    ],
    highlight: 0,
  },
  {
    number: '03',
    title: 'Eliminate below the first pivot',
    operation: 'R₂ → R₂ − R₁   |   R₃ → R₃ − 2R₁',
    explanation:
      'We use the first pivot to make the entries below it zero. This is the first major step toward triangular form.',
    matrix: [
      [1, -0.333, -0.333, 0],
      [0, 1.333, 0.333, 5],
      [0, 0.667, -2.333, 2],
    ],
    highlight: [1, 2],
  },
  {
    number: '04',
    title: 'Normalize the second pivot',
    operation: 'R₂ → R₂ ÷ 1.333',
    explanation:
      'The second pivot is normalized to 1, making the next elimination step easier.',
    matrix: [
      [1, -0.333, -0.333, 0],
      [0, 1, 0.25, 3.75],
      [0, 0.667, -2.333, 2],
    ],
    highlight: 1,
  },
  {
    number: '05',
    title: 'Eliminate below the second pivot',
    operation: 'R₃ → R₃ − 0.667R₂',
    explanation:
      'The second pivot is now used to eliminate the remaining value below it.',
    matrix: [
      [1, -0.333, -0.333, 0],
      [0, 1, 0.25, 3.75],
      [0, 0, -2.5, -0.5],
    ],
    highlight: 2,
  },
  {
    number: '06',
    title: 'Normalize the final pivot',
    operation: 'R₃ → R₃ ÷ (−2.5)',
    explanation:
      'The final pivot is normalized to 1. The matrix is now in upper triangular form.',
    matrix: [
      [1, -0.333, -0.333, 0],
      [0, 1, 0.25, 3.75],
      [0, 0, 1, 0.2],
    ],
    highlight: 2,
  },
];

function formatNumber(value) {
  if (value === 0) return '0';

  if (Math.abs(value - Math.round(value)) < 0.001) {
    return String(Math.round(value));
  }

  return value.toFixed(3).replace(/0+$/, '').replace(/\.$/, '');
}

function Matrix({ matrix, highlight }) {
  return (
    <div className="gauss-matrix-wrapper">
      <div className="gauss-bracket left">[</div>

      <div className="gauss-matrix">
        {matrix.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`gauss-cell ${
                Array.isArray(highlight)
                  ? highlight.includes(rowIndex)
                    ? 'active'
                    : ''
                  : highlight === rowIndex
                    ? 'active'
                    : ''
              } ${colIndex === 3 ? 'augmented' : ''}`}
            >
              {formatNumber(value)}
            </div>
          ))
        )}
      </div>

      <div className="gauss-bracket right">]</div>
    </div>
  );
}

export default function GaussEliminationPage({ onBack }) {
  const [currentStep, setCurrentStep] = useState(0);

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="gauss-page">
      <header className="gauss-header">
        <button className="gauss-back" onClick={onBack}>
          ← Back to Experiments
        </button>

        <div className="gauss-brand">
          <span>∑</span>
          Linear Algebra Lab
        </div>

        <div className="gauss-header-label">
          EXPERIMENT 02
        </div>
      </header>

      <main>
        <section className="gauss-hero">
          <div className="gauss-eyebrow">LINEAR ALGEBRA</div>

          <h1>Gauss Elimination</h1>

          <p>
            Transform a system of linear equations into an upper triangular
            form, then solve it using back substitution.
          </p>

          <div className="gauss-tags">
            <span>FORWARD ELIMINATION</span>
            <span>ROW OPERATIONS</span>
            <span>BACK SUBSTITUTION</span>
          </div>
        </section>

        <section className="gauss-concept">
          <div className="gauss-section-label">THE BIG IDEA</div>

          <h2>Turn a complicated system into an easy one.</h2>

          <p>
            Gauss Elimination uses elementary row operations to simplify a
            system of linear equations. We gradually create zeros below the
            diagonal until the matrix becomes upper triangular.
          </p>

          <div className="gauss-flow">
            <div>
              <strong>Matrix</strong>
              <span>Start</span>
            </div>

            <div className="flow-arrow">→</div>

            <div>
              <strong>Eliminate</strong>
              <span>Create zeros</span>
            </div>

            <div className="flow-arrow">→</div>

            <div>
              <strong>Triangular</strong>
              <span>Simplify</span>
            </div>

            <div className="flow-arrow">→</div>

            <div>
              <strong>Back Substitute</strong>
              <span>Find x₁, x₂, x₃</span>
            </div>
          </div>
        </section>

        <section className="gauss-walkthrough">
          <div className="gauss-walkthrough-heading">
            <div>
              <div className="gauss-section-label">
                INTERACTIVE WALKTHROUGH
              </div>

              <h2>Watch the matrix transform</h2>

              <p>
                Follow each row operation and see how the system gradually
                becomes easier to solve.
              </p>
            </div>

            <div className="gauss-counter">
              <strong>{step.number}</strong>
              <span>/ {String(steps.length).padStart(2, '0')}</span>
            </div>
          </div>

          <div className="gauss-progress">
            <div style={{ width: `${progress}%` }} />
          </div>

          <div className="gauss-card">
            <div className="gauss-info">
              <div className="gauss-step-label">
                STEP {step.number}
              </div>

              <h3>{step.title}</h3>

              <div className="gauss-operation">
                <span>ROW OPERATION</span>
                <strong>{step.operation}</strong>
              </div>

              <p>{step.explanation}</p>
            </div>

            <div className="gauss-visual">
              <Matrix
                matrix={step.matrix}
                highlight={step.highlight}
              />

              <div className="gauss-matrix-caption">
                Augmented matrix
              </div>
            </div>
          </div>

          <div className="gauss-controls">
            <button
              onClick={() =>
                setCurrentStep((prev) => Math.max(0, prev - 1))
              }
              disabled={currentStep === 0}
            >
              ← Previous
            </button>

            <div className="gauss-dots">
              {steps.map((_, index) => (
                <button
                  key={index}
                  className={index === currentStep ? 'selected' : ''}
                  onClick={() => setCurrentStep(index)}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentStep((prev) =>
                  Math.min(steps.length - 1, prev + 1)
                )
              }
              disabled={currentStep === steps.length - 1}
            >
              Next Step →
            </button>
          </div>
        </section>

        <section className="gauss-solution">
          <div className="gauss-section-label">BACK SUBSTITUTION</div>

          <h2>Now solve from the bottom up.</h2>

          <p>
            Once the matrix is triangular, the last equation gives us x₃.
            We then substitute that value into the equation above it and
            continue upward.
          </p>

          <div className="gauss-equations">
            <div>
              <span>STEP 01</span>
              <strong>x₃ = 0.2</strong>
              <small>From the final row</small>
            </div>

            <div>
              <span>STEP 02</span>
              <strong>x₂ = 3.7</strong>
              <small>Substitute x₃</small>
            </div>

            <div>
              <span>STEP 03</span>
              <strong>x₁ = 1.3</strong>
              <small>Substitute x₂ and x₃</small>
            </div>
          </div>

          <div className="gauss-final">
            <span>FINAL SOLUTION</span>

            <div>
              <strong>x₁ = 1.3</strong>
              <strong>x₂ = 3.7</strong>
              <strong>x₃ = 0.2</strong>
            </div>
          </div>
        </section>

        <section className="gauss-why">
          <div className="gauss-section-label">WHY DOES THIS WORK?</div>

          <h2>Same system. Simpler structure.</h2>

          <div className="gauss-why-grid">
            <article>
              <span>01</span>
              <h3>Preserves the solution</h3>
              <p>
                Elementary row operations transform the matrix without
                changing the solution of the system.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Creates zeros</h3>
              <p>
                Each elimination step removes terms below a pivot and
                gradually produces triangular form.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Makes solving easier</h3>
              <p>
                After elimination, back substitution lets us find the
                unknowns one at a time.
              </p>
            </article>
          </div>
        </section>

        {/* MATLAB CODE */}
        <section className="gauss-code-section">
          <div className="gauss-section-label">
            06 — MATLAB IMPLEMENTATION
          </div>

          <div className="gauss-code-header">
            <div>
              <h2>Experiment code.</h2>
              <p>The exact MATLAB implementation supplied for this Gauss Elimination experiment.</p>
            </div>
            <div className="gauss-code-language">MATLAB</div>
          </div>

          <pre><code>{`disp('Enter values for the augmented matrix (3x4):')
A = zeros(3, 4);
for i = 1:3
for j = 1:4
A(i, j) = input(['Enter value for element (' num2str(i) ','
num2str(j) '): ']);
end
end
disp('The augmented matrix is:');
disp(A);
for i = 1:3
pivot = A(i, i);
A(i, :) = A(i, :) / pivot;
for j = i+1:3
factor = A(j, i);
A(j, :) = A(j, :) - factor * A(i, :);
end
end
disp(A);
x = zeros(3, 1);
for i = 3:-1:1
x(i) = A(i, 4);
for j = i+1:3
x(i) = x(i) - A(i, j) * x(j);
end
end
disp('The solution is:');
disp(['x1 = ' num2str(x(1))]);
disp(['x2 = ' num2str(x(2))]);
disp(['x3 = ' num2str(x(3))]);`}</code></pre>
        </section>

        <section className="gauss-note">
          <div>
            <span>NOTE FROM THE EXPERIMENT</span>
            <p>
              The experiment lists zero-pivot handling using partial
              pivoting as an objective. The supplied MATLAB code, however,
              directly divides by the current pivot and does not perform
              row swapping.
            </p>
          </div>
        </section>

        <div className="gauss-bottom">
          <button onClick={onBack}>← Back to All Experiments</button>
        </div>
      </main>
    </div>
  );
}