import React, { useState } from 'react';
import { format } from 'date-fns';

interface Medication {
  id: string;
  name: string;
  genericName?: string;
  dosage: string;
  administrationMethod: string;
  frequency: string;
  instructions: string;
  sideEffects: string[];
  storageInstructions: string;
  videoUrl?: string;
  imageUrl?: string;
}

interface MedicationSchedule {
  id: string;
  medicationId: string;
  medication: Medication;
  startDate: Date;
  endDate?: Date;
  times: string[];
  specialInstructions?: string;
}

const Medications: React.FC = () => {
  const [selectedMedication, setSelectedMedication] = useState<string | null>(null);
  const [showSchedule, setShowSchedule] = useState(true);

  // Sample medication database
  const medications: Medication[] = [
    {
      id: '1',
      name: 'Gonal-F',
      genericName: 'Follitropin alfa',
      dosage: '225 IU',
      administrationMethod: 'Subcutaneous injection',
      frequency: 'Once daily',
      instructions: 'Inject at the same time each day, preferably in the evening. Rotate injection sites.',
      sideEffects: ['Injection site reactions', 'Headache', 'Fatigue', 'Ovarian enlargement'],
      storageInstructions: 'Store in refrigerator (36-46°F). Do not freeze. Protect from light.',
      videoUrl: '/videos/gonal-f-injection.mp4',
      imageUrl: '/images/gonal-f.jpg'
    },
    {
      id: '2',
      name: 'Cetrotide',
      genericName: 'Cetrorelix acetate',
      dosage: '0.25 mg',
      administrationMethod: 'Subcutaneous injection',
      frequency: 'Once daily',
      instructions: 'Inject in the morning at the same time each day. Mix powder with provided solution.',
      sideEffects: ['Injection site reactions', 'Nausea', 'Headache'],
      storageInstructions: 'Store at room temperature. Protect from light. Use immediately after mixing.',
      videoUrl: '/videos/cetrotide-injection.mp4'
    },
    {
      id: '3',
      name: 'Pregnyl',
      genericName: 'Human Chorionic Gonadotropin (hCG)',
      dosage: '10,000 IU',
      administrationMethod: 'Intramuscular injection',
      frequency: 'Single dose',
      instructions: 'Inject exactly 36 hours before scheduled egg retrieval. Use larger needle for IM injection.',
      sideEffects: ['Injection site pain', 'Mood changes', 'Breast tenderness'],
      storageInstructions: 'Store powder at room temperature. Refrigerate after mixing. Use within 30 days.'
    }
  ];

  // Sample medication schedules
  const schedules: MedicationSchedule[] = [
    {
      id: '1',
      medicationId: '1',
      medication: medications[0],
      startDate: new Date(2025, 8, 10),
      endDate: new Date(2025, 8, 22),
      times: ['20:00'],
      specialInstructions: 'Start with lower dose for first 3 days'
    },
    {
      id: '2',
      medicationId: '2',
      medication: medications[1],
      startDate: new Date(2025, 8, 15),
      endDate: new Date(2025, 8, 22),
      times: ['08:00']
    },
    {
      id: '3',
      medicationId: '3',
      medication: medications[2],
      startDate: new Date(2025, 8, 23),
      times: ['09:00'],
      specialInstructions: 'Trigger shot - timing is critical!'
    }
  ];

  const getTodaysMedications = () => {
    const today = new Date();
    return schedules.filter(schedule => {
      const startDate = new Date(schedule.startDate);
      const endDate = schedule.endDate ? new Date(schedule.endDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      return today >= startDate && today <= endDate;
    });
  };

  const getAdministrationIcon = (method: string) => {
    if (method.includes('injection')) return '💉';
    if (method.includes('oral')) return '💊';
    if (method.includes('vaginal')) return '🔺';
    if (method.includes('nasal')) return '👃';
    return '💊';
  };

  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-lg)' }}>
      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 className="card-title">Medication Guide</h1>
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
              <button 
                className={`btn ${showSchedule ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setShowSchedule(true)}
              >
                My Schedule
              </button>
              <button 
                className={`btn ${!showSchedule ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setShowSchedule(false)}
              >
                All Medications
              </button>
            </div>
          </div>
        </div>

        {showSchedule ? (
          <div>
            {/* Today's Medications */}
            <div className="card" style={{ background: 'var(--secondary-mint)' }}>
              <h3>Today's Medications</h3>
              {getTodaysMedications().length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                  {getTodaysMedications().map(schedule => (
                    <div
                      key={schedule.id}
                      style={{
                        background: 'var(--white)',
                        padding: 'var(--spacing-md)',
                        borderRadius: 'var(--border-radius-small)',
                        border: '2px solid var(--primary-blue-light)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-xs)' }}>
                            <span style={{ fontSize: '1.5rem' }}>
                              {getAdministrationIcon(schedule.medication.administrationMethod)}
                            </span>
                            <h4 style={{ margin: 0 }}>{schedule.medication.name}</h4>
                          </div>
                          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 'var(--spacing-sm)' }}>
                            {schedule.medication.dosage} • {schedule.medication.administrationMethod}
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
                            {schedule.times.map(time => (
                              <span
                                key={time}
                                style={{
                                  padding: 'var(--spacing-xs) var(--spacing-sm)',
                                  background: 'var(--primary-blue)',
                                  color: 'white',
                                  borderRadius: 'var(--border-radius-small)',
                                  fontSize: '0.875rem',
                                  fontWeight: '600'
                                }}
                              >
                                {time}
                              </span>
                            ))}
                          </div>
                          {schedule.specialInstructions && (
                            <div style={{
                              marginTop: 'var(--spacing-sm)',
                              padding: 'var(--spacing-sm)',
                              background: 'var(--warning)',
                              borderRadius: 'var(--border-radius-small)',
                              fontSize: '0.875rem'
                            }}>
                              ⚠️ {schedule.specialInstructions}
                            </div>
                          )}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                          <button className="btn btn-sm btn-success">Mark Taken</button>
                          <button 
                            className="btn btn-sm btn-secondary"
                            onClick={() => setSelectedMedication(schedule.medication.id)}
                          >
                            View Guide
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', margin: 0 }}>
                  No medications scheduled for today.
                </p>
              )}
            </div>

            {/* Full Schedule */}
            <div className="card">
              <h3>Complete Medication Schedule</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                {schedules.map(schedule => (
                  <div
                    key={schedule.id}
                    style={{
                      padding: 'var(--spacing-md)',
                      border: '1px solid var(--gray-200)',
                      borderRadius: 'var(--border-radius-small)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h4 style={{ margin: '0 0 var(--spacing-xs) 0' }}>{schedule.medication.name}</h4>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                          {format(schedule.startDate, 'MMM d')} - {schedule.endDate ? format(schedule.endDate, 'MMM d') : 'Ongoing'}
                        </div>
                        <div style={{ marginTop: 'var(--spacing-sm)' }}>
                          {schedule.times.map(time => (
                            <span
                              key={time}
                              style={{
                                display: 'inline-block',
                                margin: '0 var(--spacing-xs) var(--spacing-xs) 0',
                                padding: 'var(--spacing-xs) var(--spacing-sm)',
                                background: 'var(--gray-100)',
                                borderRadius: 'var(--border-radius-small)',
                                fontSize: '0.75rem'
                              }}
                            >
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button 
                        className="btn btn-sm btn-secondary"
                        onClick={() => setSelectedMedication(schedule.medication.id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* All Medications Database */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            {medications.map(medication => (
              <div key={medication.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-sm)' }}>
                      <span style={{ fontSize: '2rem' }}>
                        {getAdministrationIcon(medication.administrationMethod)}
                      </span>
                      <div>
                        <h3 style={{ margin: 0 }}>{medication.name}</h3>
                        {medication.genericName && (
                          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                            {medication.genericName}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                      <div>
                        <strong>Dosage:</strong> {medication.dosage}
                      </div>
                      <div>
                        <strong>Method:</strong> {medication.administrationMethod}
                      </div>
                      <div>
                        <strong>Frequency:</strong> {medication.frequency}
                      </div>
                    </div>

                    <p style={{ marginBottom: 'var(--spacing-md)' }}>{medication.instructions}</p>

                    {selectedMedication === medication.id && (
                      <div style={{ marginTop: 'var(--spacing-md)' }}>
                        {/* Side Effects */}
                        <div style={{ marginBottom: 'var(--spacing-md)' }}>
                          <h4>Possible Side Effects</h4>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-xs)' }}>
                            {medication.sideEffects.map(effect => (
                              <span
                                key={effect}
                                style={{
                                  padding: 'var(--spacing-xs) var(--spacing-sm)',
                                  background: 'var(--warning)',
                                  borderRadius: 'var(--border-radius-small)',
                                  fontSize: '0.75rem'
                                }}
                              >
                                {effect}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Storage Instructions */}
                        <div style={{
                          padding: 'var(--spacing-md)',
                          background: 'var(--gray-50)',
                          borderRadius: 'var(--border-radius-small)',
                          marginBottom: 'var(--spacing-md)'
                        }}>
                          <h4 style={{ margin: '0 0 var(--spacing-sm) 0' }}>Storage Instructions</h4>
                          <p style={{ margin: 0 }}>{medication.storageInstructions}</p>
                        </div>

                        {/* Video Guide */}
                        {medication.videoUrl && (
                          <div style={{ marginBottom: 'var(--spacing-md)' }}>
                            <h4>Administration Video Guide</h4>
                            <div style={{
                              padding: 'var(--spacing-md)',
                              background: 'var(--secondary-lavender)',
                              borderRadius: 'var(--border-radius-small)',
                              textAlign: 'center'
                            }}>
                              <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-sm)' }}>🎥</div>
                              <p style={{ margin: '0 0 var(--spacing-md) 0' }}>
                                Step-by-step injection guide for {medication.name}
                              </p>
                              <button className="btn btn-primary">Watch Video</button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                    <button 
                      className={`btn btn-sm ${selectedMedication === medication.id ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setSelectedMedication(selectedMedication === medication.id ? null : medication.id)}
                    >
                      {selectedMedication === medication.id ? 'Hide Details' : 'View Details'}
                    </button>
                    {medication.videoUrl && (
                      <button className="btn btn-sm btn-secondary">
                        📹 Video Guide
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Emergency Contact */}
        <div className="card" style={{ background: 'var(--error)', color: 'white' }}>
          <h3 style={{ color: 'white', margin: '0 0 var(--spacing-sm) 0' }}>⚠️ Emergency Contact</h3>
          <p style={{ margin: '0 0 var(--spacing-md) 0' }}>
            If you experience severe side effects or have concerns about your medications, contact your clinic immediately.
          </p>
          <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
            <button className="btn" style={{ background: 'white', color: 'var(--error)' }}>
              📞 Call Clinic
            </button>
            <button className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid white' }}>
              💬 Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medications;