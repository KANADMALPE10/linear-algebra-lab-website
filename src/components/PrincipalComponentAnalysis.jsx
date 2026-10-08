import { useState } from 'react';
import './PrincipalComponentAnalysis.css';

const stages = [
  {
    id: 'original',
    number: '01',
    title: 'Original Data',
    description:
      'The original dataset before applying Principal Component Analysis.',
  },
  {
    id: 'centered',
    number: '02',
    title: 'Center the Data',
    description:
      'The mean is subtracted from the data so that it is centered around zero.',
  },
  {
    id: 'covariance',
    number: '03',
    title: 'Covariance',
    description:
      'The covariance matrix is computed to understand relationships between features.',
  },
  {
    id: 'components',
    number: '04',
    title: 'Principal Components',
    description:
      'Eigenvalue decomposition identifies the principal directions of maximum variance.',
  },
  {
    id: 'projection',
    number: '05',
    title: 'Projection',
    description:
      'The centered data is projected onto the selected principal components.',
  },
  {
    id: 'reconstruction',
    number: '06',
    title: 'Reconstruction',
    description:
      'The reduced representation is transformed back to reconstruct the data.',
  },
];

const matlabCode = `close all;
clear all;
clc;

a = [1 2; 5 6];

[m, n] = size(a);

me = mean(a, 'all');

b = a - me;

sig = cov(b);

[V, D] = eig(sig);

[eigenvalues, index] = ...
    sort(diag(D), 'descend');

V = V(:, index);

V1 = V(:, 1:2);

princicomp = b * V1;

disp('Principal Components:');
disp(princicomp);

imgBack = princicomp * V1';

imgBack = imgBack + me;

disp('Reconstructed Matrix:');
disp(imgBack);

perprincicomp = var(princicomp);

figure;
pareto(perprincicomp);

title('Variance Explained by Principal Components');`;

function PCAVisualization({ active }) {
  const points = [
    [18, 68],
    [25, 62],
    [31, 58],
    [38, 53],
    [44, 48],
    [51, 43],
    [58, 38],
    [65, 34],
    [72, 29],
    [80, 24],
  ];

  return (
    <div className={`pca-visual pca-${active}`}>
      <div className="axis axis-x" />
      <div className="axis axis-y" />

      <div className="axis-label axis-label-x">
        Feature 1
      </div>

      <div className="axis-label axis-label-y">
        Feature 2
      </div>

      {points.map(([x, y], index) => (
        <div
          key={index}
          className="data-point"
          style={{
            left: `${x}%`,
            bottom: `${y}%`,
          }}
        />
      ))}

      <div className="principal-axis">
        <span>Principal Component 1</span>
      </div>

      {active === 'projection' && (
        <div className="projection-lines">
          {points.map(([x, y], index) => (
            <div
              key={index}
              className="projection-line"
              style={{
                left: `${x}%`,
                bottom: `${y}%`,
              }}
            />
          ))}
        </div>
      )}

      {active === 'covariance' && (
        <div className="covariance-box">
          <span>Covariance Matrix</span>
          <strong>
            [ σ₁₁&nbsp;&nbsp; σ₁₂ ]
            <br />
            [ σ₂₁&nbsp;&nbsp; σ₂₂ ]
          </strong>
        </div>
      )}

      {active === 'components' && (
        <div className="component-badge">
          Eigenvectors
        </div>
      )}

      {active === 'reconstruction' && (
        <div className="reconstruction-badge">
          Reconstructed Data
        </div>
      )}
    </div>
  );
}

function PrincipalComponentAnalysis({ onBack }) {
  const [activeStage, setActiveStage] = useState('original');

  const activeData =
    stages.find((stage) => stage.id === activeStage) || stages[0];

  return (
    <div className="pca-page">
      <div className="pca-background-glow" />

      {/* HEADER */}
      <header className="pca-header">
        <button
          className="pca-back-button"
          onClick={onBack}
        >
          ← Back to Experiments
        </button>

        <div className="pca-brand">
          <span>∑</span>
          Linear Algebra Lab
        </div>

        <div className="pca-experiment-number">
          EXPERIMENT 04
        </div>
      </header>

      <main className="pca-content">

        {/* HERO */}
        <section className="pca-hero">
          <div className="pca-label">
            LINEAR ALGEBRA LABORATORY
          </div>

          <h1>
            Principal Component
            <br />
            <span>Analysis.</span>
          </h1>

          <p>
            Implement PCA to reduce the dimensionality of a dataset
            while preserving maximum variance.
          </p>
        </section>

        {/* AIM + OBJECTIVE */}
        <section className="pca-info-grid">

          <div className="pca-info-card">
            <div className="pca-card-label">
              AIM
            </div>

            <h2>
              Principal Component Analysis
            </h2>
          </div>

          <div className="pca-info-card">
            <div className="pca-card-label">
              KEY OBJECTIVE
            </div>

            <p>
              Reduce the dimensionality of a given dataset
              while preserving maximum variance.
            </p>
          </div>

        </section>

        {/* THEORY */}
        <section className="pca-section pca-theory">

          <div className="pca-section-label">
            01 — THEORY
          </div>

          <div className="pca-theory-content">

            <h2>
              Finding the directions
              <br />
              of maximum variance.
            </h2>

            <p>
              Principal Component Analysis is used to reduce the
              dimensionality of data while preserving maximum variance.
            </p>

            <p>
              The experiment follows a sequence of operations:
              standardizing or centering the dataset, computing the
              covariance matrix, performing eigenvalue decomposition,
              projecting the data onto principal components, and
              evaluating the explained variance.
            </p>

          </div>

        </section>

        {/* INTERACTIVE PCA */}
        <section className="pca-section">

          <div className="pca-section-label">
            02 — INTERACTIVE PCA
          </div>

          <div className="pca-interactive-heading">

            <div>
              <h2>
                Follow the transformation.
              </h2>

              <p>
                Explore the main stages of the PCA process.
              </p>
            </div>

            <div className="pca-stage-status">
              {activeData.number} / 06
            </div>

          </div>

          <div className="pca-lab">

            <div className="pca-visual-container">

              <PCAVisualization
                active={activeStage}
              />

              <div className="pca-visual-caption">
                <strong>
                  {activeData.title}
                </strong>

                <span>
                  {activeData.description}
                </span>
              </div>

            </div>

            <div className="pca-stage-controls">

              {stages.map((stage) => (
                <button
                  key={stage.id}
                  className={
                    activeStage === stage.id
                      ? 'active'
                      : ''
                  }
                  onClick={() =>
                    setActiveStage(stage.id)
                  }
                >
                  <span>{stage.number}</span>

                  <div>
                    <strong>
                      {stage.title}
                    </strong>

                    <small>
                      {stage.description}
                    </small>
                  </div>
                </button>
              ))}

            </div>

          </div>

        </section>

        {/* KEY OBJECTIVES */}
        <section className="pca-section">

          <div className="pca-section-label">
            03 — KEY OBJECTIVES
          </div>

          <div className="pca-objectives">

            <div className="pca-objective">
              <span>01</span>
              <div>
                <h3>
                  Standardization
                </h3>
                <p>
                  Standardizing the dataset to have zero mean
                  and unit variance.
                </p>
              </div>
            </div>

            <div className="pca-objective">
              <span>02</span>
              <div>
                <h3>
                  Covariance Matrix
                </h3>
                <p>
                  Computing the covariance matrix to understand
                  feature relationships.
                </p>
              </div>
            </div>

            <div className="pca-objective">
              <span>03</span>
              <div>
                <h3>
                  Eigenvalue Decomposition
                </h3>
                <p>
                  Performing eigenvalue decomposition to identify
                  principal components.
                </p>
              </div>
            </div>

            <div className="pca-objective">
              <span>04</span>
              <div>
                <h3>
                  Projection
                </h3>
                <p>
                  Projecting the data onto the principal components
                  to achieve dimensionality reduction.
                </p>
              </div>
            </div>

            <div className="pca-objective">
              <span>05</span>
              <div>
                <h3>
                  Explained Variance
                </h3>
                <p>
                  Evaluating the results by analyzing explained
                  variance and visualizing the transformed data.
                </p>
              </div>
            </div>

          </div>

        </section>

        {/* MATLAB CODE */}
        <section className="pca-section pca-code-section">

          <div className="pca-section-label">
            04 — MATLAB IMPLEMENTATION
          </div>

          <div className="pca-code-header">

            <div>
              <h2>
                Experiment code.
              </h2>

              <p>
                MATLAB implementation supplied in the experiment.
              </p>
            </div>

            <div className="pca-code-language">
              MATLAB
            </div>

          </div>

          <pre>
            <code>
              {matlabCode}
            </code>
          </pre>

        </section>

        {/* IMAGE PCA */}
        <section className="pca-section pca-image-section">

          <div className="pca-section-label">
            05 — IMAGE APPLICATION
          </div>

          <div className="pca-image-content">

            <h2>
              PCA applied to an image.
            </h2>

            <p>
              The experiment also demonstrates PCA using the
              MATLAB image file <code>cameraman.tif</code>.
              The image is converted to double precision,
              centered, and processed through covariance and
              eigenvalue decomposition.
            </p>

            <div className="pca-image-flow">

              <div className="pca-image-card">
                <span>INPUT</span>

                <div className="pca-camera-image">
                  <div className="camera-silhouette">
                    ◉
                  </div>
                </div>

                <strong>
                  cameraman.tif
                </strong>
              </div>

              <div className="pca-flow-arrow">
                →
              </div>

              <div className="pca-image-card">
                <span>REDUCED</span>

                <div className="pca-reduced-image">
                  <div className="reduced-bars">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>

                <strong>
                  Principal Components
                </strong>
              </div>

              <div className="pca-flow-arrow">
                →
              </div>

              <div className="pca-image-card">
                <span>OUTPUT</span>

                <div className="pca-reconstructed-image">
                  <div className="reconstruction-pattern">
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>

                <strong>
                  Reconstructed Image
                </strong>
              </div>

            </div>

          </div>

        </section>

        {/* CONCLUSION */}
        <section className="pca-conclusion">

          <div className="pca-section-label">
            06 — CONCLUSION
          </div>

          <h2>
            Reduce the data.
            <br />
            <span>Keep the variance.</span>
          </h2>

          <p>
            PCA provides a way to represent data using principal
            components while retaining the maximum possible variance
            in the selected components.
          </p>

        </section>

      </main>
    </div>
  );
}

export default PrincipalComponentAnalysis;