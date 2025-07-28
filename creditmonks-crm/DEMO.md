# 🎭 Creditmonks CRM Demo Guide

## 🚀 Quick Start

1. Start the development server: `npm run dev`
2. Open http://localhost:3000
3. Use the **Role Switcher** in the top-right corner to experience different dashboards

---

## 🧑‍💼 ARO Dashboard Demo

**Role**: Account Relationship Officer (Front-line sales agent)

### Key Features to Test:

1. **Lead Management**
   - View assigned leads with status colors (🟢 Hot, 🟠 Warm, 🔴 Cold)
   - See lead details: Name, Phone, City, Bank, Salary
   - Check follow-up schedules

2. **Call Disposition**
   - Click "Call Now" on any lead
   - Fill out the disposition form:
     - Call duration (autofilled in real system)
     - Select disposition type (OK OTP, Call Back, etc.)
     - Add notes
     - Schedule follow-ups for "Call Back" option

3. **Gamification**
   - View daily progress towards targets
   - Check OK OTP count achievements
   - See daily streaks and badges
   - Monitor monthly progress

4. **Today's Follow-ups**
   - Sidebar shows scheduled callbacks
   - Quick access to priority leads

---

## 👥 Team Leader Dashboard Demo

**Role**: Team Leader (Manages ARO team)

### Key Features to Test:

1. **ARO Overview**
   - Real-time status of all AROs (Online/Offline)
   - Performance metrics: Calls made, OK OTPs, Progress bars
   - "On Call" indicator with call duration
   - Daily target achievement tracking

2. **Alert Management**
   - Active alerts for:
     - Long calls (>3 minutes)
     - AROs who haven't logged in
     - Missed daily targets
   - Acknowledge alerts to mark as resolved

3. **Manual Lead Assignment**
   - Select unassigned leads from dropdown
   - Choose ARO based on current workload
   - Assign leads with one click
   - View assignment statistics

4. **Quick Actions**
   - Access to ARO timelines
   - Call history reports
   - Performance analytics

---

## 👑 Super Admin Dashboard Demo

**Role**: Super Administrator (System-wide management)

### Key Features to Test:

1. **Lead Upload System**
   - Click "Upload Leads" button
   - Drag & drop or select files (Excel/Images)
   - OCR processing simulation for image files
   - Quality checks and validation

2. **User Management**
   - View all users across roles
   - Add new users with role assignment
   - Edit existing user details
   - Set monthly targets
   - Activate/deactivate users

3. **System Settings**
   - Configure auto-assignment rules
   - Set lead recycling periods
   - Adjust alert thresholds
   - Modify default targets

4. **Reports & Analytics**
   - Quick export options (Daily/Weekly/Monthly)
   - System overview metrics
   - Lead status summaries
   - Performance insights

---

## 🎯 Demo Scenarios

### Scenario 1: ARO Daily Workflow
1. Switch to ARO role
2. Check today's follow-ups
3. Call a lead and submit "OK OTP" disposition
4. Call another lead and schedule a follow-up
5. Watch gamification metrics update

### Scenario 2: Team Leader Monitoring
1. Switch to Team Leader role
2. Check ARO performance metrics
3. Acknowledge any active alerts
4. Assign an unassigned lead to an ARO
5. Review team statistics

### Scenario 3: Admin System Management
1. Switch to Super Admin role
2. Upload a sample lead file
3. Add a new ARO user
4. Adjust system settings
5. Export a performance report

---

## 📊 Sample Data Overview

### Users
- **ARO1**: Rahul Sharma (Active, 125 leads, 40 calls today)
- **ARO2**: Priya Singh (Active, 98 leads, 35 calls today, On Call)
- **ARO3**: Amit Kumar (Inactive, 0 leads)
- **TL1**: Sunita Verma (Team Leader)
- **Admin**: Rajesh Gupta (Super Admin)

### Leads
- Mix of Hot/Warm/Cold status leads
- Various banks: HDFC, ICICI, SBI, Axis
- Different cities and salary ranges
- Some with scheduled follow-ups

### Key Metrics
- Total Leads: 6 (sample data)
- Active AROs: 2
- Today's Conversions: 14 OK OTPs
- Average Call Duration: ~90 seconds

---

## 🎨 UI Highlights

### Design Features
- **Clean Card-based Layout**: Easy to scan information
- **Color-coded Status**: Instant visual feedback
- **Progress Indicators**: Clear target tracking
- **Responsive Modals**: Smooth user interactions
- **Real-time Updates**: Dynamic data changes

### Accessibility
- Large, readable fonts
- High contrast colors
- Intuitive navigation
- Keyboard-friendly interfaces

---

## 🔧 Technical Notes

### State Management
- React hooks for local state
- Context-ready for global state
- Mock data simulating real API responses

### Performance
- Optimized bundle size
- Fast page loads
- Smooth animations
- Efficient re-renders

### Scalability
- Component-based architecture
- TypeScript for type safety
- Modular design patterns
- API-ready structure

---

## 💡 Tips for Demo

1. **Start with ARO role** - Most intuitive for first-time users
2. **Use the disposition modal** - Showcases core functionality
3. **Switch roles frequently** - Demonstrates different perspectives
4. **Check the sidebar elements** - Rich contextual information
5. **Try the upload feature** - Shows advanced functionality

---

**Enjoy exploring the Creditmonks CRM! 🚀**