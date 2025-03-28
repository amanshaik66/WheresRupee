/**
 * Sends a POST request to track a note along with user location.
 * 
 * @param {string} serialNumber - The currency serial number to track.
 * @param {number} latitude - The user's current latitude.
 * @param {number} longitude - The user's current longitude.
 * @param {number} accuracy - The accuracy of the geolocation reading.
 * 
 * @returns {Promise<object>} - Tracking response with data or error message.
 */
export async function trackNoteWithLocation(serialNumber, latitude, longitude, accuracy) {
    try {
      const response = await fetch('/api/notes/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serialNumber,
          latitude,
          longitude,
          accuracy,
        }),
      });
  
      const raw = await response.text();
  
      let result;
      try {
        result = JSON.parse(raw);
      } catch (parseError) {
        console.error('Non-JSON response received:', raw);
        throw new Error('Server returned invalid response format.');
      }
  
      if (!response.ok) {
        throw new Error(result.message || 'Server error');
      }
  
      return result;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
  