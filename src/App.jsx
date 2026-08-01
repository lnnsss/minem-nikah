import { useEffect, useRef, useState } from 'react';

import logo from './assets/brand/logo.svg';
import togetherOne from './assets/photos/together-1.webp';
import togetherTwo from './assets/photos/together-2.webp';
import togetherThree from './assets/photos/together-3.webp';
import timurChild from './assets/photos/timur-child.webp';
import renataChild from './assets/photos/renata-child.webp';

const mapLinks = {
  mosque:
    'https://yandex.ru/maps/?text=%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%8C%2C%20%D1%83%D0%BB.%20%D0%9A%D0%B0%D1%8E%D0%BC%D0%B0%20%D0%9D%D0%B0%D1%81%D1%8B%D1%80%D0%B8%2C%2017',
  restaurant:
    'https://yandex.ru/maps/?text=%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%8C%2C%20%D1%83%D0%BB.%20%D0%9C%D0%B0%D1%80%D0%B4%D0%B6%D0%B0%D0%BD%D0%B8%2C%204',
};

function usePreloader() {
  const [stage, setStage] = useState('logo');
  const [done, setDone] = useState(false);

  useEffect(() => {
    const heartTimer = window.setTimeout(() => setStage('heart'), 1450);
    const doneTimer = window.setTimeout(() => setDone(true), 2500);

    return () => {
      window.clearTimeout(heartTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  return { stage, done };
}

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]');

    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.14 },
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);
}

function App() {
  const { stage, done } = usePreloader();
  const pageRef = useRef(null);

  useReveal();

  useEffect(() => {
    const handleScroll = () => {
      const page = pageRef.current;
      if (!page) return;
      page.style.setProperty('--scroll', Math.min(window.scrollY / 900, 1).toFixed(3));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {!done && (
        <div className={`preloader preloader--${stage}`} aria-live="polite">
          <img className="preloader__logo" src={logo} alt="Minem Kiem" />
          <Heart className="preloader__heart" />
        </div>
      )}

      <main ref={pageRef} className={`site ${done ? 'site--ready' : ''}`}>
        <SideOrnaments />
        <Hero />
        <Childhood />
        <Invitation />
        <Schedule />
        <Atmosphere />
        <BookNote />
        <FinalNote />
      </main>
    </>
  );
}

function Heart({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 64 58" aria-hidden="true">
      <path
        d="M32 52C20.8 42.4 8 32.2 8 20.2C8 12.9 13.2 8 19.7 8C25.1 8 29.2 11.2 32 15.8C34.8 11.2 38.9 8 44.3 8C50.8 8 56 12.9 56 20.2C56 32.2 43.2 42.4 32 52Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.6"
      />
    </svg>
  );
}

function SideOrnaments() {
  return (
    <>
      <div className="sideOrnament sideOrnament--left" aria-hidden="true" />
      <div className="sideOrnament sideOrnament--right" aria-hidden="true" />
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__content">
        <p className="hero__dateLine">27 сентября 2026 · Казань</p>
        <h1>Приглашение на никах</h1>
      </div>

      <figure className="hero__frame">
        <img src={togetherThree} alt="Тимур и Рената на ковре" />
      </figure>

      <div className="hero__note">
        <p>
          Мы будем счастливы разделить с вами этот важный день в кругу самых
          близких и дорогих сердцу людей.
        </p>
      </div>
    </section>
  );
}

function Invitation() {
  return (
    <section id="invitation" className="section invitation" data-reveal>
      <div className="invitation__text">
        <p className="kicker">Дорогие наши гости</p>
        <h2>
          Для нас нет ничего важнее,<br className="desktopBreak" /> чем разделить этот день с вами
        </h2>
        <div className="textBlock">
          <p>
            Мы приглашаем вас на наш никах — самых близких и дорогих нашему
            сердцу людей.
          </p>
          <p>
            Церемония пройдет в мечети «Марджани» — месте с вековой историей и
            особой духовной атмосферой. Нам очень важно, чтобы вы были рядом с
            нами в этот знаменательный момент.
          </p>
        </div>
      </div>
    </section>
  );
}

function Childhood() {
  return (
    <section className="section childhood" data-reveal>
      <div className="sectionLead sectionLead--center">
        <p className="kicker">История начинается раньше</p>
        <h2>
          Две детские фотографии,<br className="desktopBreak" /> которые теперь ведут к одному дню
        </h2>
      </div>
      <div className="childhood__photos">
        <figure>
          <img src={timurChild} alt="Тимур в детстве" />
          <figcaption><span>Тимур</span></figcaption>
        </figure>
        <figure>
          <img src={renataChild} alt="Рената в детстве" />
          <figcaption><span>Рената</span></figcaption>
        </figure>
      </div>
    </section>
  );
}

function Schedule() {
  return (
    <section className="section schedule" data-reveal>
      <div className="schedule__inner">
        <div className="schedule__list">
          <Event
            time="11:00"
            title="Никах"
            place="Мечеть аль-Марджани"
            address="ул. Каюма Насыри, 17"
            link={mapLinks.mosque}
          />
          <Event
            time="12:00"
            title="Ресторан «ТАТАР»"
            place="Праздничный обед"
            address="ул. Марджани, 4"
            link={mapLinks.restaurant}
          />
        </div>
      </div>
    </section>
  );
}

function Event({ time, title, place, address, link }) {
  return (
    <article className="event">
      <time>{time}</time>
      <div className="event__body">
        <h3>{title}</h3>
        <p>{place}</p>
        <address>{address}</address>
      </div>
      <a href={link} target="_blank" rel="noreferrer">
        Открыть в картах
      </a>
    </article>
  );
}

function Atmosphere() {
  return (
    <section className="section atmosphere" data-reveal>
      <figure className="atmosphere__photo">
        <img src={togetherTwo} alt="Тимур и Рената в интерьере Minem Kiem" />
      </figure>
      <div className="atmosphere__text">
        <p className="kicker">Атмосфера</p>
        <h2>
          Семья, корни<br className="desktopBreak" /> и тепло, которое<br className="desktopBreak" /> хочется сохранить
        </h2>
        <p>
          Мы хотим, чтобы все было по-настоящему: спокойно, красиво и рядом с
          людьми, с которыми хочется делить самое важное.
        </p>
      </div>
    </section>
  );
}

function BookNote() {
  return (
    <section className="section bookNote" data-reveal>
      <div className="bookNote__text">
        <p className="kicker">Вместо букетов</p>
        <h2>
          Будем благодарны,<br className="desktopBreak" /> если вы принесете книгу
        </h2>
        <p>
          Ту самую, которая когда-то произвела на вас впечатление. Нам будет
          особенно тепло собрать библиотеку из ваших историй и рекомендаций.
        </p>
      </div>
    </section>
  );
}

function FinalNote() {
  return (
    <section className="section final" data-reveal>
      <p className="final__kicker">До встречи</p>
      <h2>
        Будем ждать вас<br className="desktopBreak" /> на нашем никахе
      </h2>
      <p>
        <span>27 сентября 2026 года, Казань.</span>
        <span>Спасибо, что вы рядом с нами.</span>
      </p>
      <a
        href="#top"
        onClick={(event) => {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        Вернуться наверх
      </a>
    </section>
  );
}

export default App;
