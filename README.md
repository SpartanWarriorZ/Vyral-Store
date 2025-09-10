# Vyral Store - Landing Page

Eine moderne, responsive Landing Page für den Vyral Store, inspiriert von der originalen Website [vyral.store](https://vyral.store/).

## 🚀 Features

- **Lenis Smooth Scroll** - Butterweiche Scroll-Animationen
- **Responsive Design** - Optimiert für alle Geräte (Desktop, Tablet, Mobile)
- **Moderne Animationen** - Fade-in, Hover-Effekte und Parallax-Scrolling
- **Interaktive Elemente** - Dropdown-Menüs, Cookie-Banner, Mobile-Menu
- **Accessibility** - Unterstützung für reduzierte Animationen und hohen Kontrast
- **Performance-optimiert** - Throttled Scroll-Events und optimierte Animationen

## 📁 Projektstruktur

```
Vyral-Store/
├── index.html          # Haupt-HTML-Datei
├── styles.css          # CSS-Styles mit Animationen
├── script.js           # JavaScript für Interaktivität
└── README.md           # Diese Datei
```

## 🎨 Design-Features

### Header
- Promo-Banner mit animiertem Text
- Sticky Navigation mit Blur-Effekt beim Scrollen
- Dropdown-Menüs für Fashion und Accessoires
- Warenkorb und Benutzer-Aktionen

### Hero-Sektion
- Große Überschrift mit Fade-in-Animation
- Produkt-Showcase mit Hover-Effekten
- Call-to-Action Button mit Ripple-Effekt

### Interaktive Elemente
- Cookie-Banner mit Akzeptanz-Funktion
- Mobile-Menu für kleinere Bildschirme
- Smooth Scroll zu Anker-Links
- Hover-Animationen für alle interaktiven Elemente

### Animationen
- Lenis Smooth Scroll für butterweiche Navigation
- Intersection Observer für Scroll-basierte Animationen
- Staggered Animationen für Produkt-Grid
- Parallax-Effekte für Hero-Sektion

## 🛠️ Technologien

- **HTML5** - Semantische Struktur
- **CSS3** - Moderne Styles mit Flexbox/Grid
- **JavaScript ES6+** - Moderne JavaScript-Features
- **Lenis** - Smooth Scroll Library
- **Font Awesome** - Icons
- **Google Fonts** - Inter Font Family

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🎯 Browser-Unterstützung

- Chrome (neueste Version)
- Firefox (neueste Version)
- Safari (neueste Version)
- Edge (neueste Version)

## 🚀 Installation & Verwendung

1. **Repository klonen oder Dateien herunterladen**
2. **Dateien in einen Webserver-Ordner kopieren**
3. **index.html im Browser öffnen**

### Lokaler Server (empfohlen)

```bash
# Mit Python
python -m http.server 8000

# Mit Node.js (http-server)
npx http-server

# Mit PHP
php -S localhost:8000
```

Dann im Browser öffnen: `http://localhost:8000`

## ⚡ Performance-Optimierungen

- **Throttled Scroll Events** - Reduzierte CPU-Last
- **Intersection Observer** - Effiziente Scroll-Animationen
- **CSS Transforms** - Hardware-beschleunigte Animationen
- **Lazy Loading** - Optimierte Ressourcen-Nutzung

## ♿ Accessibility

- **Reduced Motion Support** - Respektiert `prefers-reduced-motion`
- **High Contrast Support** - Unterstützt `prefers-contrast: high`
- **Focus States** - Sichtbare Fokus-Indikatoren
- **Semantic HTML** - Korrekte HTML-Struktur
- **Keyboard Navigation** - Vollständige Tastatur-Navigation

## 🎨 Anpassungen

### Farben ändern
Die Hauptfarben können in der CSS-Datei angepasst werden:

```css
:root {
    --primary-color: #000;
    --secondary-color: #333;
    --background-color: #fff;
    --text-color: #333;
}
```

### Animationen anpassen
Animationen können in `script.js` konfiguriert werden:

```javascript
// Lenis Konfiguration
const lenis = new Lenis({
    duration: 1.2,        // Scroll-Dauer
    easing: (t) => ...,   // Easing-Funktion
    smooth: true,         // Smooth Scroll aktivieren
});
```

## 📄 Lizenz

Dieses Projekt ist für Bildungszwecke erstellt und basiert auf dem Design der Vyral Store Website.

## 🤝 Beitragen

Verbesserungen und Bug-Fixes sind willkommen! Bitte erstellen Sie ein Issue oder einen Pull Request.

## 📞 Support

Bei Fragen oder Problemen können Sie ein Issue erstellen oder sich an den Entwickler wenden.

---

**Erstellt mit ❤️ für eine moderne Web-Erfahrung**
