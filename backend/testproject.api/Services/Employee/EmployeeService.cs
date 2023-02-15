using testproject.api.Data;
using testproject.api.Models;
using Microsoft.EntityFrameworkCore;

namespace testproject.api.Services;

public class EmployeeService : IEmployeeService
{
  private readonly DataContext _context;
  public EmployeeService(DataContext context) => _context = context;
  public List<Employee> GetAllEmployees() =>
   _context.Employees.Where(u => u.RoleID == u.Role.RoleID
     && u.DeptId == u.Department.DeptId)
    .Include(u => u.Role)
    .Include(u => u.Department)
    .ToList();

  public Employee GetEmployee(int id) =>
    _context.Employees.Where(u => u.RoleID == u.Role.RoleID
     && u.DeptId == u.Department.DeptId)
    .Include(u => u.Role)
    .Include(u => u.Department)
    .FirstOrDefault((employee) => employee.EmpId == id);

  public Employee GetCurrentUser(string email, string password) =>
    _context.Employees.Where(u => u.RoleID == u.Role.RoleID
    && u.DeptId == u.Department.DeptId)
   .Include(u => u.Role)
   .Include(u => u.Department)
   .FirstOrDefault((employee) => employee.Email == email && employee.Password == password);

  public void CreateEditEmployee(int id, Employee employee)
  {
    if (_context.Employees.Any(employee => employee.EmpId == id))
      _context.Update(employee);
    else
      _context.Add(employee);
    _context.SaveChanges();
  }

  public void AssignAuto(int id, int roleID)
  {
    dynamic model;
    if (id != 0 && roleID != 0)
    {
      switch (roleID)
      {
        case 2:
          model = new Manager() { EmpId = id };
          _context.Add(model);
          break;
        case 3:
          model = new HR() { EmpId = id };
          _context.Add(model);
          break;
      }
      _context.SaveChanges();
    }
  }

  public void UpdateEmployeeStatus(Employee employee)
  {
    _context.Update(employee);
    _context.SaveChanges();
  }
  public void DeleteEmployee(int id)
  {
    var employee = GetEmployee(id);
    if (_context.Employees.Any(e => e.EmpId == id))
      _context.Remove(employee);
    _context.SaveChanges();
  }
}

