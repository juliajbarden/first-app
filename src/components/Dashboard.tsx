import React from 'react';

const Dashboard: React.FC = () => {
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-lg)' }}>
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Good {getTimeOfDay()}, Kate!</h1>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
            Welcome to your fertility journey
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-md)' }}>
          {/* Today's Overview */}
          <div className="card">
            <h3>Today's Overview</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              <div style={{ 
                padding: 'var(--spacing-sm)', 
                background: 'var(--primary-blue-light)', 
                borderRadius: 'var(--border-radius-small)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)'
              }}>
                <span>💊</span>
                <span>2 medications due today</span>
              </div>
              <div style={{ 
                padding: 'var(--spacing-sm)', 
                background: 'var(--secondary-lavender)', 
                borderRadius: 'var(--border-radius-small)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)'
              }}>
                <span>📅</span>
                <span>Monitoring appointment at 10:00 AM</span>
              </div>
            </div>
          </div>

          {/* Treatment Progress */}
          <div className="card">
            <h3>Treatment Progress</h3>
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)' }}>
                <span>Stimulation Phase</span>
                <span>Day 8 of 12</span>
              </div>
              <div style={{ 
                background: 'var(--gray-200)', 
                borderRadius: 'var(--border-radius-small)', 
                height: '8px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  background: 'var(--primary-blue)', 
                  height: '100%', 
                  width: '67%',
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>
              You're doing great! Keep following your medication schedule.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              <button className="btn btn-primary">
                Log Today's Journal Entry
              </button>
              <button className="btn btn-secondary">
                View Medication Schedule
              </button>
              <button className="btn btn-secondary">
                Message My Clinic
              </button>
            </div>
          </div>

          {/* Recent Mood Trend */}
          <div className="card">
            <h3>Recent Mood Trend</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
              <div style={{ fontSize: '2rem' }}>😊</div>
              <div>
                <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Feeling Better</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Your mood has improved over the past 3 days
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="card">
            <h3>Upcoming This Week</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Blood Work</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Tomorrow</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Ultrasound</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Friday</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Egg Retrieval</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Next Week</span>
              </div>
            </div>
          </div>

          {/* Encouragement Card */}
          <div className="card" style={{ background: 'var(--secondary-pink)', border: '1px solid #F3E8FF' }}>
            <h3 style={{ margin: '0 0 var(--spacing-sm) 0' }}>💝 Daily Encouragement</h3>
            <p style={{ margin: 0, fontStyle: 'italic' }}>
              "Every step you take in this journey is a step toward your dreams. You are stronger than you know."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;