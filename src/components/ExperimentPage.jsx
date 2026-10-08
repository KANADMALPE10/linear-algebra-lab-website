import { useMemo, useState } from 'react';
import './ExperimentPage.css';

const steps = [
  {
    title: 'Start with the augmented matrix',
    operation: 'We begin with a system of three linear equations.',
    matrix: [
      [2, 1, -1, 1],
      [1, 1, 1, 6],
      [3, -1, 2, 7]
    ]
  },
  {
    title: 'Eliminate the first column',
    operation: 'R₂ → R₂ − 0.5R₁',
    matrix: [
      [2, 1, -1, 1],
      [0, 0.5, 1.5, 5.5],
      [3, -1, 2, 7]
    ]
  },
  {
    title: 'Continue elimination',
    operation: 'R₃ → R₃ − 1.5R₁',
    matrix: [
      [2, 1, -1, 1],
      [0, 0.5, 1.5, 5.5],
      [0, -2.5, 3.5, 5.5]
    ]
  },
  {
    title: 'Eliminate the second column',
    operation: 'R₃ → R₃ + 5R₂',
    matrix: [
      [2, 1, -1, 1],
      [0, 0.5, 1.5, 5.5],
      [0, 0, 11, 33]
    ]
  }
];

function Matrix({ matrix, activeRow }) {
  return (
    <div className="matrix-wrapper">
      <div className="matrix-bracket matrix-left" />
      
      <div className="matrix-grid">
        {matrix.map((row, rowIndex) =>
          row.map((value, columnIndex) => (
            <div
              key={`${rowIndex}-${columnIndex}`}
              className={`matrix-cell ${
                activeRow === rowIndex
                  ? 'matrix-cell-active'
                  : ''
              } ${
                columnIndex === row.length - 1
                  ? 'matrix-augmented'
                  : ''
              }`}
            >
              {Number.isInteger(value)
                ? value
                : Number(value.toFixed(2))}
            </div>
          ))
        )}
      </div>

      <div className="matrix-bracket matrix-right" />
    </div>
  );
}

function ExperimentPage({ onBack }) {
  const [step, setStep] = useState(0);

  const currentStep = steps[step];

  const progress = useMemo(() => {
    return ((step + 1) / steps.length) * 100;
  }, [step]);

  const isLastStep = step === steps.length - 1;

  return (
    <main className="experiment-page">
      <div className="experiment-page-background" />

      <header className="experiment-header">
        <button
          className="back-button"
          onClick={onBack}
          type="button"
        >
          <span>←</span>
          Back to Experiments
        </button>

        <div className="experiment-brand">
          <span>∑</span>
          Linear Algebra Lab
        </div>

        <div className="experiment-number">
          EXPERIMENT 01
        </div>
      </header>

      <section className="experiment-hero">
        <div className="experiment-badge">
          LINEAR ALGEBRA
        </div>

        <h1>
          LU Decomposition
        </h1>

        <p>
          Understand how a system of linear equations can
          be transformed into a simpler form and solved
          step by step.
        </p>
      </section>

      <section className="concept-card">
        <div className="section-label">
          THE BIG IDEA
        </div>

        <h2>
          Break a difficult matrix problem
          into simpler steps.
        </h2>

        <p>
          LU decomposition represents a matrix as the
          product of a lower triangular matrix and an
          upper triangular matrix. This makes many
          calculations easier, especially when solving
          systems of equations.
        </p>

        <div className="process-flow">
          <div className="process-item">
            <span>01</span>
            <strong>Matrix</strong>
            <small>Start with A</small>
          </div>

          <div className="process-arrow">→</div>

          <div className="process-item">
            <span>02</span>
            <strong>Elimination</strong>
            <small>Create zeros</small>
          </div>

          <div className="process-arrow">→</div>

          <div className="process-item">
            <span>03</span>
            <strong>Triangular Form</strong>
            <small>Simplify A</small>
          </div>

          <div className="process-arrow">→</div>

          <div className="process-item">
            <span>04</span>
            <strong>Solution</strong>
            <small>Back substitute</small>
          </div>
        </div>
      </section>

      <section className="interactive-section">
        <div className="interactive-heading">
          <div>
            <div className="section-label">
              INTERACTIVE WALKTHROUGH
            </div>

            <h2>
              Watch the matrix transform
            </h2>

            <p>
              Follow each row operation and see how
              the system gradually becomes easier to solve.
            </p>
          </div>

          <div className="step-counter">
            <span>
              {String(step + 1).padStart(2, '0')}
            </span>
            <small>
              / {String(steps.length).padStart(2, '0')}
            </small>
          </div>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="interactive-card">
          <div className="step-information">
            <div className="step-tag">
              STEP {String(step + 1).padStart(2, '0')}
            </div>

            <h3>
              {currentStep.title}
            </h3>

            <div className="operation-box">
              <span>ROW OPERATION</span>
              <strong>
                {currentStep.operation}
              </strong>
            </div>

            <p>
              Row operations allow us to change the
              appearance of a system without changing
              its solution.
            </p>
          </div>

          <div className="matrix-display">
            <Matrix
              matrix={currentStep.matrix}
              activeRow={step === 0 ? null : step}
            />
          </div>
        </div>

        <div className="navigation-buttons">
          <button
            type="button"
            onClick={() =>
              setStep((current) =>
                Math.max(current - 1, 0)
              )
            }
            disabled={step === 0}
          >
            ← Previous
          </button>

          <button
            type="button"
            className="next-button"
            onClick={() =>
              setStep((current) =>
                Math.min(
                  current + 1,
                  steps.length - 1
                )
              )
            }
            disabled={isLastStep}
          >
            Next Step →
          </button>
        </div>
      </section>

      <section className="solution-section">
        <div className="section-label">
          WHAT HAPPENS NEXT?
        </div>

        <h2>
          Back substitution
        </h2>

        <p>
          Once the matrix becomes upper triangular,
          we can start from the last equation and work
          upwards to find each unknown.
        </p>

        <div className="equation-stack">
          <div>
            <span>1</span>
            <strong>
              11z = 33
            </strong>
          </div>

          <div>
            <span>2</span>
            <strong>
              0.5y + 1.5z = 5.5
            </strong>
          </div>

          <div>
            <span>3</span>
            <strong>
              2x + y − z = 1
            </strong>
          </div>
        </div>

        <div className="solution-result">
          <div>
            <span>x</span>
            <strong>1</strong>
          </div>

          <div>
            <span>y</span>
            <strong>2</strong>
          </div>

          <div>
            <span>z</span>
            <strong>3</strong>
          </div>
        </div>
      </section>

      <section className="why-section">
        <div className="section-label">
          WHY DOES THIS WORK?
        </div>

        <h2>
          The key idea behind row operations
        </h2>

        <div className="why-grid">
          <div>
            <span>01</span>
            <h3>Same solution</h3>
            <p>
              Valid elementary row operations change
              the form of the equations without changing
              the solution set.
            </p>
          </div>

          <div>
            <span>02</span>
            <h3>Simpler structure</h3>
            <p>
              By creating zeros below the diagonal,
              the system becomes much easier to solve.
            </p>
          </div>

          <div>
            <span>03</span>
            <h3>Efficient solving</h3>
            <p>
              Once the triangular form is obtained,
              back substitution gives the unknowns
              systematically.
            </p>
          </div>
        </div>
      </section>

      {/* MATLAB CODE */}
      <section className="experiment-code-section">
        <div className="section-label">
          05 — MATLAB IMPLEMENTATION
        </div>

        <div className="experiment-code-heading">
          <h2>Experiment code.</h2>
          <p>
            The exact MATLAB implementation supplied for this LU decomposition experiment.
          </p>
        </div>

        <div className="experiment-code-block">
          <div className="experiment-code-title">
            <span>FOR 3×3</span>
            <strong>MATLAB</strong>
          </div>
          <pre><code>{`clc;
clear;
n = 3;
disp('Enter the augmented matrix [A|b] row-wise:');
A = zeros(n, n+1);
for i = 1:n
A(i,:) = input(sprintf('Row %d: ', i));
end
disp('Initial Matrix:');
disp(A);
for i = 1:n-1
for j = i+1:n
factor = A(j,i) / A(i,i);
fprintf('Making A(%d,%d) zero using Row %d...\n', j, i, i);
A(j,:) = A(j,:) - factor * A(i,:);
disp(A);
end
end
z = A(3,4) / A(3,3);
y = (A(2,4) - A(2,3) * z) / A(2,2);
x = (A(1,4) - A(1,2) * y - A(1,3) * z) / A(1,1);
fprintf('\nSolution:\n');
fprintf('x = %d\n', round(x));
fprintf('y = %d\n', round(y));
fprintf('z = %d\n', round(z));`}</code></pre>
        </div>

        <div className="experiment-code-block">
          <div className="experiment-code-title">
            <span>FOR 4×4</span>
            <strong>MATLAB</strong>
          </div>
          <pre><code>{`clc;
clear;
n = 4;
disp('Enter the augmented matrix [A|b] row-wise:');
A = zeros(n, n+1);
for i = 1:n
A(i,:) = input(sprintf('Row %d: ', i));
end
disp('Initial Matrix:');
disp(A);
for i = 1:n-1
for j = i+1:n
factor = A(j,i) / A(i,i);
A(j,:) = A(j,:) - factor * A(i,:);
disp(A);
end
end
x = zeros(n,1);
for i = n:-1:1
x(i) = (A(i,end) - A(i,i+1:n) * x(i+1:n)) / A(i,i);
end
fprintf('Solution:\n');
for i = 1:n
fprintf('x%d = %d\n', i, round(x(i)));
end`}</code></pre>
        </div>
      </section>

      <footer className="experiment-footer">
        <button
          type="button"
          onClick={onBack}
        >
          ← Explore other experiments
        </button>
      </footer>
    </main>
  );
}

export default ExperimentPage;