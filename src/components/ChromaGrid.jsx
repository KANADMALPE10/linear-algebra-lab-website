import { useRef, useEffect } from 'react';

import { gsap } from 'gsap';

import './ChromaGrid.css';

const ChromaGrid = ({

  items,

  className = '',

  radius = 300,

  columns = 3,

  rows = 3,

  damping = 0.45,

  fadeOut = 0.6,

  ease = 'power3.out',

  onItemClick,

}) => {

  const rootRef = useRef(null);

  const fadeRef = useRef(null);

  const setX = useRef(null);

  const setY = useRef(null);

  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {

    const el = rootRef.current;

    if (!el) return;

    setX.current = gsap.quickSetter(el, '--x', 'px');

    setY.current = gsap.quickSetter(el, '--y', 'px');

    const { width, height } = el.getBoundingClientRect();

    pos.current = {

      x: width / 2,

      y: height / 2,

    };

    setX.current(pos.current.x);

    setY.current(pos.current.y);

  }, []);

  const moveTo = (x, y) => {

    gsap.to(pos.current, {

      x,

      y,

      duration: damping,

      ease,

      onUpdate: () => {

        setX.current?.(pos.current.x);

        setY.current?.(pos.current.y);

      },

      overwrite: true,

    });

  };

  const handleMove = (e) => {

    const el = rootRef.current;

    if (!el) return;

    const r = el.getBoundingClientRect();

    moveTo(

      e.clientX - r.left,

      e.clientY - r.top

    );

    if (fadeRef.current) {

      gsap.to(fadeRef.current, {

        opacity: 0,

        duration: 0.25,

        overwrite: true,

      });

    }

  };

  const handleLeave = () => {

    if (!fadeRef.current) return;

    gsap.to(fadeRef.current, {

      opacity: 1,

      duration: fadeOut,

      overwrite: true,

    });

  };

  const handleCardMove = (e) => {

    const card = e.currentTarget;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);

    card.style.setProperty('--mouse-y', `${y}px`);

  };

  const handleCardClick = (item, index) => {

    if (onItemClick) {

      onItemClick(item, index);

    }

  };

  return (

    <div

      ref={rootRef}

      className={`chroma-grid ${className}`}

      style={{

        '--r': `${radius}px`,

        '--cols': columns,

        '--rows': rows,

      }}

      onPointerMove={handleMove}

      onPointerLeave={handleLeave}

    >

      {items.map((item, index) => (

        <article

          key={index}

          className="chroma-card"

          onMouseMove={handleCardMove}

          onClick={() => handleCardClick(item, index)}

          style={{

            '--card-border':

              item.borderColor || 'transparent',

            '--card-gradient':

              item.gradient ||

              'linear-gradient(145deg, #222, #000)',

            cursor: 'pointer',

          }}

        >

          <div className="chroma-img-wrapper">

            <img

              src={item.image}

              alt={item.title}

              loading="lazy"

            />

          </div>

          <footer className="chroma-info">

            <h3 className="name">

              {item.title}

            </h3>

            {item.handle && (

              <span className="handle">

                {item.handle}

              </span>

            )}

            <p className="role">

              {item.subtitle}

            </p>

            {item.location && (

              <span className="location">

                {item.location}

              </span>

            )}

          </footer>

        </article>

      ))}

      <div className="chroma-overlay" />

      <div

        ref={fadeRef}

        className="chroma-fade"

      />

    </div>

  );

};

export default ChromaGrid;