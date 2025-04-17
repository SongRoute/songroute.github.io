document.addEventListener('DOMContentLoaded', function() {
    const introSection = document.getElementById('intro');
    const hiddenTyping = document.querySelector('.typing.hidden');
    let hasScrolled = false;
    let hasShownSecondText = false;

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const introHeight = introSection.offsetHeight;

        // 첫 번째 스크롤에서 hidden 타이핑을 보이게 함
        if (scrollPosition > windowHeight * 1 && !hasShownSecondText) {
            hiddenTyping.classList.add('show');
            hasShownSecondText = true;
            // 첫 번째 스크롤 후 스크롤 위치를 조정
            window.scrollTo({
                top: windowHeight * 1,
                behavior: 'smooth'
            });
        }

        // 두 번째 스크롤에서 about 섹션으로 이동
        if (scrollPosition > windowHeight * 0.5 && hasShownSecondText && !hasScrolled) {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
                hasScrolled = true;
            }
        }
    });
}); 