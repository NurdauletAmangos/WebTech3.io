function $(sel, root=document){ return root.querySelector(sel); }
function $all(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }

function initAccordion(){
    $all(".accordion-header").forEach(h=>{
        h.addEventListener("click", ()=>{
            h.classList.toggle("active");
            const c = h.nextElementSibling;
            if(!c) return;
            if(c.style.maxHeight){ c.style.maxHeight=null; c.style.paddingTop="0"; }
            else { c.style.maxHeight=c.scrollHeight+"px"; c.style.paddingTop="10px"; }
        });
    });
}

function initThemeToggle(){
    const btn = $("#themeToggle");
    if(!btn) return;
    btn.addEventListener("click", ()=>{
        const r = document.documentElement;
        const isDark = r.classList.toggle("dark");
        btn.textContent = isDark ? "Ночной режим" : "День/Ночь";
    });
}

function initShowTime(){
    const btn = $("#showTime");
    const out = $("#liveTime");
    if(!btn || !out) return;
    btn.addEventListener("click", ()=>{
        out.textContent = new Date().toLocaleTimeString();
        playBeep();
    });
}

function initReadMore(){
    const text = $("#readmore-text");
    const btn = $("#readmore-btn");
    if(!text || !btn) return;
    btn.addEventListener("click", ()=>{
        const collapsed = text.getAttribute("data-collapsed")==="true";
        text.setAttribute("data-collapsed", collapsed?"false":"true");
        text.style.display = collapsed ? "block" : "-webkit-box";
        btn.textContent = collapsed ? "Скрыть" : "Показать больше";
    });
    text.style.display = "-webkit-box";
    text.style.webkitLineClamp = "2";
    text.style.webkitBoxOrient = "vertical";
    text.style.overflow = "hidden";
}

function initStars(){
    const stars = $all(".star");
    const label = $("#ratingText");
    if(stars.length===0 || !label) return;
    let current = 0;
    function setRating(n){
        current = n;
        stars.forEach((s,i)=>{
            const active = i < n;
            s.classList.toggle("active", active);
            s.setAttribute("aria-checked", String(active));
        });
        label.textContent = n===0 ? "Нет оценки" : `Оценка: ${n}/5`;
    }
    stars.forEach((s,idx)=>{
        s.addEventListener("click", ()=>{ setRating(idx+1); playBeep(); });
    });
    setRating(0);
}

function initGalleryHero(){
    const hero = $("#hero");
    const thumbs = $("#thumbs");
    if(!hero || !thumbs) return;
    thumbs.addEventListener("click", (e)=>{
        const img = e.target.closest("img");
        if(!img) return;
        hero.src = img.src;
        hero.alt = "Просмотр: " + (img.alt||"");
        hero.style.transform = "scale(0.98)";
        setTimeout(()=>hero.style.transform="scale(1)", 120);
    });
}

function initMenuKeyboardNav(){
    const menu = $("#topMenu");
    if(!menu) return;
    const items = $all('[role="menuitem"]', menu);
    if(items.length===0) return;
    menu.addEventListener("keydown", (e)=>{
        if(!["ArrowRight","ArrowLeft","Home","End"].includes(e.key)) return;
        e.preventDefault();
        const idx = items.indexOf(document.activeElement);
        switch(e.key){
            case "ArrowRight": items[(idx+1+items.length)%items.length].focus(); break;
            case "ArrowLeft": items[(idx-1+items.length)%items.length].focus(); break;
            case "Home": items[0].focus(); break;
            case "End": items[items.length-1].focus(); break;
        }
    });
}

function initLoadMore(){
    const btn = $("#loadMore");
    const container = $("#courseCards");
    if(!btn || !container) return;
    const data = [
        {img:"data:image/png;base64,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", title:"JS Async", text:"Промисы, async/await"},
        {img:"data:image/jpeg;base64,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SrfUkshYDo2M5h9Jrpi33PPiqs9mGnT2zP57vsscfdelwocKaQe9i7r2Qpse0uc/uvsHxSV2DYjLcB8IhiYRcc1kcbW37RvWq3XM2Kp3fTDFetUx0u3T7pz85lQbWOvPF+jR/vOWSva3dG8M83pW4yH08McfsYaykkvxDhcj3Luu5E0xEe6MK7dmaa6pn31ZV9ZWuLHRD1SaZ5NyDeODk7dnT3BVzLRRRic8/nOUBcrHVYZWZsHxJrjqHUjQPohrWj9wq+mc2qvJhuU46TRjdPrly19LcLqhuXWxr7V8J+jN/DcrbHtIZumexlRReq3sHkqY2NdW1spciAgICAgICAgICAgICAgICDJN7dQsgssakuKEA+rhsDD1HlJdPAhW3J8PL7qLEY1/un0hAppMkkb/AJj2P8HA/BVRtXVRmJhnPeRzuJefG5UoxiMPJQ6dBsNMGV8V/bysHaZWfcVf0acXIYv/ACFOqxP57pUtcbzTHjNKftlVVeKWu34I5Qk4ybyt/MU/8JqV7Vdjwzzn1RzMXyNcd+WJndHG2Me5oUTOZ/OSzTppxHH5zlhjzmsSbASWBOgJaRp4DwQmOz4PNh8j5FQ6lPxGpD6eiaN8ccrD+uLeS7qnMQotUTTXXO+YXGCn+o8W/ORe8xhX2v4ev83Mt/8AjLXKfqrdpzeeP9Gi83Km5taOieCecqth0cOLfiFW0TtglOvc3yCEbGiJekc72skjB5khYXjiWElp7rnxU5nGETTEzE7vq81CU3B6kRVEUh0AJBPAFpHxXducVRKq/RrtzCC0aDsC4XSyiBAQEBAQEBAQEBAQEBAQEBAQCUBBlpsfHyQlhBZ7Mm2IUX6VCPF4Ctse0p5s/S/YV8pV85u954vefFxVc7V9PZTDaplzuB4Mjb+qwD4JM5RRTpjDSP1m9oUJnYwd570SwgzdB0GETj8E4tF0h1G88LOla34Fabc/o1xy9WG/TP8A7Vqrn6Katn5Qxkm5bDGw911nmctdujTE80dQ7bP39zfIIQ1QEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBB6U8zo3skbo5jmvaeDgbhTE4nMIqpiqJpn3tDxUJYQZadR2hCdjBQEBBbYYfxDFutuH/8Akq6j2dfl6s1729r+7/FUqlpEGSfggwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgsKJ9qSvb85tH7pwVbRP6dfl6s12P17U/u/wAVeqmkQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBBs2QgOaDo62YcbG4U59yJiJmJaqEiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD//Z", title:"Web Audio", text:"Звук в браузере"}
    ];
    btn.addEventListener("click", async ()=>{
        const subset = data.filter((_,i)=>i!==1).map(renderCourseCard);
        subset.forEach(el=>container.appendChild(el));
        btn.disabled = true;
        btn.textContent = "Готово";
        playBeep();
    });
}

function renderCourseCard(item){
    const a = document.createElement("article");
    a.className = "card card--equal";
    a.setAttribute("role","listitem");
    a.innerHTML = `
    <div class="card__media"><img src="${item.img}" alt=""></div>
    <div class="card__content"><h3>${item.title}</h3><p>${item.text}</p></div>
    <p class="card__actions"><a class="btn" href="#">Подробнее</a></p>`;
    return a;
}

function initSoundOnAction(){
    const btn = $("#soundBtn");
    if(!btn) return;
    btn.addEventListener("click", (e)=>{ e.preventDefault(); playBeep(); });
}

function playBeep(){
    const ctx = new (window.AudioContext||window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = 880;
    o.connect(g);
    g.connect(ctx.destination);
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime+0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime+0.15);
    o.start();
    o.stop(ctx.currentTime+0.16);
}

function initLoginValidation(){
    const form = $("#loginForm");
    if(!form) return;
    const emailInput = form.querySelector('input[type="email"]');
    const passwordInput = form.querySelector('input[type="password"]');
    if(!emailInput || !passwordInput) return;

    form.addEventListener("submit", (event)=>{
        event.preventDefault();
        form.querySelectorAll(".error-message").forEach(el=>el.remove());
        let valid = true;

        const emailValue = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(emailValue===""){ showFieldError(emailInput,"Введите логин (email)."); valid=false; }
        else if(!emailPattern.test(emailValue)){ showFieldError(emailInput,"Некорректный формат email."); valid=false; }

        const passwordValue = passwordInput.value.trim();
        if(passwordValue===""){ showFieldError(passwordInput,"Введите пароль."); valid=false; }
        else if(passwordValue.length<6){ showFieldError(passwordInput,"Пароль должен быть не менее 6 символов."); valid=false; }

        if(valid){ alert("Вход выполнен успешно!"); window.location.href="home.html"; }
    });
}

function showFieldError(input, message){
    const error = document.createElement("div");
    error.className = "error-message";
    error.textContent = message;
    input.insertAdjacentElement("afterend", error);
}

function initBackgroundChanger(){
    const btn = $("#background_changer_course");
    if(!btn) return;
    btn.addEventListener("click", ()=>{
        const colors = ["#FFB6B9", "#1d3d75", "#1239d4", "#e46e1f", "#92dd19", "#1717aa"];
        const randomColor = colors[Math.floor(Math.random()*colors.length)];
        document.body.style.backgroundColor = randomColor;
    });
}

function initClockTicker(){
    const clock = $("#Clock");
    if(!clock) return;
    function updateClock(){
        const now = new Date();
        const hh = String(now.getHours()).padStart(2,"0");
        const mm = String(now.getMinutes()).padStart(2,"0");
        const ss = String(now.getSeconds()).padStart(2,"0");
        clock.textContent = `${hh}:${mm}:${ss}`;
    }
    updateClock();
    setInterval(updateClock, 1000);
}

document.addEventListener("DOMContentLoaded", ()=>{
    initAccordion();
    initThemeToggle();
    initShowTime();
    initReadMore();
    initStars();
    initGalleryHero();
    initMenuKeyboardNav();
    initLoadMore();
    initSoundOnAction();
    initLoginValidation();
    initBackgroundChanger();
    initClockTicker();
});
