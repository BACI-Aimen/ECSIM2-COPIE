import AppleHealthKit from 'react-native-health';

const HealthKitOptions = {
  permissions: {
    read: ['StepCount', 'DistanceWalkingRunning'],
  },
};

const HealthData = {
  async getSteps() {
    return new Promise((resolve, reject) => {
      AppleHealthKit.initHealthKit(HealthKitOptions, (err) => {
        if (err) {
          console.error("Erreur HealthKit :", err);
          reject(err);
        }
        AppleHealthKit.getStepCount(null, (err, results) => {
          if (err) {
            console.error("Erreur récupération steps :", err);
            reject(err);
          }
          resolve(results);
        });
      });
    });
  },
};

export default HealthData;
