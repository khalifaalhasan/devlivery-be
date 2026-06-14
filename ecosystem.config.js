module.exports = {
  apps: [
    {
      name: 'devlivery-api', // Nama aplikasi di PM2
      script: 'dist/main.js', // Entry point dari NestJS yang sudah di-build
      instances: 'max', // Menggunakan semua core CPU (Cluster Mode)
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G', // Restart jika penggunaan memory melebihi 1GB
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
