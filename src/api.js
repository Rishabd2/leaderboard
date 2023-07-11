async function fetchAttendeesPoints(limit) {
    try {
      const response = await fetch(`https://api.hackillinois.org/profile/leaderboard/?limit=${limit || ''}`);

      if (!response.ok) {
        throw new Error('Failed to fetch attendees points');
      }
      const data = await response.json();
      return data.profiles;
    } catch (error) {
      console.error(error);
      // Handle error gracefully
      return null;
    }
  }
  export { fetchAttendeesPoints };
