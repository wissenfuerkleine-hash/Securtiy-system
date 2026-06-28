const SecurityBot = require('./bot/bot');
const dashboardApp = require('./dashboard/server');
const RestoreManager = require('./systems/restore');
require('dotenv').config();

// Initialize bot
const bot = new SecurityBot();
bot.start();

// Wait for bot to be ready before setting up dashboard references
setTimeout(() => {
  const lockdownSystem = bot.getLockdownSystem();
  if (lockdownSystem) {
    dashboardApp.setLockdownSystem(lockdownSystem);
  }
  
  const restoreManager = new RestoreManager(bot.client);
  dashboardApp.setRestoreManager(restoreManager);
}, 5000);

// Start dashboard server
const PORT = process.env.PORT || 3000;
dashboardApp.listen(PORT, () => {
  console.log(`Dashboard running on port ${PORT}`);
});
