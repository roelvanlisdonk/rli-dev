using Microsoft.EntityFrameworkCore;

namespace SqlScript {
    public class Context : DbContext
    {
        private readonly string connectionString;

        /**
        *  This constructor is added, so we can overwrite the connection string.
        */
        public Context(string connectionString) : base()
        {
            this.connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        public DbSet<Script> Scripts { get; set; }
    }

    public class Script
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string FullViewName { get; set; }
    }
}