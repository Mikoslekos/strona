(function () {
  var doc = document;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var POLICY = [
    "<h2>Polityka prywatności</h2><p>Dokument wyjaśnia, jak serwis www.parkowa.pl ",
    "przetwarza dane osobowe i korzysta z plików cookies. Obowiązuje od 25 ",
    "października 2026 roku.</p><h3>1. Administrator danych</h3><p>Administratorem ",
    "danych osobowych jest firma <strong>Restauracja - Zajazd PARKOWA</strong>, ",
    "ul. Sportowców 29, 41-711 Ruda Śląska (Bielszowice), tel. 32 344 77 80, ",
    "e-mail: <a ",
    "href=\"mailto:restauracja@parkowa.pl\">restauracja@parkowa.pl</a>.</p><h3>2. ",
    "Jakie dane zbieramy i po co</h3><p>Gdy wypełniasz formularz kontaktowy, ",
    "podajesz imię, telefon, adres e-mail i treść wiadomości. Używamy ich, aby ",
    "odpowiedzieć na Twoje pytanie i przygotować ofertę. Podajesz je dobrowolnie, ",
    "ale bez adresu e-mail i wiadomości nie możemy odpowiedzieć.</p><p>Podstawą ",
    "przetwarzania jest Twoja zgoda (art. 6 ust. 1 lit. a RODO) oraz podjęcie ",
    "działań przed zawarciem umowy na Twoje żądanie (art. 6 ust. 1 lit. b RODO). ",
    "Jeśli dojdzie do zawarcia umowy, przetwarzamy dane także w celu jej ",
    "realizacji oraz wypełnienia obowiązków prawnych.</p><h3>3. Jak długo ",
    "przechowujemy dane</h3><p>Przechowujemy je przez czas obsługi zapytania. ",
    "Jeśli zawrzemy umowę, zachowujemy dane do czasu przedawnienia roszczeń i tak ",
    "długo, jak wymagają tego przepisy, na przykład podatkowe. Dane z formularza ",
    "usuwamy, gdy wycofasz zgodę, chyba że przepisy pozwalają lub nakazują je ",
    "zachować.</p><h3>4. Komu przekazujemy dane</h3><p>Dane trafiają do dostawców, ",
    "z których korzystamy przy obsłudze strony: dostawcy poczty e-mail i hostingu ",
    "oraz dostawcy usługi przesyłania formularzy (FormSubmit), która przekazuje ",
    "treść formularza na naszą skrzynkę. Mapy Google i czcionki Google Fonts ",
    "ładują się z serwerów Google, które widzą wtedy Twój adres IP. Część ",
    "dostawców może przetwarzać dane poza Europejskim Obszarem Gospodarczym. W ",
    "takim przypadku robimy to zgodnie z wymogami RODO.</p><h3>5. Twoje ",
    "prawa</h3><p>Masz prawo do dostępu do danych, ich sprostowania, usunięcia, ",
    "ograniczenia przetwarzania, przenoszenia oraz sprzeciwu. Możesz też w każdej ",
    "chwili wycofać zgodę, bez wpływu na zgodność z prawem przetwarzania sprzed ",
    "jej wycofania. Napisz do nas na adres <a ",
    "href=\"mailto:restauracja@parkowa.pl\">restauracja@parkowa.pl</a>. Przysługuje ",
    "Ci także skarga do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, ",
    "00-193 Warszawa, uodo.gov.pl).</p><h3>6. Pliki cookies</h3><p>Pliki cookies ",
    "to dane zapisywane na Twoim urządzeniu podczas korzystania ze stron ",
    "internetowych. Nie pozwalają na jednoznaczną identyfikację Użytkownika. ",
    "Serwis nie używa cookies analitycznych ani reklamowych. W pamięci ",
    "przeglądarki zapisujemy tylko informację, że zamknąłeś pasek o cookies, aby ",
    "nie pokazywać go ponownie. Zewnętrzne usługi na stronie, czyli Mapy Google i ",
    "Google Fonts, mogą zapisywać własne pliki cookies zgodnie z polityką ",
    "Google.</p><p>W ustawieniach przeglądarki możesz w każdej chwili zablokować ",
    "lub usunąć pliki cookies. Blokada może jednak ograniczyć działanie części ",
    "funkcji, na przykład mapy dojazdu.</p><h3>7. Zmiany ",
    "polityki</h3><p>Zastrzegamy sobie prawo do zmian w tej polityce. Aktualną ",
    "wersję zawsze publikujemy na stronie. Pytania o prywatność i cookies kieruj ",
    "na adres <a ",
    "href=\"mailto:restauracja@parkowa.pl\">restauracja@parkowa.pl</a>.</p>"
  ].join("");

  function all(selector, context) {
    return Array.prototype.slice.call((context || doc).querySelectorAll(selector));
  }

  var header = doc.querySelector("header");
  var nav = doc.querySelector("nav");

  doc.querySelector(".burger").addEventListener("click", function () {
    nav.classList.toggle("open");
  });

  function updateHeader() {
    header.classList.toggle("sc", window.scrollY > 8);
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  function countUp(el) {
    var target = +el.dataset.n;
    var from = +el.dataset.from || 0;
    var start = null;

    if (reduceMotion) {
      el.textContent = target;
      return;
    }
    el.textContent = from;

    function step(time) {
      if (start === null) start = time;
      var progress = Math.min((time - start) / 1300, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(from + (target - from) * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var revealSelectors = [
    ".sec h2",
    ".sec .lead",
    ".cols > div",
    ".two .fr",
    ".strip .fr",
    ".hall",
    ".facts .wrap > div",
    ".chips span",
    ".rules li",
    ".band .wrap > *",
    ".gal button",
    ".tile div",
    ".sec form > *",
    ".ct > *"
  ].join(",");
  var items = all(revealSelectors);
  var siblingCount = new Map();

  items.forEach(function (el) {
    var parent = el.parentNode;
    var index = siblingCount.get(parent) || 0;
    siblingCount.set(parent, index + 1);
    el.style.setProperty("--d", Math.min(index * 0.08, 0.4) + "s");
    el.classList.add("rv");
  });

  if ("IntersectionObserver" in window && !reduceMotion) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          all("[data-n]", entry.target).forEach(countUp);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );
    items.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    items.forEach(function (el) {
      el.classList.add("in");
    });
  }

  var modal = null;
  var lastFocus = null;

  function openPolicy() {
    lastFocus = doc.activeElement;
    if (!modal) {
      modal = doc.createElement("div");
      modal.className = "md";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.setAttribute("aria-label", "Polityka prywatności");
      modal.innerHTML =
        '<div class="bx"><button class="cl" aria-label="Zamknij">×</button>' + POLICY + "</div>";
      doc.body.appendChild(modal);
      modal.addEventListener("click", function (e) {
        if (e.target === modal || e.target.className === "cl") closePolicy();
      });
    }
    requestAnimationFrame(function () {
      modal.classList.add("on");
      modal.querySelector(".cl").focus();
    });
    doc.body.classList.add("nos");
  }

  function closePolicy() {
    modal.classList.remove("on");
    doc.body.classList.remove("nos");
    if (lastFocus) lastFocus.focus();
  }

  doc.addEventListener("click", function (e) {
    var link = e.target.closest && e.target.closest("a[data-policy]");
    if (link) {
      e.preventDefault();
      openPolicy();
    }
  });

  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && modal.classList.contains("on")) closePolicy();
  });

  var cookiesAccepted = false;
  try {
    cookiesAccepted = localStorage.getItem("pk_ck") === "1";
  } catch (err) {}

  if (!cookiesAccepted) {
    var policyUrl = (doc.documentElement.dataset.root || "") + "polityka-prywatnosci/";
    var bar = doc.createElement("div");
    bar.className = "ck";
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", "Informacja o plikach cookies");
    bar.innerHTML =
      "<p>Strona korzysta z plików cookies i usług zewnętrznych (Mapy Google, Google Fonts), " +
      'aby działać poprawnie. Szczegóły w <a href="' + policyUrl + '" data-policy>' +
      'polityce prywatności</a>.</p><button type="button">Akceptuję</button>';
    doc.body.appendChild(bar);
    setTimeout(function () {
      bar.classList.add("on");
    }, 900);
    bar.querySelector("button").onclick = function () {
      try {
        localStorage.setItem("pk_ck", "1");
      } catch (err) {}
      bar.classList.remove("on");
      setTimeout(function () {
        bar.remove();
      }, 700);
    };
  }

  var galleryButtons = all(".gal button");

  all(".gal img").forEach(function (img) {
    function markLoaded() {
      img.classList.add("ok");
    }
    if (img.complete && img.naturalWidth) {
      markLoaded();
    } else {
      img.addEventListener("load", markLoaded);
      img.addEventListener("error", markLoaded);
    }
  });

  if (galleryButtons.length) {
    var lightbox = doc.createElement("div");
    lightbox.className = "lb";
    lightbox.setAttribute("role", "dialog");
    lightbox.innerHTML =
      '<button class="x" aria-label="Zamknij">×</button>' +
      '<button class="p" aria-label="Poprzednie">‹</button>' +
      '<img alt="">' +
      '<button class="n" aria-label="Następne">›</button>';
    doc.body.appendChild(lightbox);

    var bigImage = lightbox.querySelector("img");
    var current = 0;

    function show(k) {
      current = (k + galleryButtons.length) % galleryButtons.length;
      var thumb = galleryButtons[current].querySelector("img");
      var fullSrc = galleryButtons[current].dataset.full;
      var shown = current;
      bigImage.src = thumb.currentSrc || thumb.src;
      bigImage.alt = thumb.alt;
      lightbox.classList.add("on");

      var loader = new Image();
      loader.onload = function () {
        if (shown === current) bigImage.src = fullSrc;
      };
      loader.src = fullSrc;
    }

    galleryButtons.forEach(function (button, k) {
      button.addEventListener("click", function () {
        show(k);
      });
    });

    lightbox.querySelector(".x").onclick = function () {
      lightbox.classList.remove("on");
    };
    lightbox.querySelector(".p").onclick = function () {
      show(current - 1);
    };
    lightbox.querySelector(".n").onclick = function () {
      show(current + 1);
    };
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) lightbox.classList.remove("on");
    });
    doc.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("on")) return;
      if (e.key === "Escape") lightbox.classList.remove("on");
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
  }

  var form = doc.getElementById("f");

  if (form) {
    form.noValidate = true;
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var status = doc.getElementById("st");
      var email = form.elements.email;
      var message = form.elements["Wiadomość"];

      if (!email.value || email.validity.typeMismatch || !message.value.trim() || !form.elements.Zgoda.checked) {
        status.className = "msg er";
        status.textContent = "Wpisz poprawny adres e-mail i wiadomość oraz zaakceptuj politykę prywatności.";
        return;
      }

      var button = form.querySelector("button");
      button.disabled = true;
      status.className = "msg";
      status.textContent = "Wysyłamy wiadomość...";

      fetch(form.action.replace("formsubmit.co/", "formsubmit.co/ajax/"), {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          if (result.success === "true" || result.success === true) {
            form.reset();
            status.className = "msg ok";
            status.textContent = "Dziękujemy! Wiadomość została wysłana. Odpowiemy najszybciej, jak to możliwe.";
          } else {
            throw new Error("send failed");
          }
        })
        .catch(function () {
          status.className = "msg er";
          status.innerHTML =
            "Nie udało się wysłać wiadomości. Zadzwoń pod 32 344 77 80 lub napisz na " +
            '<a href="mailto:restauracja@parkowa.pl">restauracja@parkowa.pl</a>.';
        })
        .then(function () {
          button.disabled = false;
        });
    });
  }
})();
