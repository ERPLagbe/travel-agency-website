import React, { useState } from 'react';
import { Typography, Button, Card } from './';
import { Plane, MapPin, Calendar, Users } from 'lucide-react';

const FlightBookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    adults: 1,
    children: 0,
    infants: 0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Flight search:', formData);
  };

  return (
    <Card style={{ 
      padding: 'var(--spacing-8)', 
      backgroundColor: 'var(--color-white)',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      borderRadius: 'var(--radius-lg)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-8)' }}>
        <Typography variant="h2" style={{ marginBottom: 'var(--spacing-4)' }}>
          Book Your Flight
        </Typography>
        <Typography variant="body" color="muted">
          Find the best deals for your spiritual journey
        </Typography>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: 'var(--spacing-6)',
          marginBottom: 'var(--spacing-8)'
        }}>
          {/* From */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: 'var(--spacing-2)', 
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-gray-700)'
            }}>
              <MapPin size={16} style={{ display: 'inline', marginRight: 'var(--spacing-1)' }} />
              From
            </label>
            <select
              name="from"
              value={formData.from}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: 'var(--spacing-3)',
                border: '2px solid var(--color-gray-200)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-base)',
                backgroundColor: 'var(--color-white)'
              }}
              required
            >
              <option value="">Select departure city</option>
              <option value="LHR">London Heathrow (LHR)</option>
              <option value="LGW">London Gatwick (LGW)</option>
              <option value="MAN">Manchester (MAN)</option>
              <option value="BHX">Birmingham (BHX)</option>
              <option value="GLA">Glasgow (GLA)</option>
              <option value="EDI">Edinburgh (EDI)</option>
            </select>
          </div>

          {/* To */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: 'var(--spacing-2)', 
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-gray-700)'
            }}>
              <MapPin size={16} style={{ display: 'inline', marginRight: 'var(--spacing-1)' }} />
              To
            </label>
            <select
              name="to"
              value={formData.to}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: 'var(--spacing-3)',
                border: '2px solid var(--color-gray-200)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-base)',
                backgroundColor: 'var(--color-white)'
              }}
              required
            >
              <option value="">Select destination</option>
              <option value="JED">Jeddah (JED)</option>
              <option value="MED">Madinah (MED)</option>
              <option value="RUH">Riyadh (RUH)</option>
              <option value="IST">Istanbul (IST)</option>
              <option value="DXB">Dubai (DXB)</option>
              <option value="DOH">Doha (DOH)</option>
            </select>
          </div>

          {/* Departure Date */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: 'var(--spacing-2)', 
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-gray-700)'
            }}>
              <Calendar size={16} style={{ display: 'inline', marginRight: 'var(--spacing-1)' }} />
              Departure
            </label>
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: 'var(--spacing-3)',
                border: '2px solid var(--color-gray-200)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-base)',
                backgroundColor: 'var(--color-white)'
              }}
              required
            />
          </div>

          {/* Return Date */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: 'var(--spacing-2)', 
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-gray-700)'
            }}>
              <Calendar size={16} style={{ display: 'inline', marginRight: 'var(--spacing-1)' }} />
              Return
            </label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: 'var(--spacing-3)',
                border: '2px solid var(--color-gray-200)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-base)',
                backgroundColor: 'var(--color-white)'
              }}
            />
          </div>

          {/* Passengers */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: 'var(--spacing-2)', 
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-gray-700)'
            }}>
              <Users size={16} style={{ display: 'inline', marginRight: 'var(--spacing-1)' }} />
              Passengers
            </label>
            <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
              <div style={{ flex: 1 }}>
                <select
                  name="adults"
                  value={formData.adults}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-3)',
                    border: '2px solid var(--color-gray-200)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-base)',
                    backgroundColor: 'var(--color-white)'
                  }}
                >
                  <option value={1}>1 Adult</option>
                  <option value={2}>2 Adults</option>
                  <option value={3}>3 Adults</option>
                  <option value={4}>4 Adults</option>
                  <option value={5}>5 Adults</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <select
                  name="children"
                  value={formData.children}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-3)',
                    border: '2px solid var(--color-gray-200)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-base)',
                    backgroundColor: 'var(--color-white)'
                  }}
                >
                  <option value={0}>0 Children</option>
                  <option value={1}>1 Child</option>
                  <option value={2}>2 Children</option>
                  <option value={3}>3 Children</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Button 
            type="submit" 
            variant="primary" 
            size="lg"
            style={{ 
              backgroundColor: 'var(--color-accent)',
              border: 'none',
              padding: 'var(--spacing-4) var(--spacing-8)',
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'var(--font-weight-bold)'
            }}
          >
            <Plane size={20} style={{ marginRight: 'var(--spacing-2)' }} />
            Search Flights
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default FlightBookingForm;
