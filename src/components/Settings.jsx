import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import {
  User, Bell, Shield, Palette, Database, Globe,
  ChevronRight, Check, Moon, Sun, Monitor
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } }
};

function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const { theme, setTheme } = useTheme();

  // Profile state
  const [profile, setProfile] = useState({
    name: 'Business Manager',
    email: 'bm@hsrmotors.com',
    phone: '+91 9876543210',
    role: 'Admin',
    dealership: 'HSR Motors',
    location: 'Bangalore, India'
  });

  // Notification prefs
  const [notifications, setNotifications] = useState({
    newLead: true,
    leadAssigned: true,
    dealClosed: true,
    testDriveScheduled: true,
    dailyDigest: false,
    weeklyReport: true,
    emailNotifs: true,
    pushNotifs: true,
    smsNotifs: false,
  });

  // Display prefs
  const [display, setDisplay] = useState({
    theme: 'light',
    compactMode: false,
    animationsEnabled: true,
    defaultPage: '/',
    rowsPerPage: '10',
    currency: 'INR',
    dateFormat: 'DD/MM/YYYY',
  });

  // Lead settings
  const [leadSettings, setLeadSettings] = useState({
    autoAssign: true,
    leadScoring: true,
    duplicateDetection: true,
    followUpReminder: true,
    followUpDays: '3',
    archiveLostAfter: '30',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'display', label: 'Display', icon: Palette },
    { id: 'leads', label: 'Lead Management', icon: Database },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="max-w-[1100px] mx-auto space-y-5"
    >
      <motion.div variants={fadeIn}>
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        <p className="text-[13px] text-gray-400 mt-0.5">Manage your account and application preferences</p>
      </motion.div>

      <motion.div variants={fadeIn} className="flex flex-col lg:flex-row gap-4">
        {/* Tab Navigation */}
        <div className="lg:w-52 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[12px] font-medium transition-all duration-150 mb-0.5
                    ${isActive ? 'bg-primary-600 text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}
                  `}
                >
                  <Icon size={15} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-xl border border-gray-100 p-6">
          {activeTab === 'profile' && (
            <div className="space-y-5">
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-1">Profile Information</h2>
                <p className="text-[11px] text-gray-400">Update your personal details and dealership info</p>
              </div>

              <div className="flex items-center gap-4 pb-5 border-b border-gray-50">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-lg font-bold">
                  BM
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{profile.name}</p>
                  <p className="text-[11px] text-gray-400">{profile.role} &middot; {profile.dealership}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FieldInput label="Full Name" value={profile.name} onChange={(v) => setProfile({ ...profile, name: v })} />
                <FieldInput label="Email" value={profile.email} onChange={(v) => setProfile({ ...profile, email: v })} type="email" />
                <FieldInput label="Phone" value={profile.phone} onChange={(v) => setProfile({ ...profile, phone: v })} />
                <FieldInput label="Role" value={profile.role} onChange={(v) => setProfile({ ...profile, role: v })} disabled />
                <FieldInput label="Dealership" value={profile.dealership} onChange={(v) => setProfile({ ...profile, dealership: v })} />
                <FieldInput label="Location" value={profile.location} onChange={(v) => setProfile({ ...profile, location: v })} />
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-5">
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-1">Notification Preferences</h2>
                <p className="text-[11px] text-gray-400">Choose what updates you want to receive</p>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Activity Alerts</p>
                <ToggleRow label="New lead received" checked={notifications.newLead} onChange={(v) => setNotifications({ ...notifications, newLead: v })} />
                <ToggleRow label="Lead assigned to you" checked={notifications.leadAssigned} onChange={(v) => setNotifications({ ...notifications, leadAssigned: v })} />
                <ToggleRow label="Deal closed" checked={notifications.dealClosed} onChange={(v) => setNotifications({ ...notifications, dealClosed: v })} />
                <ToggleRow label="Test drive scheduled" checked={notifications.testDriveScheduled} onChange={(v) => setNotifications({ ...notifications, testDriveScheduled: v })} />
              </div>

              <div className="space-y-1 pt-3 border-t border-gray-50">
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Reports</p>
                <ToggleRow label="Daily digest email" checked={notifications.dailyDigest} onChange={(v) => setNotifications({ ...notifications, dailyDigest: v })} />
                <ToggleRow label="Weekly performance report" checked={notifications.weeklyReport} onChange={(v) => setNotifications({ ...notifications, weeklyReport: v })} />
              </div>

              <div className="space-y-1 pt-3 border-t border-gray-50">
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Channels</p>
                <ToggleRow label="Email notifications" checked={notifications.emailNotifs} onChange={(v) => setNotifications({ ...notifications, emailNotifs: v })} />
                <ToggleRow label="Push notifications" checked={notifications.pushNotifs} onChange={(v) => setNotifications({ ...notifications, pushNotifs: v })} />
                <ToggleRow label="SMS notifications" checked={notifications.smsNotifs} onChange={(v) => setNotifications({ ...notifications, smsNotifs: v })} />
              </div>
            </div>
          )}

          {activeTab === 'display' && (
            <div className="space-y-5">
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-1">Display Preferences</h2>
                <p className="text-[11px] text-gray-400">Customize how the application looks and feels</p>
              </div>

              <div>
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">Theme</p>
                <div className="flex gap-2">
                  {[
                    { id: 'light', icon: Sun, label: 'Light' },
                    { id: 'dark', icon: Moon, label: 'Dark' },
                    { id: 'system', icon: Monitor, label: 'System' },
                  ].map((t) => {
                    const Icon = t.icon;
                    const isActive = theme === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-medium transition-all ${
                          isActive ? 'border-primary-300 bg-primary-50 text-primary-700' : 'border-gray-100 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <Icon size={14} />
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1 pt-3 border-t border-gray-50">
                <ToggleRow label="Compact mode" desc="Reduce spacing for denser information display" checked={display.compactMode} onChange={(v) => setDisplay({ ...display, compactMode: v })} />
                <ToggleRow label="Animations" desc="Enable smooth transitions and motion effects" checked={display.animationsEnabled} onChange={(v) => setDisplay({ ...display, animationsEnabled: v })} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-gray-50">
                <SelectField label="Default Page" value={display.defaultPage} options={[
                  { value: '/', label: 'Dashboard' },
                  { value: '/leads', label: 'Leads' },
                  { value: '/pipeline', label: 'Pipeline' },
                ]} onChange={(v) => setDisplay({ ...display, defaultPage: v })} />
                <SelectField label="Rows Per Page" value={display.rowsPerPage} options={[
                  { value: '10', label: '10 rows' },
                  { value: '25', label: '25 rows' },
                  { value: '50', label: '50 rows' },
                ]} onChange={(v) => setDisplay({ ...display, rowsPerPage: v })} />
                <SelectField label="Currency" value={display.currency} options={[
                  { value: 'INR', label: 'INR (₹)' },
                  { value: 'USD', label: 'USD ($)' },
                  { value: 'EUR', label: 'EUR (€)' },
                ]} onChange={(v) => setDisplay({ ...display, currency: v })} />
                <SelectField label="Date Format" value={display.dateFormat} options={[
                  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
                ]} onChange={(v) => setDisplay({ ...display, dateFormat: v })} />
              </div>
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="space-y-5">
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-1">Lead Management</h2>
                <p className="text-[11px] text-gray-400">Configure how leads are handled and processed</p>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Automation</p>
                <ToggleRow label="Auto-assign leads" desc="Automatically distribute leads to team members" checked={leadSettings.autoAssign} onChange={(v) => setLeadSettings({ ...leadSettings, autoAssign: v })} />
                <ToggleRow label="Lead scoring" desc="Automatically score leads based on engagement" checked={leadSettings.leadScoring} onChange={(v) => setLeadSettings({ ...leadSettings, leadScoring: v })} />
                <ToggleRow label="Duplicate detection" desc="Flag potential duplicate leads" checked={leadSettings.duplicateDetection} onChange={(v) => setLeadSettings({ ...leadSettings, duplicateDetection: v })} />
                <ToggleRow label="Follow-up reminders" desc="Send reminders for pending follow-ups" checked={leadSettings.followUpReminder} onChange={(v) => setLeadSettings({ ...leadSettings, followUpReminder: v })} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-gray-50">
                <SelectField label="Follow-up After (days)" value={leadSettings.followUpDays} options={[
                  { value: '1', label: '1 day' },
                  { value: '2', label: '2 days' },
                  { value: '3', label: '3 days' },
                  { value: '5', label: '5 days' },
                  { value: '7', label: '7 days' },
                ]} onChange={(v) => setLeadSettings({ ...leadSettings, followUpDays: v })} />
                <SelectField label="Archive Lost Leads After" value={leadSettings.archiveLostAfter} options={[
                  { value: '7', label: '7 days' },
                  { value: '14', label: '14 days' },
                  { value: '30', label: '30 days' },
                  { value: '90', label: '90 days' },
                  { value: 'never', label: 'Never' },
                ]} onChange={(v) => setLeadSettings({ ...leadSettings, archiveLostAfter: v })} />
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-5">
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-1">Security</h2>
                <p className="text-[11px] text-gray-400">Manage your account security settings</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="text-xs font-semibold text-gray-800">Change Password</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Last changed 30 days ago</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-300" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="text-xs font-semibold text-gray-800">Two-Factor Authentication</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Add an extra layer of security</p>
                  </div>
                  <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Not enabled</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="text-xs font-semibold text-gray-800">Active Sessions</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">1 active session on this device</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-300" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="text-xs font-semibold text-gray-800">Login History</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">View recent login activity</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-300" />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-50">
                <button className="text-xs font-medium text-red-500 hover:text-red-600 transition-colors">
                  Delete Account
                </button>
                <p className="text-[10px] text-gray-400 mt-1">This action is irreversible. All data will be permanently deleted.</p>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex items-center justify-end gap-3 mt-6 pt-5 border-t border-gray-50">
            <button className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-xs font-medium hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className={`
                inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-xs font-medium transition-all shadow-sm
                ${saved ? 'bg-green-500' : 'bg-primary-600 hover:bg-primary-700'}
              `}
            >
              {saved ? <><Check size={14} /> Saved!</> : 'Save Changes'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FieldInput({ label, value, onChange, type = 'text', disabled = false }) {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full h-9 px-3 text-xs border border-gray-100 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-200 focus:border-primary-300 transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
    </div>
  );
}

function SelectField({ label, value, options, onChange }) {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-9 px-3 text-xs border border-gray-100 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-200 transition-all cursor-pointer"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

function ToggleRow({ label, desc, checked, onChange }) {
  return (
    <div className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div>
        <p className="text-xs text-gray-700 font-medium">{label}</p>
        {desc && <p className="text-[10px] text-gray-400 mt-0.5">{desc}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`
          relative w-9 h-5 rounded-full transition-colors duration-200
          ${checked ? 'bg-primary-600' : 'bg-gray-200'}
        `}
      >
        <motion.div
          animate={{ x: checked ? 16 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
        />
      </button>
    </div>
  );
}

export default SettingsPage;
