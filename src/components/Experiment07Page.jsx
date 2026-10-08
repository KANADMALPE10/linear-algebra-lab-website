import { useMemo, useState } from 'react';
import './Experiment07Page.css';

const defaultX = [3, 4];
const defaultY = [4, 3];

const predefinedMatrix = [
  [1, 2, 3],
  [2, 4, 6],
  [1, 1, 1],
];

function dotProduct(x, y) {
  return x.reduce((sum, value, index) => sum + value * y[index], 0);
}

function norm1(vector) {
  return vector.reduce((sum, value) => sum + Math.abs(value), 0);
}

function norm2(vector) {
  return Math.sqrt(
    vector.reduce((sum, value) => sum + value * value, 0)
  );
}

function pNorm(vector, p) {
  return Math.pow(
    vector.reduce(
      (sum, value) => sum + Math.pow(Math.abs(value), p),
      0
    ),
    1 / p
  );
}

function MatrixDisplay({ matrix }) {
  return (
    <div className="exp7-matrix">
      {matrix.map((row, rowIndex) => (
        <div className="exp7-matrix-row" key={rowIndex}>
          {row.map((value, columnIndex) => (
            <span key={`${rowIndex}-${columnIndex}`}>
              {value}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function VectorDisplay({ vector, label }) {
  return (
    <div className="exp7-vector-card">
      <span className="exp7-vector-label">{label}</span>

      <div className="exp7-vector">
        {vector.map((value, index) => (
          <div key={index}>
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Experiment07Page({ onBack }) {
  const [x, setX] = useState(defaultX);
  const [y, setY] = useState(defaultY);
  const [p, setP] = useState(3);
  const [matrixMode, setMatrixMode] = useState('predefined');

  const innerProduct = useMemo(
    () => dotProduct(x, y),
    [x, y]
  );

  const xNorm1 = useMemo(() => norm1(x), [x]);
  const yNorm1 = useMemo(() => norm1(y), [y]);

  const xNorm2 = useMemo(() => norm2(x), [x]);
  const yNorm2 = useMemo(() => norm2(y), [y]);

  const xNormP = useMemo(
    () => pNorm(x, p),
    [x, p]
  );

  const yNormP = useMemo(
    () => pNorm(y, p),
    [y, p]
  );

  const isOrthogonal = Math.abs(innerProduct) < 0.0001;

  const vectorsDependent =
    x[0] * y[1] - x[1] * y[0] === 0;

  const matrix = predefinedMatrix;

  const matrixRank = 2;
  const determinant = 0;

  const updateVector = (setter, index, value) => {
    setter((previous) =>
      previous.map((item, i) =>
        i === index ? Number(value) : item
      )
    );
  };

  return (
    <div className="exp7-page">

      <div className="exp7-background-glow" />

      {/* HEADER */}

      <header className="exp7-header">

        <button
          className="exp7-back"
          onClick={onBack}
        >
          ← Back to Experiments
        </button>

        <div className="exp7-brand">
          <span>∑</span>
          Linear Algebra Lab
        </div>

        <div className="exp7-number">
          EXPERIMENT 07
        </div>

      </header>

      <main className="exp7-content">

        {/* HERO */}

        <section className="exp7-hero">

          <div className="exp7-label">
            LINEAR ALGEBRA • VECTOR & MATRIX ANALYSIS
          </div>

          <h1>
            Vector
            <br />
            <span>Analysis</span>
          </h1>

          <p>
            Explore inner products, vector norms, dependency,
            matrix rank, and determinants through interactive
            linear algebra operations.
          </p>

        </section>

        {/* AIM */}

        <section className="exp7-section">

          <div className="exp7-section-label">
            01 — AIM
          </div>

          <div className="exp7-aim-card">

            <h2>
              Understand the
              <br />
              relationships between vectors.
            </h2>

            <p>
              Perform basic linear algebra operations including
              calculating the dot product, evaluating vector norms,
              determining vector dependency, finding matrix rank
              and determinant, and analyzing user-defined matrices.
            </p>

          </div>

        </section>

        {/* VECTOR OPERATIONS */}

        <section className="exp7-section">

          <div className="exp7-section-label">
            02 — VECTOR OPERATIONS
          </div>

          <div className="exp7-heading">

            <h2>
              Start with
              <br />
              two vectors.
            </h2>

            <p>
              Change the vector components and watch the
              calculations update automatically.
            </p>

          </div>

          <div className="exp7-vector-lab">

            <div className="exp7-vector-input-panel">

              <div className="exp7-panel-title">
                VECTOR INPUT
              </div>

              <div className="exp7-input-group">

                <label>
                  VECTOR X
                </label>

                <div className="exp7-inputs">

                  {x.map((value, index) => (
                    <input
                      key={index}
                      type="number"
                      value={value}
                      onChange={(event) =>
                        updateVector(
                          setX,
                          index,
                          event.target.value
                        )
                      }
                    />
                  ))}

                </div>

              </div>

              <div className="exp7-input-group">

                <label>
                  VECTOR Y
                </label>

                <div className="exp7-inputs">

                  {y.map((value, index) => (
                    <input
                      key={index}
                      type="number"
                      value={value}
                      onChange={(event) =>
                        updateVector(
                          setY,
                          index,
                          event.target.value
                        )
                      }
                    />
                  ))}

                </div>

              </div>

            </div>

            <div className="exp7-vector-visual">

              <div className="exp7-axis horizontal" />
              <div className="exp7-axis vertical" />

              <div
                className="exp7-vector-arrow vector-x"
                style={{
                  transform: `rotate(${Math.atan2(
                    -x[1],
                    x[0]
                  )}rad)`,
                  width: `${Math.max(
                    50,
                    Math.min(
                      150,
                      Math.sqrt(
                        x[0] ** 2 + x[1] ** 2
                      ) * 28
                    )
                  )}px`,
                }}
              >
                <span>X</span>
              </div>

              <div
                className="exp7-vector-arrow vector-y"
                style={{
                  transform: `rotate(${Math.atan2(
                    -y[1],
                    y[0]
                  )}rad)`,
                  width: `${Math.max(
                    50,
                    Math.min(
                      150,
                      Math.sqrt(
                        y[0] ** 2 + y[1] ** 2
                      ) * 28
                    )
                  )}px`,
                }}
              >
                <span>Y</span>
              </div>

              <div className="exp7-origin-dot" />

            </div>

          </div>

        </section>

        {/* INNER PRODUCT */}

        <section className="exp7-section">

          <div className="exp7-section-label">
            03 — INNER PRODUCT
          </div>

          <div className="exp7-heading">

            <h2>
              Multiply.
              <br />
              Add. Understand.
            </h2>

            <p>
              The inner product is calculated by multiplying
              corresponding components and summing the results.
            </p>

          </div>

          <div className="exp7-inner-product">

            <div className="exp7-product-equation">

              <div className="exp7-equation-vector">
                x · y
              </div>

              <span>=</span>

              <div className="exp7-equation-vector">
                ({x[0]} × {y[0]}) + ({x[1]} × {y[1]})
              </div>

              <span>=</span>

              <strong>
                {innerProduct.toFixed(2)}
              </strong>

            </div>

            <div
              className={`exp7-result ${
                isOrthogonal
                  ? 'orthogonal'
                  : 'non-orthogonal'
              }`}
            >
              <span>
                RESULT
              </span>

              <strong>
                {isOrthogonal
                  ? 'ORTHOGONAL'
                  : 'NOT ORTHOGONAL'}
              </strong>

              <p>
                {isOrthogonal
                  ? 'The inner product is zero, indicating orthogonality.'
                  : 'The inner product is non-zero, so the vectors are not orthogonal.'}
              </p>
            </div>

          </div>

        </section>

        {/* NORMS */}

        <section className="exp7-section">

          <div className="exp7-section-label">
            04 — VECTOR NORMS
          </div>

          <div className="exp7-heading">

            <h2>
              Measure
              <br />
              vector magnitude.
            </h2>

            <p>
              The experiment manually calculates the 1-norm,
              2-norm and p-norm of both vectors.
            </p>

          </div>

          <div className="exp7-norm-controls">

            <span>
              CHOOSE p
            </span>

            <input
              type="range"
              min="2"
              max="8"
              step="1"
              value={p}
              onChange={(event) =>
                setP(Number(event.target.value))
              }
            />

            <strong>
              p = {p}
            </strong>

          </div>

          <div className="exp7-norm-grid">

            <article>

              <div className="exp7-norm-symbol">
                ‖x‖₁
              </div>

              <h3>
                1-Norm
              </h3>

              <strong>
                {xNorm1.toFixed(2)}
              </strong>

              <p>
                Sum of the absolute values of the vector
                components.
              </p>

            </article>

            <article>

              <div className="exp7-norm-symbol">
                ‖x‖₂
              </div>

              <h3>
                2-Norm
              </h3>

              <strong>
                {xNorm2.toFixed(2)}
              </strong>

              <p>
                Euclidean length of the vector.
              </p>

            </article>

            <article>

              <div className="exp7-norm-symbol">
                ‖x‖ₚ
              </div>

              <h3>
                p-Norm
              </h3>

              <strong>
                {xNormP.toFixed(2)}
              </strong>

              <p>
                Generalized norm controlled by the value of p.
              </p>

            </article>

          </div>

          <div className="exp7-norm-comparison">

            <div>
              <span>
                VECTOR
              </span>

              <strong>
                X
              </strong>
            </div>

            <div>
              <span>
                1-NORM
              </span>

              <strong>
                {xNorm1.toFixed(2)}
              </strong>
            </div>

            <div>
              <span>
                2-NORM
              </span>

              <strong>
                {xNorm2.toFixed(2)}
              </strong>
            </div>

            <div>
              <span>
                {p}-NORM
              </span>

              <strong>
                {xNormP.toFixed(2)}
              </strong>
            </div>

          </div>

          <div className="exp7-norm-comparison">

            <div>
              <span>
                VECTOR
              </span>

              <strong>
                Y
              </strong>
            </div>

            <div>
              <span>
                1-NORM
              </span>

              <strong>
                {yNorm1.toFixed(2)}
              </strong>
            </div>

            <div>
              <span>
                2-NORM
              </span>

              <strong>
                {yNorm2.toFixed(2)}
              </strong>
            </div>

            <div>
              <span>
                {p}-NORM
              </span>

              <strong>
                {yNormP.toFixed(2)}
              </strong>
            </div>

          </div>

        </section>

        {/* DEPENDENCY */}

        <section className="exp7-section">

          <div className="exp7-section-label">
            05 — VECTOR DEPENDENCY
          </div>

          <div className="exp7-heading">

            <h2>
              Independent
              <br />
              or dependent?
            </h2>

            <p>
              Two vectors are tested for a linear relationship
              by examining their geometric and algebraic relationship.
            </p>

          </div>

          <div className="exp7-dependency-card">

            <div className="exp7-dependency-symbol">
              {vectorsDependent
                ? '∥'
                : '∦'}
            </div>

            <div>

              <span>
                CURRENT RESULT
              </span>

              <h3>
                {vectorsDependent
                  ? 'LINEARLY DEPENDENT'
                  : 'LINEARLY INDEPENDENT'}
              </h3>

              <p>
                {vectorsDependent
                  ? 'The vectors lie along the same direction and are scalar multiples of one another.'
                  : 'The vectors do not lie along the same direction and provide independent directions.'}
              </p>

            </div>

          </div>

        </section>

        {/* MATRIX ANALYSIS */}

        <section className="exp7-section">

          <div className="exp7-section-label">
            06 — MATRIX ANALYSIS
          </div>

          <div className="exp7-heading">

            <h2>
              Rank.
              <br />
              Determinant.
            </h2>

            <p>
              A predefined 3 × 3 matrix is analyzed using its
              rank and determinant.
            </p>

          </div>

          <div className="exp7-matrix-analysis">

            <div className="exp7-matrix-panel">

              <span>
                PREDEFINED MATRIX
              </span>

              <MatrixDisplay
                matrix={matrix}
              />

            </div>

            <div className="exp7-matrix-results">

              <div>
                <span>
                  MATRIX SIZE
                </span>

                <strong>
                  3 × 3
                </strong>
              </div>

              <div>
                <span>
                  RANK
                </span>

                <strong>
                  {matrixRank}
                </strong>
              </div>

              <div>
                <span>
                  DETERMINANT
                </span>

                <strong>
                  {determinant}
                </strong>
              </div>

            </div>

          </div>

        </section>

        {/* CUSTOM MATRIX */}

        <section className="exp7-section">

          <div className="exp7-section-label">
            07 — CUSTOM MATRIX
          </div>

          <div className="exp7-heading">

            <h2>
              Build your
              <br />
              own matrix.
            </h2>

            <p>
              The MATLAB experiment accepts user-defined
              dimensions and values to create a custom matrix.
            </p>

          </div>

          <div className="exp7-custom-card">

            <div className="exp7-custom-tabs">

              <button
                className={
                  matrixMode === 'predefined'
                    ? 'active'
                    : ''
                }
                onClick={() =>
                  setMatrixMode('predefined')
                }
              >
                PREDEFINED
              </button>

              <button
                className={
                  matrixMode === 'custom'
                    ? 'active'
                    : ''
                }
                onClick={() =>
                  setMatrixMode('custom')
                }
              >
                USER INPUT
              </button>

            </div>

            {matrixMode === 'predefined' ? (
              <div className="exp7-custom-content">

                <MatrixDisplay
                  matrix={matrix}
                />

                <div>
                  <strong>
                    Matrix ready for analysis.
                  </strong>

                  <p>
                    The predefined matrix can be evaluated
                    using rank and determinant calculations.
                  </p>
                </div>

              </div>
            ) : (
              <div className="exp7-custom-content">

                <div className="exp7-custom-matrix">

                  {[0, 1, 2].map((row) => (
                    <div key={row}>
                      {[0, 1, 2].map((column) => (
                        <input
                          key={column}
                          type="number"
                          defaultValue={
                            row === column ? 1 : 0
                          }
                        />
                      ))}
                    </div>
                  ))}

                </div>

                <div>
                  <strong>
                    3 × 3 user-defined matrix
                  </strong>

                  <p>
                    Enter values in the matrix cells to
                    represent a custom matrix.
                  </p>
                </div>

              </div>
            )}

          </div>

        </section>

        {/* MATLAB */}

        <section className="exp7-section exp7-code-section">

          <div className="exp7-section-label">
            08 — MATLAB IMPLEMENTATION
          </div>

          <div className="exp7-heading">

            <h2>
              The experiment
              <br />
              in code.
            </h2>

            <p>
              The implementation manually computes the inner
              product and vector norms using loops.
            </p>

          </div>

          <pre>
{`clc; clear;

% Prompt user to enter vectors
x = input('Enter the first vector x (e.g., [1 2 3]): ');
y = input('Enter the second vector y (same length as x): ');

% Check vector length
if length(x) ~= length(y)
    error('Vectors x and y must be of the same length.');
end

% Prompt user to enter p
p = input('Enter the value of p for p-norm (e.g., 3): ');

% Initialize variables
inner_product = 0;
norm1_x = 0;
norm1_y = 0;
norm2_x = 0;
norm2_y = 0;
normp_x = 0;
normp_y = 0;

n = length(x);

% Loop to compute manually
for i = 1:n

    % Inner product
    inner_product = inner_product + x(i) * y(i);

    % 1-norm
    norm1_x = norm1_x + abs(x(i));
    norm1_y = norm1_y + abs(y(i));

    % 2-norm
    norm2_x = norm2_x + x(i)^2;
    norm2_y = norm2_y + y(i)^2;

    % p-norm
    normp_x = normp_x + abs(x(i))^p;
    normp_y = normp_y + abs(y(i))^p;

end

% Final calculations
norm2_x = sqrt(norm2_x);
norm2_y = sqrt(norm2_y);

normp_x = normp_x^(1/p);
normp_y = normp_y^(1/p);

% Display results
fprintf('\\nInner Product of x and y: %f\\n', inner_product);

fprintf('1-norm of x: %f\\n', norm1_x);
fprintf('1-norm of y: %f\\n', norm1_y);

fprintf('2-norm of x: %f\\n', norm2_x);
fprintf('2-norm of y: %f\\n', norm2_y);

fprintf('%d-norm of x: %f\\n', p, normp_x);
fprintf('%d-norm of y: %f\\n', p, normp_y);`}
          </pre>

        </section>

        {/* CONCLUSION */}

        <section className="exp7-conclusion">

          <div className="exp7-section-label">
            09 — CONCLUSION
          </div>

          <h2>
            Measure.
            <br />
            <span>Compare. Understand.</span>
          </h2>

          <p>
            The experiment demonstrates fundamental linear algebra
            operations including inner products, vector norms,
            vector relationships, matrix rank, and determinant.
            These calculations provide a practical understanding
            of how vectors and matrices can be analyzed using MATLAB.
          </p>

        </section>

      </main>

    </div>
  );
}