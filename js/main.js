// 섹션 파일들을 불러오는 함수
async function loadSections() {
  const sections = ['intro', 'about', 'skills', 'projects', 'contact'];
  const fullpage = document.getElementById('fullpage');
  
  for (const section of sections) {
    try {
      const response = await fetch(`sections/${section}.html`);
      const html = await response.text();
      fullpage.innerHTML += html;
    } catch (error) {
      console.error(`Error loading ${section} section:`, error);
    }
  }
}

// 페이지 로드 시 섹션들을 불러오고 fullPage.js 초기화
document.addEventListener('DOMContentLoaded', async () => {
  await loadSections();
  
  // fullPage.js 초기화
  const fullpageInstance = new fullpage('#fullpage', {
    scrollingSpeed: 1000,
    responsiveWidth: 1000,
    afterLoad: function(origin, destination, direction) {
      updateSectionTitle();
      updateActiveNavItem(destination.index);
    },
    onLeave: function(origin, destination, direction) {
      const titles = document.querySelectorAll('.typing');
      if (destination.index === 0) {
        titles[0].classList.add('visible');
        titles[1].classList.add('hidden');
        titles[1].classList.remove('visible');
      } else if (origin.index === 0) {
        titles[0].classList.remove('visible');
        titles[1].classList.remove('hidden');
        titles[1].classList.add('visible');
      }
      
      updateSectionTitle(destination.index);
      updateActiveNavItem(destination.index);
    }
  });

  // 네비게이션 메뉴 클릭 이벤트 추가
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      fullpageInstance.moveTo(index + 1); // fullPage.js는 1부터 시작하는 인덱스를 사용
    });
  });

  // 초기 타이틀 업데이트
  updateSectionTitle(0);
});

// 인트로 섹션의 타이핑 애니메이션 효과
const typingText = document.querySelector('.typing');
const text = typingText.textContent;
typingText.textContent = '';

let i = 0;
function typeWriter() {
    if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// 페이지 로드 시 타이핑 애니메이션 시작
document.addEventListener('DOMContentLoaded', () => {
    typeWriter();
});

// 스킬 바 애니메이션 효과
const skillBars = document.querySelectorAll('.skill-level');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.getAttribute('data-width');
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    bar.setAttribute('data-width', width);
    observer.observe(bar);
});

// 이메일 복사 기능
const emailLink = document.querySelector('a[href^="mailto"]');
if (emailLink) {
    emailLink.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailLink.getAttribute('href').replace('mailto:', '');
        navigator.clipboard.writeText(email).then(() => {
            alert('Email copied to clipboard!');
        });
    });
}

// GSAP ScrollTrigger 플러그인 초기화
gsap.registerPlugin(ScrollTrigger);

// 쇼케이스 섹션 애니메이션 설정
const showcaseSection = document.querySelector('#showcase');
const imageContainers = document.querySelectorAll('.image-container');
const showcaseText = document.querySelector('.showcase-text');

// 쇼케이스 텍스트 초기 애니메이션
gsap.from(showcaseText, {
  opacity: 0,
  y: 50,
  duration: 1,
  scrollTrigger: {
    trigger: showcaseSection,
    start: "top center",
    end: "bottom center",
    toggleActions: "play none none reverse"
  }
});

// 이미지 컨테이너 애니메이션 설정
imageContainers.forEach((container, index) => {
  const image = container.querySelector('.showcase-image');
  const text = container.querySelector('.image-text');
  
  // 각 컨테이너별 타임라인 생성
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      pin: true,
      pinSpacing: true
    }
  });
  
  // 타임라인에 애니메이션 추가
  tl.fromTo(container,
    { opacity: 0, y: 100 },
    { opacity: 1, y: 0, duration: 1 }
  )
  .fromTo(image,
    { scale: 1.2 },
    { scale: 1, duration: 1 },
    "-=0.5"
  )
  .fromTo(text,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5 },
    "-=0.5"
  );
  
  // 컨테이너가 활성화될 때 클래스 추가
  ScrollTrigger.create({
    trigger: container,
    start: "top center",
    end: "bottom center",
    onEnter: () => container.classList.add('active'),
    onLeaveBack: () => container.classList.remove('active')
  });
});

// 섹션 타이틀 정의
const sectionTitles = {
    'intro': 'Home',
    'about': 'About Me',
    'skills': 'Skills',
    'projects': 'Projects',
    'contact': 'Contact'
};

// 섹션 타이틀 업데이트 함수
function updateSectionTitle(sectionIndex) {
    const sectionTitles = ['HOME', 'ABOUT', 'SKILLS', 'PROJECTS', 'CONTACT'];
    const titleElement = document.querySelector('.section-title');
    if (titleElement) {
        titleElement.textContent = sectionTitles[sectionIndex];
    }
}

// 스크롤 이벤트 리스너 추가 - 부드러운 텍스트 전환 효과
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const introSection = document.getElementById('intro');
    const rect = introSection.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    const titles = document.querySelectorAll('.typing');
    
    if (rect.top >= 0) {
        // 인트로 섹션이 완전히 보일 때
        titles[0].classList.remove('hidden');
        titles[0].classList.add('visible');
        titles[1].classList.add('hidden');
        titles[1].classList.remove('visible');
    } else {
        // 인트로 섹션을 지나 스크롤할 때
        titles[0].classList.add('hidden');
        titles[0].classList.remove('visible');
        titles[1].classList.remove('hidden');
        titles[1].classList.add('visible');
    }
    
    lastScrollTop = scrollTop;
});

// 현재 활성화된 네비게이션 메뉴 아이템 업데이트 함수
function updateActiveNavItem(sectionIndex) {
    const navItems = document.querySelectorAll('.nav-menu li');
    navItems.forEach((item, index) => {
        if (index === sectionIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}
