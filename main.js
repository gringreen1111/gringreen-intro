// ===== 프로젝트 데이터 =====
// 아래 배열에 프로젝트를 추가/수정하세요.
const projects = [
  {
    id: "smart-sensor",
    title: "ROS2-serving-robot-project",
    summary: "LiDAR/OPENCV 기반 자율 주행 서빙 로봇 프로젝트",
    description:
      "LiDAR/OPENCV 기반 자율 주행 서빙 로봇 프로젝트",
    tags: ["Arduino", "C", "JavaScript"],
    link: "https://github.com/gringreen1111/2025-1-WE-MEET-ROS2-serving-robot-project",
  },
  {
    id: "verilog-cpu",
    title: "51.2-Gbps-4-Parallel-Pipeline-AES-GCM",
    summary: "51.2 Gbps 4-Parallel Pipeline AES-GCM 암호화 가속기 설계",
    description:
      "fpga를 이용한 병렬형 암호화 가속기 설계",
    tags: ["Verilog", "FPGA", "Digital Design"],
    link: "https://github.com/gringreen1111/51.2-Gbps-4-Parallel-Pipeline-AES-GCM-",
  },
];

// ===== 메인 페이지 렌더링 =====
function renderProjectCards() {
  const grid = document.getElementById("project-grid");
  if (!grid) return;

  grid.innerHTML = projects
    .map(
      (p) => `
    <a class="project-card" href="/project.html?id=${p.id}">
      <h3>${p.title}</h3>
      <p>${p.summary}</p>
      <ul class="tag-list">
        ${p.tags.map((t) => `<li class="tag">${t}</li>`).join("")}
      </ul>
    </a>`
    )
    .join("");
}

// ===== 프로젝트 상세 페이지 렌더링 =====
function renderProjectDetail() {
  const detailEl = document.getElementById("project-detail");
  if (!detailEl) return;

  const id = new URLSearchParams(window.location.search).get("id");
  const project = projects.find((p) => p.id === id);

  if (!project) {
    detailEl.innerHTML = "<p>프로젝트를 찾을 수 없습니다.</p>";
    return;
  }

  document.title = `${project.title} | gringreen`;

  detailEl.innerHTML = `
    <h1>${project.title}</h1>
    <p class="description">${project.description}</p>
    <ul class="tag-list">
      ${project.tags.map((t) => `<li class="tag">${t}</li>`).join("")}
    </ul>
    ${project.link ? `<a class="project-link" href="${project.link}" target="_blank" rel="noopener noreferrer">GitHub에서 보기</a>` : ""}
  `;
}

// ===== 타이핑 효과 =====
function initTypingEffect() {
  const target = document.getElementById("typing-target");
  if (!target) return;

  const text = target.textContent;
  target.textContent = "";

  const cursor = document.createElement("span");
  cursor.className = "cursor";
  target.appendChild(cursor);

  let i = 0;
  function type() {
    if (i < text.length) {
      target.insertBefore(document.createTextNode(text[i]), cursor);
      i++;
      setTimeout(type, 50);
    } else {
      setTimeout(() => cursor.remove(), 2000);
    }
  }

  setTimeout(type, 500);
}

// ===== 스크롤 페이드인 (IntersectionObserver) =====
function initScrollFadeIn() {
  const elements = document.querySelectorAll(".fade-in");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));
}

// ===== 네비게이션 스크롤 효과 =====
function initNavScroll() {
  const nav = document.getElementById("nav");
  if (!nav) return;

  const sections = document.querySelectorAll("header, section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  // 스크롤 시 네비 배경 변경
  function updateNav() {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }

    // 현재 섹션 하이라이트
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute("id") || "";
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();
}

// ===== 초기화 =====
document.addEventListener("DOMContentLoaded", () => {
  renderProjectCards();
  renderProjectDetail();
  initTypingEffect();
  initScrollFadeIn();
  initNavScroll();
});
