const fs = require('fs');
const path = require('path');

const mappings = {
  'AdminDashboard.jsx': 'getAdminDashboard',
  'SkillGapAnalysis.jsx': 'getSkillGapAnalysis',
  'PlacementReadiness.jsx': 'getPlacementReadiness',
  'Notifications.jsx': 'getNotifications',
  'MyProfile.jsx': 'getProfile',
  'MockInterview.jsx': 'getMockInterview',
  'LearningRoadmap.jsx': 'getLearningRoadmap',
  'LearningResources.jsx': 'getLearningResources',
  'CareerIntelligence.jsx': 'getCareerIntelligence',
  'AICareerCoach.jsx': 'getAICoach'
};

const pagesDir = path.join(__dirname, 'src', 'pages');

for (const [file, apiFunc] of Object.entries(mappings)) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Insert import
  const importStatement = `import { ${apiFunc} } from '../services/apiService';\n`;
  content = content.replace(/(import React.*?from 'react';\r?\n)/, `$1${importStatement}`);

  // Replace useEffect
  const regex = /useEffect\(\(\) => \{[\s\S]*?import\('\.\.\/data\/mock.*?'\)\.then\([\s\S]*?\}\, \[\]\);/m;
  
  const replacement = `useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ${apiFunc}();
        setData(response);
      } catch (error) {
        console.error('Failed to fetch ${apiFunc} data:', error);
      }
    };
    fetchData();
  }, []);`;

  content = content.replace(regex, replacement);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated ' + file);
}
