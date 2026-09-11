import {
  Archive,
  Compass,
  Contours,
  FieldRecordings,
  JourneyEffects,
  MountainMark,
  Navigation,
  RouteVisualization,
  StoryButton,
  TopographicMap,
} from "@/components/atlas-ui";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#intro">
        Перейти до вмісту
      </a>
      <JourneyEffects />
      <main>
        <section id="top" className="hero">
          <img
            className="hero-image"
            src="/images/hero.webp"
            alt="Туман між хребтами українських Карпат на світанку"
            width="1672"
            height="941"
            fetchPriority="high"
          />
          <div className="hero-shade" />
          <Navigation />
          <div className="hero-topline mono">
            <span>
              ЦИФРОВИЙ АТЛАС
              <br />
              УКРАЇНСЬКИХ КАРПАТ
            </span>
            <span>
              48°09′ N / 24°32′ E<br />
              <span className="live-dot" /> ТАМ, ДЕ ПОЧИНАЄТЬСЯ ТИША
            </span>
          </div>
          <div className="hero-masthead">
            <h1>КРАЙ</h1>
            <span className="hero-star" aria-hidden="true">
              ✳
            </span>
          </div>
          <span className="hero-side mono">НЕВІДОМИЙ. БЛИЗЬКИЙ. ТВІЙ.</span>
          <div className="hero-bottom">
            <div>
              <span className="eyebrow">ЗА МЕЖАМИ ЗНАЙОМОГО</span>
              <p>
                Місця, до яких не ведуть
                <br />
                <em>туристичні автобуси.</em>
              </p>
            </div>
            <a className="explore-link" href="#intro">
              <span>
                ПОЧАТИ
                <br />
                ДОСЛІДЖЕННЯ
              </span>
              <span className="circle-arrow">↓</span>
            </a>
            <div className="hero-field mono">
              <span>ПОЛЬОВІ НОТАТКИ / 001</span>
              <span>ЧОРНОГОРА, 05:42</span>
              <span>+08°C &nbsp; ВІТЕР ПН–ЗХ</span>
            </div>
          </div>
          <div className="hero-footer mono">
            <span>ГОРИ ЗАЛИШАЮТЬСЯ. МИ ВЧИМОСЯ БАЧИТИ.</span>
            <span>ГОРТАЙ ПОВІЛЬНО ↓</span>
          </div>
        </section>

        <section id="intro" className="intro-section section-pad">
          <div className="section-label">
            <span>01 / ЗНАЙОМСТВО З КРАЄМ</span>
            <span>НЕ ВСЕ ПОЗНАЧЕНО НА КАРТІ</span>
          </div>
          <div className="intro-heading" data-reveal>
            <h2>
              НЕ ТУРИЗМ.
              <br />
              <span>ДОСЛІДЖЕННЯ.</span>
            </h2>
            <div className="intro-stamp">
              <MountainMark />
              <span>
                КРАЙ ЗНАЙОМИЙ
                <br />
                КРАЙ НЕВІДОМИЙ
              </span>
              <b>48° N</b>
            </div>
          </div>
          <div className="intro-layout">
            <figure className="intro-main-image" data-reveal>
              <img
                src="/images/hut.webp"
                alt="Стара дерев’яна хата серед трав полонини"
                width="1024"
                height="1536"
                loading="lazy"
              />
              <figcaption className="mono">
                <span>ФОТО / 028</span>
                <span>ПРИХИСТОК НА СХИЛІ</span>
              </figcaption>
              <span className="photo-cross">+</span>
            </figure>
            <div className="intro-copy" data-reveal>
              <span className="eyebrow">КАРПАТИ — ЦЕ БІЛЬШЕ, НІЖ ГОРИ.</span>
              <p className="serif-lead">
                Це стежки, які пам’ятають.
                <br />
                Люди, які бережуть.
                <br />І тиша, яка говорить.
              </p>
              <p>
                Ми збираємо Карпати по крихтах: у старих хатах, забутих назвах,
                голосах полонин і лініях хребтів. Щоб побачити ближче те, що
                завжди було поруч.
              </p>
              <p>
                КРАЙ — відкритий атлас місць та історій. Без поспіху. З повагою
                до землі.
              </p>
              <a className="text-link" href="#map">
                Знайти своє місце <span>↗</span>
              </a>
              <div className="intro-margin-note">
                <Contours />
                <span>
                  залишай тільки
                  <br />
                  <em>сліди на стежці</em>
                  <svg viewBox="0 0 150 65" fill="none" aria-hidden="true">
                    <path
                      d="M5 10c90-25 25 72 131 29m-15-8 16 8-12 11"
                      stroke="currentColor"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <figure className="intro-small-image" data-reveal>
              <img
                src="/images/forest.webp"
                alt="Смерековий ліс і гірський потік"
                width="1024"
                height="1536"
                loading="lazy"
              />
              <figcaption className="mono">ҐОРҐАНИ / РАНКОВА ТИША</figcaption>
            </figure>
          </div>
        </section>

        <section id="featured" className="feature-section">
          <div className="feature-title section-pad">
            <div className="section-label">
              <span>02 / ВИЩЕ ЗА ХМАРИ</span>
              <span>ЧОРНОГІРСЬКИЙ ХРЕБЕТ</span>
            </div>
            <div className="feature-heading" data-reveal>
              <h2>
                ПІП ІВАН<span>ЧОРНОГІРСЬКИЙ</span>
              </h2>
              <div className="altitude">
                2028<span>МЕТРІВ НАД БУДЕННІСТЮ</span>
              </div>
            </div>
          </div>
          <figure className="feature-photo">
            <img
              src="/images/observatory.webp"
              alt="Кам’яна обсерваторія на вершині Піп Іван над шарами гір"
              width="1536"
              height="1024"
              loading="lazy"
            />
            <div className="feature-coordinates mono">
              48°02′45″ N<br />
              24°37′38″ E
            </div>
            <div className="observatory-note">
              <span className="annotation-line" />
              <span>
                «БІЛИЙ СЛОН»<small>ОБСЕРВАТОРІЯ / 1938</small>
              </span>
            </div>
            <figcaption>
              <span className="mono">ОБ’ЄКТ / 014</span>
              <p>
                Камінь. Вітер.
                <br />
                <em>І небо зовсім поруч.</em>
              </p>
              <a
                className="circle-arrow"
                href="#route"
                aria-label="Перейти до маршруту на Піп Іван"
              >
                ↗
              </a>
            </figcaption>
          </figure>
          <div className="feature-bottom section-pad">
            <span className="mono">
              ▲ ЧОРНОГОРА
              <br />
              ІВАНО-ФРАНКІВЩИНА
            </span>
            <p>
              Стара обсерваторія тримає варту на вершині.
              <br />
              Тут час вимірюється хмарами, а не годинами.
            </p>
            <a className="text-link" href="#route">
              Пройти цей шлях <span>↗</span>
            </a>
          </div>
        </section>

        <TopographicMap />

        <section id="places" className="places-section section-pad">
          <div className="section-label">
            <span>04 / ГЕОГРАФІЯ ВІДЧУТТІВ</span>
            <a href="#archive">УСІ МІСЦЯ ↗</a>
          </div>
          <div className="places-title">
            <h2>
              У КОЖНОГО МІСЦЯ —<br />
              <em>своя історія.</em>
            </h2>
            <span className="mono">
              НЕ ОБИРАЙ НАПРЯМОК.
              <br />
              ОБИРАЙ ВІДЧУТТЯ.
            </span>
          </div>
          <div className="places-editorial">
            <article className="place-story dzembronia" data-reveal>
              <figure>
                <img
                  src="/images/hut.webp"
                  alt="Дерев’яний прихисток у горах біля Дземброні"
                  width="1024"
                  height="1536"
                  loading="lazy"
                />
                <span className="place-photo-label mono">
                  48°06′ N / 24°43′ E
                </span>
              </figure>
              <div className="place-caption">
                <span className="mono">028 / СЕЛО</span>
                <StoryButton story="dzembronia" className="place-story-link">
                  ДЗЕМБРОНЯ
                </StoryButton>
                <p>Дорога повільно стає стежкою.</p>
              </div>
            </article>
            <article className="place-story borzhava" data-reveal>
              <span className="place-preface">
                Далі від шуму.
                <br />
                <em>Ближче до себе.</em>
              </span>
              <figure>
                <img
                  src="/images/meadow.webp"
                  alt="Широкі трав’яні хребти Боржави"
                  width="1536"
                  height="864"
                  loading="lazy"
                />
                <span className="place-photo-label mono">
                  48°37′ N / 23°16′ E
                </span>
              </figure>
              <div className="place-caption">
                <span className="mono">031 / ХРЕБЕТ</span>
                <StoryButton story="borzhava" className="place-story-link">
                  БОРЖАВА
                </StoryButton>
                <p>Гори, намальовані одним рухом.</p>
              </div>
            </article>
            <article className="place-story kryvorivnia" data-reveal>
              <figure>
                <img
                  src="/images/culture.webp"
                  alt="Руки гуцульського майстра за роботою з деревом"
                  width="1536"
                  height="1024"
                  loading="lazy"
                />
                <span className="place-photo-label mono">
                  48°10′ N / 24°53′ E
                </span>
              </figure>
              <div className="place-caption">
                <span className="mono">036 / КУЛЬТУРА</span>
                <StoryButton story="kryvorivnia" className="place-story-link">
                  КРИВОРІВНЯ
                </StoryButton>
                <p>Місце, де пам’ять має голос.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="polonyna-section">
          <div className="polonyna-top section-pad">
            <div className="section-label">
              <span>05 / ВІДКРИТИЙ ПРОСТІР</span>
              <span>ВДИХ. ВИДИХ.</span>
            </div>
            <div className="polonyna-heading" data-reveal>
              <h2>ПОЛОНИНА</h2>
              <p>Там, де закінчується ліс.</p>
            </div>
          </div>
          <figure className="polonyna-photo">
            <img
              src="/images/meadow.webp"
              alt="Стежка крізь полонину до зеленого гірського хребта"
              width="1672"
              height="941"
              loading="lazy"
            />
            <div className="polonyna-observations mono">
              <span>
                +14°C<small>ТЕМПЕРАТУРА</small>
              </span>
              <span>
                1 640 М<small>ВИСОТА</small>
              </span>
              <span>
                18 КМ/ГОД<small>ВІТЕР / ЗАХІДНИЙ</small>
              </span>
              <span>
                48.1712° N<small>ПОЛЬОВЕ СПОСТЕРЕЖЕННЯ</small>
              </span>
            </div>
            <div className="polonyna-caption">
              <span className="mono">ТИША ТЕЖ МАЄ СВІЙ МАСШТАБ.</span>
              <Compass />
            </div>
          </figure>
        </section>

        <FieldRecordings />

        <section id="stories" className="folklore-section section-pad">
          <div className="section-label">
            <span>07 / ПО ТОЙ БІК ВИДИМОГО</span>
            <span>ГУЦУЛЬСЬКІ ПЕРЕКАЗИ</span>
          </div>
          <div className="folklore-title">
            <h2>ЛЕГЕНДИ</h2>
            <span className="folk-symbol" aria-hidden="true">
              ✳
            </span>
          </div>
          <div className="folklore-layout">
            <div className="folklore-copy" data-reveal>
              <span className="eyebrow">АРХІВ / ЛЕГЕНДА 014</span>
              <h3>ЧУГАЙСТЕР</h3>
              <p className="serif-lead">
                Не кожен, кого зустрінеш
                <br />у лісі, — людина.
              </p>
              <p>
                Старі гуцули розповідали про лісового чоловіка, що знає кожну
                стежку. Він не шукає зустрічі. Але якщо почуєш серед смерек
                тихий сміх — зупинись.
              </p>
              <StoryButton story="chugaister">Читати легенду</StoryButton>
              <span className="folklore-origin mono">
                ЗАПИСАНО У ПАМ’ЯТІ
                <br />
                ВЕРХОВИНА / ГУЦУЛЬЩИНА
              </span>
            </div>
            <figure className="woodcut-figure" data-reveal>
              <img
                src="/images/woodcut.webp"
                alt="Гравюра: лісовий Чугайстер серед старих смерек"
                width="1024"
                height="1536"
                loading="lazy"
              />
              <figcaption className="mono">
                НАРОДНИЙ ОБРАЗ / АВТОРСЬКЕ ПРОЧИТАННЯ
              </figcaption>
            </figure>
            <span className="folklore-vertical mono">
              ЛІС ПАМ’ЯТАЄ БІЛЬШЕ, НІЖ МИ.
            </span>
          </div>
          <div className="folklore-end mono">
            <span>МІЖ ПАМ’ЯТТЮ ТА УЯВОЮ</span>
            <span>✦</span>
            <span>ІСТОРІЇ, ЩО ПЕРЕЖИЛИ ПОКОЛІННЯ</span>
          </div>
        </section>

        <RouteVisualization />

        <section className="culture-section">
          <figure className="culture-photo">
            <img
              src="/images/culture.webp"
              alt="Майстер вирізає дерев’яну трембіту в старій майстерні"
              width="1536"
              height="1024"
              loading="lazy"
            />
            <figcaption className="mono">
              РУКИ, ЩО ПРОДОВЖУЮТЬ ІСТОРІЮ.
            </figcaption>
          </figure>
          <div className="culture-copy">
            <span className="eyebrow">09 / ЖИВА СПАДЩИНА</span>
            <span className="culture-object-id">01 / ДЕРЕВО. ПОДИХ. ЗВУК.</span>
            <h2>
              ГОЛОС
              <br />
              <em>ДЕРЕВА.</em>
            </h2>
            <p className="serif-lead">
              Перш ніж стати звуком,
              <br />
              трембіта була деревом.
            </p>
            <p>
              Смерека росте десятиліттями. Майстер слухає її волокна, обережно
              вибирає серцевину. І одного дня дерево знову говорить — цього разу
              голосом людини.
            </p>
            <a className="text-link" href="#voices">
              До звукового архіву <span>↗</span>
            </a>
            <div className="culture-object-note mono">
              <span>
                ОБ’ЄКТ / 052
                <br />
                ТРЕМБІТА
              </span>
              <span>
                МАТЕРІАЛ: СМЕРЕКА
                <br />
                ГУЦУЛЬЩИНА, УКРАЇНА
              </span>
            </div>
          </div>
        </section>

        <Archive />

        <footer className="footer section-pad">
          <Contours />
          <div className="section-label">
            <span>ЦЕ ЛИШЕ ПОЧАТОК.</span>
            <a href="#top">ПОВЕРНУТИСЯ НА ПОЧАТОК ↑</a>
          </div>
          <h2 data-reveal>
            КАРПАТИ
            <br />
            НЕ ЗАКІНЧУЮТЬСЯ
            <br />
            <span>НА КАРТІ.</span>
            <span className="footer-asterisk">✳</span>
          </h2>
          <div className="footer-signoff">
            <p>Вони залишаються з тобою.</p>
            <Compass />
          </div>
          <div className="footer-bottom">
            <a className="brand" href="#top">
              <MountainMark />
              <span>КРАЙ</span>
            </a>
            <span className="mono">
              ЦИФРОВИЙ АТЛАС
              <br />
              УКРАЇНСЬКИХ КАРПАТ
            </span>
            <span className="footer-concept mono">
              НЕЗАЛЕЖНИЙ ДИЗАЙН-КОНЦЕПТ
              <br />
              ЗОБРАЖЕННЯ ТА ІСТОРІЇ — ХУДОЖНІ ІНТЕРПРЕТАЦІЇ
            </span>
            <span className="mono">
              З ЛЮБОВ’Ю ДО СВОГО.
              <br />© КРАЙ 2026
            </span>
          </div>
        </footer>
      </main>
    </>
  );
}
