#!/bin/sh

set -e

# Function for build mode: waits for MySQL, migrates the DB, and seeds it
run_build() {
  echo "Waiting for MySQL to start..."
  ./wait-for db:3306

  echo "Migrating the database..."
  npm run db:up

  echo "Seeding the database..."
  npx prisma db seed
}

# Function for development mode: starts the development server
run_dev() {
  echo "Starting the development server..."
  npm run dev
}

# Function for production mode: starts the production server
run_prod() {
  echo "Starting the production server..."
  npm run start
}

# Main function to route based on the argument
run() {
  case "$1" in
    build)
      run_build
      ;;
    dev)
      run_build
      run_dev
      ;;
    prod)
      run_build
      run_prod
      ;;
    *)
      echo "Unknown mode: $1"
      echo "Usage: $0 {build|dev|prod}"
      exit 1
      ;;
  esac
}

# Call the run function with the provided argument
run "$1"
