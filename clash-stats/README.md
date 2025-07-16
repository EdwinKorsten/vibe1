# ClashStats - Clash of Clans Statistics Website

A Next.js-based web application for viewing Clash of Clans player and clan statistics using the official Clash of Clans API.

## Features

- **Player Search & Stats**: Search for players by tag and view detailed statistics including trophies, level, achievements, heroes, and more
- **Clan Information**: View clan details, member lists, war logs, and statistics
- **Rankings & Leaderboards**: Browse global and local player/clan rankings
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Data**: Uses official Clash of Clans API for up-to-date information

## Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: Clash of Clans Official API
- **HTTP Client**: Axios

## Prerequisites

- Node.js 18.17 or later
- Clash of Clans API token from [Clash of Clans Developer Portal](https://developer.clashofclans.com/)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd clash-stats
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Update the `.env.local` file with your Clash of Clans API token:
   ```
   CLASH_API_TOKEN=your_api_token_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

   To get an API token:
   - Visit [Clash of Clans Developer Portal](https://developer.clashofclans.com/)
   - Create an account and log in
   - Create a new key with your IP address
   - Copy the token to your `.env.local` file

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

### Searching for Players
- Enter a player tag (e.g., `#2PP`) in the search bar
- Select "Player" option and click Search
- View detailed player statistics, achievements, heroes, and clan information

### Searching for Clans
- Enter a clan tag (e.g., `#2Y0YVV2`) or clan name in the search bar
- Select "Clan" option and click Search
- View clan details, member list, war statistics, and recent war log

### Rankings
- Visit the Rankings page to view global and local leaderboards
- Switch between player and clan rankings
- Filter by different locations/countries

## API Endpoints

The application uses the following Clash of Clans API endpoints:

- `/players/{playerTag}` - Player information
- `/clans/{clanTag}` - Clan information
- `/clans/{clanTag}/warlog` - Clan war log
- `/clans/{clanTag}/members` - Clan members
- `/locations` - Available locations
- `/locations/{locationId}/rankings/players` - Player rankings by location
- `/locations/{locationId}/rankings/clans` - Clan rankings by location
- `/leagues/{leagueId}/seasons/{seasonId}/rankings/players` - League rankings

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── player/[tag]/      # Player detail pages
│   ├── clan/[tag]/        # Clan detail pages
│   ├── rankings/          # Rankings page
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Layout.tsx         # Main layout
│   ├── SearchBar.tsx      # Search functionality
│   ├── PlayerCard.tsx     # Player display card
│   └── ClanCard.tsx       # Clan display card
└── lib/                   # Utilities and types
    ├── clash-api.ts       # API client
    └── types.ts           # TypeScript types
```

## Development

### Building for Production
```bash
npm run build
```

### Starting Production Server
```bash
npm start
```

### Linting
```bash
npm run lint
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Disclaimer

This project is not affiliated with Supercell. Clash of Clans is a trademark of Supercell Oy.