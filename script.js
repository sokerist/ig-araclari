const translations = {
    tr: {
        title: "Instagram Araçları | Anonim Görüntüleyici",
        descProfile: "Kullanıcı adını yaz ve tam boy HD profil fotoğrafını görüntüle.",
        descPosts: "Kullanıcı adını yaz ve tüm gönderilerini anonim olarak incele.",
        descVideo: "Instagram Reels veya Video linkini yapıştır ve indir.",
        descStory: "Kullanıcı adını yaz ve aktif hikayeleri görüntüle.",
        descHighlight: "Kullanıcı adını yaz ve öne çıkan albümleri listele.",
        placeholderUser: "kullaniciadi", placeholderUrl: "https://www.instagram.com/reel/...",
        btnGet: "Getir", btnDownload: "İndir", btnLoadMore: "Daha Fazla Yükle"
    },
    en: {
        title: "Instagram Tools | Anonymous Viewer",
        descProfile: "Enter username to view full size HD profile picture.",
        descPosts: "Enter username to anonymously view all posts.",
        descVideo: "Paste Instagram Reels link to download.",
        descStory: "Enter username to view all active stories.",
        descHighlight: "Enter username to list all Highlights.",
        placeholderUser: "username", placeholderUrl: "https://www.instagram.com/reel/...",
        btnGet: "Get", btnDownload: "Download", btnLoadMore: "Load More"
    }
};

let currentLang = 'tr';
let currentMode = window.PAGE_MODE || 'profile'; 

const elements = {
    tabs: document.querySelectorAll('.tab-btn'),
    mainInput: document.getElementById('mainInput'),
    inputIcon: document.getElementById('inputIcon'),
    descText: document.getElementById('descText'),
    searchBtn: document.getElementById('searchBtn')
};

function updateUI() {
    const t = translations[currentLang];
    const modeMap = {
        'profile': { desc: t.descProfile, place: t.placeholderUser, icon: 'fa-user-circle' },
        'posts': { desc: t.descPosts, place: t.placeholderUser, icon: 'fa-border-all' },
        'video': { desc: t.descVideo, place: t.placeholderUrl, icon: 'fa-play' },
        'story': { desc: t.descStory, place: t.placeholderUser, icon: 'fa-clock-rotate-left' },
        'highlight': { desc: t.descHighlight, place: t.placeholderUser, icon: 'fa-star' }
    };

    // Metinleri ve İkonu Güncelle
    elements.descText.textContent = modeMap[currentMode].desc;
    elements.mainInput.placeholder = modeMap[currentMode].place;
    elements.inputIcon.innerHTML = `<i class="fa-solid ${modeMap[currentMode].icon}"></i>`;

    // Mavi (Aktif) Butonu Ayarla
    elements.tabs.forEach(btn => btn.classList.remove('active'));
    const activeId = 'tab' + currentMode.charAt(0).toUpperCase() + currentMode.slice(1);
    const activeBtn = document.getElementById(activeId);
    if(activeBtn) activeBtn.classList.add('active');
}

// Sayfa Yüklendiğinde Çalıştır
window.addEventListener('DOMContentLoaded', () => {
    updateUI();
    
    // Butonlara Tıklama (Yönlendirme) Özelliği Ekle
    const routeMap = {
        'tabProfile': '/',
        'tabPosts': '/gonderiler.html',
        'tabVideo': '/reels-indir.html',
        'tabStory': '/hikaye-izle.html',
        'tabHighlight': '/one-cikanlar.html'
    };

    elements.tabs.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = routeMap[btn.id];
        });
    });

    // Vanta Arka Plan (Görsellik)
    if(typeof VANTA !== 'undefined') {
        VANTA.CLOUDS({ el: "#vanta-bg", mouseControls: true, touchControls: true, gyroControls: false, minHeight: 200.00, minWidth: 200.00, backgroundColor: 0x0, skyColor: 0x5ca6ca, cloudColor: 0x334d80, cloudShadowColor: 0x182030, speed: 1.50 });
    }
});

window.addEventListener('DOMContentLoaded', () => {
    // Butonları link gibi çalıştıran motor
    const routeMap = {
        'tabProfile': '/',
        'tabPosts': '/gonderiler.html',
        'tabVideo': '/reels-indir.html',
        'tabStory': '/hikaye-izle.html',
        'tabHighlight': '/one-cikanlar.html'
    };

    Object.keys(routeMap).forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => {
                window.location.href = routeMap[id];
            });
        }
    });
});