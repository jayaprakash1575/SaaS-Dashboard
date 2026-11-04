# Base - Complete SaaS Analytics & Management Dashboard

A modern, pixel-perfect, fully responsive SaaS Dashboard frontend built with **React**, **Vite**, and **Tailwind CSS**, matching every single screen and element from the Figma specification: [SAAS Dashboard (figmamarket.com)](https://www.figma.com/design/ozlhUPjiBNaY4iUXhCxSxc/SAAS-Dashboard--figmamarket.com-?node-id=0-1).

---

## 🎨 Complete Figma Screens Implemented (100% Coverage)

You can jump between ANY screen using the **"Figma Screen" dropdown** in the header or the main navigation sidebar:

1. **Dashboard (Expanded)**: Complete main overview with expanded navigation, KPI cards, interactive Reports spline wave chart, segmented Analytics donut, Recent Orders table, and Top Selling Products.
2. **Dashboard Navigation (Collapsed)**: Icon-only sidebar mode matching Figma Screen 1.
3. **Invoice List**: Data-dense table with select checkboxes, verified email icons, status pills (`Complete`, `Pending`, `Cancel`), star favoriting, and bulk deletion.
4. **Invoice List - Dropdown**: Status filter dropdown menu matching Figma Screen 4.
5. **Create Invoice (Split View)**: Interactive invoice generator on left with line items, tax calculation, and real-time printable paper invoice preview on the right.
6. **Task Preview (Kanban Board)**: Agile workflow board with `ToDo`, `In Progress`, `In Review`, `Done` columns, tags, avatars, like/comment counters, and card image attachments.
7. **Task List View**: Tabular list view of all tasks grouped by status with quick advance actions.
8. **Task Timeline (Gantt)**: Milestone roadmap timeline.
9. **Schedule List**: Split-view schedule list table with mini date picker and task agenda.
10. **Calendar Month View**: Monthly calendar matrix with active day selection and colored event pills.
11. **Calendar Day View**: Hourly schedule timeline (08:00 AM - 06:00 PM) with event blocks.
12. **Calendar Year View**: 12-month annual sprint and milestone grid.
13. **Customer List & Profile**: Client directory with right-hand customer profile drawer, spending metrics, 7-day sparkline bar chart, and dual circular metric rings.
14. **Add Customer**: Slide-over drawer with avatar upload circle and customer form fields.
15. **Product Analytics & Add Product**: Dual stat cards (`Total Sales $1,25,978`, `Total Profit $1,14,000`), ranked table, and **Add Product** slide-out drawer.
16. **Messages / Chat**: Full messaging application with contacts sidebar, unread badges, real-time message bubbles, attachments, typing indicator, and automated replies.
17. **Notifications Center**: Slide-out drawer with operational alerts and mark-as-read controls.
18. **Settings & 2FA**: Profile credentials, two-factor authentication toggle, and notification preferences.
19. **Sign In / Login**: Screen with Base logo, credentials form, and desk worker vector illustration.
20. **Sign Up**: Screen with Google/Facebook social buttons, registration form, and illustration.
21. **Recover Password**: Password recovery card with Base logo and email field.
22. **Confirm Account Success**: Thumbs-up badge with celebratory confetti and **"Done Now"** action.

---

## 📱 Responsive Design Highlights

- **Desktop (1280px+)**: Full expanded layout with side drawers and charts. Supports sidebar collapse into icon-only mode.
- **Tablet (768px - 1024px)**: Adaptive 2-column grids, collapsible sidebar, horizontal scroll protection.
- **Mobile (< 768px)**:
  - Off-canvas hamburger menu drawer.
  - **Mobile Bottom Navigation Bar** for quick one-thumb switching between Dashboard, Invoices, Tasks, Calendar, and Messages.
  - Full-width swipeable tables and touch-friendly card layouts.

---

## 🚀 Running the Project

```bash
# Start Vite development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Server URL: **http://localhost:3000**
