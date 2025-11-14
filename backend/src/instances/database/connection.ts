import sql from 'mssql';
import { config } from '@/config';

/**
 * @summary Database connection pool
 */
let pool: sql.ConnectionPool | null = null;

/**
 * @summary Gets or creates database connection pool
 * @description Singleton pattern for database connection management
 *
 * @returns Promise resolving to SQL Server connection pool
 * @throws Error if connection fails
 */
export async function getPool(): Promise<sql.ConnectionPool> {
  if (pool && pool.connected) {
    return pool;
  }

  try {
    pool = await sql.connect({
      server: config.database.server,
      port: config.database.port,
      user: config.database.user,
      password: config.database.password,
      database: config.database.database,
      options: config.database.options,
      pool: config.database.pool,
    });

    console.log('Database connection established');
    return pool;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

/**
 * @summary Closes database connection pool
 * @description Gracefully closes the connection pool
 */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.close();
    pool = null;
    console.log('Database connection closed');
  }
}

/**
 * @summary Handle process termination
 */
process.on('SIGINT', async () => {
  await closePool();
  process.exit(0);
});
