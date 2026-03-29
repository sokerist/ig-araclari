const translations = {
    tr: {
        title: "Instagram Araçları | Anonim Görüntüleyici", heading: "Instagram Araçları",
        descProfile: "Kullanıcı adını yaz ve tam boy HD profil fotoğrafını görüntüle.",
        descPosts: "Kullanıcı adını yaz ve tüm gönderilerini (fotoğraf/video) anonim olarak incele.",
        descVideo: "Instagram Reels veya Video linkini yapıştır ve indir.",
        descStory: "Kullanıcı adını yaz ve aktif olan tüm hikayeleri görüntüle.",
        descHighlight: "Kullanıcı adını yaz ve tüm öne çıkan (Highlight) albümlerini listele.",
        tabProfile: "PROFİL", tabPosts: "GÖNDERİLER", tabVideo: "REELS / VİDEO", tabStory: "HİKAYE", tabHighlight: "ÖNE ÇIKANLAR",
        placeholderUser: "kullaniciadi", placeholderUrl: "https://www.instagram.com/reel/...",
        btnGet: "Getir", btnDownload: "İndir",
        errEmpty: "Lütfen aramak için bir kullanıcı adı veya link girin.",
        errNotFound: "Kayıt bulunamadı! Lütfen bilgileri kontrol edin (Hesap gizli olabilir).",
        errStory: "Hikaye bulunamadı. Kullanıcı paylaşım yapmamış veya hesap gizli.",
        errHighlight: "Öne çıkan albüm bulunamadı veya hesap gizli.",
        errVideo: "Video bulunamadı. Linki yanlış kopyalamış olabilirsiniz veya hesap gizli.",
        errSystem: "Sistemsel bir hata oluştu. Lütfen tekrar deneyin.",
        toastSearching: "Veriler aranıyor, lütfen bekleyin...",
        faqHeading: "Sıkça Sorulan Sorular",
        faq1Q: "Karşı tarafın haberi olur mu?", faq1A: "Hayır, işlemleriniz %100 anonim olarak sunucularımız üzerinden gerçekleşir. Karşı tarafa bildirim veya iz gitmez.",
        faq2Q: "Gizli profilleri görebilir miyim?", faq2A: "Gizli profillerin sadece HD profil fotoğraflarını görüntüleyebilirsiniz. Gönderi veya hikayeler için hesapların herkese açık olması gerekmektedir.",
        faq3Q: "Bu araç ücretsiz mi?", faq3A: "Evet, sitemizdeki tüm araçları günlük limitler dahilinde tamamen ücretsiz, şifresiz ve reklamsız olarak kullanabilirsiniz.",
        footerText: "Instagram™ ile herhangi bir bağlantımız yoktur. Sunucularımızda Instagram içeriği barındırılmamaktadır. Tüm hakları kendi sahiplerine aittir. Gizliliğe saygı duyuyoruz — yalnızca herkese açık içerikler görüntülenebilir.",
        btnModalDl: "İndir", menuOpen: "Tam Boyutta Aç", menuCopy: "Bağlantıyı Kopyala", menuDl: "Medyayı İndir", toastCopied: "Panoya kopyalandı!"
    },
    en: {
        title: "Instagram Tools | Anonymous Viewer", heading: "Instagram Tools",
        descProfile: "Enter username to view and download full size HD profile picture.",
        descPosts: "Enter username to anonymously view all posts (photos/videos).",
        descVideo: "Paste Instagram Reels or Video link to download.",
        descStory: "Enter username to view all active stories.",
        descHighlight: "Enter username to list all featured (Highlight) albums.",
        tabProfile: "PROFILE", tabPosts: "POSTS", tabVideo: "REELS / VIDEO", tabStory: "STORY", tabHighlight: "HIGHLIGHTS",
        placeholderUser: "username", placeholderUrl: "https://www.instagram.com/reel/...",
        btnGet: "Get", btnDownload: "Download",
        errEmpty: "Please enter a username or link to search.",
        errNotFound: "No records found! Please check the info (Account might be private).",
        errStory: "No stories found. User may not have posted or account is private.",
        errHighlight: "No highlights found or account is private.",
        errVideo: "Video not found. Please check the link or account might be private.",
        errSystem: "A system error occurred. Please try again later.",
        toastSearching: "Searching for data, please wait...",
        faqHeading: "Frequently Asked Questions",
        faq1Q: "Will the user know I viewed their profile?", faq1A: "No, all processes are 100% anonymous through our servers. No notifications or traces are left behind.",
        faq2Q: "Can I view private profiles?", faq2A: "You can only view HD profile pictures of private accounts. For posts and stories, the account must be public.",
        faq3Q: "Is this tool free?", faq3A: "Yes, you can use all tools on our site completely free, without passwords and ad-free, within daily limits.",
        footerText: "We are not affiliated with Instagram™. We do not host any Instagram content. All rights belong to their respective owners. We respect privacy — only public content is available.",
        btnModalDl: "Download", menuOpen: "Open Full Size", menuCopy: "Copy Link", menuDl: "Download Media", toastCopied: "Copied to clipboard!"
    }
};

let currentLang = 'tr'; let currentMode = 'profile'; let contextMediaUrl = '';

const elements = {
    tabs: document.querySelectorAll('.tab-btn'), mainInput: document.getElementById('mainInput'),
    inputIcon: document.getElementById('inputIcon'), descText: document.getElementById('descText'),
    searchBtn: document.getElementById('searchBtn'), profileImage: document.getElementById('profileImage'),
    resultVideo: document.getElementById('resultVideo'), galleryContainer: document.getElementById('galleryContainer'),
    toastContainer: document.getElementById('toastContainer'), searchHistory: document.getElementById('searchHistory'),
    mediaModal: document.getElementById('mediaModal'), modalImage: document.getElementById('modalImage'),
    modalVideo: document.getElementById('modalVideo'), closeModalBtn: document.querySelector('.close-modal'),
    modalPrev: document.getElementById('modalPrev'), modalNext: document.getElementById('modalNext'),
    modalCounter: document.getElementById('modalCounter'), modalDownloadBtn: document.getElementById('modalDownloadBtn'),
    modalCopyBtn: document.getElementById('modalCopyBtn'), modalDlText: document.getElementById('modalDlText'),
    contextMenu: document.getElementById('customContextMenu'), menuOpen: document.getElementById('menuOpen'),
    menuCopy: document.getElementById('menuCopy'), menuDownload: document.getElementById('menuDownload'),
    downloadBtn: document.getElementById('downloadBtn')
};

// --- YENİ: APPLE (iOS) İÇİN HAYALET SAYFA VE ZORUNLU İNDİRİCİ ---
async function forceDownload(url, isVideo) {
    // 1. Cihazın Apple (iOS/Mac) olup olmadığını anla
    const isIOS = /Mac|iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    // 2. Eğer Apple ise ve Video indiriyorsa, Hayalet Sayfa (Phantom Page) taktiğini devreye sok!
    if (isIOS && isVideo) {
        // Pop-up engelleyiciye takılmamak için yeni sekmeyi anında senkron açıyoruz
        const win = window.open('', '_blank');
        if (win) {
            // Saf video yerine, Safariyi kandıracak şık bir HTML sayfası basıyoruz
            win.document.write(`
                <!DOCTYPE html>
                <html lang="tr">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                    <title>Videoyu İndir</title>
                    <style>
                        body { margin: 0; background: #0a0a0a; color: #fff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; padding: 20px; box-sizing: border-box; }
                        video { max-width: 100%; max-height: 65vh; border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); background: #000; border: 1px solid rgba(255,255,255,0.1); }
                        .info-box { background: rgba(255, 255, 255, 0.08); padding: 20px; border-radius: 16px; margin-top: 25px; text-align: center; border: 1px solid rgba(255,255,255,0.15); backdrop-filter: blur(10px); width: 100%; max-width: 400px; animation: slideUp 0.5s ease; }
                        .info-title { margin: 0 0 10px 0; font-size: 16px; font-weight: 700; color: #fff; display: flex; align-items: center; justify-content: center; gap: 8px; }
                        .info-desc { margin: 0; font-size: 14px; color: #a1a1aa; line-height: 1.5; font-weight: 400; }
                        .apple-badge { background: #10b981; color: #fff; padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
                        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                    </style>
                </head>
                <body>
                    <video src="${url}" controls playsinline autoplay loop></video>
                    <div class="info-box">
                        <p class="info-title"><span class="apple-badge">Apple iOS</span> İndirme Yöntemi</p>
                        <p class="info-desc">Yukarıdaki videonun üzerine <b>uzun basılı tutun</b> ve açılan menüden <b style="color: #fff;">"Videoyu Kaydet"</b> veya <b style="color: #fff;">"Bağlantılı Dosyayı İndir"</b> seçeneğine tıklayın.</p>
                    </div>
                </body>
                </html>
            `);
            win.document.close();
        } else {
            showToast('Lütfen tarayıcınızın Pop-up engelleyicisini kapatın!', 'error');
        }
        return; // Apple işlemini burada sonlandır.
    }

    // 3. Apple değilse (veya resimse), normal Android/PC Zorunlu İndirme (Blob) Tünelini Kullan
    showToast('İndirme hazırlanıyor, lütfen bekleyin...', 'info');
    try {
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error('CORS Hatası');
        
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = blobUrl;
        const ext = isVideo ? 'mp4' : 'jpg';
        a.download = `ig_download_${new Date().getTime()}.${ext}`;
        
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(blobUrl);
        document.body.removeChild(a);
        showToast('İndirme başarılı!', 'success');
    } catch (error) {
        // Eğer Android/PC'de bile tünel tıkanırsa (çok büyük video), son çare olarak normal aç
        window.open(url, '_blank');
    }
}

// MANYETİK BUTON MOTORU
elements.searchBtn.addEventListener('mousemove', (e) => {
    const rect = elements.searchBtn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2; const y = e.clientY - rect.top - rect.height / 2;
    elements.searchBtn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`; elements.searchBtn.style.transition = 'none';
});
elements.searchBtn.addEventListener('mouseleave', () => { elements.searchBtn.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'; elements.searchBtn.style.transform = 'translate(0px, 0px)'; });

function attachSpotlightEffect(div) {
    div.addEventListener('mousemove', (e) => {
        const rect = div.getBoundingClientRect(); const x = e.clientX - rect.left; const y = e.clientY - rect.top;
        div.style.setProperty('--mouse-x', `${x}px`); div.style.setProperty('--mouse-y', `${y}px`);
    });
}
function attachCinematicLoad(element) {
    element.classList.remove('loaded');
    if(element.tagName === 'IMG') { if(element.complete) element.classList.add('loaded'); else element.onload = () => element.classList.add('loaded'); } 
    else if(element.tagName === 'VIDEO') { if(element.readyState >= 3) element.classList.add('loaded'); else element.onloadeddata = () => element.classList.add('loaded'); }
}
function showContextMenu(e, url) {
    e.preventDefault(); contextMediaUrl = url; elements.contextMenu.style.display = 'block';
    let x = e.clientX; let y = e.clientY; let menuWidth = elements.contextMenu.offsetWidth; let menuHeight = elements.contextMenu.offsetHeight;
    if (x + menuWidth > window.innerWidth) x -= menuWidth; if (y + menuHeight > window.innerHeight) y -= menuHeight;
    elements.contextMenu.style.left = `${x}px`; elements.contextMenu.style.top = `${y}px`;
}

document.addEventListener('click', () => { elements.contextMenu.style.display = 'none'; });
window.addEventListener('scroll', () => { elements.contextMenu.style.display = 'none'; });
elements.menuOpen.onclick = () => { window.open(contextMediaUrl, '_blank'); };
elements.menuDownload.onclick = () => { forceDownload(contextMediaUrl, contextMediaUrl.includes('.mp4')); };
elements.menuCopy.onclick = () => { navigator.clipboard.writeText(contextMediaUrl); showToast('toastCopied', 'success', false); };
elements.modalCopyBtn.onclick = () => {
    let url = currentMediaArray[currentMediaIndex].url; navigator.clipboard.writeText(url);
    let icon = elements.modalCopyBtn.querySelector('i'); icon.className = 'fa-solid fa-check'; icon.style.color = '#10b981'; showToast('toastCopied', 'success', false);
    setTimeout(() => { icon.className = 'fa-solid fa-link'; icon.style.color = ''; }, 2000);
};

function loadHistory() {
    if (currentMode === 'video') { elements.searchHistory.style.display = 'none'; return; }
    let history = JSON.parse(localStorage.getItem('ig_history_v2') || '[]'); if(history.length === 0) { elements.searchHistory.style.display = 'none'; return; }
    elements.searchHistory.style.display = 'flex'; elements.searchHistory.innerHTML = '';
    history.forEach(item => {
        let tag = document.createElement('div'); tag.className = 'history-tag';
        let fallbackPic = `https://ui-avatars.com/api/?name=${item.user}&background=007acc&color=fff&rounded=true&bold=true`;
        tag.innerHTML = `<img src="${item.pic ? item.pic : fallbackPic}" class="history-img" alt="${item.user}"> <span>${item.user}</span>`;
        tag.onclick = () => { elements.mainInput.value = item.user; elements.searchBtn.click(); }; elements.searchHistory.appendChild(tag);
    });
}
function saveHistory(username, picUrl = null) {
    if(currentMode === 'video' || !username) return;
    let history = JSON.parse(localStorage.getItem('ig_history_v2') || '[]'); history = history.filter(item => item.user !== username); history.unshift({ user: username, pic: picUrl }); 
    if(history.length > 4) history.pop(); localStorage.setItem('ig_history_v2', JSON.stringify(history)); loadHistory();
}
function cleanInput(val) {
    let cleaned = val.trim(); if(currentMode === 'video') return cleaned; 
    if(cleaned.includes('instagram.com/')) { try { let url = new URL(cleaned.startsWith('http') ? cleaned : 'https://' + cleaned); let pathParts = url.pathname.split('/').filter(p => p.length > 0); if(pathParts.length > 0 && pathParts[0] !== 'p' && pathParts[0] !== 'reel' && pathParts[0] !== 'tv') { cleaned = pathParts[0]; } } catch(e) {} }
    if(cleaned.startsWith('@')) cleaned = cleaned.substring(1); cleaned = cleaned.split('?')[0].split('/')[0]; return cleaned;
}
function changeLanguage(lang) {
    currentLang = lang; updateUI(); document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active-lang'));
    const activeBtn = document.querySelector(`.lang-btn[title="${lang === 'tr' ? 'Türkçe' : 'English'}"]`); if(activeBtn) activeBtn.classList.add('active-lang');
}
function updateUI() {
    const t = translations[currentLang]; document.title = t.title; document.getElementById('mainHeading').textContent = t.heading; document.getElementById('btnText').textContent = t.btnGet;
    document.getElementById('tabProfile').querySelector('.tab-text').textContent = t.tabProfile; document.getElementById('tabPosts').querySelector('.tab-text').textContent = t.tabPosts;
    document.getElementById('tabVideo').querySelector('.tab-text').textContent = t.tabVideo; document.getElementById('tabStory').querySelector('.tab-text').textContent = t.tabStory;
    document.getElementById('tabHighlight').querySelector('.tab-text').textContent = t.tabHighlight;
    document.getElementById('faqHeading').textContent = t.faqHeading; document.getElementById('faq1Q').textContent = t.faq1Q; document.getElementById('faq1A').textContent = t.faq1A;
    document.getElementById('faq2Q').textContent = t.faq2Q; document.getElementById('faq2A').textContent = t.faq2A; document.getElementById('faq3Q').textContent = t.faq3Q; document.getElementById('faq3A').textContent = t.faq3A;
    document.getElementById('footerText').textContent = t.footerText; document.getElementById('menuTextOpen').textContent = t.menuOpen; document.getElementById('menuTextCopy').textContent = t.menuCopy;
    document.getElementById('menuTextDl').textContent = t.menuDl; elements.modalDlText.textContent = t.btnModalDl; updateModeText();
}
function updateModeText() {
    const t = translations[currentLang]; const modeMap = { 'profile': { desc: t.descProfile, place: t.placeholderUser }, 'posts': { desc: t.descPosts, place: t.placeholderUser }, 'video': { desc: t.descVideo, place: t.placeholderUrl }, 'story': { desc: t.descStory, place: t.placeholderUser }, 'highlight': { desc: t.descHighlight, place: t.placeholderUser } };
    elements.descText.textContent = modeMap[currentMode].desc; elements.mainInput.placeholder = modeMap[currentMode].place;
}
function showToast(msgKey, type = 'error', directMsg = false) {
    const msg = directMsg ? msgKey : (translations[currentLang][msgKey] || msgKey);
    const toast = document.createElement('div'); toast.className = `toast ${type}`; let icon = type === 'error' ? 'fa-circle-exclamation' : (type === 'success' ? 'fa-check-circle' : 'fa-info-circle');
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${msg}</span>`; elements.toastContainer.appendChild(toast); setTimeout(() => { if(toast.parentElement) toast.remove(); }, 3000);
}
function showSkeleton() {
    elements.profileImage.style.display = 'none'; elements.resultVideo.style.display = 'none'; elements.downloadBtn.style.display = 'none'; elements.galleryContainer.innerHTML = ''; elements.galleryContainer.style.display = 'grid';
    if (currentMode === 'profile' || currentMode === 'video') { elements.galleryContainer.style.display = 'flex'; elements.galleryContainer.innerHTML = `<div class="skeleton-box skeleton-profile"></div>`; } 
    else { for(let i=0; i<6; i++) { elements.galleryContainer.innerHTML += `<div class="gallery-item"><div class="skeleton-box skeleton-gallery"></div></div>`; } }
}
function hideSkeleton() { elements.galleryContainer.innerHTML = ''; }
function switchTab(mode, iconClass, btnId) {
    currentMode = mode; elements.tabs.forEach(btn => btn.classList.remove('active')); document.getElementById(btnId).classList.add('active');
    elements.inputIcon.innerHTML = `<i class="fa-solid ${iconClass}"></i>`; elements.galleryContainer.style.display = 'none'; elements.galleryContainer.innerHTML = '';
    elements.profileImage.style.display = 'none'; elements.resultVideo.style.display = 'none'; elements.downloadBtn.style.display = 'none'; elements.mainInput.value = ''; updateModeText(); loadHistory(); 
}

document.getElementById('tabProfile').addEventListener('click', () => switchTab('profile', 'fa-user-circle', 'tabProfile'));
document.getElementById('tabPosts').addEventListener('click', () => switchTab('posts', 'fa-border-all', 'tabPosts'));
document.getElementById('tabVideo').addEventListener('click', () => switchTab('video', 'fa-play', 'tabVideo'));
document.getElementById('tabStory').addEventListener('click', () => switchTab('story', 'fa-clock-rotate-left', 'tabStory'));
document.getElementById('tabHighlight').addEventListener('click', () => switchTab('highlight', 'fa-star', 'tabHighlight'));

function getMediaUrl(item) {
    let url = null; let isVideo = false;
    if (item.urls && item.urls.length > 0) { url = item.urls[0].url; } else if (item.video_versions && item.video_versions.length > 0) { url = item.video_versions[0].url; isVideo = true; } else if (item.image_versions2 && item.image_versions2.candidates) { url = item.image_versions2.candidates[0].url; } else if (item.video_url) { url = item.video_url; isVideo = true; } else if (item.display_url) { url = item.display_url; } else if (item.url) { url = item.url; }
    if(url && url.includes('.mp4')) isVideo = true; return { url, isVideo };
}
function forceHdUrl(url) { if(!url) return url; return url.replace(/\/s\d+x\d+\//g, '/').replace(/\/c\d+\.\d+\.\d+\.\d+[a-zA-Z]*\//g, '/'); }

elements.searchBtn.addEventListener('click', async function() {
    let rawInputValue = elements.mainInput.value; if (rawInputValue.trim() === '') { showToast('errEmpty'); return; }
    const inputValue = cleanInput(rawInputValue); elements.mainInput.value = inputValue; showToast('toastSearching', 'info'); showSkeleton();
    let apiUrl = ''; let payload = {};
    if (currentMode === 'profile') { apiUrl = 'https://instagram120.p.rapidapi.com/api/instagram/userInfo'; payload = { username: inputValue }; } 
    else if (currentMode === 'posts') { apiUrl = 'https://instagram120.p.rapidapi.com/api/instagram/posts'; payload = { username: inputValue, maxId: '' }; } 
    else if (currentMode === 'video') { apiUrl = 'https://instagram120.p.rapidapi.com/api/instagram/links'; payload = { url: inputValue }; } 
    else if (currentMode === 'story') { apiUrl = 'https://instagram120.p.rapidapi.com/api/instagram/stories'; payload = { username: inputValue }; }
    else if (currentMode === 'highlight') { apiUrl = 'https://instagram120.p.rapidapi.com/api/instagram/highlights'; payload = { username: inputValue }; }

    const controller = new AbortController(); const timeoutId = setTimeout(() => controller.abort(), 15000);
    const options = { method: 'POST', headers: { 'x-rapidapi-key': 'e85b603960msh904e3ba53ac93dbp1c3ff8jsn852b00b91449', 'x-rapidapi-host': 'instagram120.p.rapidapi.com', 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: controller.signal };

    try {
        const response = await fetch(apiUrl, options); clearTimeout(timeoutId); hideSkeleton(); let data = await response.json(); 
        if (currentMode === 'profile') {
            let hdImageUrl = null; if (data && data.result && data.result.length > 0 && data.result[0].user) { const userObj = data.result[0].user; hdImageUrl = userObj.hd_profile_pic_url_info?.url || userObj.profile_pic_url_hd || userObj.profile_pic_url; }
            if (hdImageUrl) {
                const proxyUrl = `https://wsrv.nl/?url=${encodeURIComponent(hdImageUrl)}`; elements.profileImage.src = proxyUrl; elements.profileImage.style.display = 'block'; attachCinematicLoad(elements.profileImage);
                showToast(translations[currentLang].btnGet + " başarılı!", 'success', true); saveHistory(inputValue, proxyUrl); 
                elements.downloadBtn.style.display = 'flex'; elements.downloadBtn.onclick = (e) => { e.preventDefault(); forceDownload(proxyUrl, false); };
                elements.profileImage.style.cursor = 'pointer'; elements.profileImage.onclick = () => openModal([{url: hdImageUrl, isVideo: false}]); elements.profileImage.oncontextmenu = (e) => showContextMenu(e, proxyUrl);
            } else { showToast("errNotFound"); }
            return;
        }

        let items = []; if (currentMode === 'posts') { if (data && data.result && data.result.edges) { items = data.result.edges.map(edge => edge.node); } else if (data && data.edges) { items = data.edges.map(edge => edge.node); } } else { items = Array.isArray(data) ? data : (data.result ? data.result : [data]); }
        if (!items || items.length === 0 || !items[0]) { if (currentMode === 'story') showToast("errStory"); else if (currentMode === 'highlight') showToast("errHighlight"); else if (currentMode === 'video') showToast("errVideo"); else showToast("errNotFound"); return; }

        elements.galleryContainer.style.display = 'grid'; showToast("Sonuçlar bulundu!", 'success', true);
        let extractedPic = null; if (items && items.length > 0 && items[0].user && items[0].user.profile_pic_url) { extractedPic = `https://wsrv.nl/?url=${encodeURIComponent(items[0].user.profile_pic_url)}`; } saveHistory(inputValue, extractedPic);

        if (currentMode === 'highlight') {
            items.forEach((album, index) => {
                let albumId = album.id || album.highlightId; let title = album.title || "Albüm"; let rawCoverUrl = album.cover_media?.image_versions2?.candidates?.[0]?.url || album.cover_media?.cropped_image_version?.url || album.cover;
                if(!albumId) return; let finalCoverUrl = rawCoverUrl ? `https://wsrv.nl/?url=${encodeURIComponent(forceHdUrl(rawCoverUrl))}` : 'https://via.placeholder.com/250x250/0e0e0e/007acc?text=Album';
                const div = document.createElement('div'); div.className = 'gallery-item'; div.style.cursor = 'pointer'; div.style.animationDelay = `${index * 0.05}s`;
                div.innerHTML = `<img src="${finalCoverUrl}" class="cinematic-media" style="height:250px; object-fit:cover;"> <div style="padding: 15px; text-align: center; background: rgba(0, 122, 204, 0.8); color: #fff; font-weight: bold; display:flex; align-items:center; justify-content:center; gap:8px;"><i class="fa-solid fa-folder-open"></i> ${title}</div>`;
                div.onclick = () => loadHighlightStories(albumId); const img = div.querySelector('img'); if(img) attachCinematicLoad(img); attachSpotlightEffect(div); elements.galleryContainer.appendChild(div);
            }); return;
        }

        if (currentMode === 'posts') {
            items.forEach((item, index) => {
                let mediaArray = []; if (item.carousel_media && item.carousel_media.length > 0) { mediaArray = item.carousel_media; } else if (item.edge_sidecar_to_children && item.edge_sidecar_to_children.edges) { mediaArray = item.edge_sidecar_to_children.edges.map(e => e.node); } else { mediaArray = [item]; }
                if(mediaArray.length === 0) return; let cleanMediaList = mediaArray.map(m => getMediaUrl(m)).filter(m => m.url); if(cleanMediaList.length === 0) cleanMediaList = [getMediaUrl(item)]; let coverMedia = cleanMediaList[0];
                let captionText = item.caption && item.caption.text ? item.caption.text.substring(0, 80) + "..." : ""; if (!captionText && item.edge_media_to_caption && item.edge_media_to_caption.edges.length > 0) { captionText = item.edge_media_to_caption.edges[0].node.text.substring(0, 80) + "..."; }
                let likes = item.like_count ? `<i class="fa-solid fa-heart" style="color:#ef4444;"></i> ${item.like_count}` : ""; if(!likes && item.edge_media_preview_like) likes = `<i class="fa-solid fa-heart" style="color:#ef4444;"></i> ${item.edge_media_preview_like.count}`;
                let comments = item.comment_count ? `<i class="fa-solid fa-comment" style="color:#007acc;"></i> ${item.comment_count}` : ""; if(!comments && item.edge_media_to_comment) comments = `<i class="fa-solid fa-comment" style="color:#007acc;"></i> ${item.edge_media_to_comment.count}`;

                let mediaHtml = coverMedia.isVideo ? `<video src="${coverMedia.url}" autoplay muted loop playsinline class="cinematic-media"></video>` : `<img src="https://wsrv.nl/?url=${encodeURIComponent(coverMedia.url)}" class="cinematic-media">`;
                let badgeHtml = ''; if (cleanMediaList.length > 1) { badgeHtml = `<div class="carousel-badge"><i class="fa-solid fa-clone"></i></div>`; } else if (coverMedia.isVideo) { badgeHtml = `<div class="carousel-badge"><i class="fa-solid fa-video"></i></div>`; }

                const div = document.createElement('div'); div.className = 'gallery-item'; div.style.animationDelay = `${index * 0.05}s`; 
                div.innerHTML = `
                    ${badgeHtml} ${mediaHtml}
                    <div style="padding: 12px; font-size: 14px; background: #0e0e0e; color: #ddd; text-align:left; pointer-events:none;">
                        <div style="display:flex; gap:15px; margin-bottom:8px; font-weight:bold;"><span>${likes}</span> <span>${comments}</span></div>
                        <p style="color:#8a8a8a; font-size:12px;">${captionText}</p>
                    </div>
                    <a href="javascript:void(0)" onclick="forceDownload('${coverMedia.url}', ${coverMedia.isVideo})" class="dl-btn-small"><i class="fa-solid fa-download"></i> ${translations[currentLang].btnDownload}</a>`;
                
                const mediaEl = div.querySelector('img, video'); if(mediaEl) { attachCinematicLoad(mediaEl); mediaEl.addEventListener('click', () => openModal(cleanMediaList)); mediaEl.oncontextmenu = (e) => showContextMenu(e, coverMedia.url); }
                attachSpotlightEffect(div); elements.galleryContainer.appendChild(div);
            }); return;
        }

        if (items.length > 1 || currentMode === 'story') {
            items.forEach((item, index) => {
                const media = getMediaUrl(item); if(!media.url) return; const div = document.createElement('div'); div.className = 'gallery-item'; div.style.animationDelay = `${index * 0.05}s`; 
                let badgeHtml = media.isVideo ? `<div class="carousel-badge"><i class="fa-solid fa-video"></i></div>` : '';
                div.innerHTML = `
                    ${badgeHtml} ${media.isVideo ? `<video src="${media.url}" autoplay muted loop playsinline class="cinematic-media"></video>` : `<img src="https://wsrv.nl/?url=${encodeURIComponent(media.url)}" class="cinematic-media">`}
                    <a href="javascript:void(0)" onclick="forceDownload('${media.url}', ${media.isVideo})" class="dl-btn-small"><i class="fa-solid fa-download"></i> ${translations[currentLang].btnDownload}</a>`;
                const mediaEl = div.querySelector('img, video'); if(mediaEl) { attachCinematicLoad(mediaEl); mediaEl.addEventListener('click', () => openModal([media])); mediaEl.oncontextmenu = (e) => showContextMenu(e, media.url); }
                attachSpotlightEffect(div); elements.galleryContainer.appendChild(div);
            });
        } else {
            elements.galleryContainer.style.display = 'none'; const media = getMediaUrl(items[0]); if (!media.url) { showToast("errVideo"); return; }
            if (media.isVideo) { elements.resultVideo.src = media.url; elements.resultVideo.style.display = 'block'; attachCinematicLoad(elements.resultVideo); elements.resultVideo.oncontextmenu = (e) => showContextMenu(e, media.url); } 
            else { elements.profileImage.src = `https://wsrv.nl/?url=${encodeURIComponent(media.url)}`; elements.profileImage.style.display = 'block'; attachCinematicLoad(elements.profileImage); elements.profileImage.oncontextmenu = (e) => showContextMenu(e, media.url); }
            elements.downloadBtn.style.display = 'flex'; elements.downloadBtn.onclick = (e) => { e.preventDefault(); forceDownload(media.url, media.isVideo); };
        }
    } catch (error) { clearTimeout(timeoutId); hideSkeleton(); showToast("errSystem"); }
});

async function loadHighlightStories(highlightId) {
    showToast('toastSearching', 'info'); showSkeleton();
    const controller = new AbortController(); const timeoutId = setTimeout(() => controller.abort(), 15000);
    const options = { method: 'POST', headers: { 'x-rapidapi-key': 'e85b603960msh904e3ba53ac93dbp1c3ff8jsn852b00b91449', 'x-rapidapi-host': 'instagram120.p.rapidapi.com', 'Content-Type': 'application/json' }, body: JSON.stringify({ highlightId: highlightId }), signal: controller.signal };

    try {
        const response = await fetch('https://instagram120.p.rapidapi.com/api/instagram/highlightStories', options); clearTimeout(timeoutId); hideSkeleton(); let data = await response.json(); 
        let items = Array.isArray(data) ? data : (data.result ? data.result : [data]); if (!items || items.length === 0 || !items[0]) { showToast("errHighlight"); return; }
        elements.galleryContainer.style.display = 'grid';
        items.forEach((item, index) => {
            const media = getMediaUrl(item); if(!media.url) return; const div = document.createElement('div'); div.className = 'gallery-item'; div.style.animationDelay = `${index * 0.05}s`; 
            let badgeHtml = media.isVideo ? `<div class="carousel-badge"><i class="fa-solid fa-video"></i></div>` : '';
            div.innerHTML = `
                ${badgeHtml} ${media.isVideo ? `<video src="${media.url}" autoplay muted loop playsinline class="cinematic-media"></video>` : `<img src="https://wsrv.nl/?url=${encodeURIComponent(media.url)}" class="cinematic-media">`}
                <a href="javascript:void(0)" onclick="forceDownload('${media.url}', ${media.isVideo})" class="dl-btn-small"><i class="fa-solid fa-download"></i> İndir</a>`;
            const mediaEl = div.querySelector('img, video'); if(mediaEl) { attachCinematicLoad(mediaEl); mediaEl.addEventListener('click', () => openModal([media])); mediaEl.oncontextmenu = (e) => showContextMenu(e, media.url); }
            attachSpotlightEffect(div); elements.galleryContainer.appendChild(div);
        });
    } catch (error) { clearTimeout(timeoutId); hideSkeleton(); showToast("errSystem"); }
}

document.querySelectorAll('.accordion-header').forEach(button => { button.addEventListener('click', () => { const content = button.nextElementSibling; button.classList.toggle('active'); if (button.classList.contains('active')) { content.style.maxHeight = content.scrollHeight + 'px'; } else { content.style.maxHeight = 0; } }); });

let currentMediaArray = []; let currentMediaIndex = 0;
function openModal(mediaArray) {
    if(!mediaArray || mediaArray.length === 0) return; currentMediaArray = mediaArray; currentMediaIndex = 0;
    elements.mediaModal.style.display = 'block'; document.body.style.overflow = 'hidden'; updateModalContent();
}
function updateModalContent() {
    const media = currentMediaArray[currentMediaIndex]; elements.modalImage.style.display = 'none'; elements.modalVideo.style.display = 'none'; elements.modalVideo.pause(); elements.modalVideo.src = "";
    if (media.isVideo) { elements.modalVideo.src = media.url; elements.modalVideo.style.display = 'block'; elements.modalVideo.load(); elements.modalVideo.oncontextmenu = (e) => showContextMenu(e, media.url); } 
    else { elements.modalImage.src = `https://wsrv.nl/?url=${encodeURIComponent(media.url)}`; elements.modalImage.style.display = 'block'; elements.modalImage.oncontextmenu = (e) => showContextMenu(e, media.url); }
    elements.modalDownloadBtn.onclick = (e) => { e.preventDefault(); forceDownload(media.url, media.isVideo); };
    if (currentMediaArray.length > 1) { elements.modalPrev.style.display = currentMediaIndex > 0 ? 'flex' : 'none'; elements.modalNext.style.display = currentMediaIndex < currentMediaArray.length - 1 ? 'flex' : 'none'; elements.modalCounter.style.display = 'block'; elements.modalCounter.textContent = `${currentMediaIndex + 1} / ${currentMediaArray.length}`; } else { elements.modalPrev.style.display = 'none'; elements.modalNext.style.display = 'none'; elements.modalCounter.style.display = 'none'; }
}
function nextMedia() { if (currentMediaIndex < currentMediaArray.length - 1) { currentMediaIndex++; updateModalContent(); } }
function prevMedia() { if (currentMediaIndex > 0) { currentMediaIndex--; updateModalContent(); } }
function closeModal() { elements.mediaModal.style.display = 'none'; elements.modalVideo.pause(); elements.modalVideo.src = ""; document.body.style.overflow = 'auto'; }

elements.modalNext.addEventListener('click', nextMedia); elements.modalPrev.addEventListener('click', prevMedia);
if (elements.closeModalBtn) elements.closeModalBtn.addEventListener('click', closeModal);
if (elements.mediaModal) elements.mediaModal.addEventListener('click', e => { if (e.target === elements.mediaModal || e.target.classList.contains('modal-content')) closeModal(); });
document.addEventListener('keydown', e => { if (elements.mediaModal.style.display === 'block') { if (e.key === 'Escape') closeModal(); if (e.key === 'ArrowRight') nextMedia(); if (e.key === 'ArrowLeft') prevMedia(); } });

async function autoDetect() { try { const res = await fetch('https://ipapi.co/json/'); const data = await res.json(); changeLanguage(data.country_code === 'TR' ? 'tr' : 'en'); } catch (e) { changeLanguage('tr'); } loadHistory(); }
autoDetect();

window.addEventListener('DOMContentLoaded', () => { VANTA.CLOUDS({ el: "#vanta-bg", mouseControls: true, touchControls: true, gyroControls: false, minHeight: 200.00, minWidth: 200.00, backgroundColor: 0x0, skyColor: 0x5ca6ca, cloudColor: 0x334d80, cloudShadowColor: 0x182030, sunColor: 0xffffff, sunGlareColor: 0xffffff, sunPosition: {x: 0, y: 0, z: 0}, speed: 1.50 }); });