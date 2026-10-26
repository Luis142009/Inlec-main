import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../stylesheets/Fuentes.css';
import '../stylesheets/GaleriaCables.css';

gsap.registerPlugin(ScrollTrigger);

/* ===== Tus imágenes y textos (las rutas salen de /public) =====
   ratio = ancho / alto de la foto (300x200 = 1.5, 300x270 = 1.11)
   Las últimas 6 reutilizan tus imágenes: cambia el "src" por las nuevas cuando las tengas. */
const PHOTOS = [
  { src: '/12.png', ratio: 300 / 200, texto: 'Casa bean, tenebrosa y construida en los años 1960' },
  { src: '/13.png', ratio: 300 / 200, texto: 'Casa de bunce, que abarca una perverza crianza de gansos' },
  { src: '/14.png', ratio: 300 / 200, texto: 'Casa de boggis, que abarca una perverza crianza de pollos' },
  { src: '/vista.png', ratio: 300 / 270, texto: 'conoce un campo donde se esconden las 3 granjas' },
  { src: '/tunel.png', ratio: 300 / 270, texto: 'Una cueva que abarca terrores y pronfundidades.' },
  { src: '/pieza.png', ratio: 300 / 270, texto: 'Habitacion del  señor y la señora fox' },

  /* ===== 6 cuadros nuevos ===== */
  { src: '/excavadora.png', ratio: 300 / 200, texto: 'Cueva tenebrosa y profundidades sin camino.' },
  { src: '/entrada.png', ratio: 300 / 200, texto: 'un sotana que esconde al sidra del granjero bean' },
  { src: '/Cocina.png', ratio: 300 / 270, texto: 'la cocina de la señora y el señor fox' },
  { src: '/casa.png', ratio: 300 / 200, texto: 'la sala que atrevesara por muchos caos' },
  { src: '/camino.png', ratio: 300 / 270, texto: 'atajos donde se movia el maravilloso sñeor fox' },
  { src: '/Atardecer.png', ratio: 300 / 270, texto: 'el gran arbol que esconde la madriguera' },
];

// Fotos por tramo de la cuerda. La cuerda es una sola y va en zigzag (culebra):
// un tramo va de izquierda a derecha, da la vuelta y el siguiente va de derecha a izquierda.
const DESKTOP_PER_ROW = 3;
const MOBILE_PER_ROW = 2;

const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

const mezclarArr = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Curva de cada tramo: Bézier cuadrática de (X0,A) a (X1,A) con control en (50,C).
// Valores en % del ancho / alto de la fila. TURN = cuánto sobresale la vuelta en U.
const A = 14;
const C = 42;
const X0 = 6;
const X1 = 94;
const TURN = 7;
// Zona del cable donde se reparten las fotos
const PAD_L = 12;
const PAD_R = 88;
const cableY = (x) => {
  const t = (x - X0) / (X1 - X0);
  return (1 - t) * (1 - t) * A + 2 * t * (1 - t) * C + t * t * A;
};

const getPerRow = () =>
  window.matchMedia('(max-width: 600px)').matches ? MOBILE_PER_ROW : DESKTOP_PER_ROW;

// Tamaños, giros y desplazamientos aleatorios
function crearItems(mezclar = false) {
  const base = PHOTOS.map((p, id) => ({ ...p, id }));
  return (mezclar ? mezclarArr(base) : base).map((p) => ({
    id: p.id,
    src: p.src,
    texto: p.texto,
    ratio: p.ratio,
    size: +((p.ratio >= 1.3 ? 1.05 : 1.0) * rand(1.0, 1.2)).toFixed(2),
    rot: +rand(-6, 6).toFixed(1),
    jit: rand(-0.05, 0.05),
  }));
}

/* ===== Color del marco según el estilo de cada imagen =====
   Se promedia el color de la foto: si es oscura/sombría el marco sale oscuro,
   si es clara y luminosa el marco sale claro, y el tono sigue al de la imagen. */
const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (d) {
    s = d / (1 - Math.abs(2 * l - 1));
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return [h, s, l];
};

const marcoDesdePixeles = (data) => {
  let r = 0;
  let g = 0;
  let b = 0;
  let n = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 40) continue; // ignora lo transparente
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    n++;
  }
  if (!n) return null;
  r /= n;
  g /= n;
  b /= n;

  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  const [h0, s0] = rgbToHsl(r, g, b);
  const h = s0 < 0.08 ? 25 : h0; // si la foto es gris, usa el naranja de la marca
  const t = clamp((lum - 0.12) / 0.58, 0, 1);
  const L = 16 + t * 72; // oscuras → 16 %, claras → 88 %
  const S = L < 45 ? clamp(s0 * 70 + 8, 18, 45) : clamp(s0 * 90 + 15, 30, 75);

  return {
    card: `hsl(${Math.round(h)} ${Math.round(S)}% ${Math.round(L)}%)`,
    on: L < 52 ? '#fdf6e3' : '#6b3a16', // color del texto/iconos sobre el marco
  };
};

const leerFavs = () => {
  try {
    return new Set(JSON.parse(localStorage.getItem('gc-favs') || '[]'));
  } catch {
    return new Set();
  }
};

/* ===== Hover: columpio desde la pinza ===== */
function swing(el, clientX) {
  const base = +el.dataset.rot;
  const rect = el.getBoundingClientRect();
  const dir = clientX && clientX > rect.left + rect.width / 2 ? -1 : 1;
  gsap.killTweensOf(el, 'rotation,scale');
  el.style.zIndex = 5;
  gsap.to(el, { scale: 1.07, duration: 0.3, ease: 'power2.out' });
  gsap.to(el, {
    keyframes: [
      { rotation: base + dir * 9, duration: 0.25 },
      { rotation: base - dir * 6, duration: 0.3 },
      { rotation: base + dir * 3, duration: 0.3 },
      { rotation: base, duration: 0.35 },
    ],
    ease: 'sine.inOut',
  });
}

function settle(el) {
  gsap.killTweensOf(el, 'scale');
  gsap.to(el, {
    scale: 1,
    duration: 0.6,
    ease: 'power2.out',
    onComplete: () => {
      el.style.zIndex = '';
    },
  });
}

const Galeria = () => {
  const [items, setItems] = useState(crearItems);
  const [epoch, setEpoch] = useState(0);
  const [perRow, setPerRow] = useState(getPerRow);
  const [favs, setFavs] = useState(leerFavs);
  const [lbIdx, setLbIdx] = useState(null);
  const [frames, setFrames] = useState({}); // src → { card, on }
  const [dims, setDims] = useState({ w: 0, h: 0 }); // tamaño en px de un tramo de cuerda

  const itemsRef = useRef(items);
  itemsRef.current = items;

  const galleryRef = useRef(null);
  const lbElRef = useRef(null);
  const lbFrameRef = useRef(null);
  const lbImgRef = useRef(null);
  const favBtnRef = useRef(null);
  const springs = useRef([]);
  const mouse = useRef({ x: 0, t: 0 });
  const lb = useRef({ open: false, busy: false, source: null, idx: 0, sx: 0, swiped: false });

  // Filas de la galería según las fotos por cable
  const rows = [];
  for (let i = 0; i < items.length; i += perRow) {
    rows.push(items.slice(i, i + perRow).map((it, k) => ({ it, idx: i + k, col: k })));
  }

  /* ===== Reconstruir cuando cambia el breakpoint (celular / resto) ===== */
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 600px)');
    const onChange = () => {
      if (!lb.current.open) setPerRow(mq.matches ? MOBILE_PER_ROW : DESKTOP_PER_ROW);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  /* ===== Leer el color de cada imagen para pintar su marco ===== */
  useEffect(() => {
    let vivo = true;
    [...new Set(PHOTOS.map((p) => p.src))].forEach((src) => {
      const img = new Image();
      img.onload = () => {
        try {
          const c = document.createElement('canvas');
          c.width = 24;
          c.height = 24;
          const ctx = c.getContext('2d', { willReadFrequently: true });
          ctx.drawImage(img, 0, 0, 24, 24);
          const m = marcoDesdePixeles(ctx.getImageData(0, 0, 24, 24).data);
          if (m && vivo) setFrames((prev) => ({ ...prev, [src]: m }));
        } catch {
          /* si no se puede leer, se queda el color de la paleta */
        }
      };
      img.src = src;
    });
    return () => {
      vivo = false;
    };
  }, []);

  /* ===== Guardar favoritas ===== */
  useEffect(() => {
    try {
      localStorage.setItem('gc-favs', JSON.stringify([...favs]));
    } catch {
      /* sin almacenamiento disponible */
    }
  }, [favs]);

  /* ===== Medir un tramo de cuerda (en px) para dibujarla sin deformarla ===== */
  useLayoutEffect(() => {
    const root = galleryRef.current;
    const measure = () => {
      const row = root.querySelector('.gc-row');
      if (!row) return;
      const w = Math.round(row.offsetWidth);
      const h = Math.round(row.offsetHeight);
      setDims((d) => (d.w === w && d.h === h ? d : { w, h }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    return () => ro.disconnect();
  }, [perRow, epoch]);

  /* ===== Posición inicial, cuerda que se dibuja con el scroll y física de péndulo ===== */
  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = galleryRef.current;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.gc-photo', root).forEach((el) => {
        gsap.set(el, { xPercent: -50, rotation: +el.dataset.rot, transformOrigin: '50% 0%' });
      });

      if (reduce) return;

      // Largo del recorrido (en la cuerda) hasta que pasa por la posición x de una foto
      const largoHastaX = (path, xObjetivo, invertida, largoTramo) => {
        let lo = 0;
        let hi = largoTramo;
        for (let i = 0; i < 24; i++) {
          const mid = (lo + hi) / 2;
          const px = path.getPointAtLength(mid).x;
          if (invertida ? px > xObjetivo : px < xObjetivo) lo = mid;
          else hi = mid;
        }
        return (lo + hi) / 2;
      };

      const filas = gsap.utils.toArray('.gc-row', root);
      filas.forEach((row, i) => {
        const fill = row.querySelector('.gc-cable-fill');
        if (!fill) return; // aún no se midió el ancho

        const cuerda = row.querySelectorAll('.gc-cable-edge, .gc-cable-fill, .gc-mask-path');
        const fotos = row.querySelectorAll('.gc-photo');
        const invertida = row.dataset.rev === '1';
        const ultima = i === filas.length - 1;

        // Largo total (con la vuelta en U) y largo del tramo recto
        const largo = fill.getTotalLength();
        const tmp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        tmp.setAttribute('d', row.dataset.main);
        const largoTramo = tmp.getTotalLength();

        gsap.set(cuerda, { strokeDasharray: largo + ' ' + (largo + 20), strokeDashoffset: largo });

        // Todo va atado al scroll: avanzar = la cuerda se dibuja y caen las fotos
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: row,
            // El primer tramo (los primeros 3 cuadros) ya está completo al entrar;
            // cada tramo siguiente se dibuja con el scroll, de 3 en 3.
            start: i === 0 ? 'top bottom' : 'top 72%',
            end:
              i === 0
                ? 'top 50%'
                : ultima
                ? () =>
                    Math.min(
                      ScrollTrigger.maxScroll(window),
                      row.getBoundingClientRect().bottom + window.scrollY - window.innerHeight * 0.62
                    )
                : 'bottom 62%',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        tl.to(cuerda, { strokeDashoffset: 0, duration: 1 }, 0);

        fotos.forEach((el) => {
          const x = (parseFloat(el.style.left) / 100) * dims.w;
          const s = largoHastaX(fill, x, invertida, largoTramo);
          // la foto cae justo cuando la cuerda llega hasta ella
          tl.fromTo(
            el,
            { autoAlpha: 0, y: -160 },
            { autoAlpha: 1, y: 0, duration: 0.16, ease: 'back.out(1.7)' },
            Math.max(0, s / largo - 0.02)
          );
        });
      });
    }, galleryRef);

    // Cada foto es un péndulo: brisa suave + viento del scroll + roce del cursor
    const photos = Array.from(root.querySelectorAll('.gc-photo'));
    springs.current = photos.map((el) => {
      const breeze = el.querySelector('.gc-breeze');
      gsap.set(breeze, { transformOrigin: '50% 0%' });
      return {
        el,
        set: gsap.quickSetter(breeze, 'rotation', 'deg'),
        a: 0,
        v: 0,
        ph: rand(0, Math.PI * 2),
        k: rand(0.7, 1.3),
      };
    });

    let lastY = window.scrollY;
    let sVel = 0;
    const tick = (time, delta) => {
      const dt = Math.min(delta / 1000, 0.033);
      if (dt <= 0) return;

      const sy = window.scrollY;
      sVel += ((sy - lastY) / dt - sVel) * 0.12;
      lastY = sy;
      const wind = clamp(sVel, -4000, 4000) * 0.045;

      for (const s of springs.current) {
        const force = Math.sin(time * 0.9 + s.ph) * 60 * s.k + wind * s.k;
        s.v += (-40 * s.a - 3.2 * s.v + force) * dt;
        s.a = clamp(s.a + s.v * dt, -28, 28);
        s.set(s.a);
      }
    };
    if (!reduce) gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      springs.current = [];
      ctx.revert();
    };
  }, [perRow, epoch, dims.w, dims.h]);

  /* ===== Rozar las fotos con el cursor ===== */
  const handleBrush = (e) => {
    if (e.pointerType !== 'mouse' || lb.current.open) return;
    const now = performance.now();
    const m = mouse.current;
    const dt = now - m.t;
    const vx = dt > 0 && dt < 100 ? (e.clientX - m.x) / dt : 0;
    m.x = e.clientX;
    m.t = now;
    if (Math.abs(vx) < 0.15) return;

    const R = 200;
    for (const s of springs.current) {
      if (s.el.style.visibility === 'hidden') continue;
      const r = s.el.getBoundingClientRect();
      const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
      if (d < R) {
        const f = 1 - d / R;
        s.v = clamp(s.v - vx * 35 * f, -160, 160);
      }
    }
  };

  /* ===== Visor ampliado ===== */
  const sizeLightbox = (ratio) => {
    const maxW = window.innerWidth * 0.88;
    const maxH = window.innerHeight * 0.7; // deja espacio para el texto
    const w = Math.min(maxW, maxH * ratio);
    lbFrameRef.current.style.width = w + 'px';
    lbImgRef.current.style.setProperty('--ar', ratio);
  };

  const openLightbox = (el) => {
    const st = lb.current;
    if (st.open || st.busy) return;
    st.busy = true;
    const idx = +el.dataset.idx;
    const it = itemsRef.current[idx];
    st.source = el;
    st.idx = idx;
    setLbIdx(idx);

    const lbEl = lbElRef.current;
    const lbFrame = lbFrameRef.current;
    const lbImg = lbImgRef.current;

    lbImg.src = it.src;
    sizeLightbox(it.ratio);
    lbEl.classList.add('gc-is-open');
    lbEl.setAttribute('aria-hidden', 'false');

    const from = el.querySelector('.gc-frame').getBoundingClientRect();
    const to = lbFrame.getBoundingClientRect();
    const dx = from.left + from.width / 2 - (to.left + to.width / 2);
    const dy = from.top + from.height / 2 - (to.top + to.height / 2);

    el.classList.add('gc-is-away');
    gsap.fromTo(lbEl, { opacity: 0 }, { opacity: 1, duration: 0.35 });
    gsap.fromTo(
      lbFrame,
      { x: dx, y: dy, scale: from.width / to.width, rotation: +el.dataset.rot },
      {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.7,
        ease: 'power3.out',
        onComplete: () => {
          st.open = true;
          st.busy = false;
        },
      }
    );
  };

  const closeLightbox = () => {
    const st = lb.current;
    if (!st.open || st.busy) return;
    st.busy = true;
    const el = st.source;
    const lbEl = lbElRef.current;
    const lbFrame = lbFrameRef.current;

    const to = el.querySelector('.gc-frame').getBoundingClientRect();
    const from = lbFrame.getBoundingClientRect();
    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);

    gsap.to(lbEl, { opacity: 0, duration: 0.4, delay: 0.15 });
    gsap.to(lbFrame, {
      x: dx,
      y: dy,
      scale: to.width / from.width,
      rotation: +el.dataset.rot,
      rotationX: 0,
      rotationY: 0,
      duration: 0.55,
      ease: 'power3.inOut',
      onComplete: () => {
        el.classList.remove('gc-is-away');
        lbEl.classList.remove('gc-is-open');
        lbEl.setAttribute('aria-hidden', 'true');
        gsap.set(lbFrame, { clearProps: 'all' });
        st.open = false;
        st.busy = false;
        st.source = null;
        setLbIdx(null);
      },
    });
  };

  // Pasar a la foto anterior / siguiente sin cerrar el visor
  const goTo = (delta) => {
    const st = lb.current;
    if (!st.open || st.busy) return;
    st.busy = true;

    const list = itemsRef.current;
    const n = (st.idx + delta + list.length) % list.length;
    const nextEl = galleryRef.current.querySelector(`.gc-photo[data-idx="${n}"]`);
    const dir = delta > 0 ? 1 : -1;
    const lbFrame = lbFrameRef.current;

    gsap.to(lbFrame, {
      x: -dir * 80,
      opacity: 0,
      rotation: -dir * 4,
      rotationX: 0,
      rotationY: 0,
      duration: 0.28,
      ease: 'power2.in',
      onComplete: () => {
        st.source.classList.remove('gc-is-away');
        nextEl.scrollIntoView({ block: 'center' });
        nextEl.classList.add('gc-is-away');
        st.source = nextEl;
        st.idx = n;
        setLbIdx(n);

        lbImgRef.current.src = list[n].src;
        sizeLightbox(list[n].ratio);

        gsap.fromTo(
          lbFrame,
          { x: dir * 80, opacity: 0, rotation: dir * 4 },
          {
            x: 0,
            opacity: 1,
            rotation: 0,
            duration: 0.45,
            ease: 'power3.out',
            onComplete: () => {
              st.busy = false;
            },
          }
        );
      },
    });
  };

  // Teclado y ajuste del visor al redimensionar la ventana
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') goTo(1);
      else if (e.key === 'ArrowLeft') goTo(-1);
    };
    const onResize = () => {
      const st = lb.current;
      if (st.open && st.source) sizeLightbox(itemsRef.current[st.idx].ratio);
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Inclinación 3D del visor siguiendo el mouse, con brillo */
  const handleTilt = (e) => {
    const st = lb.current;
    if (e.pointerType !== 'mouse' || !st.open || st.busy) return;
    const frame = lbFrameRef.current;
    const r = frame.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    frame.style.setProperty('--gc-gx', px * 100 + '%');
    frame.style.setProperty('--gc-gy', py * 100 + '%');
    gsap.to(frame, {
      rotationY: (px - 0.5) * 12,
      rotationX: -(py - 0.5) * 12,
      transformPerspective: 900,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const resetTilt = () => {
    if (!lb.current.open || lb.current.busy) return;
    gsap.to(lbFrameRef.current, { rotationX: 0, rotationY: 0, duration: 0.6, ease: 'power3.out' });
  };

  // Deslizar con el dedo para cambiar de foto
  const handleSwipeStart = (e) => {
    lb.current.sx = e.clientX;
    lb.current.swiped = false;
  };
  const handleSwipeEnd = (e) => {
    if (e.pointerType === 'mouse') return;
    const dx = e.clientX - lb.current.sx;
    if (Math.abs(dx) > 60) {
      lb.current.swiped = true;
      goTo(dx < 0 ? 1 : -1);
    }
  };

  const onOverlayClick = () => {
    if (lb.current.swiped) {
      lb.current.swiped = false;
      return;
    }
    closeLightbox();
  };

  /* ===== Favoritas ===== */
  const toggleFav = (id) => {
    setFavs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    if (favBtnRef.current) {
      gsap.fromTo(favBtnRef.current, { scale: 1.6 }, { scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
    }
  };

  /* ===== Mezclar: las fotos se reacomodan y vuelven a caer ===== */
  const mezclar = () => {
    if (lb.current.open) return;
    setItems(crearItems(true));
    setEpoch((e) => e + 1);
  };

  /* ===== Eventos de cada foto ===== */
  const handlePointerEnter = (e) => {
    if (e.pointerType === 'touch' && lb.current.open) return;
    swing(e.currentTarget, e.clientX);
  };

  const handlePointerUp = (e) => {
    if (e.pointerType !== 'touch') return;
    const el = e.currentTarget;
    const now = Date.now();
    // Doble toque en pantallas táctiles
    if (el._lastTap && now - el._lastTap < 350) {
      openLightbox(el);
      el._lastTap = 0;
    } else {
      el._lastTap = now;
    }
  };

  const lbItem = lbIdx !== null ? items[lbIdx] : null;
  const lbIsFav = lbItem ? favs.has(lbItem.id) : false;
  const lbFr = lbItem ? frames[lbItem.src] : null;

  return (
    <div className="gc-wrapper">

      {/* ===== HOJA cuadriculada que cubre toda la sección ===== */}
      <div className="gc-sheet" aria-hidden="true">
        <span className="gc-sheet-grid" />
        <span className="gc-tape gc-tape-l" />
        <span className="gc-tape gc-tape-r" />
      </div>

      {/* ===== DECORACIONES (manzanas, cubos y huellas) ===== */}
      <span className="gc-deco gc-d1"><img src="/manzana.svg" alt="" draggable="false" /></span>
      <span className="gc-deco gc-d2"><img src="/Cubo_Pintura_Escena_3.svg" alt="" draggable="false" /></span>
      <span className="gc-deco gc-d3"><img src="/huella.svg" alt="" draggable="false" /></span>
      <span className="gc-deco gc-d4"><img src="/manzana.svg" alt="" draggable="false" /></span>
      <span className="gc-deco gc-d5"><img src="/Cubo_Pintura_Escena_3.svg" alt="" draggable="false" /></span>
      <span className="gc-deco gc-d6"><img src="/huella.svg" alt="" draggable="false" /></span>
      <span className="gc-deco gc-d7"><img src="/huella.svg" alt="" draggable="false" /></span>
      <span className="gc-deco gc-d8"><img src="/manzana.svg" alt="" draggable="false" /></span>
      <span className="gc-deco gc-d9"><img src="/Cubo_Pintura_Escena_3.svg" alt="" draggable="false" /></span>
      <span className="gc-deco gc-d10"><img src="/huella.svg" alt="" draggable="false" /></span>

      {/* ===== PERSONAJES (se asoman por los bordes) ===== */}
      <img className="gc-char gc-char-ash" src="/ash.png" alt="Ash" draggable="false" />
      <img className="gc-char gc-char-charles" src="/charles.png" alt="Charles" draggable="false" />
      <img className="gc-char gc-char-kristofer" src="/kristofer.png" alt="Kristofer" draggable="false" />

      <div className="gc-tools">
        <p className="gc-hint">Doble clic en una foto para ampliarla. ♥ para guardar tus favoritas.</p>
        <button className="gc-btn" type="button" onClick={mezclar}>
          Mezclar fotos
        </button>
        <span className="gc-fav-count" aria-live="polite">
          ♥ {favs.size}
        </span>
      </div>

      <div className="gc-gallery" aria-label="Galería de fotos" ref={galleryRef} onPointerMove={handleBrush}>
        {rows.map((row, r) => {
          // La cuerda es una sola: filas pares van →, impares van ←, y se unen con una vuelta en U
          const rev = r % 2 === 1;
          const ultima = r === rows.length - 1;
          const px = (p) => ((p / 100) * dims.w).toFixed(1);
          const py = (p) => ((p / 100) * dims.h).toFixed(1);
          const sx = rev ? X1 : X0;
          const ex = rev ? X0 : X1;
          const salida = rev ? X0 - TURN : X1 + TURN;
          const mainD = `M${px(sx)} ${py(A)} Q${px(50)} ${py(C)} ${px(ex)} ${py(A)}`;
          const turnD = ultima
            ? ''
            : ` C${px(salida)} ${py(A)} ${px(salida)} ${(dims.h + (A / 100) * dims.h).toFixed(1)} ${px(ex)} ${(
                dims.h +
                (A / 100) * dims.h
              ).toFixed(1)}`;
          const d = mainD + turnD;
          const maskId = `gcm-${perRow}-${epoch}-${r}`;

          return (
          <section
            className="gc-row"
            key={`${perRow}-${epoch}-${r}`}
            data-rev={rev ? '1' : '0'}
            data-main={mainD}
          >
            {dims.w > 0 && (
              <svg className="gc-cable" viewBox={`0 0 ${dims.w} ${dims.h}`} aria-hidden="true">
                <defs>
                  <mask
                    id={maskId}
                    maskUnits="userSpaceOnUse"
                    x="-60"
                    y="-60"
                    width={dims.w + 120}
                    height={dims.h * 1.6 + 120}
                  >
                    <path className="gc-mask-path" d={d} />
                  </mask>
                </defs>
                <path className="gc-cable-edge" d={d} />
                <path className="gc-cable-fill" d={d} />
                <path className="gc-cable-twist" d={d} mask={`url(#${maskId})`} />
              </svg>
            )}
            {r === 0 && <span className="gc-nail" style={{ left: X0 + '%', top: A + '%' }} />}
            {ultima && <span className="gc-nail" style={{ left: ex + '%', top: A + '%' }} />}

            {row.map(({ it, idx, col }) => {
              const slot = (PAD_R - PAD_L) / perRow;
              const c = rev ? perRow - 1 - col : col; // en filas ← las fotos siguen el sentido de la cuerda
              let x = PAD_L + (c + 0.5) * slot + it.jit * slot;
              x = Math.min(PAD_R, Math.max(PAD_L, x));

              const fr = frames[it.src];

              return (
                <figure
                  className="gc-photo"
                  key={it.id}
                  tabIndex={0}
                  data-rot={it.rot}
                  data-idx={idx}
                  style={{
                    left: x + '%',
                    top: cableY(x) + '%',
                    width: `calc(var(--gc-u) * ${it.size})`,
                    ...(fr ? { '--gc-card': fr.card } : null),
                  }}
                  onPointerEnter={handlePointerEnter}
                  onPointerLeave={(e) => settle(e.currentTarget)}
                  onFocus={(e) => swing(e.currentTarget, 0)}
                  onBlur={(e) => settle(e.currentTarget)}
                  onDoubleClick={(e) => openLightbox(e.currentTarget)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') openLightbox(e.currentTarget);
                  }}
                  onPointerUp={handlePointerUp}
                >
                  <div className="gc-breeze">
                    <span className="gc-pin" />
                    <div className="gc-frame">
                      <img
                        src={it.src}
                        alt={it.texto}
                        draggable={false}
                        style={{ '--gc-ar': it.ratio }}
                      />
                      {favs.has(it.id) && (
                        <span className="gc-fav" aria-label="Favorita">
                          ♥
                        </span>
                      )}
                    </div>
                  </div>
                </figure>
              );
            })}
          </section>
          );
        })}
      </div>

      {/* Visor de foto ampliada */}
      <div
        className="gc-lightbox"
        aria-hidden="true"
        role="dialog"
        aria-label="Foto ampliada"
        ref={lbElRef}
        onClick={onOverlayClick}
        style={lbFr ? { '--gc-card': lbFr.card, '--gc-on-card': lbFr.on } : undefined}
      >
        <div
          className="gc-lb-frame"
          ref={lbFrameRef}
          onPointerMove={handleTilt}
          onPointerLeave={resetTilt}
          onPointerDown={handleSwipeStart}
          onPointerUp={handleSwipeEnd}
        >
          <img alt="" ref={lbImgRef} />
          <p className="gc-lb-text">{lbItem ? lbItem.texto : ''}</p>
          <button
            className="gc-lb-fav"
            type="button"
            ref={favBtnRef}
            aria-pressed={lbIsFav}
            aria-label={lbIsFav ? 'Quitar de favoritas' : 'Guardar en favoritas'}
            onClick={(e) => {
              e.stopPropagation();
              if (lbItem) toggleFav(lbItem.id);
            }}
          >
            ♥
          </button>
          <button
            className="gc-lb-close"
            type="button"
            aria-label="Cerrar"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
          >
            &times;
          </button>
        </div>

        <button
          className="gc-lb-nav gc-lb-prev"
          type="button"
          aria-label="Foto anterior"
          onClick={(e) => {
            e.stopPropagation();
            goTo(-1);
          }}
        >
          ‹
        </button>
        <button
          className="gc-lb-nav gc-lb-next"
          type="button"
          aria-label="Foto siguiente"
          onClick={(e) => {
            e.stopPropagation();
            goTo(1);
          }}
        >
          ›
        </button>
        <p className="gc-lb-count">{lbItem ? `${lbIdx + 1} / ${items.length}` : ''}</p>
      </div>
    </div>
  );
};

export default Galeria;