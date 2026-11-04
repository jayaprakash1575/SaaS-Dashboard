import React, { useState } from 'react';
import {
  LayoutGrid,
  FileText,
  Clock,
  Calendar,
  MessageSquare,
  Users,
  BarChart2,
  Settings,
  Bell,
  Sparkles
} from 'lucide-react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardOverview from './components/dashboard/DashboardOverview';
import InvoiceTable from './components/invoice/InvoiceTable';
import CreateInvoiceScreen from './components/invoice/CreateInvoiceScreen';
import AddInvoiceModal from './components/invoice/AddInvoiceModal';
import InvoiceDetailDrawer from './components/invoice/InvoiceDetailDrawer';
import KanbanBoard from './components/schedule/KanbanBoard';
import ScheduleListScreen from './components/schedule/ScheduleListScreen';
import CalendarView from './components/calendar/CalendarView';
import CustomerTable from './components/customers/CustomerTable';
import AddCustomerDrawer from './components/customers/AddCustomerDrawer';
import AddProductScreen from './components/analytics/AddProductScreen';
import AnalyticsView from './components/analytics/AnalyticsView';
import ChatView from './components/chat/ChatView';
import SettingsView from './components/settings/SettingsView';
import NotificationDrawer from './components/common/NotificationDrawer';
import UpgradeModal from './components/common/UpgradeModal';
import ViewportSwitcherBar from './components/common/ViewportSwitcherBar';
import {
  LoginScreen,
  SignUpScreen,
  RecoverScreen,
  ConfirmScreen,
} from './components/auth/AuthScreens';

export function App() {
  const isEmbedded = typeof window !== 'undefined' && window.location.search.includes('embedded=true');
  const [activeViewportMode, setActiveViewportMode] = useState('fluid');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Modals & Drawers state
  const [isAddInvoiceOpen, setIsAddInvoiceOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isInvoiceDrawerOpen, setIsInvoiceDrawerOpen] = useState(false);

  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  // All Figma Screens Catalogue for direct one-click access
  const allScreens = [
    { id: 'dashboard', label: '1. Dashboard (Expanded)', category: 'Core' },
    { id: 'dashboard-collapsed', label: '2. Dashboard Navigation (Collapsed)', category: 'Core' },
    { id: 'invoice', label: '3. Invoice List', category: 'Invoices' },
    { id: 'createInvoice', label: '4. Create Invoice (Split View)', category: 'Invoices' },
    { id: 'schedule', label: '5. Task Preview (Kanban)', category: 'Tasks' },
    { id: 'scheduleList', label: '6. Schedule List', category: 'Tasks' },
    { id: 'calendar', label: '7. Calendar (Month / Day / Year)', category: 'Calendar' },
    { id: 'customers', label: '8. Customer List & Profile', category: 'CRM' },
    { id: 'addProduct', label: '9. Product & Add Product Drawer', category: 'Products' },
    { id: 'analytics', label: '10. Analytics Insights', category: 'Analytics' },
    { id: 'messages', label: '11. Messages / Chat', category: 'Chat' },
    { id: 'notification', label: '12. Notifications Center', category: 'System' },
    { id: 'settings', label: '13. Settings & Security', category: 'System' },
    { id: 'signup', label: '14. Sign Up Screen', category: 'Auth' },
    { id: 'login', label: '15. Login Screen', category: 'Auth' },
    { id: 'recover', label: '16. Recover Password', category: 'Auth' },
    { id: 'confirm', label: '17. Confirm Account Success', category: 'Auth' },
  ];

  const handleSelectScreen = (screenId) => {
    if (screenId === 'dashboard-collapsed') {
      setIsSidebarCollapsed(true);
      setActiveTab('dashboard');
    } else {
      setActiveTab(screenId);
    }
  };

  const titlesMap = {
    dashboard: 'Dashboard',
    invoice: 'Invoice List',
    createInvoice: 'Create Invoice',
    schedule: 'Task Preview',
    scheduleList: 'Schedule List',
    calendar: 'Calendar',
    customers: 'Customer List',
    addProduct: 'Product Analytics',
    analytics: 'Analytics',
    messages: 'Messages',
    notification: 'Notifications',
    settings: 'Settings',
    login: 'Sign In',
    signup: 'Create Account',
    recover: 'Recover Password',
    confirm: 'Account Created',
  };

  const handleViewInvoice = (inv) => {
    setSelectedInvoice(inv);
    setIsInvoiceDrawerOpen(true);
  };

  const isAuthScreen = ['login', 'signup', 'recover', 'confirm'].includes(activeTab);

  // Mobile Bottom Navigation items
  const mobileNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'invoice', label: 'Invoices', icon: FileText },
    { id: 'schedule', label: 'Tasks', icon: Clock },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'messages', label: 'Chat', icon: MessageSquare },
  ];

  if (activeViewportMode !== 'fluid' && !isEmbedded) {
    const frameDimensions = {
      desktop: { width: '1440px', height: '900px', label: 'Desktop (1440 × 900)' },
      tablet: { width: '768px', height: '1024px', label: 'iPad Tablet (768 × 1024)' },
      mobile: { width: '390px', height: '844px', label: 'iPhone Mobile (390 × 844)' },
    };
    const currentFrame = frameDimensions[activeViewportMode] || frameDimensions.desktop;

    return (
      <div className="min-h-screen bg-[#0F172A] flex flex-col items-center">
        <ViewportSwitcherBar
          activeMode={activeViewportMode}
          setActiveMode={setActiveViewportMode}
        />
        <div className="flex-1 w-full flex flex-col items-center justify-start p-4 sm:p-6 overflow-auto">
          <div className="text-slate-400 text-xs font-semibold mb-3 flex items-center gap-2">
            <span>Simulated Screen Frame:</span>
            <span className="text-white bg-slate-800 px-3 py-1 rounded-full border border-slate-700 font-mono text-xs">
              {currentFrame.label}
            </span>
            <span className="text-slate-500 text-[11px] hidden sm:inline">
              (Switch back to "Responsive" anytime)
            </span>
          </div>
          <div
            className={`bg-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 ${
              activeViewportMode === 'mobile'
                ? 'rounded-[44px] border-[10px] border-slate-800 ring-2 ring-slate-700'
                : activeViewportMode === 'tablet'
                ? 'rounded-[32px] border-[10px] border-slate-800 ring-2 ring-slate-700'
                : 'rounded-2xl border-4 border-slate-800'
            }`}
            style={{
              width: currentFrame.width,
              height: currentFrame.height,
              maxWidth: '98vw',
              maxHeight: 'calc(100vh - 120px)',
            }}
          >
            <iframe
              src={`${typeof window !== 'undefined' ? window.location.origin + window.location.pathname : ''}?embedded=true`}
              title="Responsive Device Preview"
              className="w-full h-full border-none bg-[#F8FAFC]"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#2B3674] flex flex-col justify-between">
      {!isEmbedded && (
        <ViewportSwitcherBar
          activeMode={activeViewportMode}
          setActiveMode={setActiveViewportMode}
        />
      )}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        {!isAuthScreen && (
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isCollapsed={isSidebarCollapsed}
            setIsCollapsed={setIsSidebarCollapsed}
            mobileOpen={mobileSidebarOpen}
            setMobileOpen={setMobileSidebarOpen}
            onUpgradeClick={() => setIsUpgradeModalOpen(true)}
          />
        )}

        {/* Main Content Area */}
        <div
          className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
            isAuthScreen
              ? 'p-4 sm:p-6 max-w-5xl mx-auto justify-center'
              : isSidebarCollapsed
              ? 'lg:pl-20'
              : 'lg:pl-64'
          }`}
        >
          {/* Top Header */}
          <Header
            title={titlesMap[activeTab] || 'Dashboard'}
            onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
            currentScreenKey={activeTab}
            onSelectScreen={handleSelectScreen}
            allScreens={allScreens}
          />

          {/* Dynamic Page Views */}
          <main className="flex-1 px-4 sm:px-6 lg:px-8 pb-20 sm:pb-12 animate-fade-in max-w-[1600px] w-full mx-auto">
            {activeTab === 'dashboard' && (
              <DashboardOverview onNavigate={setActiveTab} />
            )}

            {activeTab === 'invoice' && (
              <InvoiceTable
                onAddNewInvoice={() => setIsAddInvoiceOpen(true)}
                onViewInvoice={handleViewInvoice}
              />
            )}

            {activeTab === 'createInvoice' && (
              <CreateInvoiceScreen onInvoiceCreated={() => setActiveTab('invoice')} />
            )}

            {activeTab === 'schedule' && <KanbanBoard />}

            {activeTab === 'scheduleList' && <ScheduleListScreen />}

            {activeTab === 'calendar' && <CalendarView />}

            {activeTab === 'customers' && (
              <CustomerTable onOpenAddCustomer={() => setIsAddCustomerOpen(true)} />
            )}

            {activeTab === 'addProduct' && <AddProductScreen />}

            {activeTab === 'analytics' && <AnalyticsView />}

            {activeTab === 'messages' && <ChatView />}

            {activeTab === 'notification' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100">
                <h3 className="text-xl font-bold text-[#1B2559] mb-2">Notifications Center</h3>
                <p className="text-sm text-slate-500 mb-6">Recent activity alerts and operations</p>
                <NotificationDrawer isOpen={true} onClose={() => setActiveTab('dashboard')} />
              </div>
            )}

            {activeTab === 'settings' && <SettingsView />}

            {/* Authentication Screens */}
            {activeTab === 'login' && (
              <LoginScreen
                onNavigate={setActiveTab}
                onLoginSuccess={() => setActiveTab('dashboard')}
              />
            )}

            {activeTab === 'signup' && (
              <SignUpScreen
                onNavigate={setActiveTab}
                onSignUpSuccess={() => setActiveTab('confirm')}
              />
            )}

            {activeTab === 'recover' && (
              <RecoverScreen onNavigate={setActiveTab} />
            )}

            {activeTab === 'confirm' && (
              <ConfirmScreen onNavigate={setActiveTab} />
            )}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar (Visible only on small mobile screens) */}
      {!isAuthScreen && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 py-2 px-3 flex items-center justify-around sm:hidden shadow-lg">
          {mobileNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-colors cursor-pointer ${
                  isActive ? 'text-[#4318FF] font-bold' : 'text-[#707EAE]'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
                <span className="text-[10px]">{item.label}</span>
              </button>
            );
          })}
        </nav>
      )}

      {/* Global Modals & Drawers */}
      <AddInvoiceModal
        isOpen={isAddInvoiceOpen}
        onClose={() => setIsAddInvoiceOpen(false)}
        onAddInvoice={(newInv) => {
          alert(`Invoice ${newInv.invoiceId} successfully created for ${newInv.name}!`);
        }}
      />

      <InvoiceDetailDrawer
        invoice={selectedInvoice}
        isOpen={isInvoiceDrawerOpen}
        onClose={() => setIsInvoiceDrawerOpen(false)}
        onUpdateStatus={(id, st) => {
          if (selectedInvoice) {
            setSelectedInvoice({ ...selectedInvoice, status: st });
          }
        }}
      />

      <AddCustomerDrawer
        isOpen={isAddCustomerOpen}
        onClose={() => setIsAddCustomerOpen(false)}
        onAddCustomer={(c) => {
          alert(`Customer ${c.name} registered successfully!`);
        }}
      />

      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
      />
    </div>
  );
}

export default App;
