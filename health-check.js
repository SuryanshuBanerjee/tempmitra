const http = require('http');

async function checkEndpoint(url, description) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      const status = res.statusCode >= 200 && res.statusCode < 300 ? '✅' : '❌';
      console.log(`${status} ${description}: ${res.statusCode}`);
      resolve(res.statusCode);
    });
    
    req.on('error', (err) => {
      console.log(`❌ ${description}: ERROR - ${err.message}`);
      resolve(0);
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      console.log(`❌ ${description}: TIMEOUT`);
      resolve(0);
    });
  });
}

async function runHealthCheck() {
  console.log('🏥 MITRA Health Check\n');
  
  const checks = [
    ['http://localhost:5000/api/health', 'Backend API'],
    ['http://localhost:3001', 'Frontend App'],
  ];
  
  for (const [url, description] of checks) {
    await checkEndpoint(url, description);
  }
  
  console.log('\n🎯 Health check complete!');
  console.log('💡 If any services are down, check:');
  console.log('   - Backend: npm run dev (in backend/ folder)');
  console.log('   - Frontend: npm run dev (in root folder)');
}

runHealthCheck().catch(console.error);