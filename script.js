* { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
body { background-color: #050505; color: #f8fafc; overflow-x: hidden; }
#vanta-bg { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1; }

.page-wrapper { display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 850px; margin: 60px auto; padding: 0 20px; z-index: 10; position: relative; }

.container { background: rgba(14, 14, 14, 0.75); backdrop-filter: blur(20px); padding: 50px 40px; border-radius: 28px; border: 1px solid rgba(255, 255, 255, 0.08); width: 100%; text-align: center; }

.main-logo { width: 50px; margin-bottom: 15px; }
h1 { font-size: 32px; font-weight: 800; margin-bottom: 10px; }
#descText { color: #8a8a8a; margin-bottom: 35px; }

.tabs { display: flex; justify-content: center; gap: 10px; margin-bottom: 30px; flex-wrap: wrap; }
.tab-btn { background: rgba(255,255,255,0.03); color: #8a8a8a; border: none; padding: 12px 20px; border-radius: 12px; cursor: pointer; transition: 0.3s; font-weight: 600; }
.tab-btn.active { background: #007acc; color: #fff; box-shadow: 0 10px 20px rgba(0,122,204,0.3); }

.search-box { display: flex; background: rgba(0,0,0,0.4); border-radius: 20px; padding: 10px; border: 1px solid rgba(255,255,255,0.1); max-width: 600px; margin: 0 auto; }
.input-wrapper { display: flex; align-items: center; flex: 1; padding-left: 15px; }
.at-symbol { color: #007acc; margin-right: 10px; }
input { background: transparent; border: none; outline: none; color: #fff; width: 100%; padding: 10px; font-size: 16px; }

#searchBtn { background: #007acc; color: #fff; border: none; padding: 12px 25px; border-radius: 14px; cursor: pointer; font-weight: 800; }

.info-container { margin-top: 40px; width: 100%; }
.accordion-item { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 15px; margin-bottom: 10px; }
.accordion-header { width: 100%; padding: 20px; background: none; border: none; color: #fff; text-align: left; cursor: pointer; display: flex; justify-content: space-between; }
.accordion-content { padding: 0 20px 20px; color: #8a8a8a; display: none; }

@media (max-width: 600px) {
    .container { padding: 30px 20px; }
    h1 { font-size: 24px; }
    .tab-btn { padding: 10px 15px; font-size: 12px; }
}