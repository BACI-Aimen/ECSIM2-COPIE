import {
  initialize,
  requestPermission,
  readRecords,  
  insertRecords
} from 'react-native-health-connect';

const HealthData = {
  async addSteps(){
    try {
      const result = await insertRecords([
        {
          recordType: 'Steps',
          count: 5000,
          startTime: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
          endTime: new Date().toISOString(),
        },
      ]);
  
      console.log('Steps inserted:', result);
    } catch (error) {
      console.error('Error inserting steps:', error);
    }
  },
  async getSteps() {

    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0); // Début du jour
    const endOfDay = new Date(now); // Maintenant

    const isInitialized = await initialize();

    const grantedPermissions = await requestPermission([
      { accessType: 'read', recordType: 'Steps' },
      { accessType: 'write', recordType: 'Steps'}
    ]);
  
    const { records } = await readRecords('Steps', {
      timeRangeFilter: {
        operator: 'between',
        startTime: startOfDay.toISOString(),
        endTime: endOfDay.toISOString(),
      },
    })
    const totalSteps = records.reduce((sum, record) => sum + record.count, 0);
    return totalSteps

  },
};

export default HealthData;