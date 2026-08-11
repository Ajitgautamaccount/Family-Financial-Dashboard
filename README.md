# Family Financial Dashboard

An interactive, single-file HTML dashboard for tracking stock/investment earnings, family portfolios, and comprehensive performance analytics.

## 🎯 Overview

This dashboard provides a complete solution for monitoring multi-user investment portfolios with real-time calculations, beautiful charts, and family-level aggregation.

## ✨ Features

### Core Functionality
- **👥 Multi-User Management** – Manage portfolios for multiple family members (Ajit Gautam, Meenu Tyagi, Prem Singh, Ganga)
- **📊 Interactive Charts** – Monthly returns, cumulative growth, yearly performance comparison
- **👨‍👩‍👧‍👦 Family Grouping** – Organize users into families with combined analytics
- **💾 Auto-Save** – Local browser storage keeps your data safe
- **📥 Excel Import/Export** – Backup and restore data with Excel files
- **📈 Real-Time Calculations** – Instant updates as you edit data

### Asset Classes Tracked
- **Equity Returns** – Stock market gains/losses
- **F&O (Futures & Options)** – Derivative trading returns
- **Commodity Returns** – Physical commodity profits
- **Bond Interest** – Fixed income earnings
- **Capital Deployment** – Investment amounts

### Analytics & Reporting
- **Monthly Performance** – Track returns month-by-month
- **Yearly Summaries** – Annual breakdown by user and family
- **Best/Worst Months** – Quick identification of peak/low periods
- **Percentage Returns** – Annualized return calculations
- **Family Comparison** – Cross-family performance metrics
- **Overall Portfolio** – Consolidated family-wide analysis

## 🚀 Quick Start

1. **Open the file:** Double-click `Stock earning with index - enhanced.html` in your browser
2. **Select a user:** Click on a profile pill (Ajit, Meenu, Prem, or Ganga)
3. **Add data:** Enter monthly financial metrics in the form
4. **View results:** Charts and summaries auto-update instantly
5. **Export:** Click "Export Excel" to download your data

## 💡 How to Use

### Adding Monthly Data
1. Fill in the month (auto-populated with current month)
2. Enter amounts for:
   - Equity Return
   - F&O Return
   - Bond Interest
   - Deposit (optional)
   - Commodity Return (optional)
3. Click "Add Month" – Capital Used is auto-calculated

### Managing Users
- **Select:** Click user pills to switch profiles
- **Add:** Type a new username and click "＋ Add User"
- **Delete:** Select a user and click "✕ Delete User"

### Family Organization
- **Family 1:** Ajit Gautam, Meenu Tyagi
- **Family 2:** Prem Singh, Ganga

Family summaries show combined returns, active members, and average performance.

### Exporting Data
- Click "⬇ Export Excel" to save current user's data
- Click "⬆ Upload Excel" to restore data from a file

## 🛠 Technology Stack

- **Pure HTML5/CSS3/JavaScript** – No build process required
- **Chart.js** – Beautiful, responsive charts
- **ChartDataLabels** – Data labels on charts
- **XLSX.js** – Excel file handling

## 📁 File Structure

```
Family-Financial-Dashboard/
├── Stock earning with index - enhanced.html  (Main application)
├── README.md                                  (This file)
└── .gitignore                                (Git configuration)
```

## 🎨 UI Highlights

- **Responsive Design** – Works on desktop, tablet, and mobile
- **Dark Mode Friendly** – High-contrast text for readability
- **Smooth Animations** – Professional fade-in and hover effects
- **Intuitive Layout** – Organized sections for easy navigation
- **Real-Time Updates** – No page reloads needed

## 💾 Data Persistence

All data is stored in your browser's **localStorage**:
- No server required
- Data persists across sessions
- Works offline
- Private on your device

To clear data: Open browser DevTools → Application → Storage → Clear All

## 📊 Dashboard Sections

1. **Hero Panel** – Quick summary of total return, best/worst months, profile
2. **User Management** – Select active user, add/delete profiles
3. **Add Monthly Data** – Form to input financial metrics
4. **KPI Strip** – Key performance indicators at a glance
5. **Data Table** – Editable rows for all monthly entries
6. **Performance Charts** – Visual representations of returns
7. **Yearly Performance** – Aggregated annual summaries
8. **Family Summaries** – Family 1 & Family 2 combined analysis
9. **Overall Portfolio** – Gautam family consolidated view
10. **Comparison Charts** – Cross-user and cross-family analytics

## 🔒 Privacy

- 100% client-side application
- No data sent to servers
- No analytics or tracking
- Your financial data stays on your device

## 📝 Notes

- Input values are **auto-preserved** on page reload
- Charts **auto-update** instantly when data changes
- Supports up to **4 user profiles** (easily expandable)
- **Mobile-responsive** layout
- **Keyboard-friendly** inputs

## 🎯 Future Enhancements (Optional)

- Add more asset classes
- Support more than 4 users
- Cloud sync option
- PDF export
- Customizable family groupings
- Goal tracking features

## 📞 Support

For issues or suggestions, please reach out!

---

**Developed by:** Ajit Gautam  
**Last Updated:** August 2026  
**License:** Open Source
