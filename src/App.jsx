import { useState } from 'react';

import ChromaGrid from './components/ChromaGrid';
import SoftAurora from './components/SoftAurora';

import ExperimentPage from './components/ExperimentPage';
import GaussEliminationPage from './components/GaussEliminationPage';
import ImageTransformations from './components/ImageTransformations';
import PrincipalComponentAnalysis from './components/PrincipalComponentAnalysis';
import Experiment05Page from './components/Experiment05Page';
import Experiment06Page from './components/Experiment06Page';
import Experiment07Page from './components/Experiment07Page';
import Experiment08Page from './components/Experiment08Page';

const items = [
  {
    image: '/experiments/experiment-01.jpeg',
    title: 'Experiment 01',
    subtitle: 'LU Decomposition',
    borderColor: '#5227FF',
    gradient: 'linear-gradient(145deg, #5227FF, #000)',
  },
  {
    image: '/experiments/experiment-02.jpeg',
    title: 'Experiment 02',
    subtitle: 'Gauss Elimination',
    borderColor: '#00D4FF',
    gradient: 'linear-gradient(145deg, #00D4FF, #000)',
  },
  {
    image: '/experiments/experiment-03.jpeg',
    title: 'Experiment 03',
    subtitle: 'Image Transformations',
    borderColor: '#FF2BD6',
    gradient: 'linear-gradient(145deg, #FF2BD6, #000)',
  },
  {
    image: '/experiments/experiment-04.jpeg',
    title: 'Experiment 04',
    subtitle: 'Principal Component Analysis',
    borderColor: '#8B5CF6',
    gradient: 'linear-gradient(145deg, #8B5CF6, #000)',
  },
  {
    image: '/experiments/experiment-05.jpeg',
    title: 'Experiment 05',
    subtitle: 'Vector Dependency & Matrix Analysis',
    borderColor: '#06B6D4',
    gradient: 'linear-gradient(145deg, #06B6D4, #000)',
  },
  {
    image: '/experiments/experiment-06.jpeg',
    title: 'Experiment 06',
    subtitle: 'Singular Value Decomposition',
    borderColor: '#A855F7',
    gradient: 'linear-gradient(145deg, #A855F7, #000)',
  },
  {
    image: '/experiments/experiment-07.jpeg',
    title: 'Experiment 07',
    subtitle: 'Vector & Matrix Analysis',
    borderColor: '#3B82F6',
    gradient: 'linear-gradient(145deg, #3B82F6, #000)',
  },
  {
    image: '/experiments/experiment-08.jpeg',
    title: 'Experiment 08',
    subtitle: 'Gram–Schmidt Orthogonalization',
    borderColor: '#EC4899',
    gradient: 'linear-gradient(145deg, #EC4899, #000)',
  },
];

function HomePage({ onExperimentClick }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#050506',
        color: '#fff',
      }}
    >
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <SoftAurora
          speed={0.45}
          scale={1.2}
          brightness={1.15}
          color1="#5227FF"
          color2="#FF2BD6"
          color3="#00D4FF"
        />
      </div>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'linear-gradient(180deg, rgba(5,5,6,0.58) 0%, rgba(5,5,6,0.76) 55%, rgba(5,5,6,0.96) 100%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
        }}
      >
        <header
          style={{
            height: '76px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 5vw',
            borderBottom:
              '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(5,5,6,0.2)',
            backdropFilter: 'blur(18px)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                border:
                  '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '19px',
                background:
                  'rgba(255,255,255,0.04)',
              }}
            >
              ∑
            </div>

            <span
              style={{
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '-0.01em',
              }}
            >
              Linear Algebra Lab
            </span>
          </div>

          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
            }}
          >
            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              }
              style={{
                border: 0,
                background: 'transparent',
                color:
                  'rgba(255,255,255,0.75)',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              Home
            </button>

            <button
              onClick={() =>
                document
                  .getElementById('experiments')
                  ?.scrollIntoView({
                    behavior: 'smooth',
                  })
              }
              style={{
                border: 0,
                background: 'transparent',
                color:
                  'rgba(255,255,255,0.55)',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              Experiments
            </button>

            <button
              onClick={() =>
                document
                  .getElementById('about')
                  ?.scrollIntoView({
                    behavior: 'smooth',
                  })
              }
              style={{
                border: 0,
                background: 'transparent',
                color:
                  'rgba(255,255,255,0.55)',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              About
            </button>
          </nav>
        </header>

        <main>
          <section
            style={{
              minHeight:
                'calc(100vh - 76px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding:
                '90px 24px 80px',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 15px',
                borderRadius: '100px',
                border:
                  '1px solid rgba(255,255,255,0.12)',
                background:
                  'rgba(255,255,255,0.045)',
                color:
                  'rgba(255,255,255,0.6)',
                fontSize: '10px',
                letterSpacing: '0.18em',
                marginBottom: '28px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#fff',
                  opacity: 0.7,
                }}
              />

              INTERACTIVE VIRTUAL LABORATORY
            </div>

            <h1
              style={{
                margin: 0,
                maxWidth: '900px',
                fontSize:
                  'clamp(55px, 9vw, 115px)',
                lineHeight: 0.9,
                letterSpacing: '-0.065em',
                fontWeight: 500,
              }}
            >
              Linear Algebra
              <br />

              <span
                style={{
                  color:
                    'rgba(255,255,255,0.42)',
                }}
              >
                Lab
              </span>
            </h1>

            <p
              style={{
                maxWidth: '610px',
                margin: '32px auto 0',
                color:
                  'rgba(255,255,255,0.5)',
                fontSize: '17px',
                lineHeight: 1.7,
              }}
            >
              Explore linear algebra through
              interactive experiments, visual
              explanations, and step-by-step
              mathematical transformations.
            </p>

            <section
              id="experiments"
              style={{
                width: '100%',
                maxWidth: '1200px',
                marginTop: '90px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent:
                    'space-between',
                  alignItems: 'end',
                  marginBottom: '28px',
                  padding: '0 15px',
                }}
              >
                <div
                  style={{
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      fontSize: '10px',
                      letterSpacing: '0.2em',
                      color:
                        'rgba(255,255,255,0.35)',
                      marginBottom: '8px',
                    }}
                  >
                    EXPERIMENT COLLECTION
                  </div>

                  <h2
                    style={{
                      margin: 0,
                      fontSize: '22px',
                      fontWeight: 400,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Explore the laboratory
                  </h2>
                </div>

                <div
                  style={{
                    color:
                      'rgba(255,255,255,0.3)',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                  }}
                >
                  08 EXPERIMENTS
                </div>
              </div>

              <div
                style={{
                  width: '100%',
                  height: '900px',
                  position: 'relative',
                }}
              >
                <ChromaGrid
                  items={items}
                  columns={3}
                  rows={3}
                  radius={300}
                  damping={0.45}
                  fadeOut={0.6}
                  ease="power3.out"
                  onItemClick={(_, index) => {
                    onExperimentClick(
                      `experiment-0${
                        index + 1
                      }`
                    );
                  }}
                />
              </div>

              <div
                style={{
                  marginTop: '25px',
                  color:
                    'rgba(255,255,255,0.3)',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                }}
              >
                MOVE YOUR CURSOR TO EXPLORE
                <span
                  style={{
                    margin: '0 10px',
                  }}
                >
                  •
                </span>
                CLICK AN EXPERIMENT TO BEGIN
              </div>
            </section>
          </section>

          <section
            id="about"
            style={{
              maxWidth: '900px',
              margin: '0 auto',
              padding:
                '100px 30px 130px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '10px',
                letterSpacing: '0.2em',
                color:
                  'rgba(255,255,255,0.35)',
                marginBottom: '18px',
              }}
            >
              ABOUT THE LAB
            </div>

            <h2
              style={{
                margin:
                  '0 auto 22px',
                fontSize:
                  'clamp(35px, 5vw, 58px)',
                fontWeight: 500,
                letterSpacing: '-0.045em',
              }}
            >
              Learn mathematics by
              <br />

              <span
                style={{
                  color:
                    'rgba(255,255,255,0.4)',
                }}
              >
                seeing it happen.
              </span>
            </h2>

            <p
              style={{
                maxWidth: '650px',
                margin: '0 auto',
                color:
                  'rgba(255,255,255,0.42)',
                lineHeight: 1.8,
                fontSize: '15px',
              }}
            >
              This interactive laboratory
              turns linear algebra
              experiments into visual,
              step-by-step experiences.
              Instead of only reading
              equations or MATLAB code,
              explore what each
              mathematical operation
              actually does.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] =
    useState('home');

  const handleExperimentClick = (
    experiment
  ) => {
    setCurrentPage(experiment);

    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  };

  const handleBack = () => {
    setCurrentPage('home');

    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  };

  if (
    currentPage === 'experiment-01'
  ) {
    return (
      <ExperimentPage
        onBack={handleBack}
      />
    );
  }

  if (
    currentPage === 'experiment-02'
  ) {
    return (
      <GaussEliminationPage
        onBack={handleBack}
      />
    );
  }

  if (
    currentPage === 'experiment-03'
  ) {
    return (
      <ImageTransformations
        onBack={handleBack}
      />
    );
  }

  if (
    currentPage === 'experiment-04'
  ) {
    return (
      <PrincipalComponentAnalysis
        onBack={handleBack}
      />
    );
  }

  if (
    currentPage === 'experiment-05'
  ) {
    return (
      <Experiment05Page
        onBack={handleBack}
      />
    );
  }

  if (
    currentPage === 'experiment-06'
  ) {
    return (
      <Experiment06Page
        onBack={handleBack}
      />
    );
  }

  if (
    currentPage === 'experiment-07'
  ) {
    return (
      <Experiment07Page
        onBack={handleBack}
      />
    );
  }

  if (
    currentPage === 'experiment-08'
  ) {
    return (
      <Experiment08Page
        onBack={handleBack}
      />
    );
  }

  return (
    <HomePage
      onExperimentClick={
        handleExperimentClick
      }
    />
  );
}