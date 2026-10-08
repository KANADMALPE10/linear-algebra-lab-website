import { useMemo, useState } from 'react';
import './Experiment05Page.css';

const initialMatrix = [
  [2, 6, 3],
  [4, 7, 5],
  [9, 8, 2],
];

function calculateRank(matrix) {
  const a = matrix.map((row) => row.map(Number));
  const rows = a.length;
  const cols = a[0].length;

  let rank = 0;
  let row = 0;

  for (let col = 0; col < cols && row < rows; col++) {
    let pivot = row;

    for (let i = row + 1; i < rows; i++) {
      if (Math.abs(a[i][col]) > Math.abs(a[pivot][col])) {
        pivot = i;
      }
    }

    if (Math.abs(a[pivot][col]) < 1e-10) continue;

    [a[row], a[pivot]] = [a[pivot], a[row]];

    for (let i = row + 1; i < rows; i++) {
      const factor = a[i][col] / a[row][col];

      for (let j = col; j < cols; j++) {
        a[i][j] -= factor * a[row][j];
      }
    }

    rank++;
    row++;
  }

  return rank;
}

function transpose(matrix) {
  return matrix[0].map((_, columnIndex) =>
    matrix.map((row) => row[columnIndex])
  );
}

function determinant3x3(matrix) {
  const [
    [a, b, c],
    [d, e, f],
    [g, h, i],
  ] = matrix.map((row) => row.map(Number));

  return (
    a * (e * i - f * h) -
    b * (d * i - f * g) +
    c * (d * h - e * g)
  );
}

function MatrixDisplay({ matrix }) {
  return (
    <div className="exp5-matrix">
      {matrix.map((row, rowIndex) => (
        <div className="exp5-matrix-row" key={rowIndex}>
          {row.map((value, columnIndex) => (
            <span key={`${rowIndex}-${columnIndex}`}>
              {Number(value).toFixed(2)}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Experiment05Page({ onBack }) {
  const [matrix, setMatrix] = useState(initialMatrix);

  const rank = useMemo(() => calculateRank(matrix), [matrix]);

  const transposed = useMemo(() => transpose(matrix), [matrix]);

  const determinant = useMemo(
    () => determinant3x3(matrix),
    [matrix]
  );

  const dependencyStatus =
    rank < Math.min(matrix.length, matrix[0].length)
      ? 'LINEARLY DEPENDENT'
      : 'FULL RANK';

  const updateValue = (row, column, value) => {
    setMatrix((current) =>
      current.map((matrixRow, rowIndex) =>
        matrixRow.map((cell, columnIndex) =>
          rowIndex === row && columnIndex === column
            ? value
            : cell
        )
      )
    );
  };

  return (
    <div className="exp5-page">
      <div className="exp5-glow" />

      {/* HEADER */}
      <header className="exp5-header">
        <button className="exp5-back" onClick={onBack}>
          ← Back to Experiments
        </button>

        <div className="exp5-brand">
          <span>∑</span>
          Linear Algebra Lab
        </div>

        <div className="exp5-number">
          EXPERIMENT 05
        </div>
      </header>

      <main className="exp5-content">

        {/* HERO */}
        <section className="exp5-hero">
          <div className="exp5-label">
            LINEAR ALGEBRA • MATRIX ANALYSIS
          </div>

          <h1>
            Vector Dependency
            <br />
            <span>& Matrix Analysis</span>
          </h1>

          <p>
            Explore vector relationships, matrix rank, transpose,
            determinant, and span through an interactive mathematical
            laboratory.
          </p>
        </section>

        {/* AIM */}
        <section className="exp5-section">
          <div className="exp5-section-label">
            01 — AIM
          </div>

          <div className="exp5-theory-card">
            <h2>Understanding vector relationships.</h2>

            <p>
              This experiment studies vector dependency and independence,
              evaluates the rank and determinant of a matrix, accepts
              user-defined matrices for analysis, and explores the span
              of vectors.
            </p>
          </div>
        </section>

        {/* THEORY */}
        <section className="exp5-section">
          <div className="exp5-section-label">
            02 — THEORY
          </div>

          <div className="exp5-theory-grid">

            <article>
              <div className="exp5-card-number">01</div>
              <h3>Vector Dependency</h3>
              <p>
                Vectors are linearly dependent when one vector can be
                represented as a linear combination of the others.
                Otherwise, they are linearly independent.
              </p>
            </article>

            <article>
              <div className="exp5-card-number">02</div>
              <h3>Matrix Rank</h3>
              <p>
                The rank of a matrix represents the maximum number of
                linearly independent rows or columns in the matrix.
              </p>
            </article>

            <article>
              <div className="exp5-card-number">03</div>
              <h3>Determinant</h3>
              <p>
                The determinant provides information about a square
                matrix and its linear independence properties.
              </p>
            </article>

            <article>
              <div className="exp5-card-number">04</div>
              <h3>Span</h3>
              <p>
                The span of a set of vectors is the collection of all
                vectors that can be formed through their linear
                combinations.
              </p>
            </article>

          </div>
        </section>

        {/* INTERACTIVE LAB */}
        <section className="exp5-section exp5-lab-section">

          <div className="exp5-section-label">
            03 — INTERACTIVE MATRIX LAB
          </div>

          <div className="exp5-lab-heading">
            <h2>Analyze the matrix.</h2>

            <p>
              Change the matrix values and observe how its rank,
              transpose, determinant, and dependency status respond.
            </p>
          </div>

          <div className="exp5-lab">

            <div className="exp5-matrix-panel">

              <div className="exp5-panel-top">
                <span>INPUT MATRIX A</span>

                <button
                  onClick={() => setMatrix(initialMatrix)}
                >
                  RESET
                </button>
              </div>

              <div className="exp5-input-matrix">
                {matrix.map((row, rowIndex) =>
                  row.map((value, columnIndex) => (
                    <input
                      key={`${rowIndex}-${columnIndex}`}
                      type="number"
                      value={value}
                      onChange={(event) =>
                        updateValue(
                          rowIndex,
                          columnIndex,
                          event.target.value
                        )
                      }
                    />
                  ))
                )}
              </div>

              <div className="exp5-matrix-caption">
                Edit any value to experiment with different
                matrices.
              </div>

            </div>

            <div className="exp5-results">

              <div className="exp5-result-card">
                <span>RANK</span>
                <strong>{rank}</strong>
                <small>rank(A)</small>
              </div>

              <div className="exp5-result-card">
                <span>DETERMINANT</span>
                <strong>
                  {determinant.toFixed(2)}
                </strong>
                <small>det(A)</small>
              </div>

              <div className="exp5-result-card">
                <span>STATUS</span>
                <strong className="exp5-status">
                  {dependencyStatus}
                </strong>
                <small>linear relationship</small>
              </div>

            </div>

          </div>
        </section>

        {/* TRANSPOSE */}
        <section className="exp5-section">

          <div className="exp5-section-label">
            04 — TRANSPOSE
          </div>

          <div className="exp5-transform">

            <div>
              <span className="exp5-mini-label">
                MATRIX A
              </span>

              <MatrixDisplay matrix={matrix} />
            </div>

            <div className="exp5-arrow">
              →
            </div>

            <div>
              <span className="exp5-mini-label">
                TRANSPOSE Aᵀ
              </span>

              <MatrixDisplay matrix={transposed} />
            </div>

          </div>

          <p className="exp5-description">
            The transpose operation exchanges the rows and columns
            of a matrix. The submitted MATLAB experiment creates
            matrix B using the transpose of matrix A.
          </p>

        </section>

        {/* SPAN */}
        <section className="exp5-section">

          <div className="exp5-section-label">
            05 — VECTOR SPAN
          </div>

          <div className="exp5-span-heading">
            <h2>Where can these vectors reach?</h2>

            <p>
              The span describes the set of all possible linear
              combinations generated by a collection of vectors.
            </p>
          </div>

          <div className="exp5-span-visual">

            <div className="exp5-axis exp5-axis-x" />
            <div className="exp5-axis exp5-axis-y" />

            <div className="exp5-vector exp5-vector-one">
              <span>v₁</span>
            </div>

            <div className="exp5-vector exp5-vector-two">
              <span>v₂</span>
            </div>

            <div className="exp5-origin">
              O
            </div>

          </div>

        </section>

        {/* MATLAB */}
        <section className="exp5-section exp5-code-section">

          <div className="exp5-section-label">
            06 — MATLAB IMPLEMENTATION
          </div>

          <div className="exp5-code-heading">
            <h2>The experiment in code.</h2>

            <p>
              The following implementation is based on the MATLAB
              program submitted for Experiment 05.
            </p>
          </div>

          <pre>
{`clc;
clear all;

n = input('Enter the number of vectors col:');
m = input('Enter the numbers of vectors row:');

for i = 1:m
    for j = 1:n
        A(i,j) = input( ...
        sprintf('Enter the vectors for A(%d,%d): ',i,j));
    end
end

disp('The entered matrix A is:');
disp(A);

k = rank(A);

disp('Rank of matrix A:');
disp(k);

B = transpose(A);

disp('transpose of matrix A :');
disp(B);

kB = rank(B);

disp('Rank of matrix B:');
disp(kB);

c = [4 5 6];

disp('Matrix C:');
disp(c);

C = transpose(c);

disp('Transpose of matrix c :');
disp(C);

x = B\\C;

disp('Solution x:');
disp(x);

b = [1;2;3];

result = A./b;

disp(result);`}
          </pre>

        </section>

        {/* CONCLUSION */}
        <section className="exp5-conclusion">

          <div className="exp5-section-label">
            07 — CONCLUSION
          </div>

          <h2>
            From matrices
            <br />
            <span>to relationships.</span>
          </h2>

          <p>
            The experiment demonstrates important concepts of linear
            algebra including rank, determinant, dependency,
            independence, transpose, and span. A user-defined matrix
            can be created and analyzed to understand its underlying
            linear relationships.
          </p>

        </section>

      </main>
    </div>
  );
}