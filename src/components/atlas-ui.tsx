"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  archiveItems,
  places,
  recordings,
  stories,
  type StoryKey,
} from "@/lib/atlas";

export function MountainMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="36"
      height="27"
      viewBox="0 0 36 27"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 25 13 3l7 13 5-9 10 18H1Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m10 25 7-12 7 12M8 12l5 2 4-3M22 14l3 2 3-2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function Compass({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`compass ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="37" stroke="currentColor" strokeWidth=".5" />
      <circle
        cx="50"
        cy="50"
        r="30"
        stroke="currentColor"
        strokeWidth=".5"
        strokeDasharray="1 5"
      />
      <path d="M50 18 57 50 50 82 43 50Z" stroke="currentColor" />
      <path d="m50 18 7 32h-7Z" fill="currentColor" />
      <path d="M18 50h64" stroke="currentColor" strokeWidth=".5" />
      <text x="50" y="10" textAnchor="middle" fill="currentColor" fontSize="8">
        N
      </text>
      <text x="50" y="97" textAnchor="middle" fill="currentColor" fontSize="8">
        S
      </text>
      <text x="3" y="53" fill="currentColor" fontSize="8">
        W
      </text>
      <text x="92" y="53" fill="currentColor" fontSize="8">
        E
      </text>
    </svg>
  );
}

export function Contours({ className = "" }: { className?: string }) {
  const rings = Array.from({ length: 39 }, (_, ring) => {
    const points = Array.from({ length: 100 }, (_, point) => {
      const angle = (point / 100) * Math.PI * 2;
      const irregularity =
        1 + 0.13 * Math.sin(angle * 3) + 0.06 * Math.cos(angle * 5 + 1.2);
      const x = (30 + ring * 18) * Math.cos(angle) * irregularity;
      const y = (12 + ring * 10) * Math.sin(angle) * irregularity;
      return `${point === 0 ? "M" : "L"}${(500 + x * 0.82 - y * 0.57).toFixed(1)},${(350 + x * 0.57 + y * 0.82).toFixed(1)}`;
    }).join(" ");
    return (
      <path
        key={ring}
        d={`${points}Z`}
        strokeWidth={ring % 5 === 0 ? "1.2" : ".6"}
      />
    );
  });
  return (
    <svg
      className={`contours ${className}`}
      viewBox="0 0 1000 700"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor">{rings}</g>
    </svg>
  );
}

export function Navigation() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Місця", "places"],
    ["Маршрути", "route"],
    ["Історії", "stories"],
    ["Голоси", "voices"],
    ["Архів", "archive"],
  ];
  return (
    <header className="navigation">
      <a className="brand" href="#top" aria-label="КРАЙ — на початок">
        <MountainMark />
        <span>КРАЙ</span>
        <sup>®</sup>
      </a>
      <nav className="desktop-nav" aria-label="Головна навігація">
        {links.map(([name, id]) => (
          <a key={id} href={`#${id}`}>
            {name}
          </a>
        ))}
      </nav>
      <div className="nav-right">
        <span className="language">
          UA <span>↗</span>
        </span>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Закрити меню" : "Відкрити меню"}
          onClick={() => setOpen(!open)}
        >
          {open ? "Закрити −" : "Меню +"}
        </button>
        <span className="nav-index">АТЛАС / 001</span>
      </div>
      <nav
        id="mobile-nav"
        aria-label="Мобільна навігація"
        hidden={!open}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
      >
        {links.map(([name, id]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {name}
            <span>↗</span>
          </a>
        ))}
      </nav>
    </header>
  );
}

export function JourneyEffects() {
  const progress = useRef<HTMLDivElement>(null);
  const coordinate = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const heroSection = document.querySelector<HTMLElement>(".hero");
    const routePath = document.querySelector<SVGPathElement>(".elevation-line");
    const routeDot =
      document.querySelector<SVGCircleElement>(".route-traveler");
    const routeLength = routePath?.getTotalLength() ?? 0;
    const onPointerMove = (event: PointerEvent) => {
      if (media.matches || event.pointerType !== "mouse" || !heroSection)
        return;
      heroSection.style.setProperty(
        "--pointer-x",
        `${((event.clientX / innerWidth - 0.5) * 12).toFixed(1)}px`,
      );
      heroSection.style.setProperty(
        "--pointer-y",
        `${((event.clientY / innerHeight - 0.5) * 8).toFixed(1)}px`,
      );
    };
    heroSection?.addEventListener("pointermove", onPointerMove, {
      passive: true,
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));
    let frame = 0;
    const update = () => {
      frame = 0;
      const ratio = Math.min(
        1,
        scrollY /
          Math.max(1, document.documentElement.scrollHeight - innerHeight),
      );
      if (progress.current)
        progress.current.style.transform = `scaleX(${ratio})`;
      if (coordinate.current)
        coordinate.current.textContent = `${(48.15 - ratio * 0.1).toFixed(4)}° N / ${(24.53 + ratio * 0.09).toFixed(4)}° E`;
      if (!media.matches) {
        const hero = document.querySelector<HTMLElement>(".hero-image");
        if (hero && scrollY < innerHeight * 1.4)
          hero.style.transform = `translate3d(var(--pointer-x, 0px),calc(${scrollY * 0.16}px + var(--pointer-y, 0px)),0) scale(1.04)`;
        const feature = document.querySelector<HTMLElement>(".feature-photo");
        if (feature) {
          const p = Math.max(
            0,
            Math.min(
              1,
              (innerHeight - feature.getBoundingClientRect().top) / innerHeight,
            ),
          );
          feature.style.clipPath = `inset(0 ${(1 - p) * 9}%)`;
        }
        if (routePath && routeDot) {
          const rect = routePath.getBoundingClientRect();
          const traveled = Math.max(
            0,
            Math.min(1, (innerHeight * 0.85 - rect.top) / (innerHeight * 0.6)),
          );
          const point = routePath.getPointAtLength(routeLength * traveled);
          routeDot.setAttribute("cx", point.x.toFixed(1));
          routeDot.setAttribute("cy", point.y.toFixed(1));
        }
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      observer.disconnect();
      removeEventListener("scroll", onScroll);
      heroSection?.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <>
      <div className="page-progress" ref={progress} />
      <div className="journey-coordinate">
        <span className="coordinate-dot" />
        <span ref={coordinate}>48.1500° N / 24.5300° E</span>
      </div>
    </>
  );
}

export function TopographicMap() {
  const [selected, setSelected] = useState(places[0]);
  const [filter, setFilter] = useState("Усі місця");
  const categories = ["Усі місця", "Вершини", "Вода", "Поселення"];
  const visible = places.filter(
    (p) =>
      filter === "Усі місця" ||
      (filter === "Вершини" && p.symbol === "▲") ||
      (filter === "Вода" && p.symbol === "≈") ||
      (filter === "Поселення" && ["●", "✦"].includes(p.symbol)),
  );
  function changeFilter(value: string) {
    setFilter(value);
    const first = places.find(
      (p) =>
        value === "Усі місця" ||
        (value === "Вершини" && p.symbol === "▲") ||
        (value === "Вода" && p.symbol === "≈") ||
        (value === "Поселення" && ["●", "✦"].includes(p.symbol)),
    );
    if (first) setSelected(first);
  }
  return (
    <section id="map" className="map-section">
      <div className="map-heading">
        <span className="eyebrow">03 / КАРТОГРАФІЯ</span>
        <h2>
          Обери свою
          <br />
          <em>точку тиші.</em>
        </h2>
        <p>
          У кожної точки на карті —<br />
          своя висота, свій голос, своя історія.
        </p>
        <div className="map-filters" aria-label="Категорії місць">
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={filter === c}
              onClick={() => changeFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="map-canvas">
        <Contours />
        <span className="map-region">УКРАЇНСЬКІ КАРПАТИ</span>
        <div className="map-river river-one" />
        <div className="map-river river-two" />
        <span className="map-country">ЗАКАРПАТТЯ</span>
        <span className="map-country country-two">ІВАНО-ФРАНКІВЩИНА</span>
        {visible.map((p) => (
          <button
            key={p.name}
            className={`map-pin ${selected.name === p.name ? "selected" : ""}`}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            aria-label={`${p.name} — ${p.type}`}
            aria-pressed={selected.name === p.name}
            onClick={() => setSelected(p)}
            onMouseEnter={() => setSelected(p)}
            onFocus={() => setSelected(p)}
          >
            <span className="pin-symbol">{p.symbol}</span>
            <span>{p.name}</span>
          </button>
        ))}
        <Compass />
        <div className="map-scale">
          <span>0</span>
          <i />
          <span>20 КМ</span>
        </div>
      </div>
      <aside className="map-preview" aria-live="polite">
        <img
          src={`/images/${selected.image}.webp`}
          alt={selected.note}
          width="440"
          height="280"
        />
        <div className="map-preview-copy">
          <div className="eyebrow">
            {selected.type} / {selected.altitude}
          </div>
          <h3>{selected.name}</h3>
          <p>{selected.note}</p>
          <span className="mono">{selected.coords}</span>
        </div>
      </aside>
      <div className="map-legend mono">
        <span>▲ ВЕРШИНА</span>
        <span>⌂ ПРИХИСТОК</span>
        <span>≈ ВОДА</span>
        <span>● ПОСЕЛЕННЯ</span>
        <span>✦ ІСТОРІЯ</span>
        <span className="map-disclaimer">СХЕМАТИЧНИЙ АТЛАС</span>
      </div>
    </section>
  );
}

export function FieldRecordings() {
  const [active, setActive] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (active === null) return;
    const timer = setInterval(
      () =>
        setElapsed((t) => {
          if (t + 1 >= recordings[active].length) {
            return 0;
          }
          return t + 1;
        }),
      1000,
    );
    return () => clearInterval(timer);
  }, [active]);
  return (
    <section id="voices" className="voices-section section-pad">
      <div className="section-label">
        <span>06 / ЗВУКОВИЙ ЛАНДШАФТ</span>
        <span>ПРИСЛУХАЙСЯ. ТИ ВЖЕ ТУТ.</span>
      </div>
      <div className="voices-title">
        <h2>
          ГОЛОСИ
          <br />
          <span>КАРПАТ</span>
        </h2>
        <div className="audio-note">
          <span className="sound-orbit">◉</span>
          <p>
            Деякі місця неможливо
            <br />
            показати. Тільки почути.
          </p>
          <span className="mono">
            ПОЛЬОВИЙ АУДІОАРХІВ
            <br />
            05 ЗАПИСІВ / 18 ХВ 12 С
          </span>
        </div>
      </div>
      <div className="recording-list">
        {recordings.map((recording, i) => (
          <button
            key={recording.name}
            className={`recording ${active === i ? "playing" : ""}`}
            aria-label={`${active === i ? "Пауза" : "Відтворити"}: ${recording.name}`}
            aria-pressed={active === i}
            onClick={() => {
              setActive(active === i ? null : i);
              setElapsed(0);
            }}
          >
            <span className="recording-index mono">0{i + 1}</span>
            <span className="play-symbol">{active === i ? "Ⅱ" : "▷"}</span>
            <span className="recording-name">
              {recording.name}
              <small>
                {recording.location} / {recording.type}
              </small>
            </span>
            <span className="waveform" aria-hidden="true">
              {Array.from({ length: 65 }, (_, j) => (
                <i
                  key={j}
                  style={
                    {
                      height: `${Math.round(8 + Math.abs(Math.sin(j * 1.7 + i) * Math.cos(j * 0.23)) * 34)}px`,
                      "--delay": `${(j * -0.073).toFixed(3)}s`,
                    } as CSSProperties
                  }
                />
              ))}
            </span>
            <span className="recording-duration mono">
              {active === i
                ? `${Math.floor(elapsed / 60)
                    .toString()
                    .padStart(
                      2,
                      "0",
                    )}:${(elapsed % 60).toString().padStart(2, "0")}`
                : recording.duration}
            </span>
            <span className="recording-arrow">↗</span>
          </button>
        ))}
      </div>
      <p className="audio-disclaimer mono">
        ВІЗУАЛЬНА ДЕМОНСТРАЦІЯ АУДІОАРХІВУ · БЕЗ ЗВУКОВОЇ ДОРІЖКИ
      </p>
    </section>
  );
}

export function StoryButton({
  story,
  children,
  className = "text-link",
}: {
  story: StoryKey;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const data = stories[story];
  return (
    <>
      <button className={className} onClick={() => ref.current?.showModal()}>
        {children}
        <span aria-hidden="true">↗</span>
      </button>
      <dialog
        ref={ref}
        className="story-dialog"
        aria-labelledby={`story-${story}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) ref.current?.close();
        }}
      >
        <button
          className="dialog-close"
          aria-label="Закрити історію"
          onClick={() => ref.current?.close()}
        >
          ЗАКРИТИ ×
        </button>
        <span className="eyebrow">{data.eyebrow}</span>
        <h2 id={`story-${story}`}>{data.title}</h2>
        <p className="story-subtitle">{data.subtitle}</p>
        {data.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <span className="mono story-end">КРАЙ / ХУДОЖНІ ПОЛЬОВІ НОТАТКИ</span>
      </dialog>
    </>
  );
}

export function Archive() {
  const [category, setCategory] = useState("Усе");
  const categories = [
    "Усе",
    "Місця",
    "Легенди",
    "Маршрути",
    "Звуки",
    "Архітектура",
  ];
  const filtered = archiveItems.filter(
    (item) => category === "Усе" || item.category === category,
  );
  return (
    <section id="archive" className="archive-section section-pad">
      <div className="section-label">
        <span>10 / ЗІБРАНЕ ДОКУПИ</span>
        <span>ПАМ’ЯТЬ МІСЦЯ</span>
      </div>
      <div className="archive-heading">
        <h2>
          ЖИВИЙ АРХІВ
          <span>({filtered.length.toString().padStart(2, "0")})</span>
        </h2>
        <p>
          Зберігаємо не лише місця.
          <br />
          Зберігаємо відчуття.
        </p>
      </div>
      <div className="archive-filters" aria-label="Категорії архіву">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
          >
            {c}
          </button>
        ))}
      </div>
      <div
        className={`archive-sheet ${category !== "Усе" ? "is-filtered" : ""}`}
        aria-live="polite"
      >
        {filtered.map((item, i) => (
          <figure key={item.id} className={`archive-item archive-item-${i}`}>
            <div className="archive-image">
              <img
                src={`/images/${item.image}.webp`}
                alt={item.name}
                width="420"
                height="450"
                loading="lazy"
              />
              <span className="archive-photo-id">КРАЙ / {item.id}</span>
            </div>
            <figcaption>
              <span className="mono">{item.id}</span>
              <span>
                {item.name}
                <small>{item.caption}</small>
              </span>
              <span>↗</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function RouteVisualization() {
  const [step, setStep] = useState(2);
  const points = [
    {
      name: "Дземброня",
      height: "898 м",
      x: 75,
      y: 244,
      km: "0 км",
      note: "Початок шляху. Останні хати поступаються лісу.",
    },
    {
      name: "Вухатий Камінь",
      height: "1 864 м",
      x: 500,
      y: 88,
      km: "6,8 км",
      note: "Кам’яні форми над полониною. Звідси відкривається хребет.",
    },
    {
      name: "Піп Іван",
      height: "2 028 м",
      x: 875,
      y: 42,
      km: "9,2 км",
      note: "Вершина і стара обсерваторія. Далі — повернення тією ж стежкою.",
    },
  ];
  return (
    <section id="route" className="route-section section-pad">
      <div className="section-label">
        <span>08 / ОДНА СТЕЖКА</span>
        <span>МАРШРУТ / ЧР–018</span>
      </div>
      <div className="route-title">
        <h2>
          КРОК ЗА
          <br />
          <em>КРОКОМ.</em>
        </h2>
        <div>
          <p>
            Від першої стежки —<br />
            до останнього дерева.
            <br />І трохи вище.
          </p>
          <a className="text-link" href="#map">
            Маршрут на схемі <span>↗</span>
          </a>
        </div>
      </div>
      <div className="route-stats">
        <span>
          <strong>18,4</strong> КМ / ТУДИ Й НАЗАД
        </span>
        <span>
          <strong>7</strong> ГОД
        </span>
        <span>
          <strong>+1 240</strong> М НАБОРУ
        </span>
        <span>
          <strong>2 028</strong> М НАЙВИЩЕ
        </span>
      </div>
      <div className="elevation-chart">
        <svg
          viewBox="0 0 1000 330"
          role="img"
          aria-label="Профіль підйому від Дземброні через Вухатий Камінь до Піп Івана"
        >
          <defs>
            <pattern
              id="elevation-hatch"
              width="7"
              height="7"
              patternUnits="userSpaceOnUse"
            >
              <path d="M0 7 7 0" stroke="currentColor" strokeWidth=".5" />
            </pattern>
          </defs>
          <g stroke="currentColor" strokeOpacity=".15" strokeDasharray="3 5">
            {[60, 130, 200, 270].map((y) => (
              <path key={y} d={`M0 ${y}H1000`} />
            ))}
          </g>
          <path
            d="M0 277 75 244 112 251 166 207 200 220 247 173 280 183 350 134 391 144 446 95 500 88 544 112 590 80 625 105 690 73 728 80 801 52 830 62 875 42 925 71 1000 63V310H0Z"
            fill="url(#elevation-hatch)"
            opacity=".32"
          />
          <path
            className="elevation-line"
            d="M0 277 75 244 112 251 166 207 200 220 247 173 280 183 350 134 391 144 446 95 500 88 544 112 590 80 625 105 690 73 728 80 801 52 830 62 875 42 925 71 1000 63"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          {points.map((p, i) => (
            <g key={p.name}>
              <path
                d={`M${p.x} ${p.y}V310`}
                stroke="currentColor"
                strokeDasharray="2 5"
                opacity=".4"
              />
              <circle
                cx={p.x}
                cy={p.y}
                r={step === i ? 8 : 4}
                fill={step === i ? "#a9422c" : "currentColor"}
              />
              <text
                x={p.x}
                y="329"
                textAnchor="middle"
                fill="currentColor"
                fontSize="11"
              >
                {p.km}
              </text>
            </g>
          ))}
          <circle
            className="route-traveler"
            cx="0"
            cy="277"
            r="5"
            fill="#e9e7dc"
            stroke="#a9422c"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="route-stops">
        {points.map((p, i) => (
          <button
            key={p.name}
            onClick={() => setStep(i)}
            aria-pressed={step === i}
          >
            <span className="mono">
              0{i + 1} / {p.height}
            </span>
            <span>
              {p.name}
              <b>{step === i ? "●" : "↗"}</b>
            </span>
          </button>
        ))}
      </div>
      <p className="route-note" aria-live="polite">
        {points[step].note}
      </p>
      <span className="route-disclaimer mono">
        ІЛЮСТРАТИВНИЙ МАРШРУТ · НЕ НАВІГАЦІЙНИЙ МАТЕРІАЛ
      </span>
    </section>
  );
}
