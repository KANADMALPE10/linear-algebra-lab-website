import { useMemo, useState } from 'react';
import './Experiment08Page.css';

const initialVectors = [
  [3, 5, 5, 5],
  [2, 2, 4, 2],
  [1, -1, 0, 0],
];

function gramSchmidt(vectors) {
  const rows = vectors[0].length;
  const columns = vectors.length;

  const A = Array.from({ length: rows }, (_, row) =>
    vectors.map((vector) => vector[row])
  );

  const Q = Array.from({ length: rows }, () =>
    Array(columns).fill(0)
  );

  const R = Array.from({ length: columns }, () =>
    Array(columns).fill(0)
  );

  for (let j = 0; j < columns; j++) {
    let v = A.map((row) => row[j]);

    for (let i = 0; i < j; i++) {
      let projection = 0;

      for (let k = 0; k < rows; k++) {
        projection += Q[k][i] * A[k][j];
      }

      R[i][j] = projection;

      for (let k = 0; k < rows; k++) {
        v[k] -= projection * Q[k][i];
      }
    }

    const magnitude = Math.sqrt(
      v.reduce((sum, value) => sum + value * value, 0)
    );

    R[j][j] = magnitude;

    for (let k = 0; k < rows; k++) {
      Q[k][j] = v[k] / magnitude;
    }
  }

  return { A, Q, R };
}

function Matrix({ data, decimals = 3 }) {
  return (
    <div className="exp8-matrix">
      {data.map((row, rowIndex) => (
        <div className="exp8-matrix-row" key={rowIndex}>
          {row.map((value, columnIndex) => (
            <span key={columnIndex}>
              {Math.abs(value) < 0.0005
                ? '0'
                : Number(value).toFixed(decimals)}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function Vector({ values, label }) {
  return (
    <div className="exp8-vector-card">
      <div className="exp8-vector-label">
        {label}
      </div>

      <div className="exp8-vector">
        {values.map((value, index) => (
          <span key={index}>
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Experiment08Page({ onBack }) {
  const [vectors, setVectors] = useState(initialVectors);
  const [activeStep, setActiveStep] = useState(0);

  const { A, Q, R } = useMemo(
    () => gramSchmidt(vectors),
    [vectors]
  );

  const orthogonality = useMemo(() => {
    const results = [];

    for (let i = 0; i < Q[0].length; i++) {
      for (let j = i + 1; j < Q[0].length; j++) {
        let dot = 0;

        for (let k = 0; k < Q.length; k++) {
          dot += Q[k][i] * Q[k][j];
        }

        results.push({
          pair: `q${i + 1} · q${j + 1}`,
          value: dot,
        });
      }
    }

    return results;
  }, [Q]);

  const updateVector = (vectorIndex, componentIndex, value) => {
    setVectors((previous) =>
      previous.map((vector, vIndex) =>
        vIndex === vectorIndex
          ? vector.map((component, cIndex) =>
              cIndex === componentIndex
                ? Number(value)
                : component
            )
          : vector
      )
    );
  };

  const steps = [
    {
      number: '01',
      title: 'Start with the original vectors',
      text:
        'The given linearly independent vectors are arranged as columns of the matrix A.',
    },
    {
      number: '02',
      title: 'Remove previous components',
      text:
        'For every new vector, the components along previously obtained orthogonal vectors are removed using projections.',
    },
    {
      number: '03',
      title: 'Normalize the result',
      text:
        'The remaining vector is divided by its norm to produce a unit vector in the Q matrix.',
    },
    {
      number: '04',
      title: 'Verify the decomposition',
      text:
        'The resulting Q and R matrices are multiplied to verify that Q × R reproduces the original matrix A.',
    },
  ];

  return (
    <div className="exp8-page">

      <div className="exp8-background-glow" />

      {/* HEADER */}

      <header className="exp8-header">

        <button
          className="exp8-back"
          onClick={onBack}
        >
          ← Back to Experiments
        </button>

        <div className="exp8-brand">
          <span>∑</span>
          Linear Algebra Lab
        </div>

        <div className="exp8-number">
          EXPERIMENT 08
        </div>

      </header>

      <main className="exp8-content">

        {/* HERO */}

        <section className="exp8-hero">

          <div className="exp8-label">
            LINEAR ALGEBRA • ORTHOGONALIZATION
          </div>

          <h1>
            Gram–Schmidt
            <br />
            <span>Orthogonalization</span>
          </h1>

          <p>
            Transform a set of linearly independent vectors
            into an orthogonal or orthonormal basis through
            a step-by-step visualization of the Gram–Schmidt process.
          </p>

        </section>

        {/* AIM */}

        <section className="exp8-section">

          <div className="exp8-section-label">
            01 — AIM
          </div>

          <div className="exp8-aim-card">

            <h2>
              From independent
              <br />
              vectors to an orthonormal basis.
            </h2>

            <p>
              Implement the Gram–Schmidt orthogonalization
              process using MATLAB to transform a set of
              linearly independent vectors into an orthogonal
              or orthonormal basis.
            </p>

          </div>

        </section>

        {/* THEORY */}

        <section className="exp8-section">

          <div className="exp8-section-label">
            02 — THEORY
          </div>

          <div className="exp8-heading">

            <h2>
              Build orthogonality
              <br />
              one vector at a time.
            </h2>

            <p>
              Gram–Schmidt systematically removes the
              components of each vector along the vectors
              that have already been obtained.
            </p>

          </div>

          <div className="exp8-process">

            {steps.map((step, index) => (
              <button
                key={step.number}
                className={`exp8-process-card ${
                  activeStep === index
                    ? 'active'
                    : ''
                }`}
                onClick={() => setActiveStep(index)}
              >

                <span>
                  {step.number}
                </span>

                <h3>
                  {step.title}
                </h3>

                <p>
                  {step.text}
                </p>

              </button>
            ))}

          </div>

          <div className="exp8-active-explanation">

            <span>
              STEP {steps[activeStep].number}
            </span>

            <h3>
              {steps[activeStep].title}
            </h3>

            <p>
              {steps[activeStep].text}
            </p>

          </div>

        </section>

        {/* ORIGINAL VECTORS */}

        <section className="exp8-section">

          <div className="exp8-section-label">
            03 — ORIGINAL VECTORS
          </div>

          <div className="exp8-heading">

            <h2>
              Three vectors.
              <br />
              One starting point.
            </h2>

            <p>
              These are the vectors used in the MATLAB
              implementation supplied for the experiment.
              Change their components to explore the process.
            </p>

          </div>

          <div className="exp8-vector-grid">

            {vectors.map((vector, vectorIndex) => (
              <div
                className="exp8-editable-vector"
                key={vectorIndex}
              >

                <div className="exp8-editable-title">
                  VECTOR {vectorIndex + 1}
                </div>

                <div className="exp8-editable-inputs">

                  {vector.map((value, componentIndex) => (
                    <input
                      key={componentIndex}
                      type="number"
                      value={value}
                      onChange={(event) =>
                        updateVector(
                          vectorIndex,
                          componentIndex,
                          event.target.value
                        )
                      }
                    />
                  ))}

                </div>

                <Vector
                  values={vector}
                  label={`v${vectorIndex + 1}`}
                />

              </div>
            ))}

          </div>

        </section>

        {/* MATRIX A */}

        <section className="exp8-section">

          <div className="exp8-section-label">
            04 — MATRIX A
          </div>

          <div className="exp8-heading">

            <h2>
              Arrange the vectors
              <br />
              as columns.
            </h2>

            <p>
              The original vectors are combined to form
              the matrix A used by the Gram–Schmidt algorithm.
            </p>

          </div>

          <div className="exp8-large-matrix-card">

            <div className="exp8-matrix-name">
              A
            </div>

            <Matrix
              data={A}
              decimals={0}
            />

            <div className="exp8-matrix-caption">
              Original matrix
            </div>

          </div>

        </section>

        {/* ORTHOGONALIZATION */}

        <section className="exp8-section">

          <div className="exp8-section-label">
            05 — ORTHOGONALIZATION
          </div>

          <div className="exp8-heading">

            <h2>
              Remove the
              <br />
              unwanted components.
            </h2>

            <p>
              Each new vector is adjusted by subtracting
              its projections onto the previously obtained
              orthogonal vectors.
            </p>

          </div>

          <div className="exp8-flow">

            <div className="exp8-flow-node">
              <span>
                INPUT
              </span>

              <strong>
                v₁
              </strong>
            </div>

            <div className="exp8-flow-line" />

            <div className="exp8-flow-node">
              <span>
                ORTHOGONALIZE
              </span>

              <strong>
                v₂ − proj(v₂)
              </strong>
            </div>

            <div className="exp8-flow-line" />

            <div className="exp8-flow-node">
              <span>
                NORMALIZE
              </span>

              <strong>
                q₁, q₂, q₃
              </strong>
            </div>

          </div>

        </section>

        {/* Q MATRIX */}

        <section className="exp8-section">

          <div className="exp8-section-label">
            06 — ORTHONORMAL Q MATRIX
          </div>

          <div className="exp8-heading">

            <h2>
              The orthonormal
              <br />
              basis.
            </h2>

            <p>
              The Q matrix contains the normalized vectors
              generated by the Gram–Schmidt process.
              Each column has unit length and is orthogonal
              to the other columns.
            </p>

          </div>

          <div className="exp8-q-layout">

            <div className="exp8-large-matrix-card">

              <div className="exp8-matrix-name">
                Q
              </div>

              <Matrix
                data={Q}
              />

              <div className="exp8-matrix-caption">
                Orthonormalized vectors
              </div>

            </div>

            <div className="exp8-verification-card">

              <span>
                ORTHOGONALITY CHECK
              </span>

              <h3>
                qᵢ · qⱼ ≈ 0
              </h3>

              <div className="exp8-check-list">

                {orthogonality.map((item) => (
                  <div key={item.pair}>

                    <span>
                      {item.pair}
                    </span>

                    <strong>
                      {Math.abs(item.value) < 0.0001
                        ? '0'
                        : item.value.toFixed(4)}
                    </strong>

                  </div>
                ))}

              </div>

              <p>
                The dot products between different columns
                of Q are approximately zero, confirming
                orthogonality.
              </p>

            </div>

          </div>

        </section>

        {/* R MATRIX */}

        <section className="exp8-section">

          <div className="exp8-section-label">
            07 — UPPER TRIANGULAR R MATRIX
          </div>

          <div className="exp8-heading">

            <h2>
              Capture the
              <br />
              transformation.
            </h2>

            <p>
              The R matrix stores the projection coefficients
              generated during the orthogonalization process.
            </p>

          </div>

          <div className="exp8-large-matrix-card">

            <div className="exp8-matrix-name">
              R
            </div>

            <Matrix
              data={R}
            />

            <div className="exp8-matrix-caption">
              Upper triangular matrix
            </div>

          </div>

        </section>

        {/* VERIFICATION */}

        <section className="exp8-section">

          <div className="exp8-section-label">
            08 — VERIFICATION
          </div>

          <div className="exp8-heading">

            <h2>
              Q × R
              <br />
              returns A.
            </h2>

            <p>
              The decomposition is verified by multiplying
              Q and R. The result should reproduce the
              original matrix A.
            </p>

          </div>

          <div className="exp8-verification">

            <div className="exp8-verification-expression">

              <span>
                Q
              </span>

              <strong>
                ×
              </strong>

              <span>
                R
              </span>

              <strong>
                =
              </strong>

              <span>
                A
              </span>

            </div>

            <div className="exp8-success">

              <div className="exp8-success-icon">
                ✓
              </div>

              <div>

                <span>
                  VERIFICATION COMPLETE
                </span>

                <h3>
                  Q × R reproduces the original matrix
                </h3>

                <p>
                  The Gram–Schmidt decomposition successfully
                  represents the original matrix as the product
                  of an orthonormal matrix Q and an upper
                  triangular matrix R.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* MATLAB CODE */}

        <section className="exp8-section exp8-code-section">

          <div className="exp8-section-label">
            09 — MATLAB IMPLEMENTATION
          </div>

          <div className="exp8-heading">

            <h2>
              The complete
              <br />
              implementation.
            </h2>

            <p>
              The following MATLAB implementation performs
              the Gram–Schmidt procedure and verifies the
              resulting decomposition.
            </p>

          </div>

          <pre>
{`clc;
clear all;
close all;

fprintf('E051_VARUN TALELE_LA_EXP8\\\\n')

vectors = {
    [3; 5; 5; 5],
    [2; 2; 4; 2],
    [1; -1; 0; 0]
};

A = [vectors{1}, vectors{2}, vectors{3}];

[m, n] = size(A);

Q = zeros(m, n);
R = zeros(n, n);

for j = 1:n

    v = A(:, j);

    for i = 1:j-1

        R(i, j) = Q(:, i)' * A(:, j);

        v = v - R(i, j) * Q(:, i);

    end

    R(j, j) = norm(v);

    Q(:, j) = v / R(j, j);

end

fprintf('\\\\nOriginal vectors (as columns):\\\\n');
disp(A);

fprintf('\\\\nOrthogonalized vectors (Q matrix):\\\\n');
disp(Q);

fprintf('\\\\nUpper triangular matrix (R matrix):\\\\n');
disp(R);

fprintf('\\\\nVerification (Q*R should equal original matrix):\\\\n');
disp(Q*R);`}
          </pre>

        </section>

        {/* CONCLUSION */}

        <section className="exp8-conclusion">

          <div className="exp8-section-label">
            10 — CONCLUSION
          </div>

          <h2>
            Orthogonalize.
            <br />
            <span>Normalize. Verify.</span>
          </h2>

          <p>
            The Gram–Schmidt orthogonalization process was
            successfully implemented in MATLAB to transform
            a set of linearly independent vectors into an
            orthogonal basis. The resulting vectors were
            verified using dot products to confirm their
            orthogonality. The process can also be normalized
            to obtain an orthonormal basis.
          </p>

          <div className="exp8-final-mark">
            EXPERIMENT 08 COMPLETE
          </div>

        </section>

      </main>

    </div>
  );
}