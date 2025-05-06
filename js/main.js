// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 立即执行所有初始化函数，确保内容显示
    try {
        // 添加主标题动态效果
        setupHeroSection();
        
        // 导航菜单交互
        setupMobileMenu();
        
        // 微信二维码弹窗
        setupWechatModal();
        
        // 平台卡片动画
        setupCardAnimations();
        
        // 平行视差效果
        setupParallaxEffect();
        
        // 滚动动画
        setupScrollAnimations();
        
        // 创建科技粒子效果
        createParticles();
        
        // 添加平滑滚动效果
        setupSmoothScroll();
        
        // 添加滚动进度指示器
        setupScrollIndicator();
        
        // 优化导航栏滚动效果
        setupNavbarScroll();
        
        console.log('所有初始化函数已执行');
    } catch (error) {
        console.error('初始化过程中出错:', error);
    }
});

// 为主标题区域添加动态效果
function setupHeroSection() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    // 添加闪烁星星背景
    const dynamicStars = document.createElement('div');
    dynamicStars.className = 'dynamic-stars';
    
    // 添加辐射背景
    const heroBgGlow = document.createElement('div');
    heroBgGlow.className = 'hero-bg-glow';
    
    // 添加向下滚动指示器
    const scrollDownIndicator = document.createElement('div');
    scrollDownIndicator.className = 'scroll-down-indicator';
    scrollDownIndicator.innerHTML = `
        <span>向下滚动</span>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
    `;
    
    // 创建星星
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // 随机大小
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // 随机位置
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // 随机动画时间
        const duration = Math.random() * 3 + 2;
        star.style.setProperty('--twinkle-duration', `${duration}s`);
        
        // 随机延迟
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        dynamicStars.appendChild(star);
    }
    
    // 将元素添加到hero section
    heroSection.appendChild(dynamicStars);
    heroSection.appendChild(heroBgGlow);
    heroSection.appendChild(scrollDownIndicator);
    
    // 确保标题是可见的
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle) {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }
    
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '1';
        heroSubtitle.style.transform = 'translateY(0)';
    }
    
    // 添加滚动事件，控制元素淡出
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const heroHeight = heroSection.offsetHeight;
        
        // 随着滚动让元素淡出
        if (scrollTop < heroHeight) {
            const opacity = 1 - (scrollTop / (heroHeight * 0.5));
            scrollDownIndicator.style.opacity = opacity > 0 ? opacity : 0;
        }
    }, { passive: true });
}

// 为标题创建漂浮文字效果
function createFloatingEffect(element, maxDistance = 10) {
    if (!element) return;
    
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    
    // 随机生成目标位置
    function updateTarget() {
        tx = Math.random() * maxDistance * 2 - maxDistance;
        ty = Math.random() * maxDistance * 2 - maxDistance;
    }
    
    // 平滑移动到目标位置
    function animate() {
        x += (tx - x) * 0.03;
        y += (ty - y) * 0.03;
        
        element.style.transform = `translate(${x}px, ${y}px)`;
        
        // 如果接近目标，则生成新目标
        if (Math.abs(tx - x) < 0.5 && Math.abs(ty - y) < 0.5) {
            updateTarget();
        }
        
        requestAnimationFrame(animate);
    }
    
    updateTarget();
    animate();
}

// 平滑滚动效果
function setupSmoothScroll() {
    // 为所有内部链接添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // 添加过渡效果
            const mask = document.createElement('div');
            mask.className = 'page-transition-mask';
            document.body.appendChild(mask);
            
            setTimeout(() => {
                mask.classList.add('active');
                
                setTimeout(() => {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    setTimeout(() => {
                        mask.classList.remove('active');
                        setTimeout(() => mask.remove(), 600);
                    }, 400);
                }, 300);
            }, 10);
        });
    });
    
    // 优化滚动性能
    let isScrolling;
    window.addEventListener('scroll', function() {
        // 添加滚动中的类
        document.body.classList.add('is-scrolling');
        
        // 清除之前的超时
        window.clearTimeout(isScrolling);
        
        // 设置超时以检测滚动停止
        isScrolling = setTimeout(function() {
            document.body.classList.remove('is-scrolling');
        }, 100);
    }, { passive: true });
}

// 滚动进度指示器
function setupScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.innerHTML = '<div class="scroll-indicator-bar"></div>';
    document.body.appendChild(indicator);
    
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        // 显示指示器
        indicator.classList.add('visible');
        
        // 清除之前的超时
        clearTimeout(scrollTimeout);
        
        // 设置超时以隐藏指示器
        scrollTimeout = setTimeout(function() {
            indicator.classList.remove('visible');
        }, 2000);
        
        // 计算滚动进度
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        // 更新指示器样式
        indicator.style.background = `conic-gradient(#1e88e5 ${scrollPercentage}%, rgba(255, 255, 255, 0.1) 0%)`;
    }, { passive: true });
}

// 优化导航栏滚动效果
function setupNavbarScroll() {
    const navbar = document.querySelector('nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 向下滚动超过100px时添加样式
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // 记录上次滚动位置
        lastScrollTop = scrollTop;
    }, { passive: true });
}

// 语言切换功能
document.querySelector('.language-switcher button')?.addEventListener('click', function() {
    const langSwitcher = document.querySelector('.language-switcher');
    
    if (!document.querySelector('.lang-dropdown')) {
        const dropdown = document.createElement('div');
        dropdown.className = 'lang-dropdown absolute top-full right-0 mt-2 bg-white shadow-lg rounded py-2 w-24';
        dropdown.innerHTML = `
            <a href="?lang=zh" class="block px-4 py-2 hover:bg-gray-100">中文</a>
            <a href="?lang=en" class="block px-4 py-2 hover:bg-gray-100">English</a>
        `;
        langSwitcher.appendChild(dropdown);
        
        // 点击外部关闭下拉菜单
        document.addEventListener('click', function closeDropdown(e) {
            if (!langSwitcher.contains(e.target)) {
                dropdown.remove();
                document.removeEventListener('click', closeDropdown);
            }
        });
    } else {
        document.querySelector('.lang-dropdown').remove();
    }
});

// 创建科技感粒子
function createParticles() {
    // 获取所有粒子容器
    const containers = document.querySelectorAll('.particles-container');
    if (containers.length === 0) return;
    
    containers.forEach(container => {
        // 增加粒子数量，为每个容器创建更多粒子
        const particleCount = container.id === 'particles-container' ? 50 : 
                             (container.id === 'hero-particles' ? 60 : 40);
        
        // 清空容器中已有的粒子（避免重复创建）
        container.innerHTML = '';
        
        // 创建网格以确保粒子均匀分布
        const cols = 10;
        const rows = 10;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // 随机大小，主要部分粒子更大
            const size = container.id === 'hero-particles' 
                        ? Math.random() * 12 + 3  // 英雄区粒子更大
                        : Math.random() * 8 + 3;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // 使用网格均匀分布位置，并添加少量随机性
            const row = Math.floor(i / cols);
            const col = i % cols;
            
            const baseX = (col / cols) * 100;
            const baseY = (row / rows) * 100;
            
            // 添加一些随机偏移让分布更自然
            const randomOffsetX = Math.random() * 10 - 5;
            const randomOffsetY = Math.random() * 10 - 5;
            
            const posX = Math.min(Math.max(baseX + randomOffsetX, 0), 100);
            const posY = Math.min(Math.max(baseY + randomOffsetY, 0), 100);
            
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            
            // 随机透明度，区域不同透明度不同
            const opacity = container.id === 'hero-particles' 
                           ? Math.random() * 0.7 + 0.3  // 英雄区粒子更明显
                           : Math.random() * 0.6 + 0.2;
            particle.style.backgroundColor = `rgba(52, 152, 219, ${opacity})`;
            
            // 添加阴影使粒子更明显
            particle.style.boxShadow = `0 0 ${Math.floor(size / 2) + 3}px rgba(52, 152, 219, 0.7)`;
            
            // 随机动画时间 - 使动画更平滑持续更长
            const duration = Math.random() * 30 + 15;
            particle.style.animationDuration = `${duration}s`;
            
            // 随机延迟，确保不同时间出现
            const delay = Math.random() * 15;
            particle.style.animationDelay = `${delay}s`;
            
            container.appendChild(particle);
        }
    });
    
    // 为平台卡片添加鼠标跟随效果
    const cards = document.querySelectorAll('.platform-card, .use-case-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            if (document.body.classList.contains('is-scrolling')) return;
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // 鼠标在卡片内的X坐标
            const y = e.clientY - rect.top;  // 鼠标在卡片内的Y坐标
            
            // 计算旋转角度，最大±10度
            const rotateY = ((x / rect.width) - 0.5) * 10;
            const rotateX = ((y / rect.height) - 0.5) * -10;
            
            // 应用3D变换
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            
            // 光泽效果
            const glowX = (x / rect.width) * 100;
            const glowY = (y / rect.height) * 100;
            this.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(52, 152, 219, 0.15) 0%, rgba(6, 32, 58, 0.7) 60%)`;
        });
        
        // 鼠标离开时恢复
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.background = '';
        });
    });
    
    // 添加全局鼠标移动效果，让粒子随鼠标微微移动
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        document.querySelectorAll('.particle').forEach(particle => {
            const moveX = (mouseX - 0.5) * 30; // 增大移动范围
            const moveY = (mouseY - 0.5) * 30;
            
            // 使用transform属性结合随机偏移使粒子产生更明显的"跟随"效果
            particle.style.transform = `translate(${moveX * Math.random()}px, ${moveY * Math.random()}px)`;
        });
    });
}

// 优化滚动动画
function setupScrollAnimations() {
    // 添加自定义动画类
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            @keyframes twinkle {
                0%, 100% { opacity: 0.2; }
                50% { opacity: 0.8; }
            }
        </style>
    `);
    
    // 检查浏览器是否支持 IntersectionObserver
    if ('IntersectionObserver' in window) {
        const scrollElements = document.querySelectorAll('.animate-on-scroll');
        
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 添加延迟阶梯效果
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, delay);
                    
                    // 一旦元素显示，停止观察它
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        scrollElements.forEach(el => {
            observer.observe(el);
        });
        
        // 确保平台卡片总是可见的
        document.querySelectorAll('.platform-card').forEach(card => {
            card.classList.add('animate-in');
        });
    } else {
        // 如果浏览器不支持 IntersectionObserver，确保所有元素都可见
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.add('animate-in');
        });
    }
    
    // 添加视差滚动效果
    setupParallaxScroll();
}

// 视差滚动效果
function setupParallaxScroll() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset;
                
                parallaxElements.forEach(el => {
                    const speed = el.dataset.speed || 0.5;
                    const yPos = -(scrollTop * speed);
                    el.style.transform = `translateY(${yPos}px)`;
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    }, { passive: true });
}

// 平行视差效果
function setupParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    const parallaxBg = document.querySelector('.parallax-bg');
    if (!parallaxBg) return;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const limit = heroSection.offsetHeight;
        
        if (scrollTop <= limit) {
            parallaxBg.style.transform = `translateY(${scrollTop * 0.5}px)`;
        }
    }, { passive: true });
}

// 移动端菜单
function setupMobileMenu() {
    const menuButton = document.querySelector('.menu-button');
    const navLinks = document.querySelector('.md\\:flex');
    
    if (menuButton && navLinks) {
        menuButton.addEventListener('click', function() {
            // 创建移动菜单
            if (!document.querySelector('.mobile-menu')) {
                const mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu fixed inset-0 bg-white z-40 p-4 flex flex-col';
                mobileMenu.innerHTML = `
                    <div class="flex justify-end">
                        <button class="close-mobile-menu">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="flex-1 flex flex-col justify-center items-center space-y-6 text-xl">
                        ${navLinks.innerHTML}
                    </div>
                `;
                document.body.appendChild(mobileMenu);
                
                // 关闭按钮事件
                document.querySelector('.close-mobile-menu').addEventListener('click', function() {
                    document.querySelector('.mobile-menu').remove();
                });
                
                // 点击链接后关闭菜单
                document.querySelectorAll('.mobile-menu a').forEach(link => {
                    link.addEventListener('click', function() {
                        document.querySelector('.mobile-menu').remove();
                    });
                });
            }
        });
    }
}

// 微信二维码弹窗
function setupWechatModal() {
    const wechatBtn = document.querySelector('.wechat-btn');
    const wechatModal = document.querySelector('.wechat-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (wechatBtn && wechatModal && closeModal) {
        wechatBtn.addEventListener('click', function() {
            wechatModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
        
        closeModal.addEventListener('click', function() {
            wechatModal.classList.add('hidden');
            document.body.style.overflow = '';
        });
        
        // 点击弹窗外部关闭弹窗
        wechatModal.addEventListener('click', function(e) {
            if (e.target === wechatModal) {
                wechatModal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    }
}

// 卡片动画效果
function setupCardAnimations() {
    const platformCards = document.querySelectorAll('.platform-card');
    const useCaseCards = document.querySelectorAll('.use-case-card');
    
    // 为平台卡片添加Hover动画
    platformCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.card-icon').style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.card-icon').style.transform = '';
        });
    });
    
    // 应用场景卡片轮播
    if (useCaseCards.length > 0) {
        // 简易轮播效果
        let currentIndex = 0;
        const cardContainer = document.querySelector('.use-case-slider');
        
        // 仅在小屏幕下启用轮播
        if (window.innerWidth < 768 && cardContainer) {
            setInterval(() => {
                currentIndex = (currentIndex + 1) % useCaseCards.length;
                const scrollPos = useCaseCards[currentIndex].offsetLeft;
                cardContainer.scrollTo({ left: scrollPos, behavior: 'smooth' });
            }, 4000);
        }
    }
} 