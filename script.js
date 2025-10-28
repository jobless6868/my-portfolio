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
    e.preventDefault(); // Ngăn form tự reload trang

    const name = contactForm.querySelector('input[name="name"]').value.trim();
    const email = contactForm.querySelector('input[name="email"]').value.trim();
    const message = contactForm.querySelector('textarea[name="message"]').value.trim();

    if (!name || !email || !message) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      const res = await fetch("https://my-portfolio-mhp.onrender.com/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      alert(data.message); // Hiển thị phản hồi từ server

      if (data.success) {
        contactForm.reset();
        closePopup(document.getElementById("emailPopup"));
      }
    } catch (err) {
      console.error(err);
      alert("❌ Không thể gửi email. Kiểm tra lại server hoặc mạng!");
    }
  });
}