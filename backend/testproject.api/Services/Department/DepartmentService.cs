using Microsoft.EntityFrameworkCore;
using testproject.api.Data;
using testproject.api.Models;

namespace testproject.api.Services;

public class DepartmentService : IDepartmentService
{
  private readonly DataContext _context;

  public DepartmentService(DataContext context) => _context = context;

  public List<Department> GetAllDepartments() =>
  _context.Departments
  .Where(d => d.ManagerId == d.Manager.ManagerId
   && d.Manager.EmpId == d.Manager.Employee.EmpId)
  .Include(d => d.Manager)
  .Include(d => d.Manager.Employee)
  .ToList();

  public Department GetDepartment(int id) =>
   _context.Departments
   .Where(d => d.ManagerId == d.Manager.ManagerId
   && d.Manager.EmpId == d.Manager.Employee.EmpId)
  .Include(d => d.Manager)
   .Include(d => d.Manager.Employee)
  .FirstOrDefault((department) => department.DeptId == id);

  public void CreateEditDepartment(int id, Department department)
  {
    if (_context.Departments.Any(d => d.DeptId == id))
      _context.Update(department);
    else
      _context.Add(department);
    _context.SaveChanges();
  }
  public void UpdateDepartmentStatus(Department department)
  {
    _context.Update(department);
    _context.SaveChanges();
  }
}
