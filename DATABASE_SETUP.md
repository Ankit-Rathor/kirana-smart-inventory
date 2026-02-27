# 🐘 PostgreSQL Database Setup - KiranaIQ

## Option 1: Using Docker (Recommended)

### Prerequisites
- Docker installed
- Docker Compose installed

### Steps

1. **Start PostgreSQL with Docker**
```bash
docker-compose up -d
```

2. **Verify PostgreSQL is running**
```bash
docker ps | grep kirana-iq-db
```

3. **Run Prisma migrations**
```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

4. **Access database (optional)**
```bash
docker exec -it kirana-iq-db psql -U postgres -d kirana_iq
```

5. **Stop database**
```bash
docker-compose down
```

---

## Option 2: Local PostgreSQL Installation

### Prerequisites
- PostgreSQL 15+ installed
- psql CLI tool

### Steps

1. **Install PostgreSQL (Ubuntu/Debian)**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

2. **Start PostgreSQL service**
```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

3. **Create database and user**
```bash
sudo -u postgres psql
```

```sql
CREATE DATABASE kirana_iq;
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE kirana_iq TO postgres;
\q
```

4. **Update connection string**
Edit `backend/.env`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kirana_iq?schema=public"
```

5. **Run Prisma migrations**
```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

---

## Option 3: Using a different PostgreSQL server

1. **Update `.env` file**
```env
DATABASE_URL="postgresql://user:password@host:port/database"
```

Example:
```env
DATABASE_URL="postgresql://myuser:mypassword@192.168.1.100:5432/kirana_iq"
```

2. **Run migrations**
```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

---

## Verify Connection

After setup, test the connection:

```bash
cd backend
npx prisma studio
```

This opens Prisma Studio at http://localhost:5555 where you can view and manage your data.

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | postgresql://postgres:postgres@localhost:5432/kirana_iq |
| POSTGRES_USER | Database username | postgres |
| POSTGRES_PASSWORD | Database password | postgres |
| POSTGRES_DB | Database name | kirana_iq |
| POSTGRES_PORT | Database port | 5432 |

---

## Troubleshooting

### Connection refused
```bash
# Check if PostgreSQL is running
docker ps | grep kirana-iq-db

# Or for local installation
sudo systemctl status postgresql
```

### Authentication failed
```bash
# Reset password (Docker)
docker-compose down
docker volume rm kirana-smart-inventory_postgres_data
docker-compose up -d
```

### Port already in use
Change port in `docker-compose.yml`:
```yaml
ports:
  - "5433:5432"  # Use 5433 instead
```

Then update `.env`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/kirana_iq"
```

---

## Database Backup

### Create backup
```bash
docker exec kirana-iq-db pg_dump -U postgres kirana_iq > backup.sql
```

### Restore backup
```bash
docker exec -i kirana-iq-db psql -U postgres -d kirana_iq < backup.sql
```

---

## Production Setup

For production, use environment variables:

```env
DATABASE_URL="postgresql://user:secure-password@your-db-host:5432/kirana_iq?schema=public"
```

Use a managed PostgreSQL service like:
- AWS RDS
- Google Cloud SQL
- Azure Database for PostgreSQL
- Supabase
- Neon
