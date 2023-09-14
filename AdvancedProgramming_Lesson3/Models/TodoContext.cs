using Microsoft.EntityFrameworkCore;

namespace AdvancedProgramming_Lesson3.Models
{
    public class TodoContext : DbContext
    {

        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        {
        }

        public DbSet<TodoItem> TodoItems { get; set; }
        public DbSet<Person> People { get; set; }
        public DbSet<Tool> Tools { get; set; }
    }
}
