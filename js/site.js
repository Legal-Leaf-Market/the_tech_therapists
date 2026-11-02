// Menu toggle for phones, and the time-back calculator.
// The calculator is plain arithmetic on what the visitor types. Nothing is
// sent anywhere, and the page says it is an estimate, not a promise.
(function () {
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  var form = document.getElementById("calc-form");
  if (!form) return;
  var $ = function (id) { return document.getElementById(id); };
  var WEEKS = 48; // working weeks in a year, after holidays and vacation

  function num(id, max) {
    var v = parseFloat($(id).value);
    if (!isFinite(v) || v < 0) return 0;
    return Math.min(v, max);
  }

  function update() {
    var people = num("c-people", 500);
    var hours = num("c-hours", 60);
    var rate = num("c-rate", 500);
    var share = parseFloat($("c-share").value) || 0.5;
    var yearHours = people * hours * WEEKS;
    var yearCost = yearHours * rate;
    $("o-hours").textContent = Math.round(yearHours).toLocaleString("en-US");
    $("o-cost").textContent = "$" + Math.round(yearCost).toLocaleString("en-US");
    $("o-back").textContent = Math.round(yearHours * share).toLocaleString("en-US");
  }

  form.addEventListener("input", update);
  form.addEventListener("submit", function (e) { e.preventDefault(); });
  update();
})();
