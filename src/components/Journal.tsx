import React, { useState } from 'react';
import { format } from 'date-fns';

interface JournalEntry {
  id: string;
  date: Date;
  moodScore: number;
  physicalSymptoms: string[];
  sideEffects: string[];
  notes: string;
  tags: string[];
}

const Journal: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [moodScore, setMoodScore] = useState(5);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedSideEffects, setSelectedSideEffects] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [showNewEntry, setShowNewEntry] = useState(false);

  // Sample journal entries
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: new Date(2025, 8, 14),
      moodScore: 7,
      physicalSymptoms: ['bloating', 'fatigue'],
      sideEffects: ['injection_site_reaction'],
      notes: 'Feeling more optimistic today. The injection site is a bit sore but manageable.',
      tags: ['positive', 'manageable']
    },
    {
      id: '2',
      date: new Date(2025, 8, 13),
      moodScore: 4,
      physicalSymptoms: ['headache', 'nausea'],
      sideEffects: ['mood_swings'],
      notes: 'Had a tough day with headaches. The medications are making me feel emotional.',
      tags: ['difficult', 'emotional']
    }
  ]);

  const symptoms = [
    'bloating', 'fatigue', 'headache', 'nausea', 'mood_swings', 
    'breast_tenderness', 'hot_flashes', 'abdominal_pain', 'injection_site_reaction'
  ];

  const sideEffects = [
    'injection_site_reaction', 'mood_swings', 'hot_flashes', 'nausea', 
    'headache', 'bloating', 'breast_tenderness', 'fatigue'
  ];

  const moodEmojis = ['😢', '😔', '😐', '🙁', '😕', '😊', '😌', '😍', '🥰', '✨'];

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSideEffectToggle = (sideEffect: string) => {
    setSelectedSideEffects(prev => 
      prev.includes(sideEffect) 
        ? prev.filter(s => s !== sideEffect)
        : [...prev, sideEffect]
    );
  };

  const handleSaveEntry = () => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: selectedDate,
      moodScore,
      physicalSymptoms: selectedSymptoms,
      sideEffects: selectedSideEffects,
      notes,
      tags: []
    };

    setEntries(prev => [newEntry, ...prev]);
    
    // Reset form
    setMoodScore(5);
    setSelectedSymptoms([]);
    setSelectedSideEffects([]);
    setNotes('');
    setShowNewEntry(false);
  };

  const formatSymptom = (symptom: string) => {
    return symptom.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-lg)' }}>
      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 className="card-title">Daily Wellbeing Journal</h1>
            <button 
              className="btn btn-primary"
              onClick={() => setShowNewEntry(!showNewEntry)}
            >
              {showNewEntry ? 'Cancel' : 'New Entry'}
            </button>
          </div>
        </div>

        {/* New Entry Form */}
        {showNewEntry && (
          <div className="card" style={{ background: 'var(--gray-50)' }}>
            <h3>How are you feeling today?</h3>
            
            {/* Date Selection */}
            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-input"
                value={format(selectedDate, 'yyyy-MM-dd')}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
              />
            </div>

            {/* Mood Score */}
            <div className="form-group">
              <label className="form-label">Mood Score (1-10)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={moodScore}
                  onChange={(e) => setMoodScore(Number(e.target.value))}
                  style={{ flex: 1 }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                  <span style={{ fontSize: '2rem' }}>{moodEmojis[moodScore - 1]}</span>
                  <span style={{ fontWeight: '600', minWidth: '20px' }}>{moodScore}</span>
                </div>
              </div>
            </div>

            {/* Physical Symptoms */}
            <div className="form-group">
              <label className="form-label">Physical Symptoms</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
                {symptoms.map(symptom => (
                  <button
                    key={symptom}
                    type="button"
                    onClick={() => handleSymptomToggle(symptom)}
                    className={`btn btn-sm ${selectedSymptoms.includes(symptom) ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {formatSymptom(symptom)}
                  </button>
                ))}
              </div>
            </div>

            {/* Side Effects */}
            <div className="form-group">
              <label className="form-label">Medication Side Effects</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
                {sideEffects.map(sideEffect => (
                  <button
                    key={sideEffect}
                    type="button"
                    onClick={() => handleSideEffectToggle(sideEffect)}
                    className={`btn btn-sm ${selectedSideEffects.includes(sideEffect) ? 'btn-warning' : 'btn-secondary'}`}
                  >
                    {formatSymptom(sideEffect)}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="form-group">
              <label className="form-label">Notes & Thoughts</label>
              <textarea
                className="form-input form-textarea"
                placeholder="How are you feeling? Any concerns or positive moments you'd like to share?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowNewEntry(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSaveEntry}>
                Save Entry
              </button>
            </div>
          </div>
        )}

        {/* Journal Entries List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          {entries.map(entry => (
            <div key={entry.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-md)' }}>
                <div>
                  <h3 style={{ margin: '0 0 var(--spacing-xs) 0' }}>
                    {format(entry.date, 'EEEE, MMMM d, yyyy')}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                    <span style={{ fontSize: '1.5rem' }}>{moodEmojis[entry.moodScore - 1]}</span>
                    <span style={{ fontWeight: '600' }}>Mood: {entry.moodScore}/10</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                  <button className="btn btn-sm btn-secondary">Edit</button>
                  <button className="btn btn-sm btn-secondary">Export</button>
                </div>
              </div>

              {/* Symptoms */}
              {entry.physicalSymptoms.length > 0 && (
                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: 'var(--spacing-xs)', color: 'var(--text-secondary)' }}>
                    Physical Symptoms
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-xs)' }}>
                    {entry.physicalSymptoms.map(symptom => (
                      <span
                        key={symptom}
                        style={{
                          padding: 'var(--spacing-xs) var(--spacing-sm)',
                          background: 'var(--primary-blue-light)',
                          borderRadius: 'var(--border-radius-small)',
                          fontSize: '0.75rem'
                        }}
                      >
                        {formatSymptom(symptom)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Side Effects */}
              {entry.sideEffects.length > 0 && (
                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: 'var(--spacing-xs)', color: 'var(--text-secondary)' }}>
                    Medication Side Effects
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-xs)' }}>
                    {entry.sideEffects.map(sideEffect => (
                      <span
                        key={sideEffect}
                        style={{
                          padding: 'var(--spacing-xs) var(--spacing-sm)',
                          background: 'var(--warning)',
                          borderRadius: 'var(--border-radius-small)',
                          fontSize: '0.75rem'
                        }}
                      >
                        {formatSymptom(sideEffect)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {entry.notes && (
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: 'var(--spacing-xs)', color: 'var(--text-secondary)' }}>
                    Notes
                  </h4>
                  <p style={{ margin: 0, lineHeight: 1.6 }}>{entry.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {entries.length === 0 && !showNewEntry && (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-2xl)', color: 'var(--text-secondary)' }}>
            <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>📝</div>
            <h3>Start Your Wellness Journey</h3>
            <p>Begin tracking your daily wellbeing to help your healthcare team provide the best care possible.</p>
            <button className="btn btn-primary" onClick={() => setShowNewEntry(true)}>
              Create Your First Entry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Journal;