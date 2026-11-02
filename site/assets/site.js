// Tech Therapy landing page: the cost calculator and the contact box.
// No dependencies, nothing sent anywhere.
(function () {
  "use strict";

  // Fill these in once the business has a real phone, email and booking link.
  // Until then the page says so instead of showing a dead button.
  var CONTACT = {
    phone: "",   // e.g. "(812) 555-1234" (a real number only)
    email: "",   // e.g. "hello@techtherapy.co"
    booking: ""  // e.g. a Calendly or Google booking page URL
  };

  var WEEKS = 50;
  var fmtInt = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
  var fmtUsd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  function num(v) {
    var n = parseFloat(v);
    return isFinite(n) && n >= 0 ? n : 0;
  }

  function cost(people, hours, rate) {
    var h = num(people) * num(hours) * WEEKS;
    return { hours: h, dollars: h * num(rate) };
  }

  function wireCalc() {
    var form = document.getElementById("calc");
    if (!form) return;
    var outH = document.getElementById("out-hours");
    var outC = document.getElementById("out-cost");
    function update() {
      var r = cost(form.people.value, form.hours.value, form.rate.value);
      outH.textContent = fmtInt.format(r.hours);
      outC.textContent = fmtUsd.format(r.dollars);
    }
    form.addEventListener("input", update);
    form.addEventListener("submit", function (e) { e.preventDefault(); });
    update();
  }

  function el(tag, attrs, text) {
    var e = document.createElement(tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (text) e.textContent = text;
    return e;
  }

  function wireContact() {
    var box = document.getElementById("contact-box");
    if (!box) return;
    box.textContent = "";
    var any = false;
    if (CONTACT.booking) { box.appendChild(el("a", { "class": "btn", href: CONTACT.booking, rel: "noopener" }, "Pick a time")); any = true; }
    if (CONTACT.phone) { box.appendChild(el("a", { "class": "btn ghost", href: "tel:" + CONTACT.phone.replace(/[^\d+]/g, "") }, "Call " + CONTACT.phone)); any = true; }
    if (CONTACT.email) { box.appendChild(el("a", { "class": "btn ghost", href: "mailto:" + CONTACT.email }, CONTACT.email)); any = true; }
    if (!any) box.appendChild(el("p", {}, "Phone and email are coming soon. We're setting up the business line now."));
    box.dataset.state = any ? "ready" : "empty";
  }

  if (typeof window !== "undefined") window.TechTherapy = { cost: cost, WEEKS: WEEKS, CONTACT: CONTACT };
  if (typeof document !== "undefined" && document.addEventListener) {
    document.addEventListener("DOMContentLoaded", function () { wireCalc(); wireContact(); });
  }
})();
