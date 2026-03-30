const translations = {
    tr: {
        descProfile: "Kullanıcı adını yaz ve tam boy HD profil fotoğrafını görüntüle.",
        descPosts: "Kullanıcı adını yaz ve tüm gönderilerini anonim olarak incele.",
        descVideo: "Instagram Reels veya Video linkini yapıştır ve indir.",
        descStory: "Kullanıcı adını yaz ve aktif hikayeleri görüntüle.",
        descHighlight: "Kullanıcı adını yaz ve öne çıkanları görüntüle.",
        placeUser: "kullaniciadi", placeUrl: "https://instagram.com/reels/..."
    },
    en: {
        descProfile: "Enter username to view full size HD profile picture.",
        descPosts: "Enter username to view posts anonymously.",
        descVideo: "Paste Reels link to download.",
        descStory: "Enter username to view stories.",
        descHighlight: "Enter username to view highlights.",
        placeUser: "username", placeUrl: "https://instagram.com/reels/..."
    }
};

let currentLang = 'tr';
let currentMode = 'profile';

const elements = {
    tabs: document.querySelectorAll('.tab-btn'),
    mainInput: document.getElementById('mainInput'),
    inputIcon: document.getElementById('inputIcon'),
    descText: document.getElementById('descText'),
    searchBtn: document.getElementById('searchBtn'),
    langToggle: document.getElementById('langToggle'),
    langMenu: document.getElementById('langMenu')
};

function switchTab(mode) {
    currentMode = mode;
    const t = translations[currentLang];
    const modeMap = {
        'profile': { desc: t.descProfile, place: t.placeUser, icon: 'fa-user-circle' },
        'posts': { desc: t.descPosts, place: t.placeUser, icon: 'fa-border-all' },
        'video': { desc: t.descVideo, place: t.placeUrl, icon: 'fa-play' },
        'story': { desc: t.descStory, place: t.placeUser, icon: 'fa-clock-rotate-left' },
        'highlight': { desc: t.descHighlight, place: t.placeUser, icon: 'fa-star' }
    };

    elements.descText.textContent = modeMap[mode].desc;
    elements.mainInput.placeholder = modeMap[mode].place;
    elements.inputIcon.innerHTML = `<i class="fa-solid ${modeMap[mode].icon}"></i>`;
    
    elements.tabs.forEach(btn => btn.classList.remove('active'));
    const targetId = 'tab' + mode.charAt(0).toUpperCase() + mode.slice(1);
    document.getElementById(targetId).classList.add('active');
    
    // Temizlik
    document.getElementById('galleryContainer').innerHTML = '';
    document.getElementById('profileImage').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    // Sekme Tıklamaları
    elements.tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.id.replace('tab', '').toLowerCase();
            switchTab(mode);
        });
    });

    // Dil Menüsü
    elements.langToggle.onclick = () => elements.langMenu.classList.toggle('open');

    // Başlangıç Modu
    switchTab('profile');

    // Vanta Arka Plan
    VANTA.CLOUDS({
        el: "#vanta-bg",
        mouseControls: true, touchControls: true, gyroControls: false,
        minHeight: 200.00, minWidth: 200.00,
        backgroundColor: 0x0, skyColor: 0x5ca6ca, cloudColor: 0x334d80
    });
});

// changeLanguage fonksiyonunu global yap
window.changeLanguage = (lang, img) => {
    currentLang = lang;
    document.getElementById('activeLangIcon').src = img;
    elements.langMenu.classList.remove('open');
    switchTab(currentMode);
};