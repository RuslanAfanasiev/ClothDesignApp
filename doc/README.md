# Fashion Sketch App — Documentatie

## Prezentare generala

Aplicatie full-stack pentru design vestimentar compusa din:
- **fashion-api** — backend NestJS (REST API)
- **fashion-sketch-app** — aplicatie mobila React Native / Expo

---

## Arhitectura

```
FinalProject/
├── src/
│   ├── fashion-api/          # Backend NestJS
│   └── fashion-sketch-app/   # Mobile App React Native
└── doc/                      # Documentatie
```

### Backend (Clean Architecture)

```
fashion-api/src/
├── presentation/     # Controllers, Guards, DTOs
├── application/      # Use Cases, DTOs aplicatie
├── domain/           # Entitati, Repositorii (interfete), Value Objects
├── infrastructure/   # Prisma repositories, Firebase
└── shared/           # Guards globale, Decoratori, Filtre, Interceptori
```

### Frontend (Feature-based)

```
fashion-sketch-app/src/
├── authify/      # Autentificare (Login, Verify, Reset)
├── pages/        # Ecrane: dashboard, sketch, templates, settings
├── services/     # API clients (axios)
├── store/        # Redux slices + async thunks
├── theme/        # Culori, tipografie, ThemeContext
├── navigation/   # Tab + Stack navigator
└── components/   # Componente reutilizabile (AppHeader, ErrorBoundary)
```

---

## Setup & Rulare

### Cerinte
- Node.js 20+
- PostgreSQL 15+
- Expo CLI
- Cont Firebase (service account JSON)
- Cheie API Anthropic (pentru AI Suggestions)

### Backend

```bash
cd src/fashion-api
npm install
```

Copiaza `.env.example` in `.env` si completeaza valorile:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/designdb"
JWT_SECRET="<secret-puternic>"
GOOGLE_APPLICATION_CREDENTIALS="./src/infrastructure/firebase/service-account.json"
FIREBASE_STORAGE_BUCKET="<project>.firebasestorage.app"
ANTHROPIC_API_KEY="<cheia-ta>"
```

Ruleaza migrarile si porneste serverul:

```bash
npx prisma migrate dev
npm run start:dev
```

Documentatia Swagger este disponibila la: `http://localhost:3000/api/docs`

### Frontend

```bash
cd src/fashion-sketch-app
npm install
```

Copiaza `.env.example` in `.env`:

```env
EXPO_PUBLIC_API_BASE_URL=http://<ip-masina>:3000/api/v1
EXPO_PUBLIC_AUTH_BASE_URL=http://<ip-masina>:8080/api/v1.0
```

Porneste aplicatia:

```bash
npx expo start
```

---

## Functionalitati

| Modul | Descriere |
|-------|-----------|
| Autentificare | Login, verificare email, resetare parola prin Authify |
| Proiecte | CRUD complet, filtrare dupa status (DRAFT, IN_PROGRESS, COMPLETED) |
| Canvas | Desen SVG cu PanResponder, culori, grosime stroke, undo, clear |
| Schite | Salvare in cloud (Firebase Storage), salvare pe dispozitiv |
| Template-uri | Creare, aplicare ca strat de baza in canvas |
| AI Suggestions | Analiza schita cu Claude (Anthropic) si sugestii de design |
| Setari | Toggle tema Dark/Light |

---

## Endpoints API

### Autentificare
Toate endpoint-urile (exceptand auth) necesita header: `Authorization: Bearer <token>`

### Proiecte
| Metoda | Path | Descriere |
|--------|------|-----------|
| GET | /api/v1/projects | Lista proiectelor utilizatorului |
| POST | /api/v1/projects | Creeaza proiect nou |
| GET | /api/v1/projects/:id | Detalii proiect |
| PATCH | /api/v1/projects/:id | Actualizeaza proiect |
| DELETE | /api/v1/projects/:id | Sterge proiect |

### Schite
| Metoda | Path | Descriere |
|--------|------|-----------|
| GET | /api/v1/projects/:id/sketches | Lista schite proiect |
| POST | /api/v1/projects/:id/sketches | Creeaza schita |
| PATCH | /api/v1/projects/:projectId/sketches/:id | Actualizeaza |
| DELETE | /api/v1/projects/:projectId/sketches/:id | Sterge |

### Template-uri
| Metoda | Path | Descriere |
|--------|------|-----------|
| GET | /api/v1/templates | Lista template-uri |
| POST | /api/v1/templates | Creeaza template |
| PATCH | /api/v1/templates/:id | Actualizeaza |
| DELETE | /api/v1/templates/:id | Sterge |

### Upload & AI
| Metoda | Path | Descriere |
|--------|------|-----------|
| POST | /api/v1/upload | Upload imagine in Firebase Storage |
| POST | /api/v1/ai/suggestions | Sugestii AI pentru schita curenta |

---

## Baza de date (Prisma)

```
Project    1 ──< Sketch   (cascade delete)
Template   (independent)
```

---

## Securitate

- JWT validat pe fiecare request prin `FirebaseAuthGuard`
- `ProjectOwnerGuard` valideaza ca utilizatorul este proprietarul proiectului
- Credentialele Firebase sunt incarcate prin `GOOGLE_APPLICATION_CREDENTIALS`
- `.env` si fisierul service account sunt excluse din git prin `.gitignore`
