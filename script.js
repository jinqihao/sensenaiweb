// 轮播图功能
document.addEventListener('DOMContentLoaded', function() {
    // 开场动画控制
    const splashScreen = document.querySelector('.splash-screen');
    const body = document.body;
    
    setTimeout(() => {
        splashScreen.classList.add('fade-out');
        body.classList.add('loaded');
        
        // 完全移除 splash screen
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 500);
    }, 2000);

    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    let currentSlide = 0;
    const slideCount = slides.length;

    // 自动轮播
    function autoSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }

    let slideInterval = setInterval(autoSlide, 5000);

    // 更新轮播图位置
    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    // 上一张按钮
    prevButton.addEventListener('click', () => {
        clearInterval(slideInterval);
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
        slideInterval = setInterval(autoSlide, 5000);
    });

    // 下一张按钮
    nextButton.addEventListener('click', () => {
        clearInterval(slideInterval);
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
        slideInterval = setInterval(autoSlide, 5000);
    });
}); 