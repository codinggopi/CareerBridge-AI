# CareerBridge-AI Database Setup

This folder contains all the database-related scripts and configuration.

## Directory Structure
- `config.py`: MySQL connection settings used by the backend.
- `schema.sql`: Complete database schema (tables, columns, types).
- `reset.sql`: Script to clear all application data and reset `AUTO_INCREMENT`.
- `backup.sql`: Full database backup.
- `seed.sql`: Optional demo data.
- `migrations/`: Folder for future migration scripts.

## Database Management Instructions

### 1. How to create the database
Before running the application, you need to create the database in MySQL:
```sql
CREATE DATABASE careerbridge;
```

### 2. How to import schema.sql
To initialize the database structure from the schema dump:
```bash
mysql -u root -p careerbridge < database/schema.sql
```
*(Alternatively, SQLAlchemy auto-creates tables when the backend starts, but you can use `schema.sql` for manual setups).*

### 3. How to run seed.sql
If you want to load optional demo data into the database:
```bash
mysql -u root -p careerbridge < database/seed.sql
```

### 4. How to execute reset.sql
To completely wipe all users and application data, and reset `AUTO_INCREMENT` back to 1 (making it a fresh installation):
```bash
mysql -u root -p careerbridge < database/reset.sql
```

### 5. How to create backups
To export a full backup (schema + data) of your current database:
```bash
mysqldump -u root -p careerbridge > database/backup.sql
```

### 6. How to restore backups
To restore your database from `backup.sql`:
```bash
mysql -u root -p careerbridge < database/backup.sql
```
