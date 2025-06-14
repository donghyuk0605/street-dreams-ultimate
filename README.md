# Street Dreams: European Journey

This project uses Next.js. To connect Firebase Hosting and Firestore, follow these steps.

## Firebase Setup

1. Install the Firebase CLI:
   ```
   npm install -g firebase-tools
   ```
2. Login to Firebase:
   ```
   firebase login
   ```
3. Initialize Firebase for Hosting and Firestore:
   ```
   firebase init
   ```
   Select **Hosting** and **Firestore** when prompted. Use `build` as the public directory for Hosting.
4. Copy `.env.example` to `.env.local` and fill in your Firebase project values.
5. Install dependencies before running any `pnpm` scripts:
   ```
   pnpm install
   ```
6. Lint the project (after running `pnpm install`):
   ```
   pnpm lint
   ```
7. Run the development server:
   ```
   pnpm dev
   ```
8. Deploy after building:
   ```
   pnpm build
   firebase deploy
   ```

## Environment Variables

`.env.example` lists the variables required to connect to your Firebase project:

```
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
```

## Firebase Client

The Firebase client is initialized in [`lib/firebase.ts`](lib/firebase.ts) and exports the Firestore instance and Analytics (when supported).

## Phaser Mini Game

The `arcade` tab showcases a lightweight Phaser demo built with Next.js. The new
component is loaded dynamically and allows simple keyboard controls for a square
avatar. Dependencies are managed via `pnpm` and include `phaser`.

## FIFA Style Theme

The app now ships with a darker FIFA-inspired palette and Google Fonts:

- **Orbitron** for futuristic headings
- **Russo One** for numeric displays
- **Bebas Neue** for impactful titles
- **Inter** as the default body font

Player cards can use the classes `fifa-card-gold`, `fifa-card-diamond`, or `fifa-card-legend` for special backgrounds. Use the `bg-fifa-gradient` utility for the default dark gradient background.

## Scoreboard Overlay

Matches now display a FIFA style scoreboard after each match. Home and away logos sit over a stadium backdrop thanks to open source imagery, giving it a proper game-day vibe. Dismiss the overlay with the **확인** button.

The overlay now features larger logos and bold typography for a more immersive presentation. It also scales gracefully on mobile thanks to responsive text utilities, and the confirm button has a subtle lift effect on hover.

Buttons can use the new **game** variant which applies the `game-button` style for a glossy gradient look. It's showcased in the scoreboard overlay and login page.

## Tournament System

A lightweight knockout tournament is now available under the **토너먼트** tab. Four teams face off in semi-finals and a final, letting you crown a champion.

## 로그인 화면

`/login` 경로에서 만나볼 수 있는 로그인 페이지는 어두운 배경과 팀 로고가 돋보이는 카드 레이아웃을 사용합니다. 카드에 글래스모피즘 효과와 3D 그림자를 적용해 입체감을 주었으며, 주요 버튼은 호버 시 살짝 떠오르는 애니메이션을 보여줍니다. 이메일과 비밀번호 입력 필드를 제공하며 애니메이션 효과로 부드럽게 등장합니다.

## 회원가입 화면

`/signup` 경로에서 가입 폼을 이용해 계정을 만들 수 있습니다. 이메일과 비밀번호, 비밀번호 확인 입력을 제공하며 로그인 페이지로 돌아갈 수 있는 링크가 포함됩니다.

## 게스트 입장

로그인 페이지에는 게스트로 바로 게임을 체험할 수 있는 **게스트 입장** 버튼이 추가되었습니다.


## Player Stats and Skills

A new data structure separates numeric stats and special skills for each player. See [`lib/game/player.ts`](lib/game/player.ts) for details:

```ts
export interface PlayerProfile {
  id: string
  name: string
  position: string
  stats: PlayerStats
  skills: PlayerSkills
}
```

Use `stats` for attributes like shooting or speed, and `skills` for abilities such as `curvingShot` or `ambidextrous`.
