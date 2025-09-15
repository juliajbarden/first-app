import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';

interface CalendarEvent {
  id: string;
  date: Date;
  type: 'appointment' | 'medication' | 'milestone';
  title: string;
  time?: string;
  color: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Sample events
  const events: CalendarEvent[] = [
    {
      id: '1',
      date: new Date(2025, 8, 16), // September 16, 2025
      type: 'appointment',
      title: 'Monitoring Appointment',
      time: '10:00 AM',
      color: 'var(--primary-blue)'
    },
    {
      id: '2',
      date: new Date(2025, 8, 16),
      type: 'medication',
      title: 'Evening Injections',
      time: '8:00 PM',
      color: 'var(--secondary-pink)'
    },
    {
      id: '3',
      date: new Date(2025, 8, 18),
      type: 'appointment',
      title: 'Blood Work',
      time: '8:00 AM',
      color: 'var(--primary-blue)'
    },
    {
      id: '4',
      date: new Date(2025, 8, 20),
      type: 'appointment',
      title: 'Ultrasound',
      time: '2:00 PM',
      color: 'var(--primary-blue)'
    },
    {
      id: '5',
      date: new Date(2025, 8, 23),
      type: 'milestone',
      title: 'Egg Retrieval',
      time: '9:00 AM',
      color: 'var(--success)'
    }
  ];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getDayEvents = (date: Date) => {
    return getEventsForDate(date);
  };

  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-lg)' }}>
      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 className="card-title">Treatment Calendar</h1>
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
              <button className="btn btn-secondary btn-sm" onClick={goToPreviousMonth}>
                ←
              </button>
              <h2 style={{ margin: 0, minWidth: '200px', textAlign: 'center' }}>
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <button className="btn btn-secondary btn-sm" onClick={goToNextMonth}>
                →
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', background: 'var(--gray-200)', borderRadius: 'var(--border-radius)' }}>
          {/* Day headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} style={{
              background: 'var(--gray-100)',
              padding: 'var(--spacing-sm)',
              textAlign: 'center',
              fontWeight: '600',
              color: 'var(--text-secondary)'
            }}>
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {daysInMonth.map(date => {
            const dayEvents = getDayEvents(date);
            const isCurrentMonth = isSameMonth(date, currentDate);
            const isTodayDate = isToday(date);

            return (
              <div
                key={date.toISOString()}
                onClick={() => setSelectedDate(date)}
                style={{
                  background: 'var(--white)',
                  minHeight: '100px',
                  padding: 'var(--spacing-xs)',
                  cursor: 'pointer',
                  opacity: isCurrentMonth ? 1 : 0.3,
                  border: isTodayDate ? '2px solid var(--primary-blue)' : 'none',
                  position: 'relative'
                }}
              >
                <div style={{
                  fontWeight: isTodayDate ? '700' : '500',
                  color: isTodayDate ? 'var(--primary-blue-dark)' : 'var(--text-primary)',
                  marginBottom: 'var(--spacing-xs)'
                }}>
                  {format(date, 'd')}
                </div>

                {/* Events for this day */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {dayEvents.slice(0, 3).map(event => (
                    <div
                      key={event.id}
                      style={{
                        background: event.color,
                        color: 'white',
                        fontSize: '0.75rem',
                        padding: '2px 4px',
                        borderRadius: '3px',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {event.time} {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary)',
                      textAlign: 'center'
                    }}>
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Date Details */}
        {selectedDate && (
          <div className="card" style={{ marginTop: 'var(--spacing-lg)' }}>
            <div className="card-header">
              <h3 className="card-title">
                {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </h3>
            </div>
            
            {getEventsForDate(selectedDate).length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                {getEventsForDate(selectedDate).map(event => (
                  <div
                    key={event.id}
                    style={{
                      padding: 'var(--spacing-md)',
                      border: `2px solid ${event.color}`,
                      borderRadius: 'var(--border-radius-small)',
                      background: `${event.color}10`
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ margin: '0 0 var(--spacing-xs) 0' }}>{event.title}</h4>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                          {event.type === 'appointment' && '🏥'} 
                          {event.type === 'medication' && '💊'} 
                          {event.type === 'milestone' && '🎯'} 
                          {event.time}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                        <button className="btn btn-sm btn-secondary">Edit</button>
                        <button className="btn btn-sm btn-primary">Details</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center', margin: 0 }}>
                No events scheduled for this day.
              </p>
            )}
          </div>
        )}

        {/* Legend */}
        <div className="card" style={{ marginTop: 'var(--spacing-lg)' }}>
          <h3>Legend</h3>
          <div style={{ display: 'flex', gap: 'var(--spacing-lg)', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
              <div style={{ 
                width: '16px', 
                height: '16px', 
                background: 'var(--primary-blue)', 
                borderRadius: '3px' 
              }}></div>
              <span>Appointments</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
              <div style={{ 
                width: '16px', 
                height: '16px', 
                background: 'var(--secondary-pink)', 
                borderRadius: '3px' 
              }}></div>
              <span>Medications</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
              <div style={{ 
                width: '16px', 
                height: '16px', 
                background: 'var(--success)', 
                borderRadius: '3px' 
              }}></div>
              <span>Milestones</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;