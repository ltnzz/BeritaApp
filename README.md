Ini versi README.md yang sudah di-upgrade jadi jauh lebih profesional, lengkap dengan badge, placeholder GIF, dan *architecture diagram*. Tinggal *copy-paste*\! 🚀

````markdown
<div align="center">
  <h1>📰 News App</h1>
  <p>Aplikasi berita mobile berbasis <strong>React Native (Expo)</strong> dengan fitur lengkap: pencarian realtime, filter presisi, bookmark offline, dan dark mode interaktif.</p>

  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" alt="React Query" />
</div>

<br />

<div align="center">
  <img src="./assets/screenshots/demo.gif" alt="App Demo" width="250" />
</div>

---

## ✨ Features

- **📰 Smart News Feed:** Menampilkan berita berdasarkan kategori dengan *infinite scroll (pagination)* dan *skeleton loading* yang mulus.
- **🔎 Realtime Search:** Pencarian berita instan dengan *debounce 500ms* (terpisah dari kategori).
- **🏷️ Advanced Filter:** Saring berita berdasarkan sumber spesifik dan rentang tanggal (*from - to*).
- **⭐ Offline Bookmarks:** Simpan artikel favorit kamu untuk dibaca nanti tanpa koneksi internet (menggunakan `AsyncStorage`).
- **🌙 Dynamic Dark Mode:** *Toggle light/dark mode* yang tersinkronisasi otomatis dengan *navigation theme* dan tersimpan secara permanen.
- **📤 Native Share:** Bagikan artikel menarik langsung ke aplikasi lain dengan mulus.

---

## 🏗️ Architecture & Tech Stack

Aplikasi ini dibangun dengan mengutamakan performa dan *clean architecture*:

* **Framework:** React Native dengan Expo & Expo Router
* **Language:** TypeScript untuk *type safety*
* **State Management:** Context API (Theme, Search) & React Query (Server State)
* **Local Storage:** AsyncStorage (Bookmarks & Theme Persistence)
* **Navigation:** React Navigation
* **Data Source:** News API

### 🧩 Architecture Diagram (High-Level)
```text
[ UI Components ] <---> [ Hooks (useNews, useBookmarks) ]
                              |
                              v
[ Context API ]   <---> [ React Query (Caching & Fetching) ]
(Theme, Search)               |
                              v
[ AsyncStorage ]        [ News API Service ]
(Offline Data)          (External Data Source)
````

-----

## 📸 Screenshots

\<div align="center"\>
\<table\>
\<tr\>
\<td align="center"\>\<b\>🏠 Home Screen\</b\>\</td\>
\<td align="center"\>\<b\>🔎 Search\</b\>\</td\>
\<td align="center"\>\<b\>🏷️ Filter\</b\>\</td\>
\</tr\>
\<tr\>
\<td\>\<img src="./assets/screenshots/img1.png" width="200" alt="Home"\>\</td\>
\<td\>\<img src="./assets/screenshots/img2.png" width="200" alt="Search"\>\</td\>
\</tr\>
\<tr\>
\<td align="center"\>\<b\>⭐ Bookmarks\</b\>\</td\>
\<td align="center"\>\<b\>🌙 Dark Mode\</b\>\</td\>
\<td\>\</td\>
\</tr\>
\<tr\>
\<td\>\<img src="./assets/screenshots/bookmarks.png" width="200" alt="Bookmarks"\>\</td\>
\<td\>\<img src="./assets/screenshots/darkmode.png" width="200" alt="Dark Mode"\>\</td\>
\<td\>\</td\>
\</tr\>
\</table\>
\</div\>

-----

## 📁 Project Structure

```text
app/
├── (tabs)/
│   ├── index.tsx         # Home feed
│   ├── bookmarks.tsx     # Offline saved articles
components/
├── NewsCard.tsx          # Reusable article card
├── FilterBar.tsx         # Date & source filter UI
├── CategoryFilter.tsx    # Horizontal category list
├── ErrorView.tsx         # Fallback error component
context/
├── ThemeContext.tsx      # Dark/Light mode management
├── SearchContext.tsx     # Global search state
hooks/
├── useNews.ts            # React Query wrapper for news
├── useNewsSearch.ts      # Search logic with debounce
├── useBookmarks.ts       # AsyncStorage logic for saved items
├── useDebounce.ts        # Custom debounce hook
services/
├── newsService.ts        # Axios/Fetch API calls
types/
├── index.ts              # TypeScript interfaces
```

-----

## ⚙️ Installation & Setup

1.  **Clone repository ini**

    ```bash
    git clone <repo-url>
    cd news-app
    ```

2.  **Install dependencies**

    ```bash
    npm install
    # atau yarn install
    ```

3.  **Setup Environment Variables**
    Buat file `.env` di root folder dan isi dengan API Key dari NewsAPI:

    ```env
    EXPO_PUBLIC_NEWS_API_KEY=your_api_key_here
    EXPO_PUBLIC_BASE_URL=[https://newsapi.org/v2](https://newsapi.org/v2)
    ```

4.  **Jalankan Aplikasi**

    ```bash
    npx expo start
    ```

-----

## 🧠 Learning Outcomes

Melalui project ini, arsitektur dan implementasi berikut telah berhasil diterapkan:

  * Optimalisasi **State Management** menggunakan kombinasi Context API dan *custom hooks*.
  * Efisiensi **API Integration** dengan *caching* & *pagination* menggunakan React Query.
  * Penerapan **Offline Storage** untuk fitur krusial (Bookmarks & Theme).
  * Manajemen performa UI dengan **Infinite Scroll** dan implementasi *Debounce* pada *Search*.
  * Desain sistem **Dark Mode** dinamis.

-----

\<div align="center"\>
\<p\>Dibuat oleh \<b\>Bone\</b\> — Sistem Informasi Student 👨‍💻\</p\>
\</div\>

```
```