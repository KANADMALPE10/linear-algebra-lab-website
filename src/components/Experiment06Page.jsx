import { useMemo, useState } from 'react';
import './Experiment06Page.css';

const matrixA = [
  [2, 1],
  [-1, 1],
];

const stages = [
  {
    id: 'original',
    number: '01',
    title: 'Unit Circle',
    description:
      'We begin with a unit circle representing the original input space.',
  },
  {
    id: 'vt',
    number: '02',
    title: 'Vᵀ Rotation',
    description:
      'Vᵀ rotates the coordinate system without changing the shape of the circle.',
  },
  {
    id: 'sigma',
    number: '03',
    title: 'Σ Scaling',
    description:
      'Σ scales the principal directions according to the singular values.',
  },
  {
    id: 'u',
    number: '04',
    title: 'U Rotation',
    description:
      'U rotates the scaled ellipse into its final orientation.',
  },
  {
    id: 'final',
    number: '05',
    title: 'UΣVᵀ = A',
    description:
      'The complete sequence reproduces the transformation performed by matrix A.',
  },
];

function MatrixDisplay({ matrix }) {
  return (
    <div className="exp6-matrix">
      {matrix.map((row, rowIndex) => (
        <div className="exp6-matrix-row" key={rowIndex}>
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

function CircleVisualization({ stage }) {
  const stageClass = `exp6-circle-${stage}`;

  return (
    <div className={`exp6-circle-stage ${stageClass}`}>
      <div className="exp6-grid">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="exp6-axis exp6-axis-horizontal" />
      <div className="exp6-axis exp6-axis-vertical" />

      <div className="exp6-circle">
        <div className="exp6-circle-point point-top" />
        <div className="exp6-circle-point point-right" />
        <div className="exp6-circle-point point-bottom" />
        <div className="exp6-circle-point point-left" />
      </div>

      <div className="exp6-transformation-arrow arrow-one" />
      <div className="exp6-transformation-arrow arrow-two" />

      <div className="exp6-origin">O</div>

      {stage === 'original' && (
        <div className="exp6-stage-note">
          ORIGINAL SPACE
        </div>
      )}

      {stage === 'vt' && (
        <div className="exp6-stage-note">
          ROTATION BY Vᵀ
        </div>
      )}

      {stage === 'sigma' && (
        <div className="exp6-stage-note">
          SCALING BY Σ
        </div>
      )}

      {stage === 'u' && (
        <div className="exp6-stage-note">
          ROTATION BY U
        </div>
      )}

      {stage === 'final' && (
        <div className="exp6-stage-note">
          FINAL TRANSFORMATION A
        </div>
      )}
    </div>
  );
}

export default function Experiment06Page({ onBack }) {
  const [activeStage, setActiveStage] = useState(0);
  const [compression, setCompression] = useState(100);
  const [noiseLevel, setNoiseLevel] = useState(0);

  const stage = stages[activeStage];

  const compressionQuality = useMemo(() => {
    if (compression === 50) return 72;
    if (compression === 100) return 88;
    return 96;
  }, [compression]);

  const compressionAmount = useMemo(() => {
    if (compression === 50) return 82;
    if (compression === 100) return 63;
    return 39;
  }, [compression]);

  const psnr = useMemo(() => {
    if (compression === 50) return '28.4';
    if (compression === 100) return '34.7';
    return '40.2';
  }, [compression]);

  const noiseLabel =
    noiseLevel === 0
      ? 'ORIGINAL'
      : noiseLevel === 1
        ? 'MODERATE NOISE'
        : 'HIGH NOISE';

  return (
    <div className="exp6-page">
      <div className="exp6-background-glow" />

      {/* HEADER */}
      <header className="exp6-header">
        <button className="exp6-back" onClick={onBack}>
          ← Back to Experiments
        </button>

        <div className="exp6-brand">
          <span>∑</span>
          Linear Algebra Lab
        </div>

        <div className="exp6-number">
          EXPERIMENT 06
        </div>
      </header>

      <main className="exp6-content">

        {/* HERO */}
        <section className="exp6-hero">
          <div className="exp6-label">
            LINEAR ALGEBRA • MATRIX DECOMPOSITION
          </div>

          <h1>
            Singular Value
            <br />
            <span>Decomposition</span>
          </h1>

          <p>
            Break a matrix into rotation, scaling, and rotation —
            then see how the same idea powers compression,
            dimensionality reduction, and image denoising.
          </p>
        </section>

        {/* AIM */}
        <section className="exp6-section">
          <div className="exp6-section-label">
            01 — AIM
          </div>

          <div className="exp6-aim-card">
            <h2>
              Understand the structure
              <br />
              inside a matrix.
            </h2>

            <p>
              The experiment implements Singular Value Decomposition
              and analyzes its applications in dimensionality
              reduction, data compression, solving systems of linear
              equations, and image processing.
            </p>
          </div>
        </section>

        {/* THEORY */}
        <section className="exp6-section">
          <div className="exp6-section-label">
            02 — THEORY
          </div>

          <div className="exp6-theory-heading">
            <h2>
              One matrix.
              <br />
              Three components.
            </h2>

            <p>
              SVD decomposes a matrix into three matrices that describe
              how the transformation operates on the input space.
            </p>
          </div>

          <div className="exp6-equation">
            <span>A</span>
            <span>=</span>
            <span>U</span>
            <span>∑</span>
            <span>Vᵀ</span>
          </div>

          <div className="exp6-component-grid">

            <article>
              <div className="exp6-component-symbol">
                U
              </div>

              <h3>Left Singular Vectors</h3>

              <p>
                Represents the final orthogonal transformation
                applied to the scaled space.
              </p>
            </article>

            <article>
              <div className="exp6-component-symbol">
                Σ
              </div>

              <h3>Singular Values</h3>

              <p>
                Controls the amount of scaling along the principal
                directions of the transformation.
              </p>
            </article>

            <article>
              <div className="exp6-component-symbol">
                Vᵀ
              </div>

              <h3>Right Singular Vectors</h3>

              <p>
                Provides the initial orthogonal transformation
                before scaling occurs.
              </p>
            </article>

          </div>
        </section>

        {/* INTERACTIVE SVD */}
        <section className="exp6-section">

          <div className="exp6-section-label">
            03 — INTERACTIVE SVD
          </div>

          <div className="exp6-lab-heading">
            <h2>
              Watch SVD transform
              <br />
              the unit circle.
            </h2>

            <p>
              Step through the decomposition and observe how
              Vᵀ, Σ, and U work together to reproduce A.
            </p>
          </div>

          <div className="exp6-lab">

            <div className="exp6-visual-panel">

              <CircleVisualization stage={stage.id} />

              <div className="exp6-visual-caption">
                <span>
                  STAGE {stage.number} / 05
                </span>

                <strong>
                  {stage.title}
                </strong>

                <p>
                  {stage.description}
                </p>
              </div>

            </div>

            <div className="exp6-stage-controls">

              <div className="exp6-control-title">
                TRANSFORMATION
              </div>

              {stages.map((item, index) => (
                <button
                  key={item.id}
                  className={
                    index === activeStage
                      ? 'active'
                      : ''
                  }
                  onClick={() => setActiveStage(index)}
                >
                  <span>{item.number}</span>

                  <div>
                    <strong>{item.title}</strong>

                    <small>
                      {item.id === 'original'
                        ? 'Starting space'
                        : item.id === 'vt'
                          ? 'Rotate'
                          : item.id === 'sigma'
                            ? 'Scale'
                            : item.id === 'u'
                              ? 'Rotate'
                              : 'Complete'}
                    </small>
                  </div>
                </button>
              ))}

              <div className="exp6-formula-mini">
                <span>TRANSFORMATION</span>
                <strong>
                  {activeStage === 0
                    ? 'X'
                    : activeStage === 1
                      ? 'VᵀX'
                      : activeStage === 2
                        ? 'ΣVᵀX'
                        : activeStage === 3
                          ? 'UΣVᵀX'
                          : 'AX'}
                </strong>
              </div>

            </div>

          </div>
        </section>

        {/* MATRIX DECOMPOSITION */}
        <section className="exp6-section">

          <div className="exp6-section-label">
            04 — MATRIX DECOMPOSITION
          </div>

          <div className="exp6-matrix-heading">
            <h2>
              The components
              <br />
              of A.
            </h2>

            <p>
              For the matrix used in the experiment,
              SVD provides an orthogonal factorization
              whose product reconstructs the original matrix.
            </p>
          </div>

          <div className="exp6-matrix-flow">

            <div className="exp6-matrix-card">
              <span>INPUT MATRIX A</span>

              <MatrixDisplay matrix={matrixA} />
            </div>

            <div className="exp6-flow-symbol">
              =
            </div>

            <div className="exp6-matrix-card">
              <span>U</span>

              <div className="exp6-symbol-card">
                U
              </div>
            </div>

            <div className="exp6-flow-symbol">
              ×
            </div>

            <div className="exp6-matrix-card">
              <span>∑</span>

              <div className="exp6-symbol-card sigma">
                Σ
              </div>
            </div>

            <div className="exp6-flow-symbol">
              ×
            </div>

            <div className="exp6-matrix-card">
              <span>Vᵀ</span>

              <div className="exp6-symbol-card vt">
                Vᵀ
              </div>
            </div>

          </div>
        </section>

        {/* SINGULAR VALUES */}
        <section className="exp6-section">

          <div className="exp6-section-label">
            05 — SINGULAR VALUES
          </div>

          <div className="exp6-singular-heading">
            <h2>
              The important
              <br />
              values are not equal.
            </h2>

            <p>
              Singular values determine how strongly each principal
              direction contributes to the transformation.
            </p>
          </div>

          <div className="exp6-singular-visual">

            <div className="exp6-bars">

              <div className="exp6-bar">
                <div
                  className="exp6-bar-fill"
                  style={{ height: '94%' }}
                />

                <span>σ₁</span>
              </div>

              <div className="exp6-bar">
                <div
                  className="exp6-bar-fill"
                  style={{ height: '58%' }}
                />

                <span>σ₂</span>
              </div>

              <div className="exp6-bar">
                <div
                  className="exp6-bar-fill"
                  style={{ height: '27%' }}
                />

                <span>σ₃</span>
              </div>

              <div className="exp6-bar">
                <div
                  className="exp6-bar-fill"
                  style={{ height: '12%' }}
                />

                <span>σ₄</span>
              </div>

              <div className="exp6-bar">
                <div
                  className="exp6-bar-fill"
                  style={{ height: '6%' }}
                />

                <span>σ₅</span>
              </div>

            </div>

            <div className="exp6-singular-caption">
              <strong>
                Larger singular values carry more information.
              </strong>

              <span>
                Smaller singular values can often be discarded
                to obtain a lower-rank approximation.
              </span>
            </div>

          </div>
        </section>

        {/* IMAGE COMPRESSION */}
        <section className="exp6-section">

          <div className="exp6-section-label">
            06 — IMAGE COMPRESSION
          </div>

          <div className="exp6-compression-heading">
            <h2>
              Keep less.
              <br />
              Preserve more.
            </h2>

            <p>
              SVD can reconstruct an image using only a selected
              number of singular values. Move between different
              approximations to see the trade-off.
            </p>
          </div>

          <div className="exp6-compression">

            <div className="exp6-image-preview">

              <div className="exp6-camera">
                <div className="exp6-camera-body">
                  <div className="exp6-camera-lens" />
                </div>

                <div className="exp6-camera-sun" />
                <div className="exp6-camera-hill hill-one" />
                <div className="exp6-camera-hill hill-two" />
              </div>

              <div className="exp6-image-label">
                RECONSTRUCTED IMAGE
              </div>

            </div>

            <div className="exp6-compression-controls">

              <div className="exp6-control-title">
                SINGULAR VALUES
              </div>

              <div className="exp6-compression-buttons">

                {[50, 100, 150].map((value) => (
                  <button
                    key={value}
                    className={
                      compression === value
                        ? 'active'
                        : ''
                    }
                    onClick={() =>
                      setCompression(value)
                    }
                  >
                    <strong>{value}</strong>
                    <span>VALUES</span>
                  </button>
                ))}

              </div>

              <div className="exp6-compression-stats">

                <div>
                  <span>QUALITY</span>
                  <strong>
                    {compressionQuality}%
                  </strong>
                </div>

                <div>
                  <span>PSNR</span>
                  <strong>
                    {psnr} dB
                  </strong>
                </div>

                <div>
                  <span>COMPRESSION</span>
                  <strong>
                    {compressionAmount}%
                  </strong>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* NOISE FILTERING */}
        <section className="exp6-section">

          <div className="exp6-section-label">
            07 — NOISE FILTERING
          </div>

          <div className="exp6-noise-heading">
            <h2>
              SVD can remove
              <br />
              what doesn't matter.
            </h2>

            <p>
              The experiment adds noise to the image and then
              reconstructs it using selected singular values.
            </p>
          </div>

          <div className="exp6-noise-lab">

            <div className="exp6-noise-preview">

              <div
                className={`exp6-noise-image noise-${noiseLevel}`}
              >
                <div className="exp6-camera">
                  <div className="exp6-camera-body">
                    <div className="exp6-camera-lens" />
                  </div>

                  <div className="exp6-camera-sun" />
                  <div className="exp6-camera-hill hill-one" />
                  <div className="exp6-camera-hill hill-two" />
                </div>
              </div>

              <div className="exp6-noise-status">
                {noiseLabel}
              </div>

            </div>

            <div className="exp6-noise-controls">

              <div className="exp6-control-title">
                NOISE LEVEL
              </div>

              {[0, 1, 2].map((value) => (
                <button
                  key={value}
                  className={
                    noiseLevel === value
                      ? 'active'
                      : ''
                  }
                  onClick={() =>
                    setNoiseLevel(value)
                  }
                >
                  <span>
                    {value === 0
                      ? '01'
                      : value === 1
                        ? '02'
                        : '03'}
                  </span>

                  <strong>
                    {value === 0
                      ? 'Original'
                      : value === 1
                        ? 'Moderate Noise'
                        : 'High Noise'}
                  </strong>
                </button>
              ))}

              <div className="exp6-filter-note">
                <span>
                  FILTERING
                </span>

                <strong>
                  {noiseLevel === 0
                    ? 'No filtering required'
                    : noiseLevel === 1
                      ? 'Reduced-rank reconstruction'
                      : 'Aggressive reconstruction'}
                </strong>
              </div>

            </div>

          </div>
        </section>

        {/* MATLAB */}
        <section className="exp6-section exp6-code-section">

          <div className="exp6-section-label">
            08 — MATLAB IMPLEMENTATION
          </div>

          <div className="exp6-code-heading">
            <h2>
              The experiment
              <br />
              in code.
            </h2>

            <p>
              The implementation below follows the MATLAB experiment,
              including matrix SVD, transformation stages, image
              compression, and reconstruction.
            </p>
          </div>

          <pre>
{`clear; close all; clc;

%% 2x2 Matrix Transformation using SVD

t = linspace(0,2*pi,100);
X = [cos(t); sin(t)];

A = [2, 1; -1, 1];

[U,S,V] = svd(A);

VX = V' * X;
SVX = S * VX;
AX = U * SVX;

%% Modified SVD

U1 = U;
U1(:,2) = -U(:,2);

V1 = V;
V1(:,2) = -V(:,2);

disp('Difference after modified SVD:');
disp(U1*S*V1' - A);

%% Check

disp('Difference A*V - U*S:');
disp(A*V - U*S);

%% Image Compression

ImJPG = imread('cameraman.tif');

[m,n] = size(ImJPG);

[UIm,SIm,VIm] = svd(double(ImJPG));

for k = 50:50:150

    ImJPG_comp = uint8( ...
        UIm(:,1:k) * ...
        SIm(1:k,1:k) * ...
        VIm(:,1:k)' ...
    );

    imshow(ImJPG_comp);

end`}
          </pre>

        </section>

        {/* CONCLUSION */}
        <section className="exp6-conclusion">

          <div className="exp6-section-label">
            09 — CONCLUSION
          </div>

          <h2>
            Decompose.
            <br />
            <span>Understand. Reconstruct.</span>
          </h2>

          <p>
            SVD decomposes a matrix into U, Σ, and Vᵀ and provides
            a powerful way to understand matrix transformations.
            The same decomposition can be used for dimensionality
            reduction, data compression, and image denoising by
            reconstructing data with fewer singular values.
          </p>

        </section>

      </main>
    </div>
  );
}