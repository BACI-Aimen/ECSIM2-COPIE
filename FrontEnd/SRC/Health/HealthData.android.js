import GoogleFit, { Scopes } from 'react-native-google-fit';

const options = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ,
    Scopes.FITNESS_ACTIVITY_WRITE,
  ],
};

const HealthData = {
  async initialize() {
    try {
      const authResult = await GoogleFit.authorize(options);
      if (authResult.success) {
        console.log('Authorization successful');
        return true;
      } else {
        console.error('Authorization failed:', authResult.message);
        return false;
      }
    } catch (error) {
      console.error('Authorization error:', error);
      return false;
    }
  },

  async getSteps() {
    const initSuccess = await this.initialize();
    if (!initSuccess) return [];

    const stepOptions = {
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // Last 7 days
      endDate: new Date().toISOString(),
    };

    try {
      const stepData = await GoogleFit.getDailyStepCountSamples(stepOptions);
      console.log('Steps data:', stepData);
      return stepData;
    } catch (error) {
      console.error('Error fetching steps data:', error);
      return [];
    }
  },
};

export default HealthData;