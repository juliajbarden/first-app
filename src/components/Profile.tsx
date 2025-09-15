import React, { useState } from 'react';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  phone: string;
  clinicName: string;
  treatmentPhase: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  preferences: {
    notificationSettings: {
      medicationReminders: boolean;
      appointmentReminders: boolean;
      reminderTiming: number[];
      quietHours: {
        start: string;
        end: string;
      };
    };
    privacy: {
      shareDataWithClinic: boolean;
      includeInSummaries: boolean;
      allowAnalytics: boolean;
    };
  };
}

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState<'personal' | 'preferences' | 'privacy'>('personal');
  
  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    dateOfBirth: '1985-03-15',
    phone: '(555) 123-4567',
    clinicName: 'Metropolitan Fertility Center',
    treatmentPhase: 'Stimulation',
    emergencyContact: {
      name: 'Michael Johnson',
      relationship: 'Spouse',
      phone: '(555) 987-6543'
    },
    preferences: {
      notificationSettings: {
        medicationReminders: true,
        appointmentReminders: true,
        reminderTiming: [60, 15],
        quietHours: {
          start: '22:00',
          end: '07:00'
        }
      },
      privacy: {
        shareDataWithClinic: true,
        includeInSummaries: true,
        allowAnalytics: false
      }
    }
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically save to a backend
    console.log('Profile saved:', profile);
  };

  const handleInputChange = (field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (section: string, field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof UserProfile] as any),
        [field]: value
      }
    }));
  };

  const handleDeepNestedInputChange = (section: string, subsection: string, field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof UserProfile] as any),
        [subsection]: {
          ...(prev[section as keyof UserProfile] as any)[subsection],
          [field]: value
        }
      }
    }));
  };

  const renderPersonalInfo = () => (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Personal Information</h3>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-md)' }}>
        <div className="form-group">
          <label className="form-label">First Name</label>
          {isEditing ? (
            <input
              type="text"
              className="form-input"
              value={profile.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
            />
          ) : (
            <div style={{ padding: 'var(--spacing-sm)', background: 'var(--gray-50)', borderRadius: 'var(--border-radius-small)' }}>
              {profile.firstName}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Last Name</label>
          {isEditing ? (
            <input
              type="text"
              className="form-input"
              value={profile.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
            />
          ) : (
            <div style={{ padding: 'var(--spacing-sm)', background: 'var(--gray-50)', borderRadius: 'var(--border-radius-small)' }}>
              {profile.lastName}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          {isEditing ? (
            <input
              type="email"
              className="form-input"
              value={profile.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          ) : (
            <div style={{ padding: 'var(--spacing-sm)', background: 'var(--gray-50)', borderRadius: 'var(--border-radius-small)' }}>
              {profile.email}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Phone</label>
          {isEditing ? (
            <input
              type="tel"
              className="form-input"
              value={profile.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          ) : (
            <div style={{ padding: 'var(--spacing-sm)', background: 'var(--gray-50)', borderRadius: 'var(--border-radius-small)' }}>
              {profile.phone}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Date of Birth</label>
          {isEditing ? (
            <input
              type="date"
              className="form-input"
              value={profile.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            />
          ) : (
            <div style={{ padding: 'var(--spacing-sm)', background: 'var(--gray-50)', borderRadius: 'var(--border-radius-small)' }}>
              {new Date(profile.dateOfBirth).toLocaleDateString()}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Current Treatment Phase</label>
          <div style={{ padding: 'var(--spacing-sm)', background: 'var(--primary-blue-light)', borderRadius: 'var(--border-radius-small)', fontWeight: '600' }}>
            {profile.treatmentPhase}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 'var(--spacing-lg)' }}>
        <h4>Clinic Information</h4>
        <div style={{ padding: 'var(--spacing-md)', background: 'var(--gray-50)', borderRadius: 'var(--border-radius-small)' }}>
          <div style={{ fontWeight: '600', marginBottom: 'var(--spacing-xs)' }}>{profile.clinicName}</div>
          <div style={{ color: 'var(--text-secondary)' }}>Your fertility care provider</div>
        </div>
      </div>

      <div style={{ marginTop: 'var(--spacing-lg)' }}>
        <h4>Emergency Contact</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-md)' }}>
          <div className="form-group">
            <label className="form-label">Name</label>
            {isEditing ? (
              <input
                type="text"
                className="form-input"
                value={profile.emergencyContact.name}
                onChange={(e) => handleNestedInputChange('emergencyContact', 'name', e.target.value)}
              />
            ) : (
              <div style={{ padding: 'var(--spacing-sm)', background: 'var(--gray-50)', borderRadius: 'var(--border-radius-small)' }}>
                {profile.emergencyContact.name}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Relationship</label>
            {isEditing ? (
              <input
                type="text"
                className="form-input"
                value={profile.emergencyContact.relationship}
                onChange={(e) => handleNestedInputChange('emergencyContact', 'relationship', e.target.value)}
              />
            ) : (
              <div style={{ padding: 'var(--spacing-sm)', background: 'var(--gray-50)', borderRadius: 'var(--border-radius-small)' }}>
                {profile.emergencyContact.relationship}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Phone</label>
            {isEditing ? (
              <input
                type="tel"
                className="form-input"
                value={profile.emergencyContact.phone}
                onChange={(e) => handleNestedInputChange('emergencyContact', 'phone', e.target.value)}
              />
            ) : (
              <div style={{ padding: 'var(--spacing-sm)', background: 'var(--gray-50)', borderRadius: 'var(--border-radius-small)' }}>
                {profile.emergencyContact.phone}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationPreferences = () => (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Notification Preferences</h3>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
        <div>
          <h4>Reminder Settings</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
              <input
                type="checkbox"
                checked={profile.preferences.notificationSettings.medicationReminders}
                onChange={(e) => handleDeepNestedInputChange('preferences', 'notificationSettings', 'medicationReminders', e.target.checked)}
              />
              <span>Medication reminders</span>
            </label>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
              <input
                type="checkbox"
                checked={profile.preferences.notificationSettings.appointmentReminders}
                onChange={(e) => handleDeepNestedInputChange('preferences', 'notificationSettings', 'appointmentReminders', e.target.checked)}
              />
              <span>Appointment reminders</span>
            </label>
          </div>
        </div>

        <div>
          <h4>Reminder Timing</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Choose when you'd like to receive reminders before appointments and medications.
          </p>
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
            {[5, 15, 30, 60, 120].map(minutes => (
              <label key={minutes} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
                <input
                  type="checkbox"
                  checked={profile.preferences.notificationSettings.reminderTiming.includes(minutes)}
                  onChange={(e) => {
                    const current = profile.preferences.notificationSettings.reminderTiming;
                    const updated = e.target.checked 
                      ? [...current, minutes]
                      : current.filter(m => m !== minutes);
                    handleDeepNestedInputChange('preferences', 'notificationSettings', 'reminderTiming', updated);
                  }}
                />
                <span>{minutes < 60 ? `${minutes}min` : `${minutes/60}hr`}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4>Quiet Hours</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Set hours when you don't want to receive non-critical notifications.
          </p>
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Start</label>
              <input
                type="time"
                className="form-input"
                value={profile.preferences.notificationSettings.quietHours.start}
                onChange={(e) => handleDeepNestedInputChange('preferences', 'notificationSettings', 'quietHours', {
                  ...profile.preferences.notificationSettings.quietHours,
                  start: e.target.value
                })}
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">End</label>
              <input
                type="time"
                className="form-input"
                value={profile.preferences.notificationSettings.quietHours.end}
                onChange={(e) => handleDeepNestedInputChange('preferences', 'notificationSettings', 'quietHours', {
                  ...profile.preferences.notificationSettings.quietHours,
                  end: e.target.value
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Privacy & Data Settings</h3>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
        <div>
          <h4>Data Sharing</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-sm)' }}>
              <input
                type="checkbox"
                checked={profile.preferences.privacy.shareDataWithClinic}
                onChange={(e) => handleDeepNestedInputChange('preferences', 'privacy', 'shareDataWithClinic', e.target.checked)}
                style={{ marginTop: '4px' }}
              />
              <div>
                <div>Share data with my fertility clinic</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  Allow your clinic to access your journal entries and symptoms for better care
                </div>
              </div>
            </label>
            
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-sm)' }}>
              <input
                type="checkbox"
                checked={profile.preferences.privacy.includeInSummaries}
                onChange={(e) => handleDeepNestedInputChange('preferences', 'privacy', 'includeInSummaries', e.target.checked)}
                style={{ marginTop: '4px' }}
              />
              <div>
                <div>Include my data in AI-generated visit summaries</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  Let our AI create helpful summaries for your doctor visits
                </div>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-sm)' }}>
              <input
                type="checkbox"
                checked={profile.preferences.privacy.allowAnalytics}
                onChange={(e) => handleDeepNestedInputChange('preferences', 'privacy', 'allowAnalytics', e.target.checked)}
                style={{ marginTop: '4px' }}
              />
              <div>
                <div>Allow anonymous analytics</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  Help improve FertilityFlow with anonymous usage data
                </div>
              </div>
            </label>
          </div>
        </div>

        <div style={{ 
          padding: 'var(--spacing-md)', 
          background: 'var(--secondary-lavender)', 
          borderRadius: 'var(--border-radius-small)' 
        }}>
          <h4 style={{ margin: '0 0 var(--spacing-sm) 0' }}>🔒 Your Privacy Matters</h4>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>
            All your data is encrypted and stored securely. You can export or delete your data at any time. 
            We never share your personal information with third parties without your explicit consent.
          </p>
        </div>

        <div>
          <h4>Data Management</h4>
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
            <button className="btn btn-secondary">Export My Data</button>
            <button className="btn btn-secondary">Download Medical Summary</button>
            <button className="btn btn-danger">Delete My Account</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-lg)' }}>
      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 className="card-title">Profile & Settings</h1>
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
              {isEditing ? (
                <>
                  <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleSaveProfile}>
                    Save Changes
                  </button>
                </>
              ) : (
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: 'var(--spacing-sm)', 
          marginBottom: 'var(--spacing-lg)',
          borderBottom: '1px solid var(--gray-200)',
          paddingBottom: 'var(--spacing-sm)'
        }}>
          <button 
            className={`btn ${activeSection === 'personal' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveSection('personal')}
          >
            Personal Info
          </button>
          <button 
            className={`btn ${activeSection === 'preferences' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveSection('preferences')}
          >
            Notifications
          </button>
          <button 
            className={`btn ${activeSection === 'privacy' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveSection('privacy')}
          >
            Privacy
          </button>
        </div>

        {/* Content based on active section */}
        {activeSection === 'personal' && renderPersonalInfo()}
        {activeSection === 'preferences' && renderNotificationPreferences()}
        {activeSection === 'privacy' && renderPrivacySettings()}
      </div>
    </div>
  );
};

export default Profile;