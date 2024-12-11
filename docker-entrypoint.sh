#!/bin/sh

echo "Waiting for MySQL to start..."
./wait-for db:3306

# tail -f /dev/null
echo "Migrating the databse..."
# echo "init" | npx prisma migrate dev
npm run db:up

echo "Seeding the databse..."
npx prisma db seed

echo "Starting the server..."
npm run dev