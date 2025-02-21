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

    // AI聊天机器人拖拽功能
    const aiChat = document.getElementById('aiChat');
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    aiChat.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);

    function startDragging(e) {
        // 排除输入框和按钮的点击
        if (!e.target.closest('input') && !e.target.closest('button')) {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
            isDragging = true;
            aiChat.style.cursor = 'grabbing';
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            // 防止拖出视窗
            const bounds = aiChat.getBoundingClientRect();
            const maxX = window.innerWidth - bounds.width;
            const maxY = window.innerHeight - bounds.height;

            xOffset = Math.min(Math.max(0, currentX), maxX);
            yOffset = Math.min(Math.max(0, currentY), maxY);

            aiChat.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        }
    }

    function stopDragging() {
        isDragging = false;
        aiChat.style.cursor = 'move';
    }
}); 