/* Night of Ideas: the moon, the masthead, the reveals, and the hang. */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  function motionOK() { return !reduceQuery.matches; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  /* ------------------------------------------------------------------
     The moon. phase: 0 new, 0.25 first quarter, 0.5 full, 1 new again.
     Returns the lit region of a disc at (cx, cy) with radius r.
     ------------------------------------------------------------------ */
  function moonPath(phase, cx, cy, r) {
    var p = ((phase % 1) + 1) % 1;
    var rx = (r * Math.abs(Math.cos(p * 2 * Math.PI))).toFixed(3);
    var top = cx + " " + (cy - r);
    var bottom = cx + " " + (cy + r);
    if (p <= 0.5) {
      return "M" + top + " A" + r + " " + r + " 0 0 1 " + bottom +
        " A" + rx + " " + r + " 0 0 " + (p < 0.25 ? 0 : 1) + " " + top + "Z";
    }
    return "M" + top + " A" + r + " " + r + " 0 0 0 " + bottom +
      " A" + rx + " " + r + " 0 0 " + (p < 0.75 ? 0 : 1) + " " + top + "Z";
  }

  /* The name surfaces as the moon waxes full into its O.
     The lit shape is drawn at r = 100, just past the disc's r = 96 clip, so the
     soft mask blurs only the terminator and the full moon keeps a crisp rim. */
  var HERO_PHASE = 0.5;
  var HERO_R = 100;
  var heroMoon = document.querySelector("[data-hero-moon]");
  if (heroMoon) {
    if (motionOK()) {
      heroMoon.setAttribute("d", moonPath(0.03, 100, 100, HERO_R));
      var start = null;
      var delay = 350;
      var duration = 2600;
      var wax = function (now) {
        if (start === null) start = now;
        var t = clamp((now - start - delay) / duration, 0, 1);
        heroMoon.setAttribute("d", moonPath(0.03 + (HERO_PHASE - 0.03) * easeOutCubic(t), 100, 100, HERO_R));
        if (t < 1) requestAnimationFrame(wax);
      };
      requestAnimationFrame(wax);
    } else {
      heroMoon.setAttribute("d", moonPath(HERO_PHASE, 100, 100, HERO_R));
    }
  }

  /* ------------------------------------------------------------------
     Masthead: solid once the page moves; its moon waxes with the scroll,
     new at the top of the page, full at the foot.
     ------------------------------------------------------------------ */
  var masthead = document.querySelector("[data-masthead]");
  var navMoon = document.querySelector("[data-nav-moon]");
  var scrollQueued = false;
  function onScroll() {
    scrollQueued = false;
    var y = window.scrollY || window.pageYOffset;
    if (masthead) masthead.classList.toggle("is-solid", y > 24);
    if (navMoon) {
      var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      var progress = clamp(y / max, 0, 1);
      navMoon.setAttribute("d", moonPath(0.12 + progress * 0.38, 16, 16, 13));
    }
  }
  window.addEventListener("scroll", function () {
    if (!scrollQueued) {
      scrollQueued = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  onScroll();

  /* ------------------------------------------------------------------
     Reveals: plates unveil, articles and the apply room rise into place.
     ------------------------------------------------------------------ */
  var revealables = document.querySelectorAll("[data-reveal]");
  if (root.classList.contains("motion") && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* The Wright plate downloads with the page (it is not lazy); decode it once
     the page has loaded so its unveiling never waits on pixels. */
  window.addEventListener("load", function () {
    var plate = document.querySelector(".reglement__plate img");
    if (plate && plate.decode) plate.decode().catch(function () {});
  });

  /* ------------------------------------------------------------------
     The hang: a wall of framed works on cords. Drag it, flick it,
     step it, or pick from the catalogue. The lit work is centred; the
     frames sway a little on their cords when the wall moves.
     ------------------------------------------------------------------ */
  var hang = document.querySelector("[data-hang]");
  if (hang) initHang(hang);

  function initHang(section) {
    var viewport = section.querySelector("[data-hang-viewport]");
    var works = Array.prototype.slice.call(section.querySelectorAll("[data-work]"));
    var hangers = works.map(function (w) { return w.querySelector(".work__hanger"); });
    var frames = works.map(function (w) { return w.querySelector(".frame"); });
    var cartels = Array.prototype.slice.call(section.querySelectorAll("[data-cartel]"));
    var prevBtn = section.querySelector("[data-hang-prev]");
    var nextBtn = section.querySelector("[data-hang-next]");
    var catalogue = section.querySelector("[data-catalogue]");
    var gotoBtns = catalogue ? Array.prototype.slice.call(catalogue.querySelectorAll("[data-goto]")) : [];
    var n = works.length;
    if (!viewport || n === 0) return;

    if (catalogue) catalogue.hidden = false;
    if (prevBtn) prevBtn.hidden = false;
    if (nextBtn) nextBtn.hidden = false;

    var status = document.createElement("p");
    status.className = "visually-hidden";
    status.setAttribute("aria-live", "polite");
    section.appendChild(status);

    var W = 0, step = 0, centre = 0;
    var index = 0;
    var x = 0, v = 0, target = 0;
    var sway = 0, swayV = 0;
    var raf = 0, last = 0;
    var drag = null;
    var suppressClick = false;
    var wheeling = false, wheelTimer = 0, wheelLastT = 0, wheelFrom = 0, wheelSum = 0;

    function measure() {
      W = works[0].offsetWidth;
      var gap = clamp(window.innerWidth * 0.04, 22, 64);
      step = W * 0.9 + gap;
      centre = viewport.clientWidth / 2 - W / 2;
      viewport.style.height = Math.ceil(works[0].offsetHeight + 64) + "px";
      target = -index * step;
      x = target;
      v = 0;
      render();
    }

    function render() {
      for (var i = 0; i < n; i++) {
        var d = (i * step + x) / step;
        var ad = Math.abs(d);
        var lit = clamp(1 - ad, 0, 1);
        lit = lit * lit * (3 - 2 * lit);
        var scale = 1 - 0.2 * clamp(ad, 0, 1);
        works[i].style.transform = "translate3d(" + (centre + x + i * step).toFixed(2) + "px,0,0)";
        works[i].style.zIndex = String(20 - Math.round(ad * 4));
        works[i].style.setProperty("--lit", lit.toFixed(3));
        hangers[i].style.transform = "rotate(" + (sway * (1 - 0.35 * clamp(ad, 0, 1))).toFixed(3) + "deg) scale(" + scale.toFixed(4) + ")";
      }
    }

    function kick() {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    }

    function tick(now) {
      var dt = clamp((now - last) / 1000, 0.001, 0.034);
      last = now;
      if (!drag && !wheeling) {
        var k = 150;
        var c = 2 * Math.sqrt(k) * 0.9;
        v += (k * (target - x) - c * v) * dt;
        x += v * dt;
      }
      // A pendulum on each cord, pushed by the wall's velocity
      var swayTarget = clamp(v * 0.0028, -2.6, 2.6);
      swayV += (80 * (swayTarget - sway) - 6.5 * swayV) * dt;
      sway += swayV * dt;
      render();
      var settled = !drag && !wheeling && Math.abs(target - x) < 0.25 && Math.abs(v) < 4 &&
        Math.abs(sway) < 0.015 && Math.abs(swayV) < 0.04;
      if (settled) {
        x = target; v = 0; sway = 0; swayV = 0;
        render();
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    }

    function setActive(i, announce) {
      works.forEach(function (w, j) { w.classList.toggle("is-active", j === i); });
      cartels.forEach(function (c, j) { c.classList.toggle("is-active", j === i); });
      gotoBtns.forEach(function (b, j) {
        if (j === i) b.setAttribute("aria-current", "true");
        else b.removeAttribute("aria-current");
      });
      if (prevBtn) prevBtn.setAttribute("aria-disabled", String(i === 0));
      if (nextBtn) nextBtn.setAttribute("aria-disabled", String(i === n - 1));
      if (announce && cartels[i]) {
        var title = cartels[i].querySelector(".cartel__title");
        var name = cartels[i].querySelector(".cartel__name");
        status.textContent = "Talk " + (i + 1) + " of " + n + ": " +
          (title ? title.textContent : "") + (name ? ", " + name.textContent.replace(/^\s*\d+\.\s*/, "") : "");
      }
    }

    function goTo(i, announce) {
      i = clamp(i, 0, n - 1);
      var changed = i !== index;
      index = i;
      target = -index * step;
      setActive(index, announce && changed);
      if (motionOK()) {
        kick();
      } else {
        x = target; v = 0;
        render();
      }
    }

    /* Pointer: drag the wall; a flick carries it on. */
    viewport.addEventListener("pointerdown", function (e) {
      if (e.button !== 0 || drag) return;
      drag = {
        id: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        origin: x,
        moved: false,
        captured: false,
        samples: [{ t: e.timeStamp, x: e.clientX }]
      };
    });

    viewport.addEventListener("pointermove", function (e) {
      if (drag && e.pointerId === drag.id) {
        var dx = e.clientX - drag.startX;
        var dy = e.clientY - drag.startY;
        if (!drag.moved) {
          if (Math.abs(dx) < 6) return;
          if (Math.abs(dy) > Math.abs(dx)) { drag = null; return; }
          drag.moved = true;
          try { viewport.setPointerCapture(e.pointerId); drag.captured = true; } catch (err) { /* no-op */ }
          viewport.classList.add("is-dragging");
          kick();
        }
        var min = -(n - 1) * step;
        var nx = drag.origin + dx;
        if (nx > 0) nx = nx * 0.32;
        if (nx < min) nx = min + (nx - min) * 0.32;
        var prevX = x;
        x = nx;
        drag.samples.push({ t: e.timeStamp, x: e.clientX });
        if (drag.samples.length > 8) drag.samples.shift();
        var dtm = Math.max(1, e.timeStamp - (drag.lastT || drag.samples[0].t));
        v = motionOK() ? ((x - prevX) / dtm) * 1000 : 0;
        drag.lastT = e.timeStamp;
        if (!motionOK()) render();
        return;
      }
      // Lamp glare follows the pointer across the lit work
      if (finePointer.matches) {
        var frame = e.target.closest && e.target.closest(".frame");
        if (frame) {
          var r = frame.getBoundingClientRect();
          var glare = frame.querySelector(".frame__glare");
          if (glare) {
            glare.style.setProperty("--gx", (((e.clientX - r.left) / r.width) * 100).toFixed(1) + "%");
            glare.style.setProperty("--gy", (((e.clientY - r.top) / r.height) * 100).toFixed(1) + "%");
          }
        }
      }
    });

    function endDrag(e) {
      if (!drag || e.pointerId !== drag.id) return;
      var wasMoved = drag.moved;
      if (drag.captured) {
        try { viewport.releasePointerCapture(e.pointerId); } catch (err) { /* no-op */ }
      }
      viewport.classList.remove("is-dragging");
      if (wasMoved) {
        suppressClick = true;
        setTimeout(function () { suppressClick = false; }, 0);
        var s = drag.samples;
        var first = s[0];
        for (var j = s.length - 1; j >= 0; j--) {
          if (e.timeStamp - s[j].t > 90) { first = s[j]; break; }
        }
        var lastS = s[s.length - 1];
        var span = Math.max(16, lastS.t - first.t);
        var vel = ((lastS.x - first.x) / span) * 1000;
        if (e.timeStamp - lastS.t > 160) vel = 0;
        drag = null;
        v = motionOK() ? vel : 0;
        // Where a flick would carry the wall, but a deliberate pull of a
        // fifth of a frame is always enough to change the work.
        var shift = x + index * step;
        var next = Math.round(-(x + vel * 0.2) / step);
        if (next === index) {
          if (Math.abs(vel) > 380) next = index + (vel < 0 ? 1 : -1);
          else if (Math.abs(shift) > step * 0.18) next = index + (shift < 0 ? 1 : -1);
        }
        goTo(next, true);
        kick();
      } else {
        drag = null;
      }
    }
    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);
    viewport.addEventListener("dragstart", function (e) { e.preventDefault(); });

    /* Trackpad swipes (and shift + mouse wheel) move the wall directly;
       it settles on the nearest work once the gesture stops. */
    viewport.addEventListener("wheel", function (e) {
      var dx = e.deltaX, dy = e.deltaY;
      if (e.shiftKey && Math.abs(dx) < Math.abs(dy)) { dx = dy; dy = 0; }
      if (Math.abs(dx) <= Math.abs(dy)) return; // a vertical scroll belongs to the page
      e.preventDefault();
      if (drag) return;
      if (e.deltaMode === 1) dx *= 18;
      else if (e.deltaMode === 2) dx *= viewport.clientWidth;
      if (!wheeling) { wheelFrom = index; wheelSum = 0; }
      wheelSum += dx;
      var min = -(n - 1) * step;
      var nx = x - dx;
      if (nx > 0 || nx < min) nx = x - dx * 0.3; // resistance past either end
      nx = clamp(nx, min - step * 0.25, step * 0.25);
      var dtm = wheelLastT ? clamp(e.timeStamp - wheelLastT, 8, 60) : 16;
      wheelLastT = e.timeStamp;
      var prevX = x;
      x = nx;
      wheeling = true;
      if (motionOK()) {
        v = clamp(((x - prevX) / dtm) * 1000, -2600, 2600);
        kick();
      } else {
        v = 0;
        render();
      }
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(endWheel, 150);
    }, { passive: false });

    function endWheel() {
      wheeling = false;
      wheelLastT = 0;
      /* Judge the gesture by how far it travelled from the work it began on,
         so quick repeated swipes each advance one work. */
      var dist = Math.abs(wheelSum);
      var next = wheelFrom;
      if (dist > step * 0.18) next += (wheelSum > 0 ? 1 : -1) * Math.max(1, Math.round(dist / step));
      goTo(next, true);
      kick();
    }

    /* A click on a side work brings it forward; a click on the lit work opens its slides. */
    frames.forEach(function (frame, i) {
      frame.addEventListener("click", function (e) {
        if (suppressClick) { e.preventDefault(); return; }
        if (i !== index) {
          e.preventDefault();
          goTo(i, true);
        }
      });
      frame.addEventListener("focus", function () {
        // Keyboard focus brings the work forward; a mouse press is handled by click
        var keyboard = true;
        try { keyboard = frame.matches(":focus-visible"); } catch (err) { /* older engines */ }
        if (keyboard && i !== index) goTo(i, true);
      });
    });

    if (prevBtn) prevBtn.addEventListener("click", function () { if (index > 0) goTo(index - 1, true); });
    if (nextBtn) nextBtn.addEventListener("click", function () { if (index < n - 1) goTo(index + 1, true); });
    gotoBtns.forEach(function (b) {
      b.addEventListener("click", function () { goTo(parseInt(b.getAttribute("data-goto"), 10) || 0, true); });
    });

    section.addEventListener("keydown", function (e) {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      var inWall = viewport.contains(document.activeElement) ||
        (document.activeElement && document.activeElement.closest && document.activeElement.closest(".hang__label"));
      if (!inWall) return;
      if (e.key === "ArrowRight") { e.preventDefault(); goTo(index + 1, true); focusIfOnFrame(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goTo(index - 1, true); focusIfOnFrame(); }
    });
    function focusIfOnFrame() {
      if (viewport.contains(document.activeElement)) frames[index].focus({ preventScroll: true });
    }

    setActive(0, false);
    measure();

    if ("ResizeObserver" in window) {
      var lastWidth = viewport.clientWidth;
      new ResizeObserver(function () {
        if (viewport.clientWidth !== lastWidth) {
          lastWidth = viewport.clientWidth;
          measure();
        }
      }).observe(viewport);
    } else {
      window.addEventListener("resize", measure);
    }
    // Frames can change height once their images decode or fonts settle
    window.addEventListener("load", measure);
  }
})();
