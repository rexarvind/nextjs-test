import type { MongoClient } from 'mongodb'
import type { DefaultUser } from 'next-auth';

declare global {
  namespace globalThis {
    var _mongoClientPromise: Promise<MongoClient>
  }
}

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    uid: string;
  }
}