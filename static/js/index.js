window.HELP_IMPROVE_VIDEOJS = false;

// More Works Dropdown Functionality
function toggleMoreWorks() {
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');

    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        button.classList.add('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
    const container = document.querySelector('.more-works-container');
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');

    if (container && !container.contains(event.target)) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Close dropdown on escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        const dropdown = document.getElementById('moreWorksDropdown');
        const button = document.querySelector('.more-works-btn');
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    const copyText = button.querySelector('.copy-text');

    if (bibtexElement) {
        navigator.clipboard.writeText(bibtexElement.textContent).then(function () {
            // Success feedback
            button.classList.add('copied');
            copyText.textContent = 'Cop';

            setTimeout(function () {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        }).catch(function (err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = bibtexElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);

            button.classList.add('copied');
            copyText.textContent = 'Cop';
            setTimeout(function () {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        });
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Scroll to main content (from cover page)
function scrollToContent(event) {
    event.preventDefault();
    const target = document.getElementById('main-content');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
}

// Show/hide scroll to top button
window.addEventListener('scroll', function () {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

// ===== Collapsible Results =====
function toggleResults() {
    const panel = document.getElementById('resultsCollapsible');
    const btn = document.getElementById('collapseToggle');
    const label = btn.querySelector('.collapse-text');
    const isCollapsed = panel.classList.toggle('collapsed');

    btn.classList.toggle('expanded', !isCollapsed);
    label.textContent = isCollapsed ? 'Expand' : 'Collapse';

    if (!isCollapsed) {
        const firstActive = document.querySelector('.filter-tab.active');
        if (firstActive) firstActive.click();
    }
}

// ===== Video Results: Category Filtering =====
function setupFilterTabs() {
    const tabs = document.querySelectorAll('.filter-tab');
    const cards = document.querySelectorAll('.video-card');

    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const cat = tab.dataset.category;

            cards.forEach((card, i) => {
                const show = card.dataset.category === cat;
                card.classList.toggle('hidden', !show);
                if (show) {
                    card.classList.remove('fade-in');
                    void card.offsetWidth;
                    card.style.animationDelay = (i * 0.04) + 's';
                    card.classList.add('fade-in');
                }
            });
        });
    });
}

// ===== Lazy-load + viewport autoplay =====
function setupVideoObserver() {
    const videos = document.querySelectorAll('.lazy-video');
    if (!videos.length) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                const src = video.querySelector('source');
                if (src && src.dataset.src && !src.getAttribute('src')) {
                    src.setAttribute('src', src.dataset.src);
                    video.load();
                }
                video.play().catch(() => { });
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.25 });

    videos.forEach(v => io.observe(v));
}

$(document).ready(function () {
    // Check for click events on the navbar burger icon

    var options = {
        slidesToScroll: 1,
        slidesToShow: 1,
        loop: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
    }

    // Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    bulmaSlider.attach();

    setupFilterTabs();
    setupVideoObserver();

})
