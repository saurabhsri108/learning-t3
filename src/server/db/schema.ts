// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  int,
  mysqlTableCreator,
  timestamp,
  varchar,
  text,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `learning-t3_${name}`);

export const posts = mysqlTable(
  "post",
  {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
    content: text("content"),
    authorId: varchar("authorId", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    authorIdIndex: index("authorId_idx").on(example.authorId),
  }),
);
