import { useState } from 'react';
import './ImageTransformations.css';

const transformations = [
  {
    id: 'original',
    label: 'Original',
  },
  {
    id: 'translation',
    label: 'Translation',
  },
  {
    id: 'reflectionX',
    label: 'Reflection X',
  },
  {
    id: 'reflectionY',
    label: 'Reflection Y',
  },
  {
    id: 'rotation',
    label: 'Rotation',
  },
  {
    id: 'scaling',
    label: 'Scaling',
  },
  {
    id: 'crop',
    label: 'Cropping',
  },
  {
    id: 'shearX',
    label: 'Shear X',
  },
  {
    id: 'shearY',
    label: 'Shear Y',
  },
];

const descriptions = {
  original: 'Original image before applying any transformation.',

  translation:
    'The image is shifted horizontally and vertically using translation values tx = 100 and ty = 50.',

  reflectionX:
    'The image is reflected along the x-axis.',

  reflectionY:
    'The image is reflected along the y-axis.',

  rotation:
    'The image is rotated through an angle of 45°.',

  scaling:
    'The image is scaled using sx = 2 and sy = 1.5.',

  crop:
    'A selected region of the image is extracted from the original image.',

  shearX:
    'The image is sheared along the x-axis using shx = 0.5.',

  shearY:
    'The image is sheared along the y-axis using shy = 0.3.',
};

const matlabCode = `clc; clear; close all;

% Read Image
img = imread('hkexp3.jpg');
img = im2double(img);

figure, imshow(img);
title('Original Image');

% Translation
tx = 100;
ty = 50;

T = [1 0 0; 0 1 0; tx ty 1];

tform = affine2d(T);

translated_img = imwarp(img, tform, ...
    'OutputView', imref2d(size(img)));

figure, imshow(translated_img);
title('Translated Image');

% Reflection
reflected_x = flip(img, 2);

figure, imshow(reflected_x);
title('Reflected along x-axis');

reflected_y = flip(img, 1);

figure, imshow(reflected_y);
title('Reflected along y-axis');

% Rotation
angle = 45;

rotated_img = imrotate(img, angle, 'bilinear', 'crop');

figure, imshow(rotated_img);
title(['Rotated by ' num2str(angle) '°']);

% Scaling
sx = 2;
sy = 1.5;

S = [sx 0 0; 0 sy 0; 0 0 1];

tform = affine2d(S);

scaled_img = imwarp(img, tform, ...
    'OutputView', imref2d(size(img)));

figure, imshow(scaled_img);
title('Scaled Image');

% Cropping
[row, col, ~] = size(img);

x1 = max(1, 50);
x2 = min(col, 200);

y1 = max(1, 50);
y2 = min(row, 200);

cropped_img = img(y1:y2, x1:x2, :);

figure, imshow(cropped_img);
title('Cropped Image');

% Shearing
shx = 0.5;
shy = 0.3;

ShearX = [1 shx 0; 0 1 0; 0 0 1];
ShearY = [1 0 0; shy 1 0; 0 0 1];

tformX = affine2d(ShearX);

shearedX_img = imwarp(img, tformX, ...
    'OutputView', imref2d(size(img)));

figure, imshow(shearedX_img);
title('Sheared in x-axis');

tformY = affine2d(ShearY);

shearedY_img = imwarp(img, tformY, ...
    'OutputView', imref2d(size(img)));

figure, imshow(shearedY_img);
title('Sheared in y-axis');`;

function ImageTransformations({ onBack }) {
  const [active, setActive] = useState('original');

  const getTransform = () => {
    switch (active) {
      case 'translation':
        return 'translate(55px, 30px)';

      case 'reflectionX':
        return 'scaleX(-1)';

      case 'reflectionY':
        return 'scaleY(-1)';

      case 'rotation':
        return 'rotate(45deg)';

      case 'scaling':
        return 'scale(1.35, 1.15)';

      case 'crop':
        return 'scale(1.7)';

      case 'shearX':
        return 'skewX(-15deg)';

      case 'shearY':
        return 'skewY(-12deg)';

      default:
        return 'none';
    }
  };

  return (
    <div className="experiment-page">
      {/* Background glow */}
      <div className="experiment-glow" />

      {/* =========================
          HEADER
      ========================= */}
      <header className="experiment-header">
        <button
          className="back-button"
          onClick={onBack}
        >
          ← Back to Experiments
        </button>

        <div className="experiment-brand">
          <span>∑</span>
          Linear Algebra Lab
        </div>

        <div className="experiment-number">
          EXPERIMENT 03
        </div>
      </header>

      <main className="experiment-content">

        {/* =========================
            HERO
        ========================= */}
        <section className="experiment-hero">
          <div className="experiment-label">
            LINEAR ALGEBRA LABORATORY
          </div>

          <h1>
            Image
            <br />
            <span>Transformations.</span>
          </h1>

          <p>
            Explore how mathematical transformations can manipulate
            image data through translation, reflection, rotation,
            scaling, cropping and shearing.
          </p>
        </section>

        {/* =========================
            AIM / OBJECTIVE
        ========================= */}
        <section className="info-grid">

          <div className="info-card">
            <div className="card-label">
              AIM
            </div>

            <h2>
              Image Transformations
            </h2>
          </div>

          <div className="info-card">
            <div className="card-label">
              OBJECTIVE
            </div>

            <p>
              Develop a program to perform different
              Image Transformations.
            </p>
          </div>

        </section>

        {/* =========================
            THEORY
        ========================= */}
        <section className="content-section">

          <div className="section-label">
            01 — THEORY
          </div>

          <div className="section-heading">

            <h2>
              Transforming image data.
            </h2>

            <p>
              Image Transformation involves the transformation
              of image data to retrieve information from the image
              or preprocess the image for further usage.
            </p>

            <p>
              OpenCV (Open Source Computer Vision Library) is an
              open-source computer vision and machine learning
              software library.
            </p>

            <p>
              OpenCV provides a common infrastructure for computer
              vision applications and helps accelerate the use of
              machine perception.
            </p>

            <p>
              When integrated with libraries such as NumPy,
              Python can process the OpenCV array structure
              for analysis.
            </p>

          </div>

        </section>

        {/* =========================
            INTERACTIVE LAB
        ========================= */}
        <section className="transform-section">

          <div className="section-label">
            02 — INTERACTIVE LAB
          </div>

          <div className="transform-header">

            <div>
              <h2>
                See the transformation happen.
              </h2>

              <p>
                Select a transformation to visualize its
                effect on an image.
              </p>
            </div>

            <div className="transform-status">
              {active.toUpperCase()}
            </div>

          </div>

          <div className="transform-lab">

            {/* IMAGE PREVIEW */}
            <div className="transform-preview">

              <div className="image-stage">

                <div
                  className={`demo-image demo-${active}`}
                  style={{
                    transform: getTransform(),
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85"
                    alt="Image transformation demonstration"
                  />
                </div>

              </div>

              <div className="transform-description">
                {descriptions[active]}
              </div>

            </div>

            {/* CONTROLS */}
            <div className="transform-controls">

              {transformations.map((item, index) => (
                <button
                  key={item.id}
                  className={
                    active === item.id
                      ? 'active'
                      : ''
                  }
                  onClick={() =>
                    setActive(item.id)
                  }
                >
                  <span>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {item.label}
                </button>
              ))}

            </div>

          </div>

        </section>

        {/* =========================
            PROBLEM DEFINITION
        ========================= */}
        <section className="content-section">

          <div className="section-label">
            03 — PROBLEM DEFINITION
          </div>

          <div className="problem-grid">

            {[
              'Image Translation',
              'Reflection',
              'Rotation',
              'Scaling',
              'Shearing in x-axis',
              'Shearing in y-axis',
            ].map((item, index) => (
              <div
                className="problem-item"
                key={item}
              >
                <span>
                  {String(index + 1).padStart(2, '0')}
                </span>

                {item}
              </div>
            ))}

          </div>

        </section>

        {/* =========================
            MATLAB CODE
        ========================= */}
        <section className="code-section">

          <div className="section-label">
            04 — MATLAB IMPLEMENTATION
          </div>

          <div className="code-header">

            <div>
              <h2>
                Experiment code.
              </h2>

              <p>
                MATLAB implementation used for the
                image transformations.
              </p>
            </div>

            <div className="code-language">
              MATLAB
            </div>

          </div>

          <pre>
            <code>
              {matlabCode}
            </code>
          </pre>

        </section>

        {/* =========================
            QUESTIONS
        ========================= */}
        <section className="content-section">

          <div className="section-label">
            05 — QUESTIONS
          </div>

          <div className="questions">

            <div className="question">
              <span>01</span>

              <p>
                A linear transformation rotates each vector
                in R² clockwise through 90°.
              </p>
            </div>

            <div className="question">
              <span>02</span>

              <p>
                Let T be a linear transformation from Rⁿ to Rⁿ.
                Which of the following statements implies
                that it is bijective?
              </p>
            </div>

            <div className="question">
              <span>03</span>

              <p>
                Determine whether the function
                T : R² → R², T(x, y) = (x², y) is linear.
              </p>
            </div>

            <div className="question">
              <span>04</span>

              <p>
                Let T be the counterclockwise rotation in R²
                by angle 120°. Write down the standard matrix
                of T and compute T(2, 2).
              </p>
            </div>

            <div className="question">
              <span>05</span>

              <p>
                T₁ : R² → R², T₁(x,y) = (x − 2y, 2x + 3y)
                and T₂ : R² → R², T₂(x,y) = (y,0).
                Compute the standard matrices of
                T = T₂ ∘ T₁ and T′ = T₁T₂.
              </p>
            </div>

          </div>

        </section>

        {/* =========================
            CONCLUSION
        ========================= */}
        <section className="conclusion">

          <div className="section-label">
            06 — CONCLUSION
          </div>

          <h2>
            Mathematics becomes
            <br />
            <span>visible.</span>
          </h2>

          <p>
            Image transformations demonstrate how mathematical
            operations can alter image data while preserving
            the underlying structure required for analysis
            and processing.
          </p>

        </section>

      </main>
    </div>
  );
}

export default ImageTransformations;