# MinhSoora Portfolio v2

Thiết kế lại theo phong cách glass morphism (gun.lol inspired).

## Cài đặt

```bash
npm install
npm start
```

## Cấu trúc

```
src/
  App.js              — Router chính
  index.js            — Entry point
  styles/global.css   — Toàn bộ CSS (blur, glass, layout)
  components/
    Navigation.js     — Thanh nav cố định trên đầu (pill style)
    MediaPlayer.js    — Media player góc dưới phải
  pages/
    Home.js           — Trang chủ: Discord status, avatar, quick links
    About.js          — Timeline, tech stack, desktop screenshot
    Projects.js       — GitHub repos live fetch
    Games.js          — Favorite games grid
    Contact.js        — Social links
public/
  bg.jpg              — ← ĐẶT ẢNH NỀN VÀO ĐÂY (bất kỳ ảnh jpg nào)
  icons/              — Tech stack SVG icons
  games/              — Game thumbnail images
  *.mp3               — Nhạc cho media player
```

## Ảnh nền

Đặt file `bg.jpg` vào thư mục `public/`. Ảnh sẽ được tự động blur và dim bởi CSS.
Dùng ảnh phong cảnh, anime, hoặc bất kỳ ảnh gì bạn thích.
