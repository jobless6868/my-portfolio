AOS.init({
  duration: 1000,
  once: true
});

/*about*/
const text = "Website Developer / Software Engineer";
const typewriter = document.getElementById("typewriter");
let i = 0;

function typeEffect() {
  if (i < text.length) {
    typewriter.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeEffect, 70);
  }
}
window.addEventListener("load", typeEffect);

const zaloLink = document.querySelector(".contact_links a:nth-child(2)");
const emailLink = document.getElementById("emailLink");
const zaloPopup = document.getElementById("zalo-popup");
const emailPopup = document.getElementById("emailPopup");

function openPopup(el) {
  if (!el) return;
  el.classList.add("show");

}
function closePopup(el) {
  if (!el) return;
  el.classList.remove("show");
  document.body.style.overflow = ""; 
}

if (zaloLink) {
  zaloLink.addEventListener("click", e => {
    e.preventDefault();
    openPopup(zaloPopup);
  });
}
if (emailLink) {
  emailLink.addEventListener("click", e => {
    e.preventDefault();
    openPopup(emailPopup);
  });
}

document.querySelectorAll(".popup .close-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const popup = btn.closest(".popup");
    closePopup(popup);
  });
});

document.querySelectorAll(".popup").forEach(p => {
  p.addEventListener("click", (ev) => {
    if (ev.target === p) { 
      closePopup(p);
    }
  });
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".popup.show").forEach(p => closePopup(p));
  }
});
const contactForm = document.querySelector("#emailPopup form");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('input[name="name"]').value.trim();
    const email = contactForm.querySelector('input[name="email"]').value.trim();
    const message = contactForm.querySelector('textarea[name="message"]').value.trim();

    if (!name || !email || !message) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      emailjs.init("BvIe_Pxd6PPPLRQHJ"); // 🔑 Public key của bạn

      const result = await emailjs.send("service_mhp6811", "template_dvxolmg", {
        from_name: name,
        from_email: email,
        message: message,
      });

      alert("✅ Gửi email thành công! Thư đã được gửi tới mail của bạn (thông qua jobless@gmail.com)");
      contactForm.reset();
      closePopup(document.getElementById("emailPopup"));
    } catch (error) {
      console.error(error);
      alert("❌ Không thể gửi email. Vui lòng thử lại sau!");
    }
  });
}