# Creditmonks CRM Dashboard

A comprehensive Customer Relationship Management system designed for credit/loan companies with role-based dashboards for AROs, Team Leaders, and Super Admins.

## 🚀 Features

### 🧑‍💼 ARO Dashboard
- **Lead Management**: View and manage assigned leads with status tracking
- **Call Disposition**: Submit call outcomes and schedule follow-ups
- **Gamification**: Daily/monthly targets, achievements, and progress tracking
- **Status Indicators**: Hot 🟢, Warm 🟠, Cold 🔴 lead classification
- **Follow-up Reminders**: Today's scheduled follow-ups

### 👥 Team Leader Dashboard
- **ARO Overview**: Monitor team performance in real-time
- **Alert Management**: Long call alerts, missed targets, login status
- **Lead Assignment**: Manual lead distribution to AROs
- **Performance Tracking**: Call counts, OK OTP tracking, daily progress
- **Real-time Status**: Online/offline ARO monitoring

### 👑 Super Admin Dashboard
- **Lead Upload**: OCR-powered image/Excel file processing
- **User Management**: Add, edit, delete users across all roles
- **System Settings**: Auto-assignment rules, targets, alert thresholds
- **Reports & Export**: Daily, weekly, monthly performance reports
- **System Overview**: Comprehensive analytics and metrics

## 🛠 Technology Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI, Heroicons
- **State Management**: React Hooks
- **Icons**: Heroicons, Lucide React
- **Charts**: Recharts (ready for implementation)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd creditmonks-crm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🎭 Demo Features

- **Role Switcher**: Use the demo switcher in the top-right corner to experience different user roles
- **Mock Data**: Pre-populated with realistic sample data
- **Responsive Design**: Optimized for desktop-first usage

## 🔐 User Roles

### ARO (Account Relationship Officer)
- Username: `aro1`
- Focus: Lead calling and disposition management
- Features: Call tracking, gamification, follow-ups

### Team Leader
- Username: `tl1`
- Focus: Team monitoring and lead assignment
- Features: ARO performance, alerts, manual assignments

### Super Admin
- Username: `admin`
- Focus: System administration and reporting
- Features: User management, system settings, analytics

## 📊 Data Flow

```
Lead Upload (Admin) → Auto/Manual Assignment (TL) → Calling (ARO) → Disposition → Analytics
```

## 🎨 UI Design Principles

- **Clean & Minimalist**: Tailwind CSS with consistent spacing
- **Desktop-First**: Optimized for LAN environments
- **Status Colors**: 🟢 Hot, 🟠 Warm, 🔴 Cold
- **Large Fonts**: Easy readability
- **Card-Based Layout**: Clear content separation

## 📱 Key Components

### Lead Status System
- **Hot**: High-potential leads (green)
- **Warm**: Interested but needs follow-up (orange)
- **Cold**: Not interested or not eligible (red)

### Disposition Types
- OK OTP ✅
- Call Back 📞
- Not Interested ❌
- Wrong Number 📵
- Not Eligible 🚫
- Busy ⏰
- No Answer 📵

### Gamification Elements
- Daily call targets
- OK OTP achievements
- Streak counters
- Progress bars
- Achievement badges

## 🔧 Configuration

### System Settings (Super Admin)
- **Max Leads per ARO**: Default 150
- **Lead Recycling**: 3 days for cold leads
- **Long Call Threshold**: 3 minutes
- **Monthly Targets**: Configurable per role

### Auto-Assignment Rules
- Based on current lead count
- Performance-based distribution
- OK OTP count consideration

## 📈 Analytics & Reporting

- **Real-time Metrics**: Live call tracking, conversion rates
- **Export Options**: Daily, weekly, monthly reports
- **Performance KPIs**: Call volume, conversion rates, target achievement
- **Team Analytics**: Individual and collective performance

## 🚧 Future Enhancements

- [ ] Integration with telephony systems
- [ ] Advanced OCR for lead data extraction
- [ ] Real-time notifications
- [ ] Advanced reporting with charts
- [ ] API integration for lead sources
- [ ] Mobile responsive design
- [ ] Call recording integration
- [ ] Advanced filtering and search

## 🔗 API Structure (Ready for Backend)

The frontend is structured to easily integrate with REST APIs:

```typescript
// Example API endpoints
GET /api/leads - Fetch leads
POST /api/leads/assign - Assign leads
POST /api/dispositions - Submit call disposition
GET /api/users - User management
POST /api/upload - Lead file upload
```

## 📝 Development

### Build for Production
```bash
npm run build
```

### Run Production Build
```bash
npm start
```

### Linting
```bash
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is proprietary to Creditmonks and not open for public use.

## 📞 Support

For technical support or feature requests, please contact the development team.

---

**Built with ❤️ for Creditmonks CRM**
