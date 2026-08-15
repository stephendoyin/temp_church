/* ===========================================================================
   Come Away — behaviour.
   No dependencies, no build step. Everything degrades: with this file blocked
   the page still reads, the nav still jumps, and the day-choice radios still work.
   =========================================================================== */

(function () {
  "use strict";

  /* -------------------------------------------------------------------------
     WHERE REGISTRATIONS GO

     GitHub Pages serves static files and cannot process a form post, so
     submissions go to the client's Google Apps Script web app, which appends
     each registration as a row in their Google Sheet.

     The script reads classic form fields, so the POST is form-encoded (never
     JSON — that would also trigger a CORS preflight Apps Script can't answer)
     and the field names below must stay exactly: fullName, email, howMany,
     churchGroup.

     Left empty, the form validates and shows the success state without sending
     anything — useful for review, useless for taking real registrations.
     ------------------------------------------------------------------------- */
  var FORM_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbzuK-LqRLKYz4sFRzIseBbxTw8oa0iygd2SJvXA5y3X6xGqdXo6KL3lkX0-AgVG-2Dm/exec";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================================================================
     Scroll reveal — the page's one authored motion moment.
     Opt in from JS only, so a blocked script never leaves content invisible.
     ========================================================================= */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window) || reduceMotion) {
      // Nothing to animate; the un-prefixed styles already show everything.
      return;
    }

    document.documentElement.classList.add("js-reveal");

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });

    // The first viewport must be complete the moment it lands. Its reveals
    // play on load rather than waiting for a scroll that may never come —
    // otherwise a short laptop viewport hides the primary action.
    var hero = document.querySelector("#main");
    if (hero) {
      requestAnimationFrame(function () {
        hero.querySelectorAll(".reveal").forEach(function (item) {
          item.classList.add("is-in");
          observer.unobserve(item);
        });
      });
    }
  }

  /* =========================================================================
     Scroll spy — right-edge dots, desktop nav, and the top bar's ground.
     The top bar sits over the accent field in Register, so its type has to
     flip to ink or it disappears.
     ========================================================================= */
  function initScrollSpy() {
    var sections = Array.prototype.slice.call(document.querySelectorAll("[data-section]"));
    if (!sections.length) return;

    var dots = document.querySelectorAll("[data-dot]");
    var navlinks = document.querySelectorAll("[data-navlink]");
    var topbar = document.querySelector("[data-topbar]");
    var current = "";

    function markCurrent(id) {
      if (id === current) return;
      current = id;

      dots.forEach(function (dot) {
        if (dot.getAttribute("data-dot") === id) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });

      navlinks.forEach(function (link) {
        if (link.getAttribute("data-navlink") === id) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });

      // Register is the pale field; everything else is dark.
      var onAccent = id === "register";
      if (topbar) topbar.classList.toggle("is-on-accent", onAccent);
      dots.forEach(function (dot) {
        dot.classList.toggle("dot--on-accent", onAccent);
      });
    }

    // Past the hero the bar needs its own ground, or the wordmark lands on top
    // of running text. A sentinel at the hero's foot is cheaper than a scroll
    // listener and does not fight the browser for frames.
    var hero = document.querySelector("#main");
    if (topbar && hero && "IntersectionObserver" in window) {
      new IntersectionObserver(
        function (entries) {
          topbar.classList.toggle("is-stuck", !entries[0].isIntersecting);
        },
        { rootMargin: "-90px 0px 0px 0px", threshold: 0 }
      ).observe(hero);
    }

    if (!("IntersectionObserver" in window)) {
      markCurrent("main");
      return;
    }

    // Fire when a section crosses the upper third — that reads as "the section
    // you are looking at", not "the section whose top edge just touched".
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) markCurrent(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* =========================================================================
     Mobile menu
     ========================================================================= */
  function initMenu() {
    var openBtn = document.querySelector("[data-menu-open]");
    var panel = document.querySelector("[data-menu-panel]");
    var closeBtn = document.querySelector("[data-menu-close]");
    if (!openBtn || !panel || !closeBtn) return;

    var links = panel.querySelectorAll("[data-menu-link]");
    var lastFocused = null;

    function open() {
      lastFocused = document.activeElement;
      panel.classList.remove("invisible", "opacity-0");
      openBtn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
      document.addEventListener("keydown", onKeydown);
    }

    function close() {
      panel.classList.add("invisible", "opacity-0");
      openBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeydown);
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    function onKeydown(event) {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;

      // Keep tabbing inside the open dialog.
      var focusable = panel.querySelectorAll("a[href], button");
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    openBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    links.forEach(function (link) {
      link.addEventListener("click", close);
    });
  }

  /* =========================================================================
     Registration form
     ========================================================================= */
  function initForm() {
    var form = document.querySelector("[data-register-form]");
    if (!form) return;

    var placesInput = form.querySelector("[data-places]");
    var submitBtn = form.querySelector("[data-submit]");
    var submitLabel = form.querySelector("[data-submit-label]");
    var status = form.querySelector("[data-form-status]");
    var successEl = document.querySelector("[data-success]");
    var successDetail = document.querySelector("[data-success-detail]");
    var registerAgain = document.querySelector("[data-register-again]");

    // Attendance is free and undifferentiated, so the form asks only who is
    // coming and how many seats and meals to prepare. There is nothing to
    // total and nothing to echo back.
    function places() {
      var n = parseInt(placesInput.value, 10);
      return isNaN(n) || n < 1 ? 0 : n;
    }

    /* --- Validation. Errors name the problem and the recovery. ------------ */

    function fieldOf(input) {
      return input.closest("[data-field]");
    }

    function setError(input, message) {
      var field = fieldOf(input);
      if (!field) return;
      var slot = field.querySelector("[data-error]");
      if (message) {
        field.setAttribute("data-invalid", "true");
        input.setAttribute("aria-invalid", "true");
        if (slot) {
          slot.textContent = message;
          slot.classList.remove("hidden");
        }
      } else {
        field.removeAttribute("data-invalid");
        input.removeAttribute("aria-invalid");
        if (slot) {
          slot.textContent = "";
          slot.classList.add("hidden");
        }
      }
    }

    function validate(input) {
      var value = (input.value || "").trim();

      if (input.id === "name") {
        if (!value) return "Enter the name your place should be held under";
        return "";
      }

      if (input.id === "email") {
        if (!value) return "Enter an email so we can send your confirmation";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value))
          return "That email is missing an @ or a domain — check it and try again";
        return "";
      }

      if (input.id === "places") {
        var n = parseInt(value, 10);
        if (isNaN(n) || n < 1) return "Enter at least one place";
        if (n > 20) return "For more than twenty, email us and we will arrange it";
        return "";
      }

      return "";
    }

    function validateAll() {
      var inputs = [form.querySelector("#name"), form.querySelector("#email"), placesInput];
      var firstBad = null;

      inputs.forEach(function (input) {
        var message = validate(input);
        setError(input, message);
        if (message && !firstBad) firstBad = input;
      });

      return firstBad;
    }

    /* --- Wiring ----------------------------------------------------------- */

    // Validate on blur, then live once the field has been corrected — nagging
    // someone mid-keystroke on their first pass is the annoying version.
    ["#name", "#email", "#places"].forEach(function (selector) {
      var input = form.querySelector(selector);
      if (!input) return;
      input.addEventListener("blur", function () {
        setError(input, validate(input));
      });
      input.addEventListener("input", function () {
        if (fieldOf(input).hasAttribute("data-invalid")) setError(input, validate(input));
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var firstBad = validateAll();
      if (firstBad) {
        firstBad.focus();
        if (status) {
          status.textContent = "Check the highlighted fields above.";
          status.classList.remove("hidden");
        }
        return;
      }

      var payload = {
        places: places(),
        name: form.querySelector("#name").value.trim(),
        email: form.querySelector("#email").value.trim(),
        group: form.querySelector("#group").value.trim(),
      };

      submitBtn.setAttribute("aria-busy", "true");
      submitBtn.disabled = true;
      submitLabel.textContent = "Registering…";
      if (status) status.classList.add("hidden");

      // The form is replaced wholesale by the success state: an unmissable
      // confirmation, echoing back exactly what was saved. No email is sent,
      // so nothing here may claim one.
      function succeed() {
        var seats = payload.places === 1 ? "one seat" : payload.places + " seats";

        form.reset();
        submitBtn.removeAttribute("aria-busy");
        submitBtn.disabled = false;
        submitLabel.textContent = "Register now";
        if (status) status.classList.add("hidden");

        if (successEl && successDetail) {
          successDetail.textContent = payload.name + " — " + seats + " saved.";
          form.classList.add("hidden");
          successEl.classList.remove("hidden");
          successEl.focus();
        } else if (status) {
          status.textContent = "Registered — " + seats + " saved for " + payload.name + ".";
          status.classList.remove("hidden");
        }
      }

      function fail() {
        submitBtn.removeAttribute("aria-busy");
        submitBtn.disabled = false;
        submitLabel.textContent = "Register now";
        if (status) {
          status.textContent =
            "That did not go through. Check your connection and try again, or email us directly.";
          status.classList.remove("hidden");
        }
      }

      if (!FORM_ENDPOINT) {
        // No endpoint wired — say plainly that nothing was sent.
        window.setTimeout(function () {
          submitBtn.removeAttribute("aria-busy");
          submitBtn.disabled = false;
          submitLabel.textContent = "Register now";
          if (status) {
            status.textContent =
              "Demo only — no endpoint is wired, so nothing was sent. Set FORM_ENDPOINT in assets/js/main.js.";
            status.classList.remove("hidden");
          }
        }, 700);
        return;
      }

      // Field names must match the Apps Script's expectations exactly.
      var body = new URLSearchParams({
        fullName: payload.name,
        email: payload.email,
        howMany: String(payload.places),
        churchGroup: payload.group,
      });

      fetch(FORM_ENDPOINT, {
        method: "POST",
        body: body,
      })
        .then(function (response) {
          if (!response.ok) throw new Error("Bad response");
          succeed();
        })
        .catch(fail);
    });

    // "Register someone else" — bring back the (already reset) form.
    if (registerAgain) {
      registerAgain.addEventListener("click", function () {
        successEl.classList.add("hidden");
        form.classList.remove("hidden");
        var first = form.querySelector("#name");
        if (first) first.focus();
      });
    }
  }

  function init() {
    initReveal();
    initScrollSpy();
    initMenu();
    initForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
