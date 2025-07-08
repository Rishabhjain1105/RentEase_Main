import React, { useState } from 'react';
import { 
  Bell, 
  Lock,
  Phone,
  Globe,
  Clock,
  User, 
  Mail, 
  Shield,
  ToggleLeft,
  ToggleRight,
  Save,
  X
} from 'lucide-react';

const Settings = () => {
  // Sample settings data
  const [settings, setSettings] = useState({
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      propertyUpdates: true,
      rentReminders: true,
    },
    security: {
      twoFactorAuth: false,
      loginAlerts: true,
      deviceManagement: true,
    },
    account: {
      email: 'john.doe@example.com',
      phoneNumber: '+91 9876543210',
      language: 'English',
      timezone: 'IST (UTC+5:30)',
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedSettings, setEditedSettings] = useState({...settings});

  const handleToggle = (category, setting) => {
    setEditedSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  const handleSave = () => {
    setSettings(editedSettings);
    setIsEditing(false);
    // Here you would typically make an API call to save settings
    alert('Settings saved successfully!');
  };

  const handleCancel = () => {
    setEditedSettings(settings);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <div className="flex space-x-2">
            {isEditing ? (
              <>  
                <button
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Edit Settings
              </button>
            )}
          </div>
        </div>

        {/* Notifications Settings */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center mb-4">
            <Bell className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-800">Email Notifications</h3>
                <p className="text-sm text-gray-600">Receive updates via email</p>
              </div>
              <button
                onClick={() => handleToggle('notifications', 'emailNotifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  editedSettings.notifications.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    editedSettings.notifications.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-800">Push Notifications</h3>
                <p className="text-sm text-gray-600">Receive push notifications on your device</p>
              </div>
              <button
                onClick={() => handleToggle('notifications', 'pushNotifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  editedSettings.notifications.pushNotifications ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    editedSettings.notifications.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-800">Property Updates</h3>
                <p className="text-sm text-gray-600">Get notified about property changes</p>
              </div>
              <button
                onClick={() => handleToggle('notifications', 'propertyUpdates')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  editedSettings.notifications.propertyUpdates ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    editedSettings.notifications.propertyUpdates ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-800">Rent Reminders</h3>
                <p className="text-sm text-gray-600">Receive reminders for rent payments</p>
              </div>
              <button
                onClick={() => handleToggle('notifications', 'rentReminders')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  editedSettings.notifications.rentReminders ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    editedSettings.notifications.rentReminders ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center mb-4">
            <Shield className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Security</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-800">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
              </div>
              <button
                onClick={() => handleToggle('security', 'twoFactorAuth')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  editedSettings.security.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    editedSettings.security.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-800">Login Alerts</h3>
                <p className="text-sm text-gray-600">Get notified when someone logs into your account</p>
              </div>
              <button
                onClick={() => handleToggle('security', 'loginAlerts')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  editedSettings.security.loginAlerts ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    editedSettings.security.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-800">Device Management</h3>
                <p className="text-sm text-gray-600">Manage devices connected to your account</p>
              </div>
              <button
                onClick={() => handleToggle('security', 'deviceManagement')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  editedSettings.security.deviceManagement ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    editedSettings.security.deviceManagement ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <User className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Account</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-500 mr-3" />
              <div className="flex-1">
                <label className="text-sm text-gray-500">Email</label>
                <p className="text-gray-800">{settings.account.email}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-gray-500 mr-3" />
              <div className="flex-1">
                <label className="text-sm text-gray-500">Phone Number</label>
                <p className="text-gray-800">{settings.account.phoneNumber}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Globe className="w-5 h-5 text-gray-500 mr-3" />
              <div className="flex-1">
                <label className="text-sm text-gray-500">Language</label>
                <p className="text-gray-800">{settings.account.language}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-gray-500 mr-3" />
              <div className="flex-1">
                <label className="text-sm text-gray-500">Timezone</label>
                <p className="text-gray-800">{settings.account.timezone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 