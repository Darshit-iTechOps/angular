using Microsoft.EntityFrameworkCore;
using testproject.api.Models;

namespace testproject.api.Data;
public class DataContext : DbContext
{
  public DataContext(DbContextOptions<DataContext> options) : base(options)
  {

  }
  public virtual DbSet<Department> Departments { get; set; } = null!;
  public virtual DbSet<Employee> Employees { get; set; } = null!;
  public virtual DbSet<Manager> Managers { get; set; } = null!;
  public virtual DbSet<Role> Roles { get; set; } = null!;

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);
    modelBuilder.Entity<Role>()
       .HasData(
           new Role(1, "Employee"),
           new Role(2, "Manager"),
           new Role(3, "HR")
       );
  }
}

